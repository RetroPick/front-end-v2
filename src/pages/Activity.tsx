import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import Icon from "@/components/Icon";
import { relayerApi } from "@/lib/relayerApi";
import { useAccount } from "wagmi";

interface TradeRecord {
    id: number;
    timestamp: number;
    sessionId: string;
    userAddress: string;
    action: "buy" | "sell" | "swap";
    outcomeIndex?: number;
    fromOutcome?: number;
    toOutcome?: number;
    delta: number;
    cost: number;
    netCost: number;
    nonce: string;
}

const POLL_INTERVAL = 5000; // 5 seconds

const Activity = () => {
    const { t } = useLanguage();
    const { address, isConnected } = useAccount();
    const [activeTab, setActiveTab] = useState<"my" | "global">("global");
    const [trades, setTrades] = useState<TradeRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

    const fetchTrades = useCallback(async () => {
        try {
            let data: TradeRecord[];
            if (activeTab === "my" && address) {
                data = await relayerApi.getTradeHistory(address);
            } else {
                data = await relayerApi.getGlobalTradeHistory();
            }
            setTrades(data);
            setLastRefresh(new Date());
        } catch {
            // Relayer might be offline; keep last known state
        } finally {
            setLoading(false);
        }
    }, [activeTab, address]);

    // Initial fetch + polling
    useEffect(() => {
        setLoading(true);
        fetchTrades();
        const interval = setInterval(fetchTrades, POLL_INTERVAL);
        return () => clearInterval(interval);
    }, [fetchTrades]);

    const formatDate = (unix: number) => {
        const d = new Date(unix * 1000);
        return d.toLocaleDateString("en-CA") + " " + d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    };

    const actionLabel = (t: TradeRecord) => {
        if (t.action === "buy") return `BUY Outcome #${t.outcomeIndex}`;
        if (t.action === "sell") return `SELL Outcome #${t.outcomeIndex}`;
        return `SWAP #${t.fromOutcome} → #${t.toOutcome}`;
    };

    const actionColor = (action: string) => {
        if (action === "buy") return "bg-accent-green/10 text-accent-green";
        if (action === "sell") return "bg-accent-red/10 text-accent-red";
        return "bg-blue-500/10 text-blue-500";
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
            <Header />

            <div className="container mx-auto px-4 pt-40 pb-20 max-w-6xl">
                {/* Page Header */}
                <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-2">{t('activity.title')}</h1>
                        <p className="text-muted-foreground text-lg">{t('activity.subtitle')}</p>
                    </div>
                    {lastRefresh && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full border border-border/50 shrink-0">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                            Live · {lastRefresh.toLocaleTimeString()}
                        </div>
                    )}
                </div>

                {/* Second Navbar - Global Feed / My Trades (connects to header) */}
                <div className="mb-8 -mt-1">
                    <div className="w-full bg-background/60 backdrop-blur-lg border border-border rounded-t-none rounded-b-2xl border-t-0 px-4 py-2 flex items-center gap-2 shadow-sm">
                        <button
                            onClick={() => setActiveTab("global")}
                            className={cn(
                                "px-4 py-2 rounded-xl text-sm font-bold transition-all shrink-0",
                                activeTab === "global"
                                    ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent"
                            )}
                        >
                            Global Feed
                        </button>
                        <button
                            onClick={() => setActiveTab("my")}
                            disabled={!isConnected}
                            className={cn(
                                "px-4 py-2 rounded-xl text-sm font-bold transition-all shrink-0",
                                activeTab === "my"
                                    ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent",
                                !isConnected && "opacity-50 cursor-not-allowed"
                            )}
                        >
                            My Trades
                        </button>
                    </div>
                </div>


                {/* Table Container */}
                <div className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-border/50 bg-muted/20">
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('activity.table_date')}</th>
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Session</th>
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-center">Action</th>
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">Shares (Δ)</th>
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">Cost</th>
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">Net</th>
                                    {activeTab === "global" && (
                                        <th className="p-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Trader</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/30">
                                {loading ? (
                                    <tr>
                                        <td colSpan={activeTab === "global" ? 7 : 6} className="p-12 text-center text-muted-foreground">
                                            <div className="flex flex-col items-center gap-2">
                                                <svg className="animate-spin h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span className="text-sm">Loading trades from relayer...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : trades.length > 0 ? (
                                    trades.map((item) => (
                                        <tr key={item.id} className="group hover:bg-muted/30 transition-colors">
                                            <td className="p-4 text-sm font-mono text-muted-foreground whitespace-nowrap">
                                                {formatDate(item.timestamp)}
                                            </td>
                                            <td className="p-4">
                                                <span className="font-mono text-xs bg-muted/50 px-2 py-1 rounded-md border border-border/50">
                                                    {item.sessionId.substring(0, 10)}…
                                                </span>
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className={cn(
                                                    "px-2 py-1 rounded-md text-xs font-bold uppercase",
                                                    actionColor(item.action)
                                                )}>
                                                    {actionLabel(item)}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right font-mono text-sm">
                                                {item.delta.toFixed(4)}
                                            </td>
                                            <td className="p-4 text-right font-mono text-sm text-muted-foreground">
                                                ${Math.abs(item.cost).toFixed(4)}
                                            </td>
                                            <td className={cn("p-4 text-right font-mono text-sm font-bold",
                                                item.netCost > 0 ? "text-accent-red" : "text-accent-green"
                                            )}>
                                                {item.netCost > 0 ? `-$${item.netCost.toFixed(4)}` : `+$${Math.abs(item.netCost).toFixed(4)}`}
                                            </td>
                                            {activeTab === "global" && (
                                                <td className="p-4">
                                                    <span className="font-mono text-xs text-muted-foreground">
                                                        {item.userAddress.substring(0, 6)}…{item.userAddress.substring(item.userAddress.length - 4)}
                                                    </span>
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={activeTab === "global" ? 7 : 6} className="p-12 text-center text-muted-foreground">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <Icon name="history" className="text-4xl opacity-20 mb-2" />
                                                <span className="text-lg font-medium">{t('activity.no_data')}</span>
                                                <span className="text-sm text-muted-foreground/60">
                                                    {activeTab === "my"
                                                        ? "Execute your first trade to see it here."
                                                        : "No trades have been executed yet."}
                                                </span>
                                            </div>
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
