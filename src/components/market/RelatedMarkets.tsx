import { Link } from "react-router-dom";
import { useState } from "react";
import { markets } from "@/data/markets";

const RelatedMarkets = () => {
  const [showAll, setShowAll] = useState(false);
  const relatedMarkets = markets.slice(0, showAll ? 6 : 3);

  return (
    <div className="bg-card border border-border/50 rounded-2xl p-6">
      <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
        People are also buying
      </h3>

      <div className="space-y-3">
        {relatedMarkets.map((market) => (
          <Link
            key={market.id}
            to={`/app/market/${market.id}`}
            className="block p-3 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors"
          >
            <div className="text-sm font-medium text-foreground line-clamp-2 mb-2">
              {market.title}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-accent-cyan font-bold">
                {market.outcomes[0]?.probability}%
              </span>
              <span className="text-xs text-muted-foreground">
                {market.outcomes[0]?.label}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <button
        onClick={() => setShowAll(!showAll)}
        className="mt-4 text-sm text-accent-cyan hover:text-accent-cyan/80 transition-colors"
      >
        {showAll ? "Show less" : "Show more"}
      </button>
    </div>
  );
};

export default RelatedMarkets;
