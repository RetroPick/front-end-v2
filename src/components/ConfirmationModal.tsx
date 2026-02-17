import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import Icon from "./Icon";

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  marketTitle: string;
  outcome: string;
  side: 'YES' | 'NO';
  amount: number;
  shares: number;
  potentialWin: number;
  profitPercent: number;
}

const ConfirmationModal = ({
  open,
  onClose,
  marketTitle,
  outcome,
  side,
  amount,
  shares,
  potentialWin,
  profitPercent,
}: ConfirmationModalProps) => {
  const navigate = useNavigate();
  const txId = `#${Math.random().toString(36).substring(2, 6).toUpperCase()}-BTC-${Math.floor(Math.random() * 100)}`;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
            style={{
              background: "rgba(22, 22, 24, 0.98)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Success Icon */}
            <div className="pt-8 pb-4 flex justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2, damping: 15, stiffness: 200 }}
                className="size-20 rounded-full bg-accent-cyan/20 flex items-center justify-center neon-glow-cyan"
              >
                <Icon name="check_circle" className="text-5xl text-accent-cyan" filled />
              </motion.div>
            </div>

            <div className="px-6 pb-6 text-center">
              <h2 className="text-2xl font-bold mb-1">Position Confirmed</h2>
              <p className="text-sm text-muted-foreground font-mono">TxID: {txId}</p>
            </div>

            {/* Details */}
            <div className="px-6 pb-6 space-y-4">
              <div className="bg-secondary/50 rounded-xl p-4">
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Market</div>
                <p className="text-sm font-medium">{marketTitle}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/50 rounded-xl p-4 text-center">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">You Bought</div>
                  <div className="text-2xl font-bold text-accent-cyan">{shares.toLocaleString()}</div>
                  <div className={`text-sm font-bold mt-1 ${side === 'YES' ? 'text-accent-cyan' : 'text-primary'}`}>
                    {side}
                  </div>
                </div>
                <div className="bg-secondary/50 rounded-xl p-4 text-center">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Total Cost</div>
                  <div className="text-2xl font-bold">${amount.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground mt-1">USDT</div>
                </div>
              </div>

              <div className="bg-accent-green/5 border border-accent-green/20 rounded-xl p-4 text-center">
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Potential Return</div>
                <div className="text-3xl font-bold text-accent-green text-glow-green">
                  ${potentialWin.toLocaleString()}
                </div>
                <div className="text-sm font-bold text-accent-green mt-1">
                  +{profitPercent.toLocaleString()}% ROI
                </div>
              </div>

              {/* Chart */}
              <div className="bg-secondary/30 rounded-xl p-4">
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Probability Curve</div>
                <div className="h-12 relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="successGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 35 L10 32 L20 28 L25 30 L30 25 L40 20 L50 22 L60 18 L70 15 L80 12 L100 10"
                      fill="url(#successGradient)"
                    />
                    <path
                      d="M0 35 L10 32 L20 28 L25 30 L30 25 L40 20 L50 22 L60 18 L70 15 L80 12 L100 10"
                      fill="none"
                      stroke="#22d3ee"
                      strokeWidth="2"
                    />
                    <circle cx="25" cy="30" r="4" fill="#0B0B0B" stroke="#22d3ee" strokeWidth="2">
                      <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <line x1="25" y1="30" x2="25" y2="40" stroke="#22d3ee" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
                  </svg>
                </div>
                <div className="text-[10px] text-muted-foreground font-mono text-left mt-1">Entry @ 0.5¢</div>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 pb-6 space-y-3">
              <button
                onClick={() => navigate('/portfolio')}
                className="w-full py-3 rounded-xl font-bold bg-accent-cyan text-background hover:bg-accent-cyan/90 transition-colors flex items-center justify-center gap-2"
              >
                View in Portfolio
                <Icon name="arrow_forward" className="text-lg" />
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl font-bold bg-secondary border border-border text-foreground hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="share" className="text-lg" />
                Share to X
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ConfirmationModal;
