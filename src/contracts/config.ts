import { Abi, erc20Abi } from 'viem';
import CollateralVaultABI from './abi/CollateralVault.json';
import ExecutionLedgerABI from './abi/ExecutionLedger.json';
import MarketRegistryABI from './abi/MarketRegistry.json';
import ChannelSettlementABI from './abi/ChannelSettlement.json';
import MarketDraftBoardABI from './abi/MarketDraftBoard.json';
import DraftClaimManagerABI from './abi/DraftClaimManager.json';

// Verified deployed addresses on Avalanche Fuji (Testnet) V3
export const CONTRACT_ADDRESSES = {
    // Shared Mock Token
    USDC: "0x61c8d94ab8a729126a9FA41751FaD7F464604948" as const,

    // Core contracts (V3)
    CollateralVault: "0x792a065dD308A1Fc3d115Ea006b3093D8fBd7ea1" as const,
    MultiAssetVault: "0x71EEA55f90c028aEE2b0F0785d015ea4e9165aBF" as const,
    MarketRegistry: "0x3235094A8826a6205F0A0b74E2370A4AC39c6Cc2" as const,
    ChannelSettlement: "0xFA5D0e64B0B21374690345d4A88a9748C7E22182" as const,
    MarketDraftBoard: "0xa1A31B61748252D7E1f15B2F74de0ce99f1a296f" as const,
    DraftClaimManager: "0x1Ccccc54e0cE928b3FC04aA2Ed4E012E7EaAdDe9" as const,
    OutcomeToken1155: "0x9B413811ecfD0e0679A7Ba785de44E15E7482044" as const,
    ExecutionLedger: "0x2222222222222222222222222222222222222222" as const, // Deprecated in V3
};

export const ABIS = {
    CollateralVault: CollateralVaultABI as Abi,
    ExecutionLedger: ExecutionLedgerABI as Abi,
    MarketRegistry: MarketRegistryABI as Abi,
    ChannelSettlement: ChannelSettlementABI as Abi,
    MarketDraftBoard: MarketDraftBoardABI as Abi,
    DraftClaimManager: DraftClaimManagerABI as Abi,
    ERC20: erc20Abi
};
