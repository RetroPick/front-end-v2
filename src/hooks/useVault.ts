import { useReadContract, useWriteContract, useAccount, useChainId } from 'wagmi';
import { parseUnits, formatUnits, type Address } from 'viem';
import { CONTRACT_ADDRESSES, ABIS } from '@/contracts/config';

const FUJI_CHAIN_ID = 43113;

export function useVault(tokenAddress?: Address) {
    const { address } = useAccount();
    const chainId = useChainId();

    const isFuji = chainId === FUJI_CHAIN_ID;
    const token = tokenAddress ?? CONTRACT_ADDRESSES.USDC;
    const vaultAddress = CONTRACT_ADDRESSES.CollateralVault;

    // Read Balance of Token (only on Fuji)
    const { data: tokenBalanceData, refetch: refetchTokenBalance } = useReadContract({
        address: token,
        abi: ABIS.ERC20,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: {
            enabled: !!address && isFuji,
        }
    });

    // Read LP Balance (Mocked - disabled)
    const { refetch: refetchLPBalance } = useReadContract({
        address: token,
        abi: ABIS.ERC20,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: { enabled: false }
    });

    // Read Allowance (only on Fuji)
    const { data: allowanceData, refetch: refetchAllowance } = useReadContract({
        address: token,
        abi: ABIS.ERC20,
        functionName: 'allowance',
        args: address ? [address, vaultAddress] : undefined,
        query: {
            enabled: !!address && isFuji,
        }
    });

    // Read Vault Free Balance (only on Fuji)
    const { data: freeBalanceData, refetch: refetchFreeBalance } = useReadContract({
        address: vaultAddress,
        abi: ABIS.CollateralVault,
        functionName: 'freeBalance',
        args: address ? [address] : undefined,
        query: {
            enabled: !!address && isFuji,
        }
    });

    const { writeContractAsync: writeApprove, isPending: isApproving } = useWriteContract();
    const { writeContractAsync: writeVault, isPending: isVaultTxPending } = useWriteContract();

    const tokenBalance = tokenBalanceData ? Number(formatUnits(tokenBalanceData as bigint, 6)) : 0;
    const lpBalance = 0;
    const allowance = allowanceData ? Number(formatUnits(allowanceData as bigint, 6)) : 0;
    const freeBalance = isFuji && freeBalanceData ? Number(formatUnits(freeBalanceData as bigint, 6)) : 0;

    const wrongChainError = () => {
        throw new Error('Switch to Avalanche Fuji to use the Vault.');
    };

    const approveToken = async (amountHuman: string) => {
        if (!isFuji) wrongChainError();
        const amountWei = parseUnits(amountHuman, 6);
        return await writeApprove({
            address: token,
            abi: ABIS.ERC20,
            functionName: 'approve',
            args: [vaultAddress, amountWei],
        });
    };

    const deposit = async (amountHuman: string) => {
        if (!isFuji) wrongChainError();
        const amountWei = parseUnits(amountHuman, 6);
        return await writeVault({
            address: vaultAddress,
            abi: ABIS.CollateralVault,
            functionName: 'deposit',
            args: [amountWei]
        });
    };

    const withdraw = async (amountHuman: string) => {
        if (!isFuji) wrongChainError();
        const amountWei = parseUnits(amountHuman, 6);
        return await writeVault({
            address: vaultAddress,
            abi: ABIS.CollateralVault,
            functionName: 'withdraw',
            args: [amountWei]
        });
    };

    return {
        tokenBalance,
        lpBalance,
        allowance,
        freeBalance,
        approveToken,
        isApproving,
        deposit,
        withdraw,
        isVaultTxPending,
        isFuji,
        refetchAll: () => {
            refetchTokenBalance();
            refetchAllowance();
            refetchFreeBalance();
        }
    };
}
