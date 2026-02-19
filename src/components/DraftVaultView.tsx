import { useState } from "react";
import Icon from "@/components/Icon";
import ClaimSeedModal from "@/components/ClaimSeedModal";
import ClaimSuccessModal from "@/components/ClaimSuccessModal";
import ClaimStatusView from "@/components/ClaimStatusView";
import { motion, AnimatePresence } from "framer-motion";

const DraftVaultView = ({ vaultData }: { vaultData: any }) => {
    const [isSeedModalOpen, setIsSeedModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState<"draft" | "status">("draft");

    // Mock data for draft
    const draftData = {
        targetLiquidity: 100000,
        currentSeed: 0
    };

    const handleClaimSuccess = () => {
        setIsSeedModalOpen(false);
        setIsSuccessModalOpen(true);
    };

    const handleGoToStatus = () => {
        setIsSuccessModalOpen(false);
        setViewMode("status");
    };

    if (viewMode === "status") {
        return <ClaimStatusView />;
    }

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Left Column: Draft Stats */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-500/20 rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Icon name="construction" className="text-9xl text-amber-500" />
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mb-2">Draft Market Phase</h2>
                            <p className="text-amber-700 dark:text-amber-200/80 mb-6 max-w-xl">
                                This market is currently in the **Draft** phase. Liquidity Providers can seed initial liquidity to activate the market and earn early rewards.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                                <div className="bg-white dark:bg-black/20 p-4 rounded-xl border border-amber-100 dark:border-amber-500/10">
                                    <label className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-1">Target Liquidity</label>
                                    <div className="text-2xl font-mono font-bold text-slate-900 dark:text-white">
                                        ${draftData.targetLiquidity.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-black/20 p-4 rounded-xl border border-amber-100 dark:border-amber-500/10">
                                    <label className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-1">Current Seed</label>
                                    <div className="text-2xl font-mono font-bold text-slate-900 dark:text-white">
                                        ${draftData.currentSeed.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Interaction Panel (Claim & Seed) */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-[#15181D] rounded-2xl border border-slate-200 dark:border-white/5 p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <Icon name="rocket_launch" className="text-blue-500" />
                            Actions
                        </h3>

                        <div className="space-y-4">
                            <button
                                onClick={() => setIsSeedModalOpen(true)}
                                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 relative overflow-hidden group"
                            >
                                <Icon name="verified" />
                                Claim & Seed
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </button>
                            <p className="text-xs text-center text-slate-500 dark:text-gray-500">
                                By claiming, you become an initial Liquidity Provider.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <AnimatePresence>
                {isSeedModalOpen && (
                    <ClaimSeedModal
                        isOpen={isSeedModalOpen}
                        onClose={() => setIsSeedModalOpen(false)}
                        onSuccess={handleClaimSuccess}
                    />
                )}
                {isSuccessModalOpen && (
                    <ClaimSuccessModal
                        isOpen={isSuccessModalOpen}
                        onClose={() => setIsSuccessModalOpen(false)}
                        onGoToStatus={handleGoToStatus}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default DraftVaultView;
