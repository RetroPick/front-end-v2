import { useReadContract, useWriteContract, useAccount, useChainId } from 'wagmi';
import { formatUnits } from 'viem';
import { Address } from 'viem';
import { CONTRACT_ADDRESSES, ABIS } from '@/contracts/config';
import { TOKENS } from '@/constants/tokens';
import { useMemo, useState, useEffect } from 'react';

const FUJI_CHAIN_ID = 43113;

/** Map Faucet contract errors to user-friendly messages */
function mapFaucetError(error: unknown): string {
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.includes('InvalidState')) return 'Token disabled or cooldown not elapsed.';
    if (msg.includes('InvalidAmount')) return 'Faucet balance too low.';
    return msg;
}

export function useFaucet(tokenAddress?: Address) {
    const { address } = useAccount();
    const chainId = useChainId();

    const faucetAddress = chainId === FUJI_CHAIN_ID ? CONTRACT_ADDRESSES.Faucet : undefined;
    const token = tokenAddress ?? (chainId === FUJI_CHAIN_ID ? (TOKENS[chainId]?.USDC as Address) : undefined);
    const isSupportedChain = chainId === FUJI_CHAIN_ID && !!faucetAddress && !!token;

    const { data: canClaimData, refetch: refetchCanClaim } = useReadContract({
        address: faucetAddress,
        abi: ABIS.Faucet,
        functionName: 'canClaim',
        args: address && token ? [address, token] : undefined,
        query: { enabled: !!address && !!token && isSupportedChain },
    });

    const { data: tokenConfigData, refetch: refetchTokenConfig } = useReadContract({
        address: faucetAddress,
        abi: ABIS.Faucet,
        functionName: 'tokenConfig',
        args: token ? [token] : undefined,
        query: { enabled: !!token && isSupportedChain },
    });

    const { data: lastClaimAtData, refetch: refetchLastClaimAt } = useReadContract({
        address: faucetAddress,
        abi: ABIS.Faucet,
        functionName: 'lastClaimAt',
        args: address && token ? [address, token] : undefined,
        query: { enabled: !!address && !!token && isSupportedChain },
    });

    const { writeContractAsync: writeClaim, isPending } = useWriteContract();

    const canClaim = canClaimData === true;
    const amountPerClaim = tokenConfigData?.[1] ? Number(formatUnits(tokenConfigData[1] as bigint, 6)) : 1000;
    const cooldownSecs = tokenConfigData?.[2] ?? 3600;
    const lastClaimAt = lastClaimAtData ? Number(lastClaimAtData) : 0;

    const [tick, setTick] = useState(0);
    const cooldownRemaining = useMemo(() => {
        if (!lastClaimAt || !cooldownSecs) return 0;
        const elapsed = Math.floor(Date.now() / 1000) - lastClaimAt;
        return Math.max(0, cooldownSecs - elapsed);
    }, [lastClaimAt, cooldownSecs, tick]);

    useEffect(() => {
        if (!lastClaimAt || !cooldownSecs) return;
        const elapsed = Math.floor(Date.now() / 1000) - lastClaimAt;
        if (elapsed >= cooldownSecs) return;
        const id = setInterval(() => setTick((t) => t + 1), 1000);
        return () => clearInterval(id);
    }, [lastClaimAt, cooldownSecs]);

    const claim = async () => {
        if (!token || !faucetAddress) {
            throw new Error('Faucet not available on this network.');
        }
        try {
            return await writeClaim({
                address: faucetAddress,
                abi: ABIS.Faucet,
                functionName: 'claim',
                args: [token],
            });
        } catch (err) {
            throw new Error(mapFaucetError(err));
        }
    };

    const refetch = () => {
        refetchCanClaim();
        refetchTokenConfig();
        refetchLastClaimAt();
    };

    return {
        canClaim,
        amountPerClaim,
        cooldownSecs,
        cooldownRemaining,
        claim,
        isPending,
        refetch,
        isSupportedChain,
    };
}
