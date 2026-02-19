
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { categories } from "@/data/markets";
import Icon from "./Icon";
import WalletButton from "./WalletButton";
import { ModeToggle } from "./mode-toggle";

import retropickLogo from "@/assets/retropick-logo.png";
import Logo from "@/landing_components/Logo";
import { useOnboarding } from "@/context/OnboardingContext";


import { useLanguage } from "@/context/LanguageContext";

interface HeaderProps {
  activeCategory?: string;
  setActiveCategory?: (category: string) => void;
}

const Header = ({ activeCategory, setActiveCategory }: HeaderProps) => {
  const location = useLocation();
  const { isOnboarded } = useOnboarding();
  const { t } = useLanguage();
  const [localActiveCategory, setLocalActiveCategory] = useState("Trending");

  // Use props if provided, otherwise local state
  const currentCategory = activeCategory || localActiveCategory;
  const setCategory = setActiveCategory || setLocalActiveCategory;

  const navItems = [
    { name: t('nav.markets'), path: "/app" },
    { name: t('nav.activity'), path: "/app/activity" },
    { name: t('nav.portfolio'), path: "/app/portfolio" },
    { name: "Draft", path: "/app/vault" },
    { name: "Liquidity", path: "/app/liquidity" },
  ];

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex flex-col items-center gap-3 pointer-events-none px-4">
      {/* Main Navbar Pill */}
      <div className="w-full max-w-7xl h-16 px-4 pr-2 bg-background/80 backdrop-blur-xl border border-border rounded-full shadow-lg flex items-center justify-between pointer-events-auto transition-all duration-300 hover:bg-background/90 hover:border-foreground/10">

        {/* Left: Logo & Nav */}
        <div className="flex items-center gap-8 pl-2">
          <Link to="/app" className="flex items-center gap-3 group">
            <div className="group-hover:scale-110 transition-transform duration-300">
              <Logo className="size-10 shadow-md shadow-blue-500/20 rounded-xl" />
            </div>
            <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Retropick</h2>
          </Link>
          <nav className="hidden lg:flex items-center gap-1 bg-muted/50 rounded-full px-2 py-1 border border-border/50">
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
        </div>

        {/* Center: Search (Hidden on small, smaller on medium) */}
        <div className="flex-1 max-w-md relative hidden md:block mx-4">
          <div className="relative group">
            <Icon
              name="search"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
            />
            <input
              type="text"
              placeholder={t('nav.search_placeholder')}
              className="w-full bg-muted/50 border border-border rounded-full px-12 py-2 text-sm text-foreground focus:bg-background focus:border-primary/50 focus:ring-1 focus:ring-primary/50 focus:outline-none transition-all placeholder:text-muted-foreground/50"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <ModeToggle />

          <WalletButton />
        </div>
      </div>

      {/* Secondary Category Pill (Only on Home/App) */}
      {location.pathname === "/app" && (
        <div className="w-full max-w-7xl h-12 pointer-events-auto overflow-hidden">
          <div className="h-full px-2 bg-background/60 backdrop-blur-lg border border-border rounded-2xl flex items-center justify-center shadow-sm">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full justify-center px-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setCategory(category)}
                  className={`px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${currentCategory === category
                    ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent"
                    }`}
                >
                  {t(`categories.${category.toLowerCase()}` as any)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
