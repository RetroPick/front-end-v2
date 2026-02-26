import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import { cn } from "@/lib/utils";
import { useAppKitAccount } from "@reown/appkit/react";
import { useAccount, useBalance, useReadContracts, useWriteContract, useChainId } from "wagmi";
import { formatUnits, parseUnits, Address } from "viem";
import AuthPlaceholder from "@/components/common/AuthPlaceholder";
import { ERC20_ABI, TOKENS } from "@/constants/tokens";
import { useExecutionLedger } from "@/hooks/useExecutionLedger";
import { useVault } from "@/hooks/useVault";

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
  { symbol: "ETH", name: "Ethereum Sepolia", balance: 2.50, value: 8625.0, change: "+2.1%", IconComp: EthLogo, price: 3450.00 },
  { symbol: "USDC", name: "USD Coin (Testnet)", balance: 300.00, value: 300.00, change: "0.0%", IconComp: UsdcLogo, price: 1.0 },
  { symbol: "USDT", name: "Tether (Testnet)", balance: 150.00, value: 150.00, change: "0.0%", IconComp: UsdtLogo, price: 1.0 },
  { symbol: "BTC", name: "Bitcoin", balance: 0.0042, value: 210.0, change: "+0.5%", IconComp: BtcLogo, price: 50000.00 },
];

const MOCK_ASSETS_AVALANCHE = [
  { symbol: "AVAX", name: "Avalanche Fuji", balance: 45.20, value: 1808.0, change: "+5.4%", IconComp: AvaxLogo, price: 40.0 },
  { symbol: "USDC", name: "USD Coin (Testnet)", balance: 1250.00, value: 1250.00, change: "0.0%", IconComp: UsdcLogo, price: 1.0 },
  { symbol: "BTC.b", name: "Wrapped BTC", balance: 0.015, value: 750.0, change: "+1.2%", IconComp: BtcLogo, price: 50000.00 },
];


const POSITIONS = [
  { id: 1, market: "BTC > $100k", type: "Yes", amount: 200, pnl: "+$40", pnlPercent: "+20%", status: "Active", expiry: "Mar 31" },
  { id: 2, market: "Lakers Win", type: "No", amount: 50, pnl: "-$2.5", pnlPercent: "-5%", status: "Active", expiry: "Jun 15" },
  { id: 3, market: "Fed Cut Rates", type: "Yes", amount: 100, pnl: "$0", pnlPercent: "0%", status: "Open", expiry: "May 01" },
];

function PositionItem({ pos }: { pos: typeof POSITIONS[0] }) {
  const outcomeIndex = pos.type === "Yes" ? 0 : 1;
  const { position, isLoading } = useExecutionLedger(pos.id, outcomeIndex);

  // Jika contract mengembalikan posisi aktual > 0, gunakan itu. Jika tidak, gunakan dummy amount
  const displayAmount = position > 0 ? position : pos.amount;

  return (
    <div className="flex items-center justify-between p-3 bg-white dark:bg-[#1a1b23] border border-slate-100 dark:border-white/5 rounded-xl hover:border-blue-500/20 transition-all group">
      <div className="flex items-center gap-3">
        <div className="size-8 rounded-lg bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 font-bold text-xs border border-slate-200 dark:border-white/10">
          {pos.type}
        </div>
        <div>
          <div className="font-semibold text-sm text-slate-900 dark:text-white truncate max-w-[150px]">{pos.market}</div>
          <div className="text-[10px] font-medium text-slate-400">Exp: {pos.expiry}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-semibold text-sm text-slate-900 dark:text-white">
          {isLoading ? "..." : `$${displayAmount}`}
        </div>
        <div className={cn("text-[10px] font-medium", pos.pnl.startsWith('+') ? "text-green-500" : "text-slate-400")}>
          {pos.pnl}
        </div>
      </div>
    </div>
  );
}

const Portfolio = () => {
  const { isConnected } = useAppKitAccount();
  const { address } = useAccount();

  // Fetch native balance (ETH on mainnet/sepolia)
  const { data: balanceData } = useBalance({
    address: address,
  });

  const chainId = useChainId();
  const tokenAddresses = TOKENS[chainId] || TOKENS[1]; // Fallback to mainnet if unsupported testnet

  const { deposit, withdraw, isVaultTxPending: isVaultPending } = useVault(tokenAddresses.USDC as Address);

  // Faucet Setup
  const { writeContractAsync: mintUsdc, isPending: isMinting } = useWriteContract();

  const handleClaimFaucet = async () => {
    if (!address) return;
    try {
      await (mintUsdc as any)({
        address: tokenAddresses.USDC as Address,
        abi: ERC20_ABI,
        functionName: 'mint',
        args: [address, parseUnits("1000", 6)] // Mint 1000 USDC Faucet
      });
    } catch (error) {
      console.error("Mint failed:", error);
    }
  };

  // Fetch ERC20 balances in a single multicall
  const { data: erc20Balances } = useReadContracts({
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

  const [activeTab, setActiveTab] = useState<"assets" | "positions">("assets");
  const [network, setNetwork] = useState<"Avalanche" | "Sepolia">("Avalanche");

  // Format real balances
  const nativeBalance = balanceData?.value ? Number(formatUnits(balanceData.value, balanceData.decimals || 18)) : 0;

  const usdcBalanceDecimals = erc20Balances?.[1].result as number | undefined ?? 6;
  const usdcBalanceRaw = erc20Balances?.[0].result as bigint | undefined ?? 0n;
  const usdcBalance = Number(formatUnits(usdcBalanceRaw, usdcBalanceDecimals));

  const wbtcBalanceDecimals = erc20Balances?.[3].result as number | undefined ?? 8;
  const wbtcBalanceRaw = erc20Balances?.[2].result as bigint | undefined ?? 0n;
  const wbtcBalance = Number(formatUnits(wbtcBalanceRaw, wbtcBalanceDecimals));

  const usdtBalanceDecimals = erc20Balances?.[5].result as number | undefined ?? 6;
  const usdtBalanceRaw = erc20Balances?.[4].result as bigint | undefined ?? 0n;
  const usdtBalance = Number(formatUnits(usdtBalanceRaw, usdtBalanceDecimals));

  // Determine current native token symbol
  const nativeSymbol = chainId === 43113 || chainId === 43114 ? "AVAX" : "ETH";
  const NativeIcon = chainId === 43113 || chainId === 43114 ? AvaxLogo : EthLogo;

  // Build Real Assets Array
  const REAL_ASSETS = [
    { symbol: nativeSymbol, name: nativeSymbol === "AVAX" ? "Avalanche" : "Ethereum", balance: nativeBalance, value: nativeBalance * (nativeSymbol === "AVAX" ? 40 : 3450), change: "+0.0%", IconComp: NativeIcon, price: nativeSymbol === "AVAX" ? 40 : 3450 },
    { symbol: "USDC", name: "USD Coin", balance: usdcBalance, value: usdcBalance * 1.0, change: "0.0%", IconComp: UsdcLogo, price: 1.0 },
    { symbol: "USDT", name: "Tether", balance: usdtBalance, value: usdtBalance * 1.0, change: "0.0%", IconComp: UsdtLogo, price: 1.0 },
    { symbol: "WBTC", name: "Wrapped BTC", balance: wbtcBalance, value: wbtcBalance * 50000.0, change: "+0.0%", IconComp: BtcLogo, price: 50000.0 },
  ];

  // For static frontend offline preview override, keep mock data logic, but we default to REAL_ASSETS now if balances > 0 or wallet is connected
  const isUsingRealData = isConnected || (nativeBalance > 0 || usdcBalance > 0);

  const activeMockAssets = network === "Avalanche" ? MOCK_ASSETS_AVALANCHE : MOCK_ASSETS_SEPOLIA;

  const ASSETS_SOURCE = isUsingRealData ? REAL_ASSETS : activeMockAssets;

  const ASSETS = ASSETS_SOURCE.map((asset) => {
    return {
      ...asset,
      balance: parseFloat(asset.balance.toFixed(4)),
      value: asset.balance * asset.price
    };
  });

  // Calculate total balance from all assets
  const totalBalance = ASSETS.reduce((sum, asset) => sum + asset.value, 0);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground pb-20 overflow-x-hidden">
      <Header />

      <main className="pt-24 px-6 lg:px-10 w-full max-w-[1400px]">
        {!isConnected ? (
          <div className="mt-10 max-w-lg">
            <AuthPlaceholder
              title="Portfolio Locked"
              description="Connect wallet to view assets."
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* 1. LEFT COLUMN: Balance & Lists */}
            <div className="lg:col-span-8 flex flex-col gap-5">

              {/* Network Selector & Balance Card (Compact) */}
              <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-100 dark:border-white/5 flex flex-col gap-6">

                {/* Top: Network Control & Action buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex border border-slate-200 dark:border-white/10 rounded-lg p-1 bg-white dark:bg-[#1a1b23]">
                    <button
                      onClick={() => setNetwork("Avalanche")}
                      className={cn("px-4 py-1.5 rounded-md text-xs font-bold transition-all", network === "Avalanche" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-white")}
                    >
                      Avalanche Fuji
                    </button>
                    <button
                      onClick={() => setNetwork("Sepolia")}
                      className={cn("px-4 py-1.5 rounded-md text-xs font-bold transition-all", network === "Sepolia" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-white")}
                    >
                      Ethereum Sepolia
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleClaimFaucet}
                      disabled={isMinting || !isConnected}
                      className={cn(
                        "flex items-center gap-1.5 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 dark:text-emerald-400 hover:text-white rounded-lg font-bold text-xs transition-all border border-emerald-500/20",
                        isMinting && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <Icon name="water_drop" className="text-xs" />
                      {isMinting ? "Claiming..." : "Claim Faucet"}
                    </button>
                    <button
                      onClick={() => deposit("10")} // Prototype fixed amount
                      disabled={isVaultPending}
                      className={cn(
                        "flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-xs transition-all shadow-sm",
                        isVaultPending && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <Icon name="arrow_downward" className="text-xs" />
                      Deposit 10 USDC
                    </button>
                    <button
                      onClick={() => withdraw("10")} // Prototype fixed amount
                      disabled={isVaultPending}
                      className={cn(
                        "flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 text-slate-900 dark:text-white rounded-lg font-medium text-xs transition-all",
                        isVaultPending && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <Icon name="arrow_upward" className="text-xs" />
                      Withdraw 10 USDC
                    </button>
                  </div>
                </div>

                {/* Bottom: Total Balance */}
                <div className="flex flex-col gap-1">
                  <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Total Balance ({network})</h2>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-slate-900 dark:text-white pointer-events-none selection:bg-none">
                      {totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDC
                    </span>
                    <span className="text-xs font-semibold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-md">+12.4%</span>
                  </div>
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
                </div>

                <div className="flex flex-col gap-2">
                  {activeTab === 'assets' ? (
                    ASSETS.map((asset) => (
                      <div key={asset.symbol} className="flex items-center justify-between p-3 bg-white dark:bg-[#1a1b23] border border-slate-100 dark:border-white/5 rounded-xl hover:border-blue-500/20 transition-all group">
                        <div className="flex items-center gap-3">
                          <div className="size-8 filter drop-shadow-sm">
                            <asset.IconComp className="w-full h-full" />
                          </div>
                          <div>
                            <div className="font-semibold text-sm text-slate-900 dark:text-white">{asset.name}</div>
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
                    POSITIONS.map((pos) => (
                      <PositionItem key={pos.id} pos={pos} />
                    ))
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
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
