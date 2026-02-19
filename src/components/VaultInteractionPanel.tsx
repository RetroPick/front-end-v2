import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/Icon";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const VaultInteractionPanel = () => {
    const [activeTab, setActiveTab] = useState<"deposit" | "withdraw">("deposit");
    const [amount, setAmount] = useState("");
    const [selectedToken, setSelectedToken] = useState("USDC");
    const [step, setStep] = useState<"approve" | "confirm" | "success">("approve");
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Mock Tokens
    const tokens = [
        { symbol: "USDC", name: "USD Coin", balance: 12500.00, icon: "attach_money" },
        { symbol: "ETH", name: "Ethereum", balance: 4.25, icon: "currency_bitcoin" }, // Using generic icon for now
        { symbol: "WBTC", name: "Wrapped BTC", balance: 0.15, icon: "currency_bitcoin" },
    ];

    const currentToken = tokens.find(t => t.symbol === selectedToken) || tokens[0];

    const handleMaxClick = () => {
        setAmount(currentToken.balance.toString());
    };

    const handleApprove = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setStep("confirm");
        }, 1500); // Simulate network delay
    };

    const handleConfirm = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setStep("success");
            setShowSuccessModal(true);
        }, 2000); // Simulate network delay
    };

    const resetFlow = () => {
        setStep("approve");
        setAmount("");
        setShowSuccessModal(false);
    };

    return (
        <div className="bg-white dark:bg-[#15181D] rounded-2xl border border-slate-200 dark:border-white/5 shadow-xl relative overflow-hidden">

            {/* Tabs */}
            <div className="grid grid-cols-2 border-b border-slate-200 dark:border-white/5">
                <button
                    onClick={() => setActiveTab("deposit")}
                    className={cn(
                        "py-4 text-sm font-bold uppercase tracking-wider transition-all",
                        activeTab === "deposit"
                            ? "bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500"
                            : "text-slate-500 dark:text-gray-500 hover:text-slate-900 dark:hover:text-gray-300 hover:bg-slate-50 dark:hover:bg-white/5"
                    )}
                >
                    Deposit
                </button>
                <button
                    onClick={() => setActiveTab("withdraw")}
                    className={cn(
                        "py-4 text-sm font-bold uppercase tracking-wider transition-all",
                        activeTab === "withdraw"
                            ? "bg-purple-50 dark:bg-purple-900/10 text-purple-600 dark:text-purple-400 border-b-2 border-purple-500"
                            : "text-slate-500 dark:text-gray-500 hover:text-slate-900 dark:hover:text-gray-300 hover:bg-slate-50 dark:hover:bg-white/5"
                    )}
                >
                    Withdraw
                </button>
            </div>

            <div className="p-6">
                {/* Balance Display */}
                <div className="flex justify-between items-center mb-6 text-xs">
                    <span className="text-slate-500 dark:text-gray-500 font-medium">Available to {activeTab === "deposit" ? "Deposit" : "Withdraw"}</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-white/5 px-2 py-1 rounded border border-slate-200 dark:border-white/10">
                        {activeTab === "deposit" ? `${currentToken.balance.toLocaleString()} ${currentToken.symbol}` : "4,892.12 LP-USDC"}
                    </span>
                </div>

                {/* Input Area */}
                <div className="space-y-4 mb-6">
                    <div className="relative group">
                        <label className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-wider mb-1.5 block">Amount</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className={cn(
                                    "block w-full bg-slate-50 dark:bg-black/40 border rounded-xl py-4 pl-4 pr-32 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-600 text-2xl font-mono focus:ring-1 transition-all outline-none",
                                    activeTab === "deposit"
                                        ? "border-slate-200 dark:border-white/10 focus:border-blue-500 focus:ring-blue-500"
                                        : "border-slate-200 dark:border-white/10 focus:border-purple-500 focus:ring-purple-500"
                                )}
                                placeholder="0.00"
                            />

                            {/* Token Selector / Display */}
                            <div className="absolute inset-y-0 right-2 flex items-center gap-2">
                                <div className="h-8 w-[1px] bg-slate-200 dark:bg-white/10"></div>
                                {activeTab === "deposit" ? (
                                    <div className="relative group/token">
                                        <button className="flex items-center gap-2 px-2 py-1 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg transition-colors">
                                            <span className="font-bold text-sm text-slate-900 dark:text-white">{selectedToken}</span>
                                            <Icon name="expand_more" className="text-sm text-slate-400" />
                                        </button>
                                        {/* Dropdown would go here, simplified for now */}
                                    </div>
                                ) : (
                                    <span className="font-bold text-sm text-slate-900 dark:text-white px-2">LP-{currentToken.symbol}</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Percentage Buttons */}
                    <div className="flex gap-2">
                        {["25%", "50%", "75%", "MAX"].map((percent) => (
                            <button
                                key={percent}
                                onClick={percent === "MAX" ? handleMaxClick : () => { }}
                                className={cn(
                                    "flex-1 text-[10px] font-mono py-2 rounded-lg border transition-all",
                                    percent === "MAX"
                                        ? (activeTab === "deposit" ? "bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/30" : "bg-purple-50 dark:bg-purple-900/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/30")
                                        : "bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-gray-500 border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10"
                                )}
                            >
                                {percent}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Estimate Box */}
                <div className="bg-slate-50 dark:bg-black/20 rounded-xl p-4 border border-slate-200 dark:border-white/5 mb-6 space-y-3">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500 dark:text-gray-400">Receive (Est.)</span>
                        <span className={cn(
                            "font-mono font-bold text-lg",
                            activeTab === "deposit" ? "text-blue-600 dark:text-blue-400" : "text-purple-600 dark:text-purple-400"
                        )}>
                            {amount ? (parseFloat(amount) * 0.9589).toFixed(2) : "0.00"} {activeTab === "deposit" ? "LP" : currentToken.symbol}
                        </span>
                    </div>
                    <div className="w-full h-[1px] bg-slate-200 dark:bg-white/5"></div>
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400 dark:text-gray-500">Exchange Rate</span>
                        <span className="font-mono text-slate-600 dark:text-gray-300">1 {currentToken.symbol} = 0.9589 LP</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 relative">
                    {/* Approve Step (Only for Deposit) */}
                    {activeTab === "deposit" && (
                        <div className="relative">
                            <button
                                onClick={step === "approve" ? handleApprove : undefined}
                                disabled={step !== "approve" || isProcessing}
                                className={cn(
                                    "w-full py-3.5 border rounded-xl text-xs font-bold flex items-center justify-between px-4 transition-all",
                                    step === "approve"
                                        ? "bg-white dark:bg-[#15181D] border-slate-300 dark:border-white/20 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5"
                                        : "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-400 opacity-80 cursor-default"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "w-6 h-6 rounded-full flex items-center justify-center border transition-all",
                                        step === "approve"
                                            ? "border-slate-300 dark:border-white/20 text-slate-400"
                                            : "bg-green-100 dark:bg-green-500/20 border-green-500 text-green-600 dark:text-green-400"
                                    )}>
                                        {isProcessing && step === "approve" ? (
                                            <Icon name="progress_activity" className="animate-spin text-xs" />
                                        ) : step === "approve" ? (
                                            <span className="text-[10px]">1</span>
                                        ) : (
                                            <Icon name="check" className="text-xs" />
                                        )}
                                    </div>
                                    <span>1. Approve {currentToken.symbol}</span>
                                </div>
                                {step !== "approve" && (
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Completed</span>
                                )}
                            </button>
                            {/* Connector Line */}
                            <div className={cn(
                                "absolute left-[27px] top-10 bottom-[-14px] w-[1px] z-0 transition-colors",
                                step === "approve" ? "bg-slate-200 dark:bg-white/10" : "bg-blue-500/30"
                            )}></div>
                        </div>
                    )}

                    {/* Confirm Step */}
                    <button
                        onClick={handleConfirm}
                        disabled={activeTab === "deposit" && step === "approve"}
                        className={cn(
                            "relative z-10 w-full py-4 rounded-xl font-bold text-sm shadow-lg flex justify-center items-center gap-2 transition-all transform active:scale-[0.98]",
                            activeTab === "deposit"
                                ? (step === "approve" ? "bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-gray-600 border border-slate-200 dark:border-white/5 cursor-not-allowed shadow-none" : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/25")
                                : "bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/25"
                        )}
                    >
                        {isProcessing && (step === "confirm" || activeTab === "withdraw") ? (
                            <Icon name="progress_activity" className="animate-spin text-lg" />
                        ) : (
                            <>
                                <span>{activeTab === "deposit" ? "2. Confirm Deposit" : "Confirm Withdraw"}</span>
                                <Icon name="arrow_forward" className="text-lg" />
                            </>
                        )}
                    </button>

                    <p className="text-[10px] text-center text-slate-400 dark:text-gray-500 mt-4">
                        By interacting, you agree to the <a href="#" className="text-blue-500 hover:underline">Risks & Terms</a>.
                    </p>
                </div>
            </div>

            {/* Success Modal */}
            <AnimatePresence>
                {showSuccessModal && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-[#15181D] rounded-2xl border border-slate-200 dark:border-white/10 p-6 w-full max-w-sm shadow-2xl text-center"
                        >
                            <div className={cn(
                                "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-4",
                                activeTab === "deposit"
                                    ? "bg-blue-100 dark:bg-blue-900/20 border-blue-50 text-blue-600 dark:text-blue-400"
                                    : "bg-purple-100 dark:bg-purple-900/20 border-purple-50 text-purple-600 dark:text-purple-400"
                            )}>
                                <Icon name="check" className="text-3xl" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                {activeTab === "deposit" ? "Deposit Successful" : "Withdrawal Successful"}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-gray-400 mb-6">
                                Your transaction has been processed successfully.
                            </p>
                            <button
                                onClick={resetFlow}
                                className="w-full py-3 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white font-bold hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
                            >
                                Done
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default VaultInteractionPanel;
