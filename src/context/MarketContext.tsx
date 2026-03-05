import React, { createContext, useContext, useState, useEffect } from 'react';
import { markets as fallbackMarkets } from '@/data/markets';
import { Market } from '@/types/market';
import { fetchLiveMarkets } from '@/lib/polymarket';

interface MarketContextType {
    markets: Market[];
    isLoading: boolean;
    error: string | null;
    refreshMarkets: () => Promise<void>;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export const MarketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Try to load from cache immediately so user sees content instantly
    const cachedMarkets = (() => {
        try {
            const raw = localStorage.getItem('retropick_markets_cache');
            if (raw) {
                const parsed = JSON.parse(raw);
                // Cache valid for 5 minutes
                if (Date.now() - parsed.ts < 5 * 60 * 1000) return parsed.data as Market[];
            }
        } catch { /* ignore */ }
        return null;
    })();

    const [markets, setMarkets] = useState<Market[]>(cachedMarkets || fallbackMarkets);
    const [isLoading, setIsLoading] = useState(!cachedMarkets); // Skip loading spinner if cache hit
    const [error, setError] = useState<string | null>(null);

    const loadMarkets = async () => {
        try {
            setIsLoading(true);
            setError(null);

            // Parallel fetch — 2 pages of 500 = 1000 markets max (much faster than 5 serial requests)
            const limit = 500;
            const maxPages = 2;
            const fetches = Array.from({ length: maxPages }, (_, i) =>
                fetchLiveMarkets(limit, i * limit)
            );
            const results = await Promise.all(fetches);
            const allLiveData = results.flat();

            if (allLiveData.length > 0) {
                const combined = [...allLiveData];
                const liveCategories = new Set(allLiveData.map(m => m.category));

                fallbackMarkets.forEach(fm => {
                    if (!liveCategories.has(fm.category)) {
                        combined.push(fm);
                    }
                });

                setMarkets(combined);

                // Persist to localStorage for instant next load
                try {
                    localStorage.setItem('retropick_markets_cache', JSON.stringify({ data: combined, ts: Date.now() }));
                } catch { /* quota exceeded — ignore */ }
            } else {
                setMarkets(fallbackMarkets);
            }
        } catch (err) {
            console.error("Error loading markets context", err);
            setError("Failed to load live markets. Using fallback data.");
            setMarkets(fallbackMarkets);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadMarkets();

        // Auto refresh every 3 minutes
        const intervalId = setInterval(loadMarkets, 3 * 60 * 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <MarketContext.Provider value={{ markets, isLoading, error, refreshMarkets: loadMarkets }}>
            {children}
        </MarketContext.Provider>
    );
};

export const useMarkets = () => {
    const context = useContext(MarketContext);
    if (context === undefined) {
        throw new Error('useMarkets must be used within a MarketProvider');
    }
    return context;
};
