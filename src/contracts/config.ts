import { Abi, erc20Abi } from 'viem';
import CollateralVaultABI from './abi/CollateralVault.json';
import ExecutionLedgerABI from './abi/ExecutionLedger.json';
import MarketRegistryABI from './abi/MarketRegistry.json';
import ChannelSettlementABI from './abi/ChannelSettlement.json';

// TODO: Replace with actual deployed addresses on Avalanche Fuji (Testnet) or Sepolia
export const CONTRACT_ADDRESSES = {
    // Shared Mock USDC / Token
    USDC: "0x5425890298aed601595a70AB815c96711a31Bc65" as const, // Example Fuji USDC Mock

    // Core contracts
    CollateralVault: "0x1111111111111111111111111111111111111111" as const,
    ExecutionLedger: "0x2222222222222222222222222222222222222222" as const,
    MarketRegistry: "0x3333333333333333333333333333333333333333" as const,
    ChannelSettlement: "0x4444444444444444444444444444444444444444" as const,
};

export const ABIS = {
    CollateralVault: CollateralVaultABI as Abi,
    ExecutionLedger: ExecutionLedgerABI as Abi,
    MarketRegistry: MarketRegistryABI as Abi,
    ChannelSettlement: ChannelSettlementABI as Abi,
    ERC20: erc20Abi
};
