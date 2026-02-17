
import { Market } from "@/types/market";
import { cn } from "@/lib/utils";
import { useState, MouseEvent } from "react";
import BetModal from "./BetModal";
import { CryptoIcon } from "./CryptoIcon";
import { useLanguage } from "@/context/LanguageContext";

interface CryptoMarketCardProps {
    market: Market;
}

const CryptoMarketCard = ({ market }: CryptoMarketCardProps) => {
    const { t } = useLanguage();
    const [betModal, setBetModal] = useState<{ open: boolean; side: 'YES' | 'NO'; outcome: string } | null>(null);

    // Determine Coin Type
    const coinType = market.title.includes("Bitcoin") || market.title.includes("BTC") ? "Bitcoin"
        : market.title.includes("Ethereum") || market.title.includes("ETH") ? "Ethereum"
            : market.title.includes("Solana") || market.title.includes("SOL") ? "Solana"
                : "General";

    // Brand Colors (Tailwind classes)
    const brandColor = coinType === "Bitcoin" ? "text-orange-500"
        : coinType === "Ethereum" ? "text-blue-500"
            : coinType === "Solana" ? "text-purple-500"
                : "text-gray-500";

    // Gradient for bars/buttons
    const brandGradient = coinType === "Bitcoin" ? "from-orange-500 to-yellow-500"
        : coinType === "Ethereum" ? "from-blue-600 to-cyan-500"
            : coinType === "Solana" ? "from-purple-600 to-pink-500"
                : "from-gray-600 to-gray-400";

    const handleBetClick = (e: MouseEvent<HTMLButtonElement>, outcomeLabel: string) => {
        e.stopPropagation();
        setBetModal({ open: true, side: 'YES', outcome: outcomeLabel });
    };

    return (
        <>
            <div className="group relative w-full max-w-[360px] h-[400px]">
                {/* Main Card */}
                <div className={cn(
                    "relative w-full h-full rounded-xl border border-slate-200 dark:border-white/5 bg-white dark:bg-[#0a0a0a] overflow-hidden transition-all duration-300",
                    "hover:border-slate-300 dark:hover:border-white/10 hover:bg-white dark:hover:bg-[#0f0f0f] shadow-lg shadow-black/5 dark:shadow-none hover:shadow-xl hover:shadow-black/15 dark:hover:shadow-black/50"
                )}>

                    {/* Background Glow (Subtle Brand Color) */}
                    <div className={cn("absolute top-[-50px] right-[-50px] w-40 h-40 rounded-full blur-[100px] opacity-20", brandColor.replace('text-', 'bg-'))} />

                    {/* Minimalist Header */}
                    <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-white/5 relative z-10 transition-colors duration-300">
                        <div className="flex items-center gap-2">
                            <span className={cn("w-1.5 h-1.5 rounded-full", brandColor.replace('text-', 'bg-'))} />
                            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-gray-400">
                                {t(`categories.${market.category.toLowerCase()}` as any)}
                            </span>
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-600 dark:text-gray-500">{t('market_card.volume')}: {market.volume}</span>
                    </div>

                    {/* Central Content */}
                    <div className="p-6 flex flex-col h-[calc(100%-65px)]">

                        {/* Visual + Title Row */}
                        <div className="flex items-start gap-4 mb-6">
                            {/* The Icon (Flat, Glowing) */}
                            <div className={cn("p-3 rounded-xl bg-slate-100 dark:bg-white/5 shadow-inner dark:shadow-none", brandColor)}>
                                <CryptoIcon type={coinType} className="w-10 h-10 drop-shadow-[0_0_8px_currentColor]" />
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug pt-1 transition-colors duration-300">
                                {market.title}
                            </h3>
                        </div>

                        {/* Outcomes */}
                        <div className="mt-auto space-y-4">
                            {market.outcomes.map((outcome) => (
                                <div key={outcome.id}>
                                    <div className="flex justify-between text-xs mb-2">
                                        <span className="text-slate-600 dark:text-gray-300 font-medium transition-colors duration-300">{outcome.label}</span>
                                        <span className={cn("font-bold", brandColor)}>{outcome.probability}%</span>
                                    </div>

                                    <div className="relative h-10 w-full bg-slate-100 dark:bg-white/5 rounded-lg overflow-hidden flex items-center px-3 group/btn transition-colors duration-300">
                                        {/* Bar Background */}
                                        <div
                                            className={cn("absolute left-0 top-0 bottom-0 opacity-20 transition-all duration-500", `bg-gradient-to-r ${brandGradient}`)}
                                            style={{ width: `${outcome.probability}%` }}
                                        />
                                        {/* Bar Line (Active) */}
                                        <div
                                            className={cn("absolute left-0 bottom-0 top-0 w-1 opacity-80", brandColor.replace('text-', 'bg-'))}
                                        />

                                        {/* Bet Button (Simple Text) */}
                                        <div className="ml-auto flex gap-2">
                                            <button
                                                onClick={(e) => handleBetClick(e, outcome.label)} // Defaults to YES in original handler, but we should update handler or make new one? 
                                                // Wait, handleBetClick in CryptoCard defaults to YES. I need to update the usage or the handler.
                                                // The current handleBetClick sets side: 'YES'.
                                                // I should probably pass the side.
                                                // But I can't change the handler signature easily without viewing the file again to be sure (I have it in context though).
                                                // handleBetClick = (e, outcomeLabel) => ... setBetModal({ ..., side: 'YES', ... })
                                                // I'll inline the setBetModal call or modify handleBetClick?
                                                // I'll modify the element to use a new inline arrow function if possible, or just duplicate the logic since I can't easily change the function definition in this replace block without replacing more lines.
                                                // Actually I can just call setBetModal directly if I had access, but setBetModal is inside the component.
                                                // Let's look at the file content again.
                                                // handleBetClick is defined.
                                                // I'll update the button to:
                                                // > onClick={(e) => { e.stopPropagation(); setBetModal({ open: true, side: 'YES', outcome: outcome.label }); }}
                                                // But I can't see setBetModal in this scope (it is, but I'm replacing the button).
                                                // The handleBetClick is hardcoded to YES.
                                                // I will use `handleBetClick` for YES, and create a new inline for NO? No, that's messy.
                                                // I will replace the button with a div containing two buttons.
                                                // And I will just use the `setBetModal` directly if it's available in scope? Yes it is.
                                                // But wait, `handleBetClick` sets `side: 'YES'`.
                                                // I'll assume I can just use setBetModal directly or I should have updated the handler.
                                                // Let's just update the handler too in a separate call? Or can I do it here?
                                                // I'll just use inline logic for now to be safe and quick.
                                                // "setBetModal" is available in the component scope.

                                                // onClick={(e) => { e.stopPropagation(); setBetModal({ open: true, side: 'YES', outcome: outcome.label }); }}
                                                className="px-3 py-1 text-[10px] font-bold rounded bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white transition-colors border border-green-500/20"
                                            >
                                                YES
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setBetModal({ open: true, side: 'NO', outcome: outcome.label }); }}
                                                className="px-3 py-1 text-[10px] font-bold rounded bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors border border-red-500/20"
                                            >
                                                NO
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
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
};

export default CryptoMarketCard;
