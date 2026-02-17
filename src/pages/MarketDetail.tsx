import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import BetModal from "@/components/BetModal";
import OutcomesTable from "@/components/market/OutcomesTable";
import MarketInsights from "@/components/market/MarketInsights";
import MarketRules from "@/components/market/MarketRules";
import ResolutionSource from "@/components/market/ResolutionSource";
import TimelineSection from "@/components/market/TimelineSection";
import RelatedMarkets from "@/components/market/RelatedMarkets";
import TradingSidebar from "@/components/market/TradingSidebar";
import ProbabilityChart from "@/components/market/ProbabilityChart";
import IdeasActivityPanel from "@/components/market/IdeasActivityPanel";
import { markets } from "@/data/markets";

const MarketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [betModal, setBetModal] = useState<{ open: boolean; side: 'YES' | 'NO'; outcome: string } | null>(null);

  // Find market or use a sample
  const market = markets.find(m => m.id === id) || {
    id: "trump-fed-chair",
    title: "Who will Trump nominate as Fed Chair?",
    category: "Politics",
    icon: "account_balance",
    outcomes: [
      { id: "rieder", label: "Rick Rieder", probability: 51 },
      { id: "warsh", label: "Kevin Warsh", probability: 27 },
      { id: "hassett", label: "Kevin Hassett", probability: 7 },
    ],
    volume: "$62,487,113",
    expiry: "Jan 31, 2025",
  };

  const handleBet = (side: 'YES' | 'NO', outcomeLabel: string) => {
    setBetModal({ open: true, side, outcome: outcomeLabel });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-12 px-4 lg:px-8 max-w-[1440px] mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <Icon name="arrow_back" className="text-lg group-hover:-translate-x-0.5 transition-transform" />
            <span>Back</span>
          </button>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-muted-foreground/60">{market.category}</span>
          <span className="text-muted-foreground/40">•</span>
          <span className="text-muted-foreground/60">{market.title.split(' ').slice(0, 2).join(' ')}</span>
        </div>

        {/* Market Header */}
        <div className="flex items-start justify-between gap-6 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight">{market.title}</h1>
            <div className="flex flex-wrap gap-4">
              {market.outcomes.slice(0, 3).map((outcome, i) => (
                <div key={outcome.id} className="flex items-center gap-2">
                  <span className={`size-2 rounded-full ${
                    i === 0 ? 'bg-primary' : i === 1 ? 'bg-accent-green' : 'bg-muted-foreground/50'
                  }`} />
                  <span className={`text-sm font-bold ${
                    i === 0 ? 'text-primary' : i === 1 ? 'text-accent-green' : 'text-muted-foreground'
                  }`}>
                    {outcome.label} {outcome.probability}%
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/30 transition-all hover:border-border/50">
              <Icon name="notifications" className="text-muted-foreground text-lg" />
            </button>
            <button className="p-2.5 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/30 transition-all hover:border-border/50">
              <Icon name="bookmark_border" className="text-muted-foreground text-lg" />
            </button>
            <button className="p-2.5 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/30 transition-all hover:border-border/50">
              <Icon name="ios_share" className="text-muted-foreground text-lg" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Chart, Outcomes, Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Probability Chart */}
            <ProbabilityChart outcomes={market.outcomes} volume={market.volume} />

            {/* Outcomes Table */}
            <OutcomesTable outcomes={market.outcomes} onBet={handleBet} />

            {/* AI Insights */}
            <MarketInsights marketTitle={market.title} />

            {/* Rules */}
            <MarketRules category={market.category} />

            {/* Resolution Source */}
            <ResolutionSource />

            {/* Timeline */}
            <TimelineSection expiry={market.expiry} />

            {/* Ideas/Activity Panel - Now at bottom left */}
            <IdeasActivityPanel />

            {/* Related Markets */}
            <RelatedMarkets />
          </div>

          {/* Right Column: Trading Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <TradingSidebar 
                marketTitle={market.title} 
                onBet={handleBet}
                selectedOutcome={market.outcomes[0]?.label}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />

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
    </div>
  );
};

export default MarketDetail;
