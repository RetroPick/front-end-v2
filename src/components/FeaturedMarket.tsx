import { useState } from "react";
import { Link } from "react-router-dom";
import { Market } from "@/types/market";
import Icon from "./Icon";
import { useLanguage } from "@/context/LanguageContext";

import BetModal from "./BetModal";
import { AreaChart, Area, ResponsiveContainer, CartesianGrid, YAxis } from "recharts";

interface FeaturedMarketProps {
  market: Market;
}

const FeaturedMarket = ({ market }: FeaturedMarketProps) => {
  const { t } = useLanguage();
  const [betModal, setBetModal] = useState<{ open: boolean; side: 'YES' | 'NO'; outcome: string } | null>(null);

  const handleBet = (side: 'YES' | 'NO', outcomeLabel: string) => {
    setBetModal({ open: true, side, outcome: outcomeLabel });
  };

  return (
    <>
      <section className="mb-12">
        <div className="bg-card rounded-xl border border-border/50 overflow-hidden shadow-2xl relative group">
          {/* Glow Effect */}
          <div className="absolute -top-24 -right-24 size-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10">
            {/* Left: Market Info */}
            <div className="p-8 lg:p-10 flex flex-col border-r border-border/50">
              <div className="flex items-start gap-4 mb-6">
                <div className="size-10 rounded-lg bg-secondary flex items-center justify-center border border-border shrink-0">
                  <Icon name={market.icon} className="text-muted-foreground" />
                </div>
                <div>
                  <Link to={`/app/market/${market.id}`} className="hover:text-primary transition-colors">
                    <h1 className="text-2xl lg:text-3xl font-bold leading-tight tracking-tight mb-2">
                      {market.title}
                    </h1>
                  </Link>
                  <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    <span>{t('market_card.volume')}: {market.volume}</span>
                    <span>•</span>
                    <span>{t('market_card.ends')}: {market.expiry}</span>
                  </div>
                </div>
              </div>

              {/* Outcomes */}
              <div className="space-y-3 mb-8">
                {market.outcomes.map((outcome) => (
                  <div
                    key={outcome.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors border border-transparent hover:border-border group/row"
                  >
                    <span className="text-sm font-medium text-muted-foreground">
                      {outcome.label}
                    </span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold w-12 text-right text-accent-cyan">
                        {outcome.probability}%
                      </span>
                      <div className="flex rounded overflow-hidden border border-border">
                        <button
                          onClick={() => handleBet('YES', outcome.label)}
                          className="px-4 py-1.5 text-[11px] font-bold bg-accent-cyan/10 hover:bg-accent-cyan/20 text-accent-cyan transition-colors min-w-[50px]"
                        >
                          YES
                        </button>
                        <div className="w-px bg-border" />
                        <button
                          onClick={() => handleBet('NO', outcome.label)}
                          className="px-4 py-1.5 text-[11px] font-bold bg-accent-magenta/10 hover:bg-accent-magenta/20 text-accent-magenta transition-colors min-w-[50px]"
                        >
                          NO
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* News */}
              <div className="mt-auto border-t border-border/50 pt-6">
                <div className="flex items-start gap-3 text-sm">
                  <div className="shrink-0 mt-1 size-1.5 rounded-full bg-accent-cyan animate-pulse" />
                  <div>
                    <span className="font-bold text-xs uppercase tracking-wider mb-1 block">
                      {t('dashboard.news')}
                    </span>
                    <p className="text-muted-foreground leading-relaxed text-xs">
                      FOMC members remain divided on the pace of easing as recent inflation data shows mixed signals. Chairman Powell noted that the labor market remains the primary focus for the upcoming December meeting...
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Chart */}
            <div className="p-8 lg:p-10 bg-black/20 relative flex flex-col justify-center">
              {/* Legend */}
              <div className="flex flex-wrap gap-6 mb-8 text-[10px] font-bold uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-primary ring-2 ring-primary/20" />
                  <span className="text-muted-foreground">
                    Before Dec 15 <span className="text-foreground ml-1">48%</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-accent-green ring-2 ring-accent-green/20" />
                  <span className="text-muted-foreground">
                    Before Jan 1 <span className="text-foreground ml-1">32%</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-muted-foreground/50 ring-2 ring-muted/20" />
                  <span className="text-muted-foreground">
                    Historical <span className="text-foreground ml-1">24%</span>
                  </span>
                </div>
              </div>


              {/* Chart */}
              <div className="relative h-64 w-full pl-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={Array.from({ length: 20 }, (_, i) => ({
                      value: 40 + Math.random() * 20 + (i % 5) * 2, // Mock trend
                    }))}
                    margin={{ top: 0, right: 0, left: 10, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="featuredGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0EA5E9" stopOpacity={0.2} />
                        <stop offset="100%" stopColor="#0EA5E9" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" strokeOpacity={0.2} />
                    <YAxis
                      hide={false}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `${value}%`}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontFamily: 'monospace' }}
                      domain={[0, 100]}
                      width={30}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#0EA5E9"
                      strokeWidth={3}
                      fill="url(#featuredGradient)"
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* X-axis */}
              <div className="mt-4 ml-6 flex justify-between text-[10px] text-muted-foreground font-mono">
                <span>9:02am</span>
                <span>11:30am</span>
                <span>2:00pm</span>
                <span>4:30pm</span>
                <span>Live</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bet Modal */}
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

export default FeaturedMarket;
