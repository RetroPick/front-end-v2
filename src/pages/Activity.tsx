import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { categories } from "@/data/markets";
import { cn } from "@/lib/utils";
import Icon from "@/components/Icon";

// Mock Data for Activity
const mockActivity = [
    { id: 1, market: "Bitcoin > $100k by Dec 2024", category: "Crypto", side: "YES", invested: "$500.00", price: "$0.45", return: "+$125.50", status: "OPEN", date: "2024-10-15" },
    { id: 2, market: "Trump vs Biden 2024 Election", category: "Politics", side: "NO", invested: "$200.00", price: "$0.32", return: "-$45.00", status: "OPEN", date: "2024-09-28" },
    { id: 3, market: "Lakers to Win NBA Finals", category: "Sports", side: "YES", invested: "$1,000.00", price: "$0.12", return: "$0.00", status: "LOST", date: "2024-06-12" },
    { id: 4, market: "SpaceX Starship Launch Success", category: "Space", side: "YES", invested: "$350.00", price: "$0.65", return: "+$189.00", status: "WON", date: "2024-05-20" },
    { id: 5, market: "Fed Cuts Rates in Nov", category: "Macro", side: "YES", invested: "$750.00", price: "$0.55", return: "+$220.00", status: "OPEN", date: "2024-10-01" },
    { id: 6, market: "Ethereum > $5k by Q1 2025", category: "Crypto", side: "YES", invested: "$300.00", price: "$0.25", return: "-$10.00", status: "OPEN", date: "2024-10-18" },
    { id: 7, market: "Gold reaches $3000/oz", category: "Commodities", side: "NO", invested: "$400.00", price: "$0.40", return: "$0.00", status: "OPEN", date: "2024-09-15" },
];

const Activity = () => {
    const { t } = useLanguage();
    const [filter, setFilter] = useState("All");

    // Filter Logic
    const filteredData = filter === "All"
        ? mockActivity
        : mockActivity.filter(item => item.category === filter);

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
            <Header />

            <div className="container mx-auto px-4 pt-32 pb-20 max-w-6xl">
                {/* Page Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold tracking-tight mb-2">{t('activity.title')}</h1>
                    <p className="text-muted-foreground text-lg">{t('activity.subtitle')}</p>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
                    <button
                        onClick={() => setFilter("All")}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm font-bold transition-all border",
                            filter === "All"
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-muted/30 text-muted-foreground border-border/50 hover:bg-muted hover:text-foreground"
                        )}
                    >
                        {t('activity.tab_all')}
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-bold transition-all border whitespace-nowrap",
                                filter === cat
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "bg-muted/30 text-muted-foreground border-border/50 hover:bg-muted hover:text-foreground"
                            )}
                        >
                            {/* @ts-expect-error: dynamic translation key */}
                            {t(`categories.${cat.toLowerCase()}`)}
                        </button>
                    ))}
                </div>

                {/* Table Container */}
                <div className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-border/50 bg-muted/20">
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('activity.table_date')}</th>
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('activity.table_market')}</th>
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-center">{t('activity.table_side')}</th>
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">{t('activity.table_invested')}</th>
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">{t('activity.table_price')}</th>
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">{t('activity.table_return')}</th>
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/30">
                                {filteredData.length > 0 ? (
                                    filteredData.map((item) => (
                                        <tr key={item.id} className="group hover:bg-muted/30 transition-colors">
                                            <td className="p-4 text-sm font-mono text-muted-foreground whitespace-nowrap">{item.date}</td>
                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-base group-hover:text-primary transition-colors cursor-pointer">{item.market}</span>
                                                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider flex items-center gap-1">
                                                        {item.category}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className={cn(
                                                    "px-2 py-1 rounded-md text-xs font-bold uppercase",
                                                    item.side === "YES" ? "bg-accent-green/10 text-accent-green" : "bg-accent-red/10 text-accent-red"
                                                )}>
                                                    {item.side}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right font-mono text-sm">{item.invested}</td>
                                            <td className="p-4 text-right font-mono text-sm text-muted-foreground">{item.price}</td>
                                            <td className={cn("p-4 text-right font-mono text-sm font-bold",
                                                item.return.startsWith("+") ? "text-accent-green" : item.return.startsWith("-") ? "text-accent-red" : "text-muted-foreground"
                                            )}>
                                                {item.return}
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className={cn(
                                                    "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                                                    item.status === "WON" ? "bg-accent-green/20 text-accent-green border-accent-green/30" :
                                                        item.status === "LOST" ? "bg-accent-red/20 text-accent-red border-accent-red/30" :
                                                            "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                                )}>
                                                    {/* Translate status dynamically if needed, or map it */}
                                                    {item.status === "WON" ? t('activity.status_won') :
                                                        item.status === "LOST" ? t('activity.status_lost') :
                                                            t('activity.status_open')}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="p-12 text-center text-muted-foreground flex flex-col items-center justify-center gap-2">
                                            <Icon name="history" className="text-4xl opacity-20 mb-2" />
                                            <span className="text-lg font-medium">{t('activity.no_data')}</span>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Activity;
