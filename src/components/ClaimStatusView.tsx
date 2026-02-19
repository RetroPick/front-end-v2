import { Link } from "react-router-dom";
import Icon from "@/components/Icon";

const ClaimStatusView = () => {
    return (
        <div>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 font-medium">
                <Link to="/app" className="hover:text-white transition-colors">Creator Dashboard</Link>
                <Icon name="chevron_right" className="text-xs" />
                <span className="hover:text-white transition-colors cursor-pointer">Claims</span>
                <Icon name="chevron_right" className="text-xs" />
                <span className="text-white">#CLM-8921</span>
            </div>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Claim Status: Market Creation</h1>
                <p className="text-gray-400">Track the deployment status of your market and manage your seed liquidity lock.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Publish Status */}
                <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <Icon name="rocket_launch" className="text-cyan-400" />
                            <h2 className="text-lg font-bold text-white">Publish Status</h2>
                        </div>
                        <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-1 rounded border border-green-500/30 font-bold tracking-wider">LIVE</span>
                    </div>

                    <div className="relative pl-4 border-l border-white/10 space-y-8 ml-2">
                        {/* Step 1: Market Published */}
                        <div className="relative">
                            <div className="absolute -left-[21px] top-1 w-4 h-4 rounded-full border-2 border-cyan-500 bg-[#111] shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                            <div className="bg-[#1A1D24] border border-cyan-500/30 p-4 rounded-xl relative shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                                <div className="absolute -left-1 top-3 w-2 h-2 bg-[#1A1D24] rotate-45 border-l border-b border-cyan-500/30"></div>
                                <h3 className="text-cyan-400 font-bold mb-1">Market Published</h3>
                                <div className="text-xs text-gray-500 font-mono mb-3">Oct 24, 2024 • 14:32:01 UTC</div>

                                <div className="bg-black/40 border border-white/5 rounded-lg p-3 flex justify-between items-center text-xs font-mono">
                                    <div className="text-gray-400">
                                        MARKET ID<br />
                                        <span className="text-white">0x7a2...9b1c</span>
                                    </div>
                                    <Icon name="content_copy" className="text-gray-600 cursor-pointer hover:text-white" />
                                </div>
                            </div>
                        </div>

                        {/* Step 2: Oracle Initialization */}
                        <div className="relative">
                            <div className="absolute -left-[21px] top-1 w-4 h-4 rounded-full border-2 border-cyan-500 bg-[#111]"></div>
                            <h3 className="text-white font-bold mb-1">Oracle Initialization</h3>
                            <div className="text-xs text-gray-500 font-mono mb-1">Oct 24, 2024 • 14:30:15 UTC</div>
                            <a href="#" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                                View TX <Icon name="open_in_new" className="text-[10px]" />
                            </a>
                        </div>

                        {/* Step 3: Publish Requested */}
                        <div className="relative">
                            <div className="absolute -left-[21px] top-1 w-4 h-4 rounded-full border-2 border-gray-600 bg-[#111]"></div>
                            <h3 className="text-gray-400 font-bold mb-1">Publish Requested</h3>
                            <div className="text-xs text-gray-600 font-mono mb-1">Oct 24, 2024 • 14:28:00 UTC</div>
                            <p className="text-xs text-gray-600">Draft #D-4491 submitted for on-chain deployment.</p>
                        </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/5 text-center text-xs text-gray-500">
                        Market is fully operational and trading.
                    </div>
                </div>

                {/* Right Column: Seed Liquidity Lock */}
                <div className="space-y-6">
                    <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-white mb-1">Seed Liquidity Lock</h2>
                                <p className="text-sm text-gray-400">Your initial liquidity shares are locked to ensure market stability.</p>
                            </div>
                            <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-1 rounded border border-amber-500/30 font-bold uppercase flex items-center gap-1">
                                <Icon name="lock" className="text-xs" /> Locked
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            {/* Shares Locked */}
                            <div className="bg-[#1A1D24] rounded-xl p-5 border border-white/5 relative">
                                <Icon name="package_2" className="absolute top-4 right-4 text-white/5 text-3xl" />
                                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">SHARES LOCKED</div>
                                <div className="text-3xl font-bold text-white mb-1">50,000 <span className="text-sm font-normal text-gray-500">SHARES</span></div>
                                <div className="text-xs text-gray-500 font-mono">= $25,000.00 USD</div>
                            </div>

                            {/* Countdown */}
                            <div className="bg-[#1A1D24] rounded-xl p-5 border border-white/5">
                                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">UNLOCK COUNTDOWN</div>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="bg-black border border-white/10 rounded px-2 py-1 text-2xl font-mono font-bold text-cyan-400">02</div>
                                    <span className="text-gray-600">:</span>
                                    <div className="bg-black border border-white/10 rounded px-2 py-1 text-2xl font-mono font-bold text-cyan-400">14</div>
                                    <span className="text-gray-600">:</span>
                                    <div className="bg-black border border-white/10 rounded px-2 py-1 text-2xl font-mono font-bold text-cyan-400">32</div>
                                </div>
                                <div className="flex justify-between px-1 text-[10px] text-gray-500 uppercase font-bold tracking-wider">
                                    <span>Days</span>
                                    <span>Hrs</span>
                                    <span>Mins</span>
                                </div>
                                <div className="mt-3 text-[10px] text-gray-400 flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div> Unlock Date: Oct 27, 2024 at 12:00 PM UTC
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/5 flex justify-end">
                            <button className="px-6 py-3 bg-white/5 hover:bg-white/10 text-gray-500 border border-white/10 rounded-xl font-bold flex items-center gap-2 cursor-not-allowed" disabled>
                                <Icon name="lock" /> Unlock Shares
                            </button>
                        </div>
                    </div>

                    {/* Explainer */}
                    <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-white mb-4">Why are my shares locked?</h3>

                        <div className="space-y-3">
                            <div className="bg-[#1A1D24] p-3 rounded-lg flex gap-3">
                                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white shrink-0 mt-0.5">
                                    <Icon name="check" className="text-xs" />
                                </div>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    To prevent rug pulls and ensure market integrity, creators must lock their initial liquidity provision for a minimum of 72 hours after market creation.
                                </p>
                            </div>

                            <div className="bg-[#1A1D24] p-3 rounded-lg flex gap-3">
                                <div className="w-5 h-5 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center shrink-0 mt-0.5">
                                    <Icon name="trending_up" className="text-xs" />
                                </div>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    Locked shares still accrue trading fees. Once unlocked, you can reclaim your liquidity or continue to earn fees.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClaimStatusView;
