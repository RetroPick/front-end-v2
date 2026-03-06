
import { useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { categories } from "@/data/markets";
import Icon from "./Icon";
import WalletButton from "./WalletButton";
import { ModeToggle } from "./mode-toggle";
import NewsTicker from "./NewsTicker";

import retropickLogo from "@/assets/retropick-logo.png";
import Logo from "@/landing_components/Logo";
import { useOnboarding } from "@/context/OnboardingContext";
import { useAccount, useChainId } from "wagmi";
import { Address } from "viem";
import { TOKENS } from "@/constants/tokens";
import { useVault } from "@/hooks/useVault";

import { useLanguage } from "@/context/LanguageContext";

interface HeaderProps {
  activeCategory?: string;
  setActiveCategory?: (category: string) => void;
}

const Header = ({ activeCategory, setActiveCategory }: HeaderProps) => {
  const location = useLocation();
  const { isOnboarded } = useOnboarding();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { t } = useLanguage();
  const [localActiveCategory, setLocalActiveCategory] = useState("Trending");

  // Fetch real-time Vault Balance for the Header
  const tokenAddresses = TOKENS[chainId] || TOKENS[1];
  const { freeBalance } = useVault(tokenAddresses?.USDC as Address);

  const usdcBalance = freeBalance.toFixed(2);

  // Use props if provided, otherwise local state
  const currentCategory = activeCategory || localActiveCategory;
  const setCategory = setActiveCategory || setLocalActiveCategory;

  const showCategoryBar =
    ["/app", "/app/activity", "/app/portfolio", "/app/vault", "/app/liquidity"].includes(location.pathname) &&
    !new RegExp("^/app/vault/[^/]+$").test(location.pathname);

  const navItems = [
    { name: t('nav.markets'), path: "/app" },
    { name: t('nav.activity'), path: "/app/activity" },
    { name: t('nav.portfolio'), path: "/app/portfolio" },
    { name: "Draft", path: "/app/vault" },
    { name: "Liquidity", path: "/app/liquidity" },
  ];

  const headerContent = (
    <>
      <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-auto pb-2">
        <NewsTicker className="h-8 border-b border-white/5 opacity-90 hover:opacity-100 transition-opacity" />
      </div>

      <header className="fixed top-12 left-0 right-0 z-[9999] flex flex-col items-center pointer-events-none px-4">
        {/* Combined Navbar: Main nav + Category bar in one wireframe */}
        <div className="w-full max-w-7xl rounded-t-2xl border border-border border-b-0 bg-background/80 backdrop-blur-xl shadow-lg overflow-hidden pointer-events-auto transition-all duration-300 hover:bg-background/90 hover:border-foreground/10">
          {/* Main Navbar - top section */}
          <div className="relative h-16 px-4 flex items-center">

            {/* Left: Logo - flex-1 for balance */}
            <div className="flex items-center flex-1 min-w-0 justify-start pr-4">
              <Link to="/app" className="flex items-center gap-3 group shrink-0">
                <div className="group-hover:scale-110 transition-transform duration-300">
                  <Logo className="size-10 shadow-md shadow-blue-500/20 rounded-xl" />
                </div>
                <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Retropick</h2>
              </Link>
            </div>

            {/* Center: Nav (absolutely centered) */}
            <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center gap-2 bg-muted/50 rounded-full px-2 py-1 border border-border/50">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${location.pathname === item.path
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right: Actions - flex-1 for balance with left */}
            <div className="flex items-center justify-end flex-1 min-w-0 pl-4">
              <WalletButton />
            </div>
          </div>

          {/* Secondary Category Bar - extends from main nav, same wireframe */}
          {showCategoryBar && (
            <div className="h-12 px-2 border-t border-border bg-background/60 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar flex-1 min-w-0 justify-center px-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setCategory(category)}
                    className={`px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300 shrink-0 ${currentCategory === category
                      ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent"
                      }`}
                  >
                    {t(`categories.${category.toLowerCase()}` as any)}
                  </button>
                ))}
              </div>
              <div className="relative group shrink-0 w-40 md:w-48 lg:w-56">
                <Icon
                  name="search"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors text-sm"
                />
                <input
                  type="text"
                  placeholder={t('nav.search_placeholder')}
                  className="w-full bg-muted/50 border border-border rounded-lg pl-9 pr-3 py-1.5 text-xs text-foreground focus:bg-background focus:border-primary/50 focus:ring-1 focus:ring-primary/50 focus:outline-none transition-all placeholder:text-muted-foreground/50"
                />
            </div>
          </div>
        )}
          </div>
      </header>
    </>
  );

  return createPortal(headerContent, document.body);
};

export default Header;
