import { Market } from "@/types/market";
import { cn } from "@/lib/utils";
import { useState, memo, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import BetModal from "./BetModal";
import { CryptoIcon } from "./CryptoIcon";
import { useLanguage } from "@/context/LanguageContext";

interface CryptoMarketCardProps {
    market: Market;
}

const CryptoMarketCard = memo(({ market }: CryptoMarketCardProps) => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [betModal, setBetModal] = useState<{ open: boolean; side: 'YES' | 'NO'; outcome: string } | null>(null);

    // Determine basic coin type to pass to CryptoIcon
    const coinType = market.title.includes("Bitcoin") || market.title.includes("BTC") ? "Bitcoin"
        : market.title.includes("Ethereum") || market.title.includes("ETH") ? "Ethereum"
            : market.title.includes("Solana") || market.title.includes("SOL") ? "Solana"
                : "General";

    const handleBetClick = (e: MouseEvent<HTMLButtonElement>, side: 'YES' | 'NO', outcomeLabel: string) => {
        e.stopPropagation();
        setBetModal({ open: true, side, outcome: outcomeLabel });
    };

    // Assumes largely binary markets (Yes/No) which is the standard for prediction markets
    const yesOutcome = market.outcomes.find(o => o.label.toLowerCase() === 'yes' || o.id === 'yes') || market.outcomes[0];
    const noOutcome = market.outcomes.find(o => o.label.toLowerCase() === 'no' || o.id === 'no') || market.outcomes[1];

    // Ensure we have valid fallback values
    const yesProb = Math.round(yesOutcome?.probability || 50);
    const noProb = Math.round(noOutcome?.probability || 50);

    return (
        <>
            <div
                onClick={() => navigate(`/app/market/${market.id}`)}
                className="group relative w-full flex flex-col justify-between p-4 sm:p-5 rounded-[12px] border border-slate-200 dark:border-[#2b2b2b] bg-white dark:bg-[#1a1b1e] hover:border-slate-300 dark:hover:border-[#404040] hover:bg-slate-50 dark:hover:bg-[#1e2025] transition-colors duration-200 cursor-pointer h-full min-h-[220px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] dark:shadow-none dark:hover:shadow-none"
            >

                {/* Top Section */}
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-start mb-1">
                        {/* Icon Container - Real Market Image */}
                        <div className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-200/50 dark:border-white/5 overflow-hidden bg-slate-50 dark:bg-black/20 shrink-0">
                            {market.image ? (
                                <img src={market.image} alt={market.title} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                            ) : (
                                <div className="p-2 w-full h-full">
                                    <CryptoIcon type={coinType} className="w-full h-full text-slate-700 dark:text-slate-300" />
                                </div>
                            )}
                        </div>

                        {/* Volume Indicator */}
                        <span className="text-[13px] font-medium text-slate-500 dark:text-slate-400 font-sans tracking-tight">
                            {market.volume} Vol
                        </span>
                    </div>

                    {/* Market Title */}
                    <h3 className="text-[16px] sm:text-[17px] font-semibold text-foreground leading-[1.3] line-clamp-3">
                        {market.title}
                    </h3>
                </div>

                {/* Bottom Section (Outcomes & Action) */}
                <div className="mt-5 flex flex-col gap-3">
                    {/* Probability split bar - ultra thin like Polymarket */}
                    <div className="w-full h-1.5 rounded-full flex overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <div className="bg-[#22c55e] transition-all duration-500" style={{ width: `${yesProb}%` }} />
                        <div className="bg-[#ef4444] transition-all duration-500" style={{ width: `${noProb}%` }} />
                    </div>

                    {/* Betting Buttons */}
                    <div className="grid grid-cols-2 gap-2 mt-1">
                        <button
                            onClick={(e) => handleBetClick(e, 'YES', yesOutcome?.label || 'Yes')}
                            className="flex items-center justify-between px-3 py-2.5 rounded-[8px] bg-[#e0f2fe] dark:bg-[#0284c7]/20 text-[#0284c7] dark:text-[#38bdf8] hover:bg-[#bae6fd] dark:hover:bg-[#0284c7]/30 transition-colors font-bold text-[14px]"
                        >
                            <span>Yes</span>
                            <span>{yesProb}¢</span>
                        </button>
                        <button
                            onClick={(e) => handleBetClick(e, 'NO', noOutcome?.label || 'No')}
                            className="flex items-center justify-between px-3 py-2.5 rounded-[8px] bg-[#fee2e2] dark:bg-[#ef4444]/15 text-[#dc2626] dark:text-[#f87171] hover:bg-[#fecaca] dark:hover:bg-[#ef4444]/25 transition-colors font-bold text-[14px]"
                        >
                            <span>No</span>
                            <span>{noProb}¢</span>
                        </button>
                    </div>
                </div>
            </div>

            {betModal && (
                <BetModal
                    open={betModal.open}
                    onClose={() => setBetModal(null)}
                    marketTitle={market.title}
                    outcome={betModal.outcome}
                    side={betModal.side}
                    price={0.5}
                />
            )}
        </>
    );
});

export default CryptoMarketCard;
