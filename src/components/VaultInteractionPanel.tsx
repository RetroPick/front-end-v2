import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/Icon";
import { cn } from "@/lib/utils";
import { useVault } from "@/hooks/useVault";
import { useAccount } from "wagmi";

const VaultInteractionPanel = () => {
    const { isConnected } = useAccount();
    const [activeTab, setActiveTab] = useState<"deposit" | "withdraw">("deposit");
    const [amount, setAmount] = useState("");
    const [selectedToken] = useState("USDC");
    const [step, setStep] = useState<"approve" | "confirm" | "success">("approve");
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Smart Contract Hooks
    const {
        tokenBalance,
        lpBalance,
        allowance,
        approveToken,
        isApproving,
        deposit,
        withdraw,
        isVaultTxPending,
        refetchAll
    } = useVault(selectedToken);

    // Define "processing" state
    const isProcessing = isApproving || isVaultTxPending;

    // Check if allowance is sufficient
    const amountVal = parseFloat(amount || "0");
    const needsApproval = activeTab === "deposit" && (amountVal > allowance);

    useEffect(() => {
        if (!needsApproval && step === "approve") {
            setStep("confirm");
        } else if (needsApproval && step === "confirm") {
            setStep("approve");
        }
    }, [needsApproval, amount, step]);

    const handleMaxClick = () => {
        if (activeTab === "deposit") setAmount(tokenBalance.toString());
        else setAmount(lpBalance.toString());
    };

    const handleApprove = async () => {
        if (!amount || amountVal <= 0) return;
        try {
            await approveToken(amount);
            // In a real app we'd wait for receipt, but for demo:
            setStep("confirm");
        } catch (e) {
            console.error("Approve failed", e);
        }
    };

    const handleConfirm = async () => {
        if (!amount || amountVal <= 0) return;
        try {
            if (activeTab === "deposit") {
                await deposit(amount);
            } else {
                await withdraw(amount);
            }
            setStep("success");
            setShowSuccessModal(true);
            refetchAll();
        } catch (e) {
            console.error("Tx failed", e);
        }
    };

    const resetFlow = () => {
        setStep(needsApproval ? "approve" : "confirm");
        setAmount("");
        setShowSuccessModal(false);
    };

    const displayBalance = activeTab === "deposit" ? tokenBalance : lpBalance;

    return (
        <div className="space-y-4">
            <div className="bg-card/80 backdrop-blur-md border border-border rounded-xl p-4 shadow-xl relative overflow-hidden z-0">

                {/* Header Tabs: Deposit / Withdraw & Token Select (Buy/Sell style) */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex gap-4">
                        <button
                            onClick={() => setActiveTab("deposit")}
                            className={cn(
                                "text-[15px] font-bold pb-1 transition-colors",
                                activeTab === "deposit" ? "text-foreground border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Deposit
                        </button>
                        <button
                            onClick={() => setActiveTab("withdraw")}
                            className={cn(
                                "text-[15px] font-bold pb-1 transition-colors",
                                activeTab === "withdraw" ? "text-foreground border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Withdraw
                        </button>
                    </div>

                    <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground bg-secondary hover:bg-secondary/80 px-2.5 py-1 rounded transition-colors">
                        {activeTab === "deposit" ? selectedToken : `LP-${selectedToken}`}
                        <Icon name="expand_more" className="text-[16px]" />
                    </button>
                </div>

                {/* Amount Input (Buy/Sell style) */}
                <div className="mb-4 relative">
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-sm font-medium text-muted-foreground">Amount</label>
                        <span className="text-3xl font-bold text-muted-foreground/30 absolute right-0 top-6 select-none pointer-events-none">
                            ${amount || "0"}
                        </span>
                    </div>
                    <div className="text-[12px] text-muted-foreground mb-2">
                        Balance {activeTab === "deposit" ? `${displayBalance.toLocaleString()} ${selectedToken}` : `${displayBalance.toLocaleString()} LP`}
                    </div>

                    <input
                        type="text"
                        value={amount}
                        onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9.]/g, "");
                            setAmount(val);
                        }}
                        placeholder="0"
                        className="w-full bg-transparent border-b border-border text-foreground focus:outline-none py-2 text-3xl font-bold caret-primary pr-20 md:pr-[120px]"
                    />

                    {/* Quick Add Buttons (Buy/Sell style: $1, $5, $10, $100, Max) */}
                    <div className="flex gap-2 mt-4 justify-end">
                        {["1", "5", "10", "100"].map((val) => (
                            <button
                                key={val}
                                onClick={() => setAmount((parseFloat(amount || "0") + parseFloat(val)).toString())}
                                className="px-2.5 py-1 rounded-md bg-secondary hover:bg-secondary/80 text-xs font-bold text-muted-foreground transition-colors"
                            >
                                ${val}
                            </button>
                        ))}
                        <button
                            onClick={handleMaxClick}
                            className="px-2.5 py-1 rounded-md bg-secondary hover:bg-secondary/80 text-xs font-bold text-muted-foreground transition-colors"
                        >
                            Max
                        </button>
                    </div>
                </div>

                {/* Receive (Est.) - Buy/Sell Chance to Win style */}
                {Number(amount) > 0 && (
                    <div className="mb-4 py-3 px-4 rounded-lg bg-primary/10 border border-primary/20">
                        <div className="text-sm font-medium text-muted-foreground mb-1">Receive (Est.)</div>
                        <div className="text-lg font-bold text-foreground">
                            {amount ? (parseFloat(amount) * 1.0).toFixed(2) : "0.00"} {activeTab === "deposit" ? "LP" : selectedToken}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">1 {selectedToken} = 1 LP</div>
                    </div>
                )}

                {/* Action Buttons */}
                {!isConnected ? (
                    <button className="w-full py-3.5 mt-2 rounded-lg text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground transition-colors shadow-sm">
                        Connect Wallet
                    </button>
                ) : (
                    <>
                        {/* Approve Step (Only for Deposit) */}
                        {activeTab === "deposit" && needsApproval && (
                            <button
                                onClick={step === "approve" ? handleApprove : undefined}
                                disabled={step !== "approve" || isProcessing}
                                className={cn(
                                    "w-full py-3 px-4 rounded-lg text-xs font-bold flex items-center justify-between mb-2 transition-all",
                                    step === "approve"
                                        ? "bg-secondary text-foreground hover:bg-secondary/80"
                                        : "bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400"
                                )}
                            >
                                <span>{step === "approve" ? "1. Approve USDC" : "1. Approve USDC"}</span>
                                {step !== "approve" && <Icon name="check" className="text-sm" />}
                            </button>
                        )}

                        <button
                            onClick={handleConfirm}
                            disabled={(activeTab === "deposit" && needsApproval && step === "approve") || amountVal <= 0 || isProcessing}
                            className="w-full py-3.5 mt-2 rounded-lg text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground transition-colors shadow-sm disabled:opacity-50"
                        >
                            {isVaultTxPending && step === "confirm" ? (
                                "Processing..."
                            ) : activeTab === "deposit" ? (
                                needsApproval && step === "approve" ? "Approve First" : "Deposit"
                            ) : (
                                "Withdraw"
                            )}
                        </button>
                    </>
                )}

                {/* Terms text (Buy/Sell style) */}
                <div className="mt-5 text-center text-[10px] sm:text-xs text-muted-foreground">
                    By interacting, you agree to the <a href="#" className="underline hover:text-foreground transition-colors">Risks & Terms</a>.
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
                            className="bg-card rounded-2xl border border-border p-6 w-full max-w-sm shadow-2xl text-center"
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
