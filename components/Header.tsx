import React from "react";
import { AppTab } from "../types";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import TCHLogo from "./TCHLogo";

interface HeaderProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  openBookingModal: () => void;
  isScrolled: boolean;
}

export default function Header({ activeTab, setActiveTab, openBookingModal, isScrolled }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { label: "HOME", tab: AppTab.HOME },
    { label: "MENU", tab: AppTab.MENU },
    // { label: "PRICING", tab: AppTab.PRICING },
    { label: "GALLERY", tab: AppTab.GALLERY }
  ];

  return (
    <header
      id="main-app-header"
      className="fixed top-0 left-0 w-full z-40 transition-all duration-300 bg-[#FAF9F6] border-b border-[#e5dfd3]/65 py-3 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">

          {/* Logo Brand */}
          <div
            id="brand-logo-container"
            onClick={() => {
              setActiveTab(AppTab.HOME);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center space-x-3 cursor-pointer group shrink-0"
          >
            <div className="relative w-11 h-11 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <TCHLogo className="w-full h-full" />
            </div>
            <div className="text-left flex flex-col justify-center">
              <span className="text-[13px] md:text-[15px] font-serif font-bold text-[#052316] leading-none">
                The Corporate
              </span>
              <span className="text-[18px] md:text-[22px] font-sans font-black text-[#b89547] tracking-[0.04em] leading-none uppercase mt-0.5">
                HALWAI
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-primary-navigation" className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.tab}
                id={`nav-link-${link.label.toLowerCase()}`}
                onClick={() => {
                  setActiveTab(link.tab);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`text-xs tracking-wider font-bold transition-all duration-300 relative py-1.5 uppercase ${
                  activeTab === link.tab
                    ? "text-[#b89547] font-extrabold"
                    : "text-[#052316]/75 hover:text-[#b89547]"
                }`}
              >
                {link.label}
                {activeTab === link.tab && (
                  <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#b89547] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Desktop Contact + CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Phone numbers */}
            <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[#052316]/70">
              <Phone className="w-3 h-3 text-[#b89547] shrink-0" />
              <div className="flex flex-col leading-tight">
                <a href="tel:+919289030016" className="hover:text-[#b89547] transition-colors">9289030016</a>
                <a href="tel:+919667314900" className="hover:text-[#b89547] transition-colors">9667314900</a>
              </div>
            </div>
            {/* Book Tasting CTA */}
            <button
              id="cta-book-tasting-header"
              onClick={openBookingModal}
              className="flex items-center space-x-2 px-5 py-2.5 bg-[#052316] hover:bg-[#0b3825] text-white text-xs font-bold tracking-wider rounded-full shadow-sm hover:shadow-md transition-all duration-300"
            >
              <span>Book Tasting</span>
            </button>
          </div>

          {/* Mobile hamburger menu button */}
          <div className="md:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#052316] hover:text-[#b89547] focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="md:hidden absolute top-full left-0 w-full bg-[#FAF9F6] border-b border-[#e5dfd3] py-4 px-6 shadow-md animate-fade-in"
        >
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.tab}
                id={`mobile-nav-link-${link.label.toLowerCase()}`}
                onClick={() => {
                  setActiveTab(link.tab);
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`text-left py-2 text-sm font-bold tracking-wide border-b border-gray-100 ${
                  activeTab === link.tab
                    ? "text-[#b89547] font-black"
                    : "text-[#052316]"
                }`}
              >
                {link.label}
              </button>
            ))}
            {/* Mobile contact info */}
            <div className="flex flex-col space-y-2 py-2 border-b border-gray-100">
              <a href="tel:+919289030016" className="flex items-center gap-2 text-xs font-mono font-bold text-[#052316]/80 hover:text-[#b89547]">
                <Phone className="w-3.5 h-3.5 text-[#b89547]" />
                9289030016
              </a>
              <a href="tel:+919667314900" className="flex items-center gap-2 text-xs font-mono font-bold text-[#052316]/80 hover:text-[#b89547]">
                <Phone className="w-3.5 h-3.5 text-[#b89547]" />
                9667314900 (Bulk Orders)
              </a>
            </div>
            <button
              id="mobile-cta-bktasting-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingModal();
              }}
              className="flex items-center justify-center space-x-2 w-full py-3 bg-[#052316] text-white font-bold rounded-full text-xs tracking-wider uppercase"
            >
              <span>Book Tasting</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
