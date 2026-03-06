import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import { cn } from "@/lib/utils";
import { useAppKitAccount } from "@reown/appkit/react";
import { useAccount, useBalance, useReadContracts, useChainId, useSwitchChain } from "wagmi";
import { formatUnits, Address } from "viem";
import AuthPlaceholder from "@/components/common/AuthPlaceholder";
import { ERC20_ABI, TOKENS } from "@/constants/tokens";
import { useVault } from "@/hooks/useVault";
import { useFaucet } from "@/hooks/useFaucet";
import { useToast } from "@/components/ui/use-toast";
import TransactionModal from "@/components/modals/TransactionModal";
import SellModal from "@/components/modals/SellModal";
import { useMarkets } from "@/context/MarketContext";
import { relayerApi } from "@/lib/relayerApi";
import { CONTRACT_ADDRESSES } from "@/contracts/config";
import { Link } from "react-router-dom";

const FUJI_CHAIN_ID = 43113;

// --- Authentic Crypto Icons (Colored SVGs) ---
const SolanaLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 396 311" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <linearGradient id="solana_grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#9945FF" />
      <stop offset="100%" stopColor="#14F195" />
    </linearGradient>
    <path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7zm260.1-164.8c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h309.1c5.8 0 8.7-7 4.6-11.1l-62.7-62.7zM64.6 3.8C67 1.4 70.3 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z" fill="url(#solana_grad)" />
  </svg>
);

const EthLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 256 417" className={className} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
    <path fill="#343434" d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z" />
    <path fill="#8C8C8C" d="M127.962 0L0 212.32l127.962 75.639V154.158z" />
    <path fill="#3C3C3B" d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z" />
    <path fill="#8C8C8C" d="M127.962 416.905v-104.72L0 236.585z" />
    <path fill="#141414" d="M127.961 287.958l127.96-75.637-127.96-58.162z" />
    <path fill="#393939" d="M0 212.32l127.96 75.638v-133.8z" />
  </svg>
);

const UsdcLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#2775CA" />
    <path d="M12.75 15.66c-0.66 0.16-1.42 0.31-2.17 0.08 -1.27-0.39-1.85-1.57-1.63-2.67 0.22-1.08 1.15-1.66 2.05-1.89 1.41-0.36 2.45-1.69 2.06-2.92 -0.42-1.33-1.63-1.87-2.64-1.67 -0.47 0.09-0.91 0.25-1.31 0.46V6h-1.5v1.23c-0.29 0.14-0.56 0.3-0.81 0.5l0.91 1.25c0.66-0.52 1.4-0.78 2.15-0.93 1.12-0.22 1.63 0.65 1.83 1.27 0.2 0.63-0.07 1.34-0.9 1.55 -1.41 0.36-2.45 1.69-2.06 2.92 0.42 1.33 1.63 1.87 2.64 1.67 0.47-0.09 0.91-0.24 1.31-0.46V18h1.5v-1.24c0.29-0.14 0.56-0.3 0.81-0.5l-0.91-1.25C13.62 15.39 13.21 15.54 12.75 15.66z" fill="white" />
  </svg>
);

const BtcLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fillRule="evenodd">
      <circle cx="16" cy="16" r="16" fill="#F7931A" />
      <path fill="#FFF" d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118 1.416 3.61 2.733z" />
    </g>
  </svg>
);

const UsdtLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fillRule="evenodd">
      <circle cx="16" cy="16" r="16" fill="#26A17B" />
      <path fill="#FFF" d="M17.922 17.383v-.002c-.11.008-.677.042-1.942.042-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658 0-.809 2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061 1.207 0 1.812-.05 1.925-.061v-2.643c3.88.173 6.775.85 6.775 1.658 0 .81-2.895 1.485-6.775 1.657m0-3.59v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118 0 1.044 3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116 0-1.043-3.301-1.914-7.694-2.117" />
    </g>
  </svg>
);

const AvaxLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#E84142" />
    <path d="M12.115 15.688l-2.73-5.462L6.16 16.643h2.365l1.09-2.18h4.943l1.103 2.18h2.366l-3.21-6.32-2.702-5.405-2.73 5.372 1.63 3.262 1.1-2.202 1.63 3.338z" fill="white" />
  </svg>
);

const MOCK_ASSETS_SEPOLIA = [
  { symbol: "ETH", name: "Ethereum Sepolia", balance: 2.50, value: 8625.0, change: "+2.1%", IconComp: EthLogo, price: 3450.00, contractAddress: null, decimals: 18 },
  { symbol: "USDC", name: "USD Coin (Testnet)", balance: 300.00, value: 300.00, change: "0.0%", IconComp: UsdcLogo, price: 1.0, contractAddress: null, decimals: 6 },
  { symbol: "USDT", name: "Tether (Testnet)", balance: 150.00, value: 150.00, change: "0.0%", IconComp: UsdtLogo, price: 1.0, contractAddress: null, decimals: 6 },
  { symbol: "BTC", name: "Bitcoin", balance: 0.0042, value: 210.0, change: "+0.5%", IconComp: BtcLogo, price: 50000.00, contractAddress: null, decimals: 8 },
];

const MOCK_ASSETS_AVALANCHE = [
  { symbol: "AVAX", name: "Avalanche Fuji", balance: 45.20, value: 1808.0, change: "+5.4%", IconComp: AvaxLogo, price: 40.0, contractAddress: null, decimals: 18 },
  { symbol: "USDC", name: "USD Coin (Testnet)", balance: 1250.00, value: 1250.00, change: "0.0%", IconComp: UsdcLogo, price: 1.0, contractAddress: "0x61c8d94ab8a729126a9FA41751FaD7F464604948", decimals: 6 },
  { symbol: "BTC.b", name: "Wrapped BTC", balance: 0.015, value: 750.0, change: "+1.2%", IconComp: BtcLogo, price: 50000.00, contractAddress: "0x8CA51cb13B91A6530429f154B8505c40BE0d7908", decimals: 8 },
];


export interface PositionData {
  id: string | number;
  market: string;
  type: string;
  amount: number;
  pnl: string;
  expiry: string;
}

function PositionItem({ pos }: { pos: PositionData }) {
  const displayAmount = pos.amount;
  const [isSellOpen, setIsSellOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between p-3 bg-card border border-border rounded-xl hover:border-blue-500/20 transition-all group">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 font-bold text-xs border border-slate-200 dark:border-white/10">
            {pos.type}
          </div>
          <div>
            <div className="font-semibold text-sm text-slate-900 dark:text-white truncate max-w-[150px]">{pos.market}</div>
            <div className="text-[10px] font-medium text-slate-400">Exp: {pos.expiry}</div>
          </div>
        </div>
        <div className="text-right flex items-center gap-4">
          <div>
            <div className="font-semibold text-sm text-slate-900 dark:text-white">
              ${displayAmount.toFixed(2)}
            </div>
            <div className={cn("text-[10px] font-medium", pos.pnl.startsWith('+') ? "text-green-500" : "text-slate-400")}>
              {pos.pnl}
            </div>
          </div>
          <button
            onClick={() => setIsSellOpen(true)}
            className="opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white text-xs font-bold py-1.5 px-3 rounded-lg border border-rose-500/20"
          >
            Sell
          </button>
        </div>
      </div>
      <SellModal
        open={isSellOpen}
        onClose={() => setIsSellOpen(false)}
        marketTitle={pos.market}
        side={pos.type as 'YES' | 'NO'}
        availableShares={displayAmount}
      />
    </>
  );
}

const Portfolio = () => {
  const { isConnected } = useAppKitAccount();
  const { address } = useAccount();
  const { markets } = useMarkets();

  const [realtimePositions, setRealtimePositions] = useState<PositionData[]>([]);
  const [isPositionsLoading, setIsPositionsLoading] = useState(true);

  useEffect(() => {
    async function fetchPositions() {
      if (!address || !isConnected) {
        setRealtimePositions([]);
        setIsPositionsLoading(false);
        return;
      }

      const userPositions: PositionData[] = [];

      // Grab the active markets from Context and check their sessions
      const marketsToCheck = markets.slice(0, 30); // scan first 30 markets

      for (const m of marketsToCheck) {
        try {
          const sessionId = relayerApi.getMarketSessionId(m.title);
          const accState = await relayerApi.getAccountState(sessionId, address);

          if (!accState?.positions) continue;

          const yesSharesStr = accState.positions[0] || '0';
          const noSharesStr = accState.positions[1] || '0';

          // Based on relayer scaled shares (1e6)
          const yesShares = Number(yesSharesStr) / 1e6;
          const noShares = Number(noSharesStr) / 1e6;

          if (yesShares > 0.01) {
            userPositions.push({ id: m.id, market: m.title, type: "YES", amount: yesShares, pnl: "$0", expiry: m.expiry || "N/A" });
          }
          if (noShares > 0.01) {
            userPositions.push({ id: m.id, market: m.title, type: "NO", amount: noShares, pnl: "$0", expiry: m.expiry || "N/A" });
          }
        } catch (err) {
          // Skip markets where user has no session/account
        }
      }

      setRealtimePositions(userPositions);
      setIsPositionsLoading(false);
    }

    fetchPositions();
    const interval = setInterval(fetchPositions, 5000);
    return () => clearInterval(interval);
  }, [address, isConnected, markets]);

  // Fetch native balance (ETH on mainnet/sepolia)
  const { data: balanceData } = useBalance({
    address: address,
  });

  const chainId = useChainId();
  const tokenAddresses = TOKENS[chainId] || TOKENS[1]; // Fallback to mainnet if unsupported testnet

  const { deposit, withdraw, isVaultTxPending: isVaultPending, allowance, freeBalance, approveToken, isApproving, refetchAll: refetchVaultState, isFuji } = useVault(tokenAddresses.USDC as Address);
  const { switchChain } = useSwitchChain();
  const { toast } = useToast();
  const {
    canClaim,
    amountPerClaim,
    cooldownRemaining,
    claim: claimFaucet,
    isPending: isFaucetPending,
    refetch: refetchFaucet,
    isSupportedChain: isFaucetAvailable,
  } = useFaucet(tokenAddresses.USDC as Address);

  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  const handleClaimFaucet = async () => {
    if (!isFaucetAvailable) {
      toast({ title: "Faucet Unavailable", description: "Switch to Avalanche Fuji to claim testnet tokens.", variant: "destructive" });
      return;
    }
    try {
      toast({ title: "Claiming USDC...", description: "Requesting testnet tokens from the smart contract." });
      await claimFaucet();
      toast({ title: "Faucet Claimed", description: `${amountPerClaim.toLocaleString()} USDC Testnet tokens have been minted to your wallet.` });
      refetchErc20();
      refetchVaultState();
      refetchFaucet();
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      toast({ title: "Claim Failed", description: msg, variant: "destructive" });
    }
  };

  const formatCooldown = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  };

  const handleAddTokenToWallet = async (asset: any) => {
    if (!asset.contractAddress) {
      toast({ title: "Not Available", description: "This is a native token or no contract address is set.", variant: "destructive" });
      return;
    }
    try {
      if (window.ethereum) {
        await (window.ethereum as any).request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: asset.contractAddress,
              symbol: asset.symbol,
              decimals: asset.decimals,
            },
          },
        });
        toast({ title: "Token Added", description: `${asset.symbol} was added to your Web3 wallet.` });
      } else {
        toast({ title: "Wallet Not Found", description: "Could not find an injected Web3 wallet to add the token to.", variant: "destructive" });
      }
    } catch (error) {
      console.error(error);
      toast({ title: "Failed", description: "Could not add token to wallet.", variant: "destructive" });
    }
  };

  // Fetch ERC20 balances in a single multicall
  const { data: erc20Balances, refetch: refetchErc20 } = useReadContracts({
    contracts: [
      {
        address: tokenAddresses.USDC as Address,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: [address as Address],
      },
      {
        address: tokenAddresses.USDC as Address,
        abi: ERC20_ABI,
        functionName: 'decimals',
      },
      {
        address: tokenAddresses.WBTC as Address,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: [address as Address],
      },
      {
        address: tokenAddresses.WBTC as Address,
        abi: ERC20_ABI,
        functionName: 'decimals',
      },
      {
        address: tokenAddresses.USDT as Address,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: [address as Address],
      },
      {
        address: tokenAddresses.USDT as Address,
        abi: ERC20_ABI,
        functionName: 'decimals',
      },
    ],
    query: {
      enabled: !!address,
    }
  });

  const [activeTab, setActiveTab] = useState<"assets" | "positions" | "lp">("assets");
  const isWrongChain = !isFuji;

  // Format real balances
  const nativeBalance = balanceData?.value ? Number(formatUnits(balanceData.value, balanceData.decimals || 18)) : 0;

  const usdcBalanceDecimals = erc20Balances?.[1]?.result as number | undefined ?? 6;
  const usdcBalanceRaw = (erc20Balances?.[0]?.result ?? 0n) as bigint;
  const usdcBalance = Number(formatUnits(usdcBalanceRaw, usdcBalanceDecimals));

  const wbtcBalanceDecimals = erc20Balances?.[3]?.result as number | undefined ?? 8;
  const wbtcBalanceRaw = (erc20Balances?.[2]?.result ?? 0n) as bigint;
  const wbtcBalance = Number(formatUnits(wbtcBalanceRaw, wbtcBalanceDecimals));

  const usdtBalanceDecimals = erc20Balances?.[5]?.result as number | undefined ?? 6;
  const usdtBalanceRaw = (erc20Balances?.[4]?.result ?? 0n) as bigint;
  const usdtBalance = Number(formatUnits(usdtBalanceRaw, usdtBalanceDecimals));

  // The user wants the Portfolio to strictly reflect their trading balance in the Vault, 
  // rather than the raw tokens sitting loosely in their Web3 wallet.
  const ASSETS = [
    {
      symbol: "USDC",
      name: "RetroPick Vault",
      balance: isConnected ? parseFloat(freeBalance.toFixed(4)) : 0,
      value: isConnected ? freeBalance : 0,
      change: "+0.0%",
      IconComp: UsdcLogo,
      price: 1.0,
      contractAddress: null,
      decimals: 6
    }
  ];

  // Calculate total balance from the Vault
  const totalBalance = isConnected ? freeBalance : 0;

  return (
    <div className="min-h-screen bg-background font-sans text-foreground pb-20 overflow-x-hidden">
      <Header />

      <main className="pt-40 px-6 lg:px-10 w-full max-w-[1400px] mx-auto">
        {/* Second Navbar - Network & Actions (when connected, connects to header) */}
        {isConnected && (
          <div className="mb-6 -mt-1">
            <div className="w-full bg-background/60 backdrop-blur-lg border border-border rounded-t-none rounded-b-2xl border-t-0 px-4 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
              <div className="flex border border-border rounded-lg p-1 bg-card">
                <button
                  onClick={() => switchChain?.({ chainId: FUJI_CHAIN_ID })}
                  className={cn("px-4 py-1.5 rounded-md text-xs font-bold transition-all", chainId === FUJI_CHAIN_ID ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-white")}
                >
                  Avalanche Fuji
                </button>
                <button
                  onClick={() => switchChain?.({ chainId: 11155111 })}
                  className={cn("px-4 py-1.5 rounded-md text-xs font-bold transition-all", chainId === 11155111 ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-white")}
                >
                  Ethereum Sepolia
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClaimFaucet}
                  disabled={isFaucetPending || !isConnected || !isFaucetAvailable || !canClaim}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 dark:text-emerald-400 hover:text-white rounded-lg font-bold text-xs transition-all border border-emerald-500/20",
                    (isFaucetPending || !isFaucetAvailable || !canClaim) && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Icon name="water_drop" className="text-xs" />
                  {isFaucetPending ? "Claiming..." : cooldownRemaining > 0 ? `Next in ${formatCooldown(cooldownRemaining)}` : `Claim ${amountPerClaim.toLocaleString()} USDC`}
                </button>
                <button
                  onClick={() => !isWrongChain && setIsDepositOpen(true)}
                  disabled={isWrongChain}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-xs transition-all shadow-sm",
                    isWrongChain && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Icon name="arrow_downward" className="text-xs" />
                  Deposit
                </button>
                <button
                  onClick={() => !isWrongChain && setIsWithdrawOpen(true)}
                  disabled={isWrongChain}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 text-slate-900 dark:text-white rounded-lg font-medium text-xs transition-all",
                    isWrongChain && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Icon name="arrow_upward" className="text-xs" />
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        )}
        {!isConnected ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="max-w-lg">
              <AuthPlaceholder
                title="Portfolio Locked"
                description="Connect wallet to view assets."
              />
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* 1. LEFT COLUMN: Balance & Lists */}
              <div className="lg:col-span-8 flex flex-col gap-5">

                {/* Balance Card (Compact) - Network & actions moved to second navbar */}
                <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-100 dark:border-white/5 flex flex-col gap-6">

                  {/* Wrong-chain banner */}
                  {isWrongChain && (
                    <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                      <p className="text-sm text-amber-700 dark:text-amber-400">
                        Switch to Avalanche Fuji to use Vault and Faucet.
                      </p>
                      <button
                        onClick={() => switchChain?.({ chainId: FUJI_CHAIN_ID })}
                        className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-all"
                      >
                        Switch to Fuji
                      </button>
                    </div>
                  )}

                  {/* Total Balance */}
                  <div className="flex flex-col gap-1">
                    <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Vault Balance ({chainId === FUJI_CHAIN_ID ? "Avalanche Fuji" : chainId === 11155111 ? "Sepolia" : "Wrong network"})</h2>
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-bold text-slate-900 dark:text-white pointer-events-none selection:bg-none">
                        {totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDC
                      </span>
                      {totalBalance > 0 && <span className="text-xs font-semibold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-md">Active</span>}
                    </div>
                    {totalBalance > 0 && (
                      <Link
                        to="/app"
                        className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition-all border border-emerald-600/50 hover:border-emerald-500 shadow-lg shadow-emerald-500/20"
                      >
                        <Icon name="trending_up" className="text-base" />
                        You are ready, Trade Now!
                      </Link>
                    )}
                  </div>
                </div>

                {/* Assets / Positions List (Compact) */}
                <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-100 dark:border-white/5 min-h-[360px]">
                  <div className="flex items-center gap-6 mb-4 border-b border-slate-200 dark:border-white/10 pb-1">
                    <button
                      onClick={() => setActiveTab('assets')}
                      className={cn(
                        "pb-2 text-xs font-bold transition-all relative uppercase tracking-wider",
                        activeTab === 'assets' ? "text-slate-900 dark:text-white" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      Assets
                      {activeTab === 'assets' && <motion.div layoutId="tabIndicator" className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-900 dark:bg-white" />}
                    </button>
                    <button
                      onClick={() => setActiveTab('positions')}
                      className={cn(
                        "pb-2 text-xs font-bold transition-all relative uppercase tracking-wider",
                        activeTab === 'positions' ? "text-slate-900 dark:text-white" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      Positions
                      {activeTab === 'positions' && <motion.div layoutId="tabIndicator" className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-900 dark:bg-white" />}
                    </button>
                    <button
                      onClick={() => setActiveTab('lp')}
                      className={cn(
                        "pb-2 text-xs font-bold transition-all relative uppercase tracking-wider",
                        activeTab === 'lp' ? "text-slate-900 dark:text-white" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      Posisi LP
                      {activeTab === 'lp' && <motion.div layoutId="tabIndicator" className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-900 dark:bg-white" />}
                    </button>
                  </div>

                  <div className="flex flex-col gap-2">
                    {activeTab === 'lp' ? (
                      <div className="flex flex-col gap-4 pt-2">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-card border border-border rounded-xl p-4">
                            <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Liquidity</div>
                            <div className="text-xl font-bold text-slate-900 dark:text-white">{totalBalance.toLocaleString()} USDC</div>
                            <div className="text-[10px] font-medium text-green-500 mt-1 flex items-center gap-1">
                              <span className="bg-green-500/10 px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wide">Active</span>
                              Vault Pool
                            </div>
                          </div>
                          <div className="bg-card border border-border rounded-xl p-4">
                            <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Estimated APY</div>
                            <div className="text-xl font-bold text-emerald-500">12.4%</div>
                            <div className="text-[10px] font-medium text-slate-400 mt-1">Based on 24H volume</div>
                          </div>
                        </div>
                        <div className="bg-card border border-border rounded-xl p-4">
                          <div className="flex justify-between items-center mb-3">
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Fees Earned</div>
                            <div className="text-xs font-bold text-green-500">+$24.50</div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-[10px] text-slate-500 flex justify-between">
                              <span>Trading Fees (Maker)</span>
                              <span className="text-slate-900 dark:text-white font-medium">$18.20</span>
                            </div>
                            <div className="text-[10px] text-slate-500 flex justify-between">
                              <span>Vault Rewards</span>
                              <span className="text-slate-900 dark:text-white font-medium">$6.30</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : activeTab === 'assets' ? (
                      ASSETS.map((asset) => (
                        <div key={asset.symbol} className="flex items-center justify-between p-3 bg-card border border-border rounded-xl hover:border-blue-500/20 transition-all group">
                          <div className="flex items-center gap-3">
                            <div className="size-8 filter drop-shadow-sm">
                              <asset.IconComp className="w-full h-full" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <div className="font-semibold text-sm text-slate-900 dark:text-white">{asset.name}</div>
                                {asset.contractAddress && (
                                  <button
                                    onClick={() => handleAddTokenToWallet(asset)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-500 dark:text-slate-300 text-[9px] px-1.5 py-0.5 rounded flex items-center gap-1 uppercase font-bold"
                                    title={`Add ${asset.symbol} to wallet`}
                                  >
                                    <Icon name="add" className="text-[10px]" />
                                    Wallet
                                  </button>
                                )}
                              </div>
                              <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">{asset.balance} {asset.symbol}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-sm text-slate-900 dark:text-white">${asset.value.toFixed(2)}</div>
                            <div className={cn("text-[10px] font-medium", asset.change.startsWith('+') ? "text-green-500" : "text-slate-400")}>
                              {asset.change}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      isPositionsLoading && realtimePositions.length === 0 ? (
                        <div className="text-center py-10 text-slate-500 font-medium text-sm">Loading positions...</div>
                      ) : realtimePositions.length > 0 ? (
                        realtimePositions.map((pos, i) => (
                          <PositionItem key={`${pos.id}-${i}`} pos={pos} />
                        ))
                      ) : (
                        <div className="text-center py-10 text-slate-500 font-medium text-sm">No active positions</div>
                      )
                    )}
                  </div>
                </div>

              </div>

              {/* 2. RIGHT COLUMN: Stats Grid (Compact) */}
              <div className="lg:col-span-4 grid grid-cols-2 gap-4 h-fit content-start">

                {/* Active Positions Stat */}
                <div
                  onClick={() => setActiveTab('positions')}
                  className={cn(
                    "bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5 cursor-pointer transition-all hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:border-blue-200 dark:hover:border-blue-500/20 group",
                    activeTab === 'positions' ? "ring-1 ring-blue-500 bg-blue-50 dark:bg-blue-900/10" : ""
                  )}
                >
                  <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Active</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">3</div>
                  <div className="text-[10px] font-medium text-blue-500 mt-0.5">$450 Value</div>
                </div>

                {/* Closed Value */}
                <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5">
                  <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Closed PnL</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">$12k</div>
                  <div className="text-[10px] font-medium text-green-500 mt-0.5">+$1,240</div>
                </div>

                {/* Biggest Win */}
                <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5">
                  <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Best Win</div>
                  <div className="text-2xl font-bold text-green-500">+$450</div>
                  <div className="text-[10px] font-medium text-slate-400 mt-0.5">Super Bowl</div>
                </div>

                {/* Predictions */}
                <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5">
                  <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Win Rate</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">68%</div>
                  <div className="text-[10px] font-medium text-purple-500 mt-0.5">124 Preds</div>
                </div>

              </div>

            </div>

            {/* Session Management section - shown when connected */}
            <div className="mt-8 space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                Session Management
                <span className="text-[10px] font-normal text-slate-400 ml-1">Whitepaper §6</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Checkpoint Signing */}
                <div className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Checkpoint Signing</div>
                      <div className="text-xs text-slate-500 mt-0.5">EIP-712 digest → relayer → ChannelSettlement</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                      <span className="text-purple-500 text-sm">✍️</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Vault Free Balance</span>
                      <span className="font-mono text-slate-900 dark:text-white">{freeBalance.toFixed(2)} USDC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Locked Balance</span>
                      <span className="font-mono text-yellow-500">{(totalBalance - freeBalance).toFixed(2)} USDC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Status</span>
                      <span className="text-green-500 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Session Active
                      </span>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-400 mt-3">
                    When checkpoint is ready, the relayer will request your signature. Sign the EIP-712 digest to commit state to chain.
                  </p>
                </div>

                {/* Exit + Dispute */}
                <div className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Exit &amp; Dispute</div>
                      <div className="text-xs text-slate-500 mt-0.5">Unilateral exit with latest signed state</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                      <span className="text-orange-500 text-sm">🛡️</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Challenge Window</span>
                      <span className="font-mono text-slate-900 dark:text-white">3600s (1 hour)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Settlement Contract</span>
                      <span className="font-mono text-slate-500 text-[10px]">
                        {`${CONTRACT_ADDRESSES.ChannelSettlement.slice(0, 6)}...${CONTRACT_ADDRESSES.ChannelSettlement.slice(-4)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Safety</span>
                      <span className="text-green-500">Non-custodial ✓</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-400 mt-3">
                    If the operator is unresponsive, you can force exit by submitting your latest signed state on-chain.
                    A challenge window ensures the newest valid state wins.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Transaction Modals */}
      <TransactionModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        type="deposit"
        balance={usdcBalance}
        symbol="USDC"
        isPending={isVaultPending || isApproving}
        onConfirm={async (amount) => {
          try {
            // Check allowance first
            if (allowance < Number(amount)) {
              toast({ title: "Approving USDC", description: "Please approve the Vault to transfer your tokens." });
              await approveToken(amount);
              toast({ title: "Approved", description: "Token approved. Please confirm the deposit transaction." });
            }
            toast({ title: "Depositing...", description: `Depositing ${amount} USDC into the Vault.` });
            await deposit(amount);
            toast({ title: "Deposit Successful", description: `${amount} USDC has been deposited.` });
            setIsDepositOpen(false);
            refetchErc20();
            refetchVaultState();
          } catch (error: any) {
            console.error(error);
            toast({ title: "Deposit Failed", description: error?.shortMessage || error.message, variant: "destructive" });
          }
        }}
      />

      {/* Note: Withdraw balance limit relies on the actual `freeBalance` from Vault in this case. */}
      <TransactionModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        type="withdraw"
        balance={freeBalance}
        symbol="USDC"
        isPending={isVaultPending}
        onConfirm={async (amount) => {
          try {
            toast({ title: "Withdrawing...", description: `Withdrawing ${amount} USDC from the Vault.` });
            await withdraw(amount);
            toast({ title: "Withdraw Successful", description: `${amount} USDC has been withdrawn to your wallet.` });
            setIsWithdrawOpen(false);
            refetchErc20();
            refetchVaultState();
          } catch (error: any) {
            console.error(error);
            toast({ title: "Withdraw Failed", description: error?.shortMessage || error.message, variant: "destructive" });
          }
        }}
      />

      <Footer />
    </div >
  );
};

export default Portfolio;
