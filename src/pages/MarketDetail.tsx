import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMarkets } from "@/context/MarketContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import BetModal from "@/components/BetModal";
import TradingSidebar from "@/components/market/TradingSidebar";
import ProbabilityChart from "@/components/market/ProbabilityChart";
import IdeasActivityPanel from "@/components/market/IdeasActivityPanel";
import RelatedMarkets from "@/components/market/RelatedMarkets";
import ThemeWrapper from "@/components/themes/ThemeWrapper";

const MarketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { markets } = useMarkets();
  const [betModal, setBetModal] = useState<{ open: boolean; side: 'YES' | 'NO'; outcome: string } | null>(null);

  const market = markets.find(m => m.id === id) || {
    id: "bitcoin-up-or-down-5-minutes",
    title: "Bitcoin Up or Down - 5 Minutes?",
    category: "Crypto",
    icon: "currency_bitcoin",
    image: "/icons/btc.svg", // mock
    outcomes: [
      { id: "yes", label: "Yes", probability: 51 },
      { id: "no", label: "No", probability: 49 },
    ],
    volume: "$62,487,113",
    expiry: "Jan 31, 2025",
  };

  const handleBet = (side: 'YES' | 'NO', outcomeLabel: string) => {
    setBetModal({ open: true, side, outcome: outcomeLabel });
  };

  return (
    <ThemeWrapper category={market.category}>
      <Header />

      <main className="pt-24 pb-12 px-4 lg:px-8 max-w-[1440px] mx-auto text-slate-200">

        {/* Main Grid: Left (Chart & Info) | Right (TradingSidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">

          {/* Left Column (Main Content) */}
          <div className="lg:col-span-8 flex flex-col pt-4">

            {/* Market Header Row */}
            <div className="flex gap-4 items-start mb-6">
              {/* Token Logo */}
              <div className="w-[60px] h-[60px] shrink-0 bg-[#2b2b2b] rounded-full overflow-hidden flex items-center justify-center p-0.5 border border-[#3b3b3b]">
                {market.image ? (
                  <img src={market.image} alt={market.title} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <Icon name={market.icon || "explore"} className="text-3xl text-slate-400" />
                )}
              </div>

              {/* Title & Info */}
              <div className="flex flex-col flex-1 pl-1">
                <div className="flex justify-between items-start">
                  <h1 className="text-[28px] lg:text-[34px] font-bold text-white tracking-tight leading-tight max-w-[90%]">
                    {market.title}
                  </h1>
                </div>

                {/* Secondary Header Info: Price To Beat, etc. */}
                <div className="mt-3 flex gap-8 items-center text-sm">
                  <div className="flex flex-col">
                    <span className="text-slate-500 font-medium">Price to beat</span>
                    <span className="text-white font-bold text-[17px] mt-0.5 flex items-center gap-1">
                      <span className="text-green-500">Up 0¢</span>
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-500 font-medium">Final price</span>
                    <span className="text-white font-bold text-[17px] mt-0.5 whitespace-nowrap">
                      Waiting ...
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-500 font-medium">Vol</span>
                    <span className="text-white font-bold text-[17px] mt-0.5">
                      {market.volume}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Probability Chart (Clean) */}
            <div className="mt-2 min-h-[400px]">
              <ProbabilityChart outcomes={market.outcomes} volume={market.volume} />
            </div>

            {/* Rules / Extra Section */}
            <div className="mt-8 border border-[#2b2b2b] rounded-xl p-5 bg-[#1a1b1e]">
              <h2 className="text-lg font-bold text-white mb-2">Rules</h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                This market will resolve to "Yes" if the referenced asset class meets the predefined conditions at the designated expiry time.
                Trading may halt prior to the final outcome. The resolution source shall be the official API data provided by leading index providers.
              </p>
            </div>

            {/* Activity Panel */}
            <div className="mt-8">
              <IdeasActivityPanel />
            </div>

            {/* Related Markets Panel */}
            <div className="mt-8">
              <RelatedMarkets currentMarket={market} />
            </div>

          </div>

          {/* Right Column (Sidebar) */}
          <div className="lg:col-span-4 lg:pt-4">
            {/* Sticky Trading Sidebar Area */}
            <div className="sticky top-24">
              <TradingSidebar
                marketTitle={market.title}
                onBet={handleBet}
                selectedOutcome={market.outcomes[0]?.label || "Yes"}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Bet Modal (Fallback Mobile/Global) */}
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
    </ThemeWrapper>
  );
};

export default MarketDetail;
