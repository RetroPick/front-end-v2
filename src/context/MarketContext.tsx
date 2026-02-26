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
    const [markets, setMarkets] = useState<Market[]>(fallbackMarkets);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadMarkets = async () => {
        try {
            setIsLoading(true);
            setError(null);

            let allLiveData: Market[] = [];
            let offset = 0;
            const limit = 500;
            const maxPages = 5; // Fetch up to 2500 markets

            for (let i = 0; i < maxPages; i++) {
                const batch = await fetchLiveMarkets(limit, offset);
                if (!batch || batch.length === 0) break; // Reached the end
                allLiveData = [...allLiveData, ...batch];
                offset += limit;
                // If the batch returned less than limit, we're likely at the end
                if (batch.length < limit) break;
            }

            if (allLiveData.length > 0) {
                // Merge with existing fallback to ensure all categories have SOME data if Poly API is sparse
                const combined = [...allLiveData];
                // Only add fallbacks for categories that didn't get any live data
                const liveCategories = new Set(allLiveData.map(m => m.category));

                fallbackMarkets.forEach(fm => {
                    if (!liveCategories.has(fm.category)) {
                        combined.push(fm);
                    }
                });

                setMarkets(combined);
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
