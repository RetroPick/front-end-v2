import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { CONTRACT_ADDRESSES, ABIS } from '@/contracts/config';
import { useState, useEffect } from 'react';

export function useVault(tokenSymbol: string = "USDC") {
    const { address } = useAccount();

    // In a real scenario, map tokenSymbol to address. For now, we mock just USDC
    const tokenAddress = CONTRACT_ADDRESSES.USDC;
    const vaultAddress = CONTRACT_ADDRESSES.CollateralVault;

    // Read Balance of Token
    const { data: tokenBalanceData, refetch: refetchTokenBalance } = useReadContract({
        address: tokenAddress,
        abi: ABIS.ERC20,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: {
            enabled: !!address,
        }
    });

    // Read LP Balance (Mocked as reading some Vault state, though CollateralVault might not issue LP directly in standard way, we mimic it)
    const { data: lpBalanceData, refetch: refetchLPBalance } = useReadContract({
        address: tokenAddress, // Should ideally be LP token. We use dummy mapping
        abi: ABIS.ERC20,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: { enabled: false } // Disabled for now, as we don't have an LP token address 
    });

    // Read Allowance
    const { data: allowanceData, refetch: refetchAllowance } = useReadContract({
        address: tokenAddress,
        abi: ABIS.ERC20,
        functionName: 'allowance',
        args: address ? [address, vaultAddress] : undefined,
        query: {
            enabled: !!address,
        }
    });

    // Write Approve
    const { writeContractAsync: writeApprove, isPending: isApproving } = useWriteContract();

    // Write Deposit/Withdraw
    const { writeContractAsync: writeVault, isPending: isVaultTxPending } = useWriteContract();

    // Helper to format balances (assumes 6 decimals for USDC)
    const tokenBalance = tokenBalanceData ? Number(formatUnits(tokenBalanceData as bigint, 6)) : 0;
    const lpBalance = lpBalanceData ? Number(formatUnits(lpBalanceData as bigint, 6)) : 0; // Dummy
    const allowance = allowanceData ? Number(formatUnits(allowanceData as bigint, 6)) : 0;

    const approveToken = async (amountHuman: string) => {
        const amountWei = parseUnits(amountHuman, 6);
        return await writeApprove({
            address: tokenAddress,
            abi: ABIS.ERC20,
            functionName: 'approve',
            args: [vaultAddress, amountWei],
        });
    };

    const deposit = async (amountHuman: string) => {
        const amountWei = parseUnits(amountHuman, 6);
        return await writeVault({
            address: vaultAddress,
            abi: ABIS.CollateralVault,
            functionName: 'deposit',
            args: [amountWei]
        });
    };

    const withdraw = async (amountHuman: string) => {
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
        approveToken,
        isApproving,
        deposit,
        withdraw,
        isVaultTxPending,
        refetchAll: () => {
            refetchTokenBalance();
            refetchAllowance();
        }
    };
}
