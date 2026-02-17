import { useState } from "react";
import Icon from "@/components/Icon";
import { sampleActivities } from "@/data/markets";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface TradingSidebarProps {
  marketTitle: string;
  onBet: (side: 'YES' | 'NO', outcome: string) => void;
  selectedOutcome?: string;
}

// --- Authentic Crypto Icons (SVGs) ---
const SolanaLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 396 311" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <linearGradient id="solana_grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#9945FF" />
      <stop offset="100%" stopColor="#14F195" />
    </linearGradient>
    <path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7zm260.1-164.8c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h309.1c5.8 0 8.7-7 4.6-11.1l-62.7-62.7zM64.6 3.8C67 1.4 70.3 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z" fill="url(#solana_grad)" />
  </svg>
);

const UsdcLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#2775CA" />
    <path d="M12.75 15.66c-0.66 0.16-1.42 0.31-2.17 0.08 -1.27-0.39-1.85-1.57-1.63-2.67 0.22-1.08 1.15-1.66 2.05-1.89 1.41-0.36 2.45-1.69 2.06-2.92 -0.42-1.33-1.63-1.87-2.64-1.67 -0.47 0.09-0.91 0.25-1.31 0.46V6h-1.5v1.23c-0.29 0.14-0.56 0.3-0.81 0.5l0.91 1.25c0.66-0.52 1.4-0.78 2.15-0.93 1.12-0.22 1.63 0.65 1.83 1.27 0.2 0.63-0.07 1.34-0.9 1.55 -1.41 0.36-2.45 1.69-2.06 2.92 0.42 1.33 1.63 1.87 2.64 1.67 0.47-0.09 0.91-0.24 1.31-0.46V18h1.5v-1.24c0.29-0.14 0.56-0.3 0.81-0.5l-0.91-1.25C13.62 15.39 13.21 15.54 12.75 15.66z" fill="white" />
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

const TOKENS = [
  { symbol: "SOL", name: "Solana", Icon: SolanaLogo, balance: 14.24 },
  { symbol: "USDC", name: "USD Coin", Icon: UsdcLogo, balance: 1000.00 },
  { symbol: "USDT", name: "Tether", Icon: UsdtLogo, balance: 50.00 },
];

const TradingSidebar = ({ marketTitle, onBet, selectedOutcome = "Leading Candidate" }: TradingSidebarProps) => {
  const [side, setSide] = useState<'YES' | 'NO'>('YES');
  const [amount, setAmount] = useState(0.65);
  const [selectedToken, setSelectedToken] = useState(TOKENS[0]); // Default SOL
  const [isTokenDropdownOpen, setIsTokenDropdownOpen] = useState(false);

  const price = side === 'YES' ? 0.51 : 0.49;
  const shares = amount / price;
  const potentialWin = shares * 1; // Assuming outcome pays out 1 unit per share
  const profit = potentialWin - amount;
  const profitPercent = amount > 0 ? ((profit / amount) * 100).toFixed(1) : "0.0";

  const isYes = side === 'YES';

  const adjustAmount = (delta: number) => {
    const newAmount = Math.max(0, amount + delta);
    setAmount(parseFloat(newAmount.toFixed(selectedToken.symbol === 'SOL' ? 4 : 2)));
  };

  return (
    <div className="space-y-4">
      {/* Trading Panel */}
      <div className="bg-white dark:bg-[#1a1b23] border border-border/50 rounded-2xl p-5 shadow-sm relative z-50">
        {/* Outcome Selector */}
        <div className="mb-4">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Selected Outcome</label>
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-[#2a2b35] rounded-xl border border-border/50">
            <span className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[200px]">
              {selectedOutcome}
            </span>
            <Icon name="expand_more" className="text-slate-400" />
          </div>
        </div>

        {/* YES/NO Toggle */}
        <div className="flex rounded-xl overflow-hidden border border-border/50 mb-5 bg-slate-50 dark:bg-[#2a2b35] p-1">
          <button
            onClick={() => setSide('YES')}
            className={cn(
              "flex-1 py-3 text-sm font-bold transition-all rounded-lg",
              isYes
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            )}
          >
            YES
          </button>
          <button
            onClick={() => setSide('NO')}
            className={cn(
              "flex-1 py-3 text-sm font-bold transition-all rounded-lg",
              !isYes
                ? "bg-rose-500 text-white shadow-md shadow-rose-500/25"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            )}
          >
            NO
          </button>
        </div>

        {/* Price Display */}
        <div className="text-sm text-slate-500 dark:text-slate-400 mb-4 px-1">
          Buying <span className={cn("font-bold", isYes ? "text-blue-600 dark:text-blue-400" : "text-rose-500 dark:text-rose-400")}>{side}</span> at{' '}
          <span className="text-slate-900 dark:text-white font-bold">{price.toFixed(2)} {selectedToken.symbol}</span>
        </div>

        {/* Balance Display */}
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs text-slate-500 dark:text-slate-400">Available Balance</span>
          <span className="text-xs font-mono text-slate-700 dark:text-slate-300 font-medium">
            {selectedToken.balance} {selectedToken.symbol}
          </span>
        </div>

        {/* Amount Input with Token Selector */}
        <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-[#22232e] rounded-xl border border-border/30 mb-4 relative z-40">
          <button
            onClick={() => adjustAmount(selectedToken.symbol === 'SOL' ? -0.1 : -1)}
            className="size-9 rounded-lg bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 flex items-center justify-center transition-colors border border-border/30 shadow-sm"
          >
            <Icon name="remove" className="text-slate-400" />
          </button>

          <div className="flex-1 flex flex-col items-center justify-center">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
              className="w-full bg-transparent text-center text-xl font-bold font-mono text-slate-900 dark:text-white focus:outline-none p-0 no-spinner"
              step={selectedToken.symbol === 'SOL' ? "0.01" : "1"}
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setIsTokenDropdownOpen(!isTokenDropdownOpen)}
              className="flex items-center gap-2 bg-white dark:bg-white/5 border border-border/30 rounded-lg px-2 py-1.5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            >
              <selectedToken.Icon className="w-5 h-5" />
              <span className="font-bold text-sm text-slate-900 dark:text-white">{selectedToken.symbol}</span>
              <Icon name="expand_more" className="text-slate-400 text-sm" />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isTokenDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#2a2b35] rounded-xl shadow-xl border border-border/50 overflow-hidden py-1 z-[60]"
                >
                  <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Select Token</div>
                  {TOKENS.map((token) => (
                    <button
                      key={token.symbol}
                      onClick={() => {
                        setSelectedToken(token);
                        setIsTokenDropdownOpen(false);
                        setAmount(token.symbol === 'SOL' ? 0.65 : 10);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-left"
                    >
                      <token.Icon className="w-5 h-5" />
                      <div>
                        <div className="text-sm font-bold text-slate-700 dark:text-slate-200">{token.symbol}</div>
                        <div className="text-[10px] text-slate-400">{token.balance}</div>
                      </div>
                      {selectedToken.symbol === token.symbol && (
                        <Icon name="check" className="ml-auto text-blue-500 text-xs" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => adjustAmount(selectedToken.symbol === 'SOL' ? 0.1 : 1)}
            className="size-9 rounded-lg bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 flex items-center justify-center transition-colors border border-border/30 shadow-sm"
          >
            <Icon name="add" className="text-slate-400" />
          </button>
        </div>

        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[0.25, 0.5, 0.75, 1].map((ratio) => (
            <button
              key={ratio}
              onClick={() => setAmount(parseFloat((selectedToken.balance * ratio).toFixed(selectedToken.symbol === 'SOL' ? 4 : 2)))}
              className="py-1.5 rounded-lg text-[10px] font-bold bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-white/10"
            >
              {ratio * 100}%
            </button>
          ))}
        </div>

        {/* Target Price Link */}
        <div className="flex justify-center mb-5">
          <button className="text-xs text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1 font-medium">
            <Icon name="tune" className="text-sm" />
            Set Limit Order
          </button>
        </div>

        {/* Win Info */}
        <div className="p-4 bg-slate-50 dark:bg-[#22232e] border border-border/50 rounded-xl mb-5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-slate-500 dark:text-slate-400">To Win:</span>
            <span className={cn("text-xl font-bold font-mono", isYes ? "text-blue-600 dark:text-blue-400" : "text-rose-500 dark:text-rose-400")}>
              {profit.toFixed(2)} {selectedToken.symbol}
            </span>
          </div>
          <div className="text-right text-xs text-green-500 dark:text-green-400 font-medium">+{profitPercent}% Profit</div>
        </div>

        {/* Buy Button */}
        <button
          onClick={() => onBet(side, selectedOutcome)}
          className={cn(
            "w-full py-4 rounded-xl text-sm font-bold transition-all shadow-lg relative overflow-hidden group",
            isYes
              ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20"
              : "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20"
          )}
        >
          <span className="relative z-10">Buy {side}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:animate-shimmer" />
        </button>

        <div className="mt-3 text-center text-[10px] text-slate-400">
          Est. Network Fee 0.00005 {selectedToken.symbol}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-[#1a1b23] border border-border/50 rounded-2xl p-5 shadow-sm">
        <h4 className="text-sm font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
          <div className="size-2 rounded-full bg-green-500 animate-pulse" />
          Recent Activity
        </h4>
        <div className="space-y-4">
          {sampleActivities.slice(0, 3).map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <span className={cn(
                  "text-xs font-medium px-2 py-0.5 rounded",
                  activity.action === 'Bought'
                    ? "bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400"
                    : "bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400"
                )}>
                  {activity.action} {activity.side}
                </span>
                <span className="text-slate-600 dark:text-slate-400 text-xs truncate max-w-[80px]">{activity.outcome}</span>
              </div>
              <div className="text-right">
                <div className="font-bold font-mono text-xs text-slate-900 dark:text-white">{activity.amount}</div>
                <div className="text-[10px] text-slate-400">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TradingSidebar;
