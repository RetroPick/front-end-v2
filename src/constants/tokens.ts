import { Address } from 'viem';

// Standard ERC20 ABI for fetching balances and decimals
export const ERC20_ABI = [
    {
        constant: true,
        inputs: [{ name: '_owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: 'balance', type: 'uint256' }],
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [{ name: '', type: 'uint8' }],
        type: 'function',
    },
    {
        name: 'mint',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [
            { name: 'to', type: 'address' },
            { name: 'amount', type: 'uint256' }
        ],
        outputs: [],
    }
] as const;

// Mainnet/Sepolia Token Addresses
export const TOKENS: Record<number, Record<string, Address>> = {
    // Mainnet
    1: {
        USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        WBTC: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', // Wrapped BTC for BTC balance
        SOL: '0xD31a59c85aE9D8edEFeC411D448f90841571b89c', // Wrapped SOL for mainnet
    },
    // Sepolia (Testnet)
    11155111: {
        USDC: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
        USDT: '0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0',
        WBTC: '0x29f2D40B0605204364af54EC677bD022dA425d03',
        SOL: '0x0000000000000000000000000000000000000000', // Mock/null for sepolia SOL
    }
};
