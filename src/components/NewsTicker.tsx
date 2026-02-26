import { useEffect, useState } from "react";
import { fetchTrendingEvents, PolymarketEvent } from "@/lib/polymarket";
import { cn } from "@/lib/utils";
import Icon from "@/components/Icon";

interface NewsTickerProps {
    className?: string;
}

const NewsTicker = ({ className }: NewsTickerProps) => {
    const [events, setEvents] = useState<PolymarketEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadNews = async () => {
            try {
                setLoading(true);
                const data = await fetchTrendingEvents(15);
                setEvents(data);
            } catch (error) {
                console.error("Failed to load news ticker", error);
            } finally {
                setLoading(false);
            }
        };

        loadNews();

        // Refresh every 5 minutes
        const interval = setInterval(loadNews, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    if (loading && events.length === 0) {
        return (
            <div className={cn("w-full h-10 bg-slate-900/50 backdrop-blur-md border-b border-white/5 flex items-center justify-center overflow-hidden", className)}>
                <span className="text-white/50 text-xs font-medium uppercase tracking-widest flex items-center gap-2">
                    <Icon name="sync" className="animate-spin text-[14px]" />
                    Loading Live Events...
                </span>
            </div>
        );
    }

    if (events.length === 0) return null;

    return (
        <div className={cn("w-full h-10 bg-[#0a0f1c] border-b border-white/5 flex items-center overflow-hidden relative group", className)}>
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0a0f1c] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0a0f1c] to-transparent z-10" />

            <div className="flex items-center gap-2 px-4 bg-[#0a0f1c] z-20 border-r border-white/10 h-full shrink-0">
                <div className="size-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest leading-none">Live News</span>
            </div>

            <div className="flex overflow-hidden w-full h-full items-center">
                {/* We use two sets of elements to create an infinite scroll illusion */}
                <div className="flex animate-marquee_fast whitespace-nowrap items-center group-hover:[animation-play-state:paused] will-change-transform transform-gpu">
                    {[...events, ...events].map((event, idx) => (
                        <a
                            key={`${event.id}-${idx}`}
                            href={`#${event.slug}`} // Assuming we want it clickable
                            className="flex items-center gap-3 px-6 border-r border-white/5 hover:bg-white/10 transition-colors h-full"
                        >
                            {/* Event Image */}
                            <img
                                src={event.image || 'https://polymarket.com/images/polymarket-logo.png'}
                                alt={event.title}
                                className="size-5 rounded-full object-cover border border-white/10"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://polymarket.com/images/polymarket-logo.png';
                                }}
                            />
                            <span className="text-sm font-medium text-slate-200 truncate max-w-[300px] hover:text-white transition-colors">
                                {event.title}
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewsTicker;
