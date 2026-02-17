import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Market } from "@/types/market";
import Icon from "./Icon";
import BetModal from "./BetModal";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface MarketCardProps {
  market: Market;
}

const MarketCard = ({ market }: MarketCardProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [betModal, setBetModal] = useState<{ open: boolean; side: 'YES' | 'NO'; outcome: string } | null>(null);

  const handleBet = (e: React.MouseEvent, side: 'YES' | 'NO', outcomeLabel: string) => {
    e.stopPropagation();
    setBetModal({ open: true, side, outcome: outcomeLabel });
  };

  const handleCardClick = () => {
    navigate(`/app/market/${market.id}`);
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="group relative flex flex-col w-full bg-card/60 backdrop-blur-md rounded-3xl border border-black/10 dark:border-white/5 overflow-hidden shadow-sm shadow-black/10 dark:shadow-none hover:border-black/20 dark:hover:border-white/10 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
      >
        {/* Image Header with Gradient Overlay */}
        <div className="relative h-48 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
          {market.image ? (
            <img
              src={market.image}
              alt={market.title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full bg-secondary/50 flex items-center justify-center">
              <Icon name={market.icon} className="text-6xl text-muted-foreground/20" />
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-20">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
              <Icon name={market.icon} className={cn("text-xs", market.iconColor || "text-foreground")} />
              <span className="text-[10px] font-medium tracking-wide uppercase text-white/90">
                {t(`categories.${market.category.toLowerCase()}` as any)}
              </span>
            </div>
          </div>

          {/* Volume Badge */}
          <div className="absolute top-4 right-4 z-20">
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
              <Icon name="attach_money" className="text-[10px] text-accent-green" />
              <span className="text-[10px] font-mono text-white/90">{t('market_card.volume')}: {market.volume}</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 p-5 -mt-12 relative z-20">
          {/* Title & Description */}
          <div className="mb-6">
            <h3 className="text-lg font-bold leading-tight text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {market.title}
            </h3>
            {market.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                {market.description}
              </p>
            )}
          </div>

          {/* Outcomes / Interaction */}
          <div className="mt-auto space-y-3">
            {market.isBinary ? (
              <div className="grid grid-cols-2 gap-3">
                {market.outcomes.map((outcome) => {
                  const isYes = outcome.label === 'Yes';
                  const colorClass = isYes ? 'text-accent-green' : 'text-primary';
                  const bgHoverClass = isYes ? 'hover:bg-accent-green/10 hover:border-accent-green/30' : 'hover:bg-primary/10 hover:border-primary/30';

                  return (
                    <button
                      key={outcome.id}
                      onClick={(e) => handleBet(e, isYes ? 'YES' : 'NO', outcome.label)}
                      className={cn(
                        "relative overflow-hidden rounded-xl border border-white/5 bg-white/5 py-3 px-4 transition-all duration-300 group/btn",
                        bgHoverClass
                      )}
                    >
                      <div className="flex flex-col items-center gap-1 z-10 relative">
                        <span className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground group-hover/btn:text-white transition-colors">
                          {outcome.label}
                        </span>
                        <span className={cn("text-xl font-black tracking-tight", colorClass)}>
                          {outcome.probability}%
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-2">
                {market.outcomes.slice(0, 3).map((outcome) => (
                  <div key={outcome.id} className="group/row flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-8 rounded-full bg-white/10 group-hover/row:bg-primary transition-colors" />
                      <span className="text-sm font-medium text-muted-foreground group-hover/row:text-white transition-colors">
                        {outcome.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-white">{outcome.probability}%</span>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => handleBet(e, 'YES', outcome.label)}
                          className="px-3 py-1.5 text-[10px] font-bold rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all transform hover:scale-105"
                        >
                          YES
                        </button>
                        <button
                          onClick={(e) => handleBet(e, 'NO', outcome.label)}
                          className="px-3 py-1.5 text-[10px] font-bold rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all transform hover:scale-105"
                        >
                          NO
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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

export default MarketCard;
