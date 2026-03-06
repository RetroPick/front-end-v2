import { useAccount, useReadContract, useReadContracts, useWriteContract } from 'wagmi';
import { parseUnits, formatUnits, Address } from 'viem';
import { CONTRACT_ADDRESSES, ABIS } from '@/contracts/config';
import { useState, useEffect, useCallback } from 'react';

/**
 * Standard ERC-4626 ABI subset for LP Vault interactions.
 * Each per-market vault is deployed by LiquidityVaultFactory and conforms to ERC4626.
 */
export const ERC4626_ABI = [
    // Read methods
    { inputs: [{ name: 'owner', type: 'address' }], name: 'balanceOf', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
    { inputs: [], name: 'totalAssets', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
    { inputs: [], name: 'totalSupply', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
    { inputs: [], name: 'asset', outputs: [{ type: 'address' }], stateMutability: 'view', type: 'function' },
    { inputs: [{ name: 'assets', type: 'uint256' }], name: 'convertToShares', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
    { inputs: [{ name: 'shares', type: 'uint256' }], name: 'convertToAssets', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
    { inputs: [{ name: 'assets', type: 'uint256' }], name: 'previewDeposit', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
    { inputs: [{ name: 'shares', type: 'uint256' }], name: 'previewRedeem', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
    { inputs: [{ name: 'receiver', type: 'address' }], name: 'maxDeposit', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
    { inputs: [{ name: 'owner', type: 'address' }], name: 'maxRedeem', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
    { inputs: [], name: 'name', outputs: [{ type: 'string' }], stateMutability: 'view', type: 'function' },
    { inputs: [], name: 'symbol', outputs: [{ type: 'string' }], stateMutability: 'view', type: 'function' },
    { inputs: [], name: 'decimals', outputs: [{ type: 'uint8' }], stateMutability: 'view', type: 'function' },
    // Write methods
    { inputs: [{ name: 'assets', type: 'uint256' }, { name: 'receiver', type: 'address' }], name: 'deposit', outputs: [{ type: 'uint256' }], stateMutability: 'nonpayable', type: 'function' },
    { inputs: [{ name: 'shares', type: 'uint256' }, { name: 'receiver', type: 'address' }, { name: 'owner', type: 'address' }], name: 'redeem', outputs: [{ type: 'uint256' }], stateMutability: 'nonpayable', type: 'function' },
    { inputs: [{ name: 'assets', type: 'uint256' }, { name: 'receiver', type: 'address' }, { name: 'owner', type: 'address' }], name: 'withdraw', outputs: [{ type: 'uint256' }], stateMutability: 'nonpayable', type: 'function' },
] as const;

/**
 * Hook to interact with a per-market ERC-4626 Liquidity Vault.
 *
 * Usage:
 *   const { vaultData, deposit, redeem, isLoading } = useLPVault(marketId);
 *
 * Vault address resolution:
 *   1. MarketRegistry.liquidityVaultByMarketId(marketId) → address
 *   2. If zero, try DraftClaimManager.getLiquidityVault(draftId)
 */
export function useLPVault(marketId?: number) {
    const { address: userAddress } = useAccount();
    const [vaultAddress, setVaultAddress] = useState<Address | null>(null);

    // Step 1: Resolve vault address from MarketRegistry
    const { data: registryVault } = useReadContract({
        address: CONTRACT_ADDRESSES.MarketRegistry as Address,
        abi: ABIS.MarketRegistry,
        functionName: 'liquidityVaultByMarketId',
        args: marketId ? [BigInt(marketId)] : undefined,
        query: { enabled: !!marketId },
    });

    useEffect(() => {
        if (registryVault && registryVault !== '0x0000000000000000000000000000000000000000') {
            setVaultAddress(registryVault as Address);
        }
    }, [registryVault]);

    // Step 2: Read vault data (ERC-4626)
    const { data: vaultReads, refetch: refetchVault } = useReadContracts({
        contracts: vaultAddress && userAddress ? [
            { address: vaultAddress, abi: ERC4626_ABI, functionName: 'totalAssets' },
            { address: vaultAddress, abi: ERC4626_ABI, functionName: 'totalSupply' },
            { address: vaultAddress, abi: ERC4626_ABI, functionName: 'balanceOf', args: [userAddress] },
            { address: vaultAddress, abi: ERC4626_ABI, functionName: 'asset' },
            { address: vaultAddress, abi: ERC4626_ABI, functionName: 'name' },
            { address: vaultAddress, abi: ERC4626_ABI, functionName: 'symbol' },
            { address: vaultAddress, abi: ERC4626_ABI, functionName: 'decimals' },
            { address: vaultAddress, abi: ERC4626_ABI, functionName: 'convertToAssets', args: [BigInt(1e6)] }, // 1 share → ? assets
        ] : [],
        query: { enabled: !!vaultAddress && !!userAddress },
    });

    // Parse vault data
    const totalAssets = vaultReads?.[0]?.status === 'success' ? (vaultReads[0].result as bigint) : 0n;
    const totalSupply = vaultReads?.[1]?.status === 'success' ? (vaultReads[1].result as bigint) : 0n;
    const userShares = vaultReads?.[2]?.status === 'success' ? (vaultReads[2].result as bigint) : 0n;
    const underlyingAsset = vaultReads?.[3]?.status === 'success' ? (vaultReads[3].result as string) : '';
    const vaultName = vaultReads?.[4]?.status === 'success' ? (vaultReads[4].result as string) : '';
    const vaultSymbol = vaultReads?.[5]?.status === 'success' ? (vaultReads[5].result as string) : '';
    const decimals = vaultReads?.[6]?.status === 'success' ? Number(vaultReads[6].result) : 6;
    const sharePrice = vaultReads?.[7]?.status === 'success' ? (vaultReads[7].result as bigint) : BigInt(1e6);

    // Calculated values
    const sharePriceFormatted = Number(formatUnits(sharePrice, decimals));
    const totalAssetsFormatted = Number(formatUnits(totalAssets, decimals));
    const userSharesFormatted = Number(formatUnits(userShares, decimals));
    const userAssetsValue = totalSupply > 0n
        ? Number(formatUnits(userShares * totalAssets / totalSupply, decimals))
        : 0;

    // Write: deposit
    const { writeContractAsync: writeDeposit, isPending: isDepositPending } = useWriteContract();

    const deposit = useCallback(async (amount: string) => {
        if (!vaultAddress || !userAddress) throw new Error('Vault or user not connected');
        const amountWei = parseUnits(amount, decimals);
        const tx = await (writeDeposit as any)({
            address: vaultAddress,
            abi: ERC4626_ABI,
            functionName: 'deposit',
            args: [amountWei, userAddress],
        });
        return tx;
    }, [vaultAddress, userAddress, decimals, writeDeposit]);

    // Write: redeem (shares → assets)
    const { writeContractAsync: writeRedeem, isPending: isRedeemPending } = useWriteContract();

    const redeem = useCallback(async (shares: string) => {
        if (!vaultAddress || !userAddress) throw new Error('Vault or user not connected');
        const sharesWei = parseUnits(shares, decimals);
        const tx = await (writeRedeem as any)({
            address: vaultAddress,
            abi: ERC4626_ABI,
            functionName: 'redeem',
            args: [sharesWei, userAddress, userAddress],
        });
        return tx;
    }, [vaultAddress, userAddress, decimals, writeRedeem]);

    // Write: withdraw (assets → burn shares)
    const { writeContractAsync: writeWithdraw, isPending: isWithdrawPending } = useWriteContract();

    const withdrawAssets = useCallback(async (amount: string) => {
        if (!vaultAddress || !userAddress) throw new Error('Vault or user not connected');
        const amountWei = parseUnits(amount, decimals);
        const tx = await (writeWithdraw as any)({
            address: vaultAddress,
            abi: ERC4626_ABI,
            functionName: 'withdraw',
            args: [amountWei, userAddress, userAddress],
        });
        return tx;
    }, [vaultAddress, userAddress, decimals, writeWithdraw]);

    return {
        vaultAddress,
        vaultName,
        vaultSymbol,
        decimals,
        underlyingAsset,
        totalAssets: totalAssetsFormatted,
        totalSupply: Number(formatUnits(totalSupply, decimals)),
        userShares: userSharesFormatted,
        userAssetsValue,
        sharePrice: sharePriceFormatted,

        deposit,
        redeem,
        withdrawAssets,
        refetchVault,

        isDepositPending,
        isRedeemPending,
        isWithdrawPending,
        isPending: isDepositPending || isRedeemPending || isWithdrawPending,
        isLoading: !vaultReads,
        hasVault: !!vaultAddress,
    };
}
