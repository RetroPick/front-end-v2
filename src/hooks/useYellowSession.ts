import { useSignTypedData, useAccount } from 'wagmi';

export function useYellowSession() {
    const { address } = useAccount();
    const { signTypedDataAsync, isPending, isError, isSuccess, error } = useSignTypedData();

    const signOrder = async (marketId: string | number, outcomeIndex: number, amount: number) => {
        // EIP-712 Domain for ShadowPool Yellow Sessions
        const domain = {
            name: 'ShadowPool Yellow Session',
            version: '1',
            // chainId: 43113, // Fuji
            verifyingContract: '0x0000000000000000000000000000000000000000' as const, // Placeholder for prototype
        };

        const types = {
            Order: [
                { name: 'marketId', type: 'uint256' },
                { name: 'outcomeIndex', type: 'uint8' },
                { name: 'amount', type: 'uint256' },
                { name: 'nonce', type: 'uint256' }
            ],
        };

        const message = {
            marketId: BigInt(marketId),
            outcomeIndex,
            amount: BigInt(amount * 1e18),
            nonce: BigInt(Date.now()) // Simple nonce for prototype
        };

        try {
            const signature = await signTypedDataAsync({
                domain,
                types,
                primaryType: 'Order',
                message: message as any,
                account: address,
            } as any);
            return signature;
        } catch (err) {
            console.error("Sign order failed", err);
            throw err;
        }
    };

    return { signOrder, isPending, isError, isSuccess, error };
}
