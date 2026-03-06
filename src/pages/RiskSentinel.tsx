import { useState, useEffect } from "react";
import { useAccount, useReadContract } from "wagmi";
import { formatUnits, Address } from "viem";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import { CONTRACT_ADDRESSES, ABIS } from "@/contracts/config";
import { relayerApi } from "@/lib/relayerApi";

interface RiskSession {
    sessionId: string;
    marketId: string;
    nonce: string;
    openInterest: number;
    lossMax: number;
    maxSkew: number;
    totalAccounts: number;
    totalBalance: string;
    prices: number[];
    riskCaps: { maxOI?: number; maxSkew?: number };
}

export default function RiskSentinel() {
    const { address } = useAccount();
    const [sessions, setSessions] = useState<RiskSession[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // On-chain vault balance
    const { data: vaultBalance } = useReadContract({
        address: CONTRACT_ADDRESSES.CollateralVault as Address,
        abi: ABIS.CollateralVault,
        functionName: "freeBalance",
        args: address ? [address] : undefined,
        query: { enabled: !!address },
    });

    const freeBalance = vaultBalance ? Number(formatUnits(vaultBalance as bigint, 6)) : 0;

    // Fetch risk data from relayer
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                const data = await relayerApi.getRiskOverview();
                if (!cancelled && data?.sessions) {
                    setSessions(data.sessions);
                }
            } catch (e: any) {
                if (!cancelled) setError(e.message || "Failed to load risk data");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, []);

    // Aggregate metrics
    const totalOI = sessions.reduce((s, m) => s + m.openInterest, 0);
    const totalLossMax = sessions.reduce((s, m) => s + m.lossMax, 0);
    const coverageRatio = totalLossMax > 0 ? (freeBalance / totalLossMax) : Infinity;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#060606] text-slate-900 dark:text-gray-100 font-sans transition-colors duration-300 pb-20">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Icon name="shield" className="text-3xl text-red-500" />
                        <h1 className="text-3xl font-bold tracking-tight">Risk Sentinel</h1>
                        <span className="text-[10px] bg-red-50 dark:bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full border border-red-200 dark:border-red-500/30 font-bold uppercase tracking-wider">Whitepaper §5</span>
                    </div>
                    <p className="text-slate-500 dark:text-gray-400 max-w-2xl font-light">
                        Monitor vault solvency, coverage ratio κ(t), and per-session risk exposure in real-time.
                    </p>
                </div>

                {/* Global Risk Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Coverage Ratio κ(t)</div>
                        <div className={`text-3xl font-bold font-mono ${coverageRatio >= 2 ? "text-green-500" : coverageRatio >= 1 ? "text-yellow-500" : "text-red-500"}`}>
                            {coverageRatio === Infinity ? "∞" : coverageRatio.toFixed(2)}
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                            {coverageRatio >= 2 ? "Healthy" : coverageRatio >= 1 ? "Caution" : "Under-collateralized"}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Risk Budget L_max</div>
                        <div className="text-3xl font-bold font-mono text-slate-900 dark:text-white">${totalLossMax.toFixed(0)}</div>
                        <div className="text-xs text-slate-400 mt-1">Sum of b·ln(n) across sessions</div>
                    </div>

                    <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Open Interest</div>
                        <div className="text-3xl font-bold font-mono text-blue-500">${totalOI.toFixed(0)}</div>
                        <div className="text-xs text-slate-400 mt-1">Σ max(q) across {sessions.length} sessions</div>
                    </div>

                    <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Vault Free Balance</div>
                        <div className="text-3xl font-bold font-mono text-slate-900 dark:text-white">${freeBalance.toFixed(2)}</div>
                        <div className="text-xs text-slate-400 mt-1">Available in CollateralVault</div>
                    </div>
                </div>

                {/* Sessions */}
                {loading ? (
                    <div className="text-center py-16">
                        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
                        <p className="text-slate-400">Loading risk data from relayer...</p>
                    </div>
                ) : sessions.length === 0 ? (
                    <div className="space-y-6">
                        {/* No active sessions — show architecture info */}
                        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 text-center">
                            <Icon name="verified_user" className="text-5xl text-green-500/30 mb-3" />
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Active Sessions</h3>
                            <p className="text-sm text-slate-400 max-w-lg mx-auto">
                                The Risk Sentinel monitors real-time risk when trading sessions are active. Start a trade to see live metrics here.
                            </p>
                        </div>

                        {/* Architecture overview */}
                        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-200 dark:border-white/5">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                                    <Icon name="architecture" className="text-blue-500" />
                                    Risk Architecture (Whitepaper §5)
                                </h3>
                            </div>
                            <div className="p-6 space-y-4 text-sm">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-green-500 text-xs">κ</span>
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 dark:text-white">Coverage Ratio κ(t)</div>
                                                <div className="text-xs text-slate-400">κ(t) = VaultFree / Σ L_max. Must be ≥ 1.0 at all times. Circuit breaker triggers if below threshold.</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-blue-500 text-xs">b</span>
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 dark:text-white">LS-LMSR Risk Budget</div>
                                                <div className="text-xs text-slate-400">L_max = b · ln(n). Max loss per session bounded by liquidity parameter b and outcome count n.</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-purple-500 text-xs">📊</span>
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 dark:text-white">Per-Session Monitoring</div>
                                                <div className="text-xs text-slate-400">OI utilization, price skew, participant count, and max position size tracked per session.</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-red-500 text-xs">⚡</span>
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 dark:text-white">Circuit Breakers</div>
                                                <div className="text-xs text-slate-400">Auto-halt trading if κ(t) drops below 1.2. Prevents catastrophic loss from correlated events.</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <h2 className="text-lg font-bold flex items-center gap-2">
                            <Icon name="monitor_heart" className="text-red-500" />
                            Per-Session Risk ({sessions.length})
                        </h2>
                        {sessions.map((s) => {
                            const oiRatio = s.riskCaps?.maxOI ? (s.openInterest / s.riskCaps.maxOI) * 100 : 0;
                            return (
                                <div key={s.sessionId} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5">
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <span className="font-mono text-xs text-slate-400">Session</span>
                                            <span className="ml-2 font-mono text-sm font-bold text-slate-900 dark:text-white">{s.sessionId.slice(0, 10)}...</span>
                                            <span className="ml-3 text-[10px] text-slate-400">Market #{s.marketId}</span>
                                        </div>
                                        <span className="text-xs font-mono text-slate-400">Nonce: {s.nonce}</span>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-xs">
                                        <div>
                                            <span className="text-slate-400">Open Interest</span>
                                            <p className="font-mono font-bold text-blue-500">${s.openInterest.toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <span className="text-slate-400">Max Loss (L_max)</span>
                                            <p className="font-mono font-bold text-red-400">${s.lossMax.toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <span className="text-slate-400">Price Skew</span>
                                            <p className="font-mono font-bold text-yellow-500">{(s.maxSkew * 100).toFixed(1)}%</p>
                                        </div>
                                        <div>
                                            <span className="text-slate-400">Participants</span>
                                            <p className="font-mono font-bold text-slate-900 dark:text-white">{s.totalAccounts}</p>
                                        </div>
                                        <div>
                                            <span className="text-slate-400">OI Utilization</span>
                                            <div className="w-full bg-slate-100 dark:bg-white/10 h-2 rounded-full mt-1 overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${oiRatio > 80 ? "bg-red-500" : oiRatio > 50 ? "bg-yellow-500" : "bg-green-500"}`}
                                                    style={{ width: `${Math.min(oiRatio, 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="mt-4 bg-red-50 dark:bg-red-900/10 text-red-500 text-sm px-4 py-3 rounded-xl border border-red-200 dark:border-red-500/30">
                        {error}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
