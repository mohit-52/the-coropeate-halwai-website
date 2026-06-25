import React from "react";
import { Check, Crown, Info, ShieldCheck, ArrowRight } from "lucide-react";
import { CalculatorState } from "../types";

interface CateringCalculatorProps {
  onQuoteRequested: (plan: "Silver" | "Gold" | "Platinum", headcount: number) => void;
}

// Custom SVG Icons matching the visual design exactly
const ServiceStaffIcon = () => (
  <svg className="w-8 h-8 text-[#b89547]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <circle cx="12" cy="7" r="3" />
    <path d="M6 14c0-2 1.5-3.5 4.5-3.5h3c3 0 4.5 1.5 4.5 3.5" strokeLinecap="round" />
    <path d="M4 18h16a1 1 0 0 1 1 1v2H3v-2a1 1 0 0 1 1-1z" />
    <circle cx="12" cy="15" r="0.75" fill="currentColor" />
  </svg>
);

const WarmersIcon = () => (
  <svg className="w-8 h-8 text-[#b89547]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <rect x="5" y="11" width="14" height="7" rx="1.5" />
    <path d="M9 11V9a1.5 1.5 0 0 1 3 0V11M12 11V9a1.5 1.5 0 0 1 3 0V11" />
    <path d="M7 18v2M17 18v2" strokeLinecap="round" />
    <path d="M9 6v2M12 5v3M15 6v2" strokeLinecap="round" />
  </svg>
);

const CrockeryIcon = () => (
  <svg className="w-8 h-8 text-[#b89547]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="6" strokeDasharray="2 2" />
    <circle cx="12" cy="12" r="4" />
  </svg>
);

const BuffetSetupIcon = () => (
  <svg className="w-8 h-8 text-[#b89547]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M5 16h14a1 1 0 0 0 1-1 7 7 0 0 0-16 0 1 1 0 0 0 1 1z" />
    <path d="M12 9V8" />
    <circle cx="12" cy="7.5" r="1" fill="currentColor" />
    <path d="M3 19h18" strokeLinecap="round" />
    <path d="M6 19v-2h12v2" />
  </svg>
);

const SilverBadge = () => (
  <div className="w-12 h-12 rounded-full bg-[#f4f2ee] border border-gray-200/50 flex items-center justify-center text-gray-500 shrink-0 shadow-inner">
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 11c0-2.5 1-4 4-4s4 1.5 4 4v5H5v-5z" strokeLinecap="round" />
      <path d="M12 16V4M12 7h5" strokeLinecap="round" />
      <path d="M19 16h-4a1 1 0 0 1-1-1v-2h6v2a1 1 0 0 1-1 1z" strokeLinecap="round" />
    </svg>
  </div>
);

const GoldBadge = () => (
  <div className="w-12 h-12 rounded-full bg-[#fdfaf5] border border-[#ebd2a0]/40 flex items-center justify-center text-[#b89547] shrink-0 shadow-inner">
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 21a9 9 0 0 0 0-18 9 9 0 0 1 0 18z" strokeLinecap="round" />
      <path d="M12 9a6 6 0 0 0-4-4" strokeLinecap="round" />
      <path d="M12 13a6 6 0 0 1 4-4" strokeLinecap="round" />
    </svg>
  </div>
);

const PlatinumBadge = () => (
  <div className="w-12 h-12 rounded-full bg-[#052316]/5 border border-[#ebd2a0]/40 flex items-center justify-center text-[#b89547] shrink-0 shadow-inner">
    <Crown className="w-5.5 h-5.5 stroke-[1.5]" />
  </div>
);

export default function CateringCalculator({ onQuoteRequested }: CateringCalculatorProps) {
  // Master state initialized to 5 Guests and Platinum Plan to EXACTLY match the attached visual on initial load
  const [state, setState] = React.useState<CalculatorState>({
    headcount: 5,
    plan: "Platinum",
    frequency: "single",
    addOnLiveStation: false,
    addOnDessert: false,
    addOnMocktails: false,
    addOnServers: false
  });

  // Calculate pricing based on the exact matrix in the pricing image
  const getBaseRate = (headcount: number, plan: "Silver" | "Gold" | "Platinum"): number => {
    if (headcount <= 10) {
      if (plan === "Silver") return 249;
      if (plan === "Gold") return 275;
      return 299;
    } else if (headcount <= 50) {
      if (plan === "Silver") return 175;
      if (plan === "Gold") return 199;
      return 225;
    } else if (headcount <= 100) {
      if (plan === "Silver") return 149;
      if (plan === "Gold") return 175;
      return 199;
    } else {
      if (plan === "Silver") return 125;
      if (plan === "Gold") return 150;
      return 175;
    }
  };

  const baseRate = getBaseRate(state.headcount, state.plan);

  // Inclusions information exactly mapping user request and images
  const planInclusions = {
    Silver: [
      "1 Premium Gravy + 1 Dry Veg",
      "Dal Tadka & Steamed Rice",
      "Tawa Roti & Fresh Salad"
    ],
    Gold: [
      "2 Main Gravies + 1 Dry Veg",
      "Dal Makhni & Jeera Rice",
      "Assorted Breads & Raita",
      "1 Artisanal Dessert"
    ],
    Platinum: [
      "1 Premium Gravy + 1 Dry Veg",
      "Dal, Raita & Papad",
      "Rice + Paratha/Chapati",
      "Signature sweet of the day",
      "Green Salad, Jaggery, Pickle, Chutney"
    ]
  };

  return (
    <div id="interactive-catering-estimator" className="space-y-20">
      
      {/* Outer grid layout matching the pixel-perfect layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-7xl mx-auto">
        
        {/* Left Column: Interactive Settings Form (7 cols) */}
        <div className="lg:col-span-7 bg-transparent rounded-none p-0 flex flex-col justify-between space-y-10">
          
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-2.5 text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#b89547]">
              <svg className="w-4 h-4 fill-[#b89547]/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 3c-1.5 3-4.5 4.5-8 4.5M12 3c1.5 3 4.5 4.5 8 4.5M12 3v18" strokeLinecap="round" />
              </svg>
              <div className="w-8 h-[1px] bg-[#ebd2a0]/40" />
              <span>CUSTOMIZE YOUR EVENT</span>
            </div>
            
            <h3 className="text-4xl md:text-5.5xl font-serif text-[#052316] tracking-tight leading-none font-light">
              Estimate Your <br className="hidden md:inline" />
              <span className="font-serif font-black text-[#d99a1f] italic block md:inline md:pl-2">Corporate Event</span>
            </h3>
            
            <p className="text-sm md:text-base text-[#052316]/75 leading-relaxed font-sans font-medium max-w-xl">
              Adjust the sliders to see how our tiered pricing works. The larger the headcount, the more value we provide per plate through operational efficiency.
            </p>
          </div>

          <div className="space-y-10 pt-2">
            
            {/* 1. DAILY HEADCOUNT */}
            <div className="space-y-4 text-left">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#052316]">
                  1. DAILY HEADCOUNT
                </span>
                
                {/* Guests capsule badge on right */}
                <div className="bg-[#fcfaf7] border border-[#ebd2a0]/35 text-[#b89547] px-4.5 py-2.5 rounded-xl text-xs sm:text-sm font-black flex items-center space-x-2 shadow-[0_2px_12px_rgba(184,149,71,0.04)] select-none">
                  <svg className="w-4 h-4 text-[#b89547]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span>{state.headcount} Guests</span>
                </div>
              </div>
              
              <div className="relative pt-2">
                <input
                  id="headcount-range-slider"
                  type="range"
                  min="5"
                  max="250"
                  step="5"
                  value={state.headcount}
                  onChange={(e) => setState({ ...state, headcount: parseInt(e.target.value) || 5 })}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer focus:outline-none bg-[#f3ede2] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#b89547] [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-[0_4px_12px_rgba(5,35,22,0.15)]"
                  style={{
                    background: `linear-gradient(to right, #b89547 ${((state.headcount - 5) / 245) * 100}%, #f3ede2 ${((state.headcount - 5) / 245) * 100}%)`
                  }}
                />
                <div className="flex justify-between text-[10px] font-mono uppercase tracking-[0.15em] text-[#052316]/40 mt-3 select-none">
                  <span className={state.headcount <= 25 ? "text-[#b89547] font-bold" : ""}>5 guests</span>
                  <span className={state.headcount > 25 && state.headcount <= 75 ? "text-[#b89547] font-bold" : ""}>50 guests</span>
                  <span className={state.headcount > 75 && state.headcount <= 150 ? "text-[#b89547] font-bold" : ""}>100 guests</span>
                  <span className={state.headcount > 150 ? "text-[#b89547] font-bold" : ""}>250+ guests</span>
                </div>
              </div>
            </div>

            {/* 2. CUISINE PACKAGE */}
            <div className="space-y-4 text-left">
              <span className="block text-xs font-mono font-bold uppercase tracking-widest text-[#052316]">
                2. CUISINE PACKAGE
              </span>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Silver pill button */}
                <button
                  id="cuisine-pills-silver"
                  onClick={() => setState({ ...state, plan: "Silver" })}
                  className={`flex items-center p-3 rounded-[1.3rem] border transition-all duration-300 text-left cursor-pointer ${
                    state.plan === "Silver"
                      ? "border-2 border-[#b89547] bg-[#FCFAF5] shadow-[0_8px_24px_rgba(184,149,71,0.06)]"
                      : "border-gray-200/70 bg-white hover:border-[#ebd2a0]/40 text-[#052316]"
                  }`}
                >
                  <SilverBadge />
                  <div className="ml-4">
                    <span className="block text-sm font-sans font-black tracking-tight text-[#052316]">
                      Silver
                    </span>
                  </div>
                </button>

                {/* Gold pill button */}
                <button
                  id="cuisine-pills-gold"
                  onClick={() => setState({ ...state, plan: "Gold" })}
                  className={`flex items-center p-3 rounded-[1.3rem] border transition-all duration-300 text-left cursor-pointer ${
                    state.plan === "Gold"
                      ? "border-2 border-[#b89547] bg-[#FCFAF5] shadow-[0_8px_24px_rgba(184,149,71,0.06)]"
                      : "border-gray-200/70 bg-white hover:border-[#ebd2a0]/40 text-[#052316]"
                  }`}
                >
                  <GoldBadge />
                  <div className="ml-4">
                    <span className="block text-sm font-sans font-black tracking-tight text-[#052316]">
                      Gold
                    </span>
                  </div>
                </button>

                {/* Platinum pill button */}
                <button
                  id="cuisine-pills-platinum"
                  onClick={() => setState({ ...state, plan: "Platinum" })}
                  className={`flex items-center p-3 rounded-[1.3rem] border transition-all duration-300 text-left cursor-pointer ${
                    state.plan === "Platinum"
                      ? "border-2 border-[#b89547] bg-[#FCFAF6] shadow-[0_8px_24px_rgba(184,149,71,0.08)]"
                      : "border-gray-200/70 bg-white hover:border-[#ebd2a0]/40 text-[#052316]"
                  }`}
                >
                  <PlatinumBadge />
                  <div className="ml-4">
                    <span className="block text-sm font-sans font-black tracking-tight text-[#052316]">
                      Platinum
                    </span>
                  </div>
                </button>

              </div>
            </div>

            {/* 3. QUICK PACK INCLUSIONS */}
            <div className="space-y-4 text-left">
              <span className="block text-xs font-mono font-bold tracking-widest uppercase text-[#b89547]">
                3. QUICK PACK INCLUSIONS ({state.plan.toUpperCase()} TIER)
              </span>
              
              <div className="rounded-[1.75rem] border border-[#f2ece0] bg-[#fbfaf7]/60 p-6 shadow-xs">
                <div className="flex flex-wrap gap-3">
                  {planInclusions[state.plan].map((inclusion, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center space-x-2.5 bg-white border border-[#f2ece0] rounded-full px-4.5 py-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.015)]"
                    >
                      <div className="w-5 h-5 rounded-full border border-[#b89547] flex items-center justify-center shrink-0 bg-[#b89547]/5">
                        <Check className="w-3.5 h-3.5 text-[#b89547] stroke-[3.5]" />
                      </div>
                      <span className="text-xs sm:text-sm font-sans font-bold text-[#052316]/85 tracking-wide">
                        {inclusion}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Cost Summary Receipt Widget (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center w-full lg:sticky lg:top-8">
          
          <div className="w-full bg-white rounded-[2.5rem] border border-[#ebd2a0]/40 shadow-[0_32px_80px_rgba(5,35,22,0.06)] hover:shadow-[0_40px_96px_rgba(5,35,22,0.1)] transition-all duration-500 overflow-hidden text-center flex flex-col justify-between">
            
            {/* Top decorative pine band */}
            <div className="bg-[#052316] py-5 flex items-center justify-center text-center relative border-b border-[#ebd2a0]/20 w-full px-4 rounded-t-[2.5rem]">
              {/* Star Estimate Summary Banner */}
              <div className="bg-[#b89547] text-white text-[10px] font-mono tracking-widest px-5 py-2 rounded-full uppercase font-bold flex items-center justify-center space-x-1.5 border border-[#ebd2a0]/20 shadow-md select-none">
                <svg className="w-3.5 h-3.5 text-white fill-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span>ESTIMATE SUMMARY</span>
              </div>
            </div>

            {/* Inner content container */}
            <div className="p-8 sm:p-10 flex flex-col justify-between space-y-8 bg-[#FCFAF7]/15">
              
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] uppercase font-mono tracking-[0.25em] text-gray-400 font-bold block select-none">
                    ESTIMATED PRICE PER PLATE
                  </span>
                  <div className="flex items-center justify-center space-x-1 text-[#052316] pt-3">
                    <span className="text-4xl md:text-6.5xl font-serif font-black tracking-tight leading-none overflow-hidden">
                      ₹{baseRate}
                    </span>
                  </div>
                </div>

                {/* Leaf separator line */}
                <div className="flex items-center justify-center space-x-4 my-2 text-[#ebd2a0]">
                  <div className="w-16 h-[1px] bg-[#f2ece0]" />
                  <span className="text-[#b89547]">
                    <svg className="w-4 h-4 fill-[#b89547]/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <path d="M12 3c-1.5 3-4.5 4.5-8 4.5M12 3c1.5 3 4.5 4.5 8 4.5M12 3v18" strokeLinecap="round" />
                    </svg>
                  </span>
                  <div className="w-16 h-[1px] bg-[#f2ece0]" />
                </div>

                <p className="text-sm text-gray-500 leading-relaxed font-sans font-medium px-2 sm:px-4">
                  Based on daily service for <span className="font-sans font-black text-[#052316]">{state.headcount} guests</span> ({state.plan} Tier), includes premium service staffing, custom brass-fitted warmers, ceramic crockery, and tailored buffet setup.
                </p>
              </div>

              {/* Grid with 4 beautiful columns inside border */}
              <div className="grid grid-cols-4 border border-[#f2ece0] rounded-2.5xl divide-x divide-[#f2ece0] bg-[#fdfcf9] py-5 shadow-xs select-none">
                
                {/* Prop 1 */}
                <div className="flex flex-col items-center justify-center px-1">
                  <ServiceStaffIcon />
                  <span className="text-[8.5px] font-sans font-bold uppercase text-gray-500 tracking-wider text-center leading-tight mt-2.5 px-0.5">
                    Premium <br />Staff
                  </span>
                </div>

                {/* Prop 2 */}
                <div className="flex flex-col items-center justify-center px-1">
                  <WarmersIcon />
                  <span className="text-[8.5px] font-sans font-bold uppercase text-gray-500 tracking-wider text-center leading-tight mt-2.5 px-0.5">
                    Brass-Fitted <br />Warmers
                  </span>
                </div>

                {/* Prop 3 */}
                <div className="flex flex-col items-center justify-center px-1">
                  <CrockeryIcon />
                  <span className="text-[8.5px] font-sans font-bold uppercase text-gray-500 tracking-wider text-center leading-tight mt-2.5 px-0.5">
                    Ceramic <br />Crockery
                  </span>
                </div>

                {/* Prop 4 */}
                <div className="flex flex-col items-center justify-center px-1">
                  <BuffetSetupIcon />
                  <span className="text-[8.5px] font-sans font-bold uppercase text-gray-500 tracking-wider text-center leading-tight mt-2.5 px-0.5">
                    Tailored <br />Setup
                  </span>
                </div>

              </div>

              {/* Dashed lines */}
              <div className="border-t border-dashed border-[#e6dfd1] my-1" />

              {/* Call to action Request Button */}
              <div className="space-y-4">
                <button
                  id="calculator-request-quote-btn"
                  onClick={() => onQuoteRequested(state.plan, state.headcount)}
                  className="w-full py-4.5 bg-[#a38743] hover:bg-[#052316] text-[#fcFAF5] font-sans font-bold text-xs tracking-widest uppercase rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2.5 cursor-pointer active:scale-[0.98] group/btn"
                >
                  <span className="font-black font-sans tracking-widest">REQUEST EXACT QUOTE</span>
                  <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                </button>

                {/* Shield sub text */}
                <div className="flex items-center justify-center space-x-1.5 text-xs text-gray-400 font-bold select-none">
                  <ShieldCheck className="w-4 h-4 text-[#b89547]" />
                  <span>No hidden charges. Transparent pricing.</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Footer alert message bar */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#fcfaf7] border border-[#ebd2a0]/25 rounded-2xl py-3.5 px-5 flex items-center justify-center space-x-3 text-[11px] sm:text-xs text-[#052316]/70 font-sans font-medium">
          <Info className="w-4 h-4 text-[#b89547] shrink-0" />
          <span>Final pricing may vary based on location, menu customization, and additional service requirements.</span>
        </div>
      </div>

      {/* Interactive Matrix Scale Table */}
      <div id="pricing-matrix-scale-table" className="space-y-8 max-w-6xl mx-auto pt-10 px-4 sm:px-0">
        
        <div className="text-center space-y-4">
          {/* Compass / Dial Badge */}
          <div className="flex items-center justify-center space-x-2.5 text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#b89547] select-none">
            <div className="w-5 h-[1.5px] bg-[#b89547]/55" />
            <svg className="w-4 h-4 text-[#b89547]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
            <span>TRANSPARENT PRICING</span>
            <div className="w-5 h-[1.5px] bg-[#b89547]/55" />
          </div>

          <h2 className="text-4xl md:text-5.5xl font-serif text-[#052316] tracking-tight leading-none text-center select-none">
            Tiered Pricing <span className="font-serif italic font-black text-[#d99a1f] pr-1">Architecture</span>
          </h2>

          {/* Leaf / Branch ornamental motif */}
          <div className="flex items-center justify-center space-x-3 text-[#b89547]/50 pt-1">
            <div className="w-10 h-[1.5px] bg-[#ebd2a0]/40" />
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 3c-1.5 3-4.5 4.5-8 4.5M12 3c1.5 3 4.5 4.5 8 4.5M12 3v18" strokeLinecap="round" />
            </svg>
            <div className="w-10 h-[1.5px] bg-[#ebd2a0]/40" />
          </div>

          <p className="text-sm md:text-base text-[#052316]/70 font-sans max-w-2xl mx-auto tracking-wide leading-relaxed font-semibold text-center">
            Economies of scale designed for modern workplace environments.
          </p>
        </div>

        {/* Unified clean card wrapper */}
        <div className="bg-white border-2 border-[#ebd2a0]/40 rounded-[2.5rem] shadow-[0_24px_56px_rgba(33,52,43,0.04)] p-5 sm:p-7 pt-10 sm:pt-12 relative overflow-visible max-w-5xl mx-auto">
          
          {/* Decorative Meals Price List Header Pill exactly matching the image */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#fdfcf9] px-6 sm:px-10 py-2.5 sm:py-3.5 border-2 border-[#ebd2a0] rounded-3xl shadow-sm z-20 flex items-center space-x-4 select-none">
            {/* Left Branch Ornament */}
            <div className="flex items-center space-x-1 shrink-0">
              <div className="w-1.5 h-1.5 bg-[#d99a1f] rounded-full" />
              <svg className="w-5 h-3.5 text-[#d99a1f]" viewBox="0 0 24 16" fill="currentColor">
                <path d="M12 8c-3-3-7-3-10 0 3 3 7 3 10 0z M9 4c-2.5-2.5-6-2.5-8.5 0 2.5 2.5 6 2.5 8.5 0z M9 12c-2.5-2.5-6-2.5-8.5 0 2.5 2.5 6 2.5 8.5 0z" />
              </svg>
            </div>
            
            <h3 className="font-serif font-black text-xl sm:text-2xl text-[#052316] tracking-[0.08em] whitespace-nowrap">
              MEALS PRICE LIST
            </h3>
            
            {/* Right Branch Ornament */}
            <div className="flex items-center space-x-1 shrink-0">
              <svg className="w-5 h-3.5 text-[#d99a1f] transform scale-x-[-1]" viewBox="0 0 24 16" fill="currentColor">
                <path d="M12 8c-3-3-7-3-10 0 3 3 7 3 10 0z M9 4c-2.5-2.5-6-2.5-8.5 0 2.5 2.5 6 2.5 8.5 0z M9 12c-2.5-2.5-6-2.5-8.5 0 2.5 2.5 6 2.5 8.5 0z" />
              </svg>
              <div className="w-1.5 h-1.5 bg-[#d99a1f] rounded-full" />
            </div>
          </div>

          <div className="overflow-x-auto rounded-[2rem] border border-[#ebd2a0]/30 bg-[#fdfcf9] mt-2">
            <table className="w-full text-left font-sans text-xs sm:text-sm border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[#052316] text-white uppercase text-[10px] tracking-widest border-b border-[#ebd2a0]/20 select-none divide-x divide-white/10">
                  
                  {/* Category header column */}
                  <th className="py-6 px-6 font-sans font-bold text-left w-1/3">
                    <div className="flex items-center space-x-2.5">
                      <svg className="w-4.5 h-4.5 text-[#ebd2a0] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      <span>NUMBER OF PERSONS</span>
                    </div>
                  </th>

                  {/* Silver Column */}
                  <th className="py-6 px-4 font-sans font-semibold text-center w-2/9">
                    <div className="flex items-center justify-center space-x-2.5 text-center">
                      <svg className="w-5.5 h-5.5 text-[#ebd2a0] shrink-0 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M3 16h18" strokeLinecap="round" />
                        <path d="M5 16a7 7 0 0 1 14 0" fill="none" />
                        <path d="M12 9V7" strokeLinecap="round" />
                        <circle cx="12" cy="6.5" r="1.2" fill="currentColor" />
                      </svg>
                      <div className="text-left leading-tight">
                        <span className="block text-xs font-sans font-black tracking-widest text-white uppercase">SILVER (₹)</span>
                        <span className="block text-[8px] font-mono text-gray-400 tracking-wider font-semibold uppercase">ESSENTIAL LUXURY</span>
                      </div>
                    </div>
                  </th>

                  {/* Gold Column with MOST POPULAR overlapping badge */}
                  <th className="py-6 px-4 font-sans font-semibold text-center w-2/9 relative bg-[#052316]/95">
                    {/* ★ MOST POPULAR pill badge exactly centered horizontally above table row */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#b89547] text-white text-[9px] font-mono tracking-widest px-4.5 py-1.5 rounded-full uppercase font-black flex items-center justify-center space-x-1 border border-[#ebd2a0]/40 shadow-md whitespace-nowrap z-30">
                      <svg className="w-2.5 h-2.5 text-white fill-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span>MOST POPULAR</span>
                    </div>

                    <div className="flex items-center justify-center space-x-2.5 text-center">
                      <svg className="w-5.5 h-5.5 text-[#ebd2a0] shrink-0 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M3 16h18" strokeLinecap="round" />
                        <path d="M5 16a7 7 0 0 1 14 0" fill="none" />
                        <path d="M12 9V7" strokeLinecap="round" />
                        <circle cx="12" cy="6.5" r="1.2" fill="currentColor" />
                      </svg>
                      <div className="text-left leading-tight">
                        <span className="block text-xs font-sans font-black tracking-widest text-[#ebd2a0] uppercase">GOLD (₹)</span>
                        <span className="block text-[8px] font-mono text-gray-400 tracking-wider font-bold uppercase">SIGNATURE HOSPITALITY</span>
                      </div>
                    </div>
                  </th>

                  {/* Platinum Column */}
                  <th className="py-6 px-4 font-sans font-semibold text-center w-2/9">
                    <div className="flex items-center justify-center space-x-2.5 text-center">
                      <svg className="w-5.5 h-5.5 text-[#ebd2a0] shrink-0 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M3 16h18" strokeLinecap="round" />
                        <path d="M5 16a7 7 0 0 1 14 0" fill="none" />
                        <path d="M12 9V7" strokeLinecap="round" />
                        <circle cx="12" cy="6.5" r="1.2" fill="currentColor" />
                      </svg>
                      <div className="text-left leading-tight">
                        <span className="block text-xs font-sans font-black tracking-widest text-white uppercase">PLATINUM (₹)</span>
                        <span className="block text-[8px] font-mono text-gray-400 tracking-wider font-bold uppercase">EXECUTIVE SUITE</span>
                      </div>
                    </div>
                  </th>

                </tr>
              </thead>
              <tbody className="divide-y divide-[#ebd2a0]/15 text-[#052316] font-sans">
                
                {/* Row 1: 0 - 10 Guests (Boutique Service) */}
                {(() => {
                  const isActive = state.headcount <= 10;
                  return (
                    <tr className={`transition-all duration-300 divide-x divide-[#ebd2a0]/10 ${
                      isActive ? "bg-[#fcfaf5]" : "hover:bg-[#fcfaf7]/50"
                    }`}>
                      <td className={`py-5 px-6 font-medium ${isActive ? "border-l-4 border-l-[#b89547]" : "border-l-4 border-l-transparent"}`}>
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${
                            isActive ? "bg-[#b89547]/10 border-[#b89547]/40" : "bg-[#ebd2a0]/5 border-[#ebd2a0]/20"
                          }`}>
                            <svg className="w-5 h-5 text-[#b89547]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                              <circle cx="9" cy="7" r="4" />
                            </svg>
                          </div>
                          <div className="text-left select-none">
                            <span className="block text-sm sm:text-base font-serif font-black text-[#052316]">
                              0 - 10
                            </span>
                            <span className="block text-[10px] sm:text-xs text-gray-400 font-sans mt-0.5 font-medium">
                              Boutique Service
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-center font-serif font-bold text-sm sm:text-base md:text-lg text-[#052316]/85">₹249</td>
                      <td className="py-5 px-6 text-center font-serif font-bold text-sm sm:text-base md:text-lg text-[#b89547]">₹275</td>
                      <td className="py-5 px-6 text-center font-serif font-bold text-sm sm:text-base md:text-lg text-[#052316]/85">₹299</td>
                    </tr>
                  );
                })()}

                {/* Row 2: 11 - 50 Guests (Standard Corporate) */}
                {(() => {
                  const isActive = state.headcount > 10 && state.headcount <= 50;
                  return (
                    <tr className={`transition-all duration-300 divide-x divide-[#ebd2a0]/10 ${
                      isActive ? "bg-[#fcfaf5]" : "hover:bg-[#fcfaf7]/50"
                    }`}>
                      <td className={`py-5 px-6 font-medium ${isActive ? "border-l-4 border-l-[#b89547]" : "border-l-4 border-l-transparent"}`}>
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${
                            isActive ? "bg-[#b89547]/10 border-[#b89547]/40" : "bg-[#ebd2a0]/5 border-[#ebd2a0]/20"
                          }`}>
                            <svg className="w-5 h-5 text-[#b89547]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                              <circle cx="9" cy="7" r="4" />
                            </svg>
                          </div>
                          <div className="text-left select-none">
                            <span className="block text-sm sm:text-base font-serif font-black text-[#052316]">
                              11 - 50
                            </span>
                            <span className="block text-[10px] sm:text-xs text-gray-400 font-sans mt-0.5 font-medium">
                              Standard Corporate
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-center font-serif font-bold text-sm sm:text-base md:text-lg text-[#052316]/85">₹175</td>
                      <td className="py-5 px-6 text-center font-serif font-bold text-sm sm:text-base md:text-lg text-[#b89547]">₹199</td>
                      <td className="py-5 px-6 text-center font-serif font-bold text-sm sm:text-base md:text-lg text-[#052316]/85">₹225</td>
                    </tr>
                  );
                })()}

                {/* Row 3: 51 - 100 Guests (Departmental Events) */}
                {(() => {
                  const isActive = state.headcount > 50 && state.headcount <= 100;
                  return (
                    <tr className={`transition-all duration-300 divide-x divide-[#ebd2a0]/10 ${
                      isActive ? "bg-[#fcfaf5]" : "hover:bg-[#fcfaf7]/50"
                    }`}>
                      <td className={`py-5 px-6 font-medium ${isActive ? "border-l-4 border-l-[#b89547]" : "border-l-4 border-l-transparent"}`}>
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${
                            isActive ? "bg-[#b89547]/10 border-[#b89547]/40" : "bg-[#ebd2a0]/5 border-[#ebd2a0]/20"
                          }`}>
                            <svg className="w-5 h-5 text-[#b89547]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                              <circle cx="9" cy="7" r="4" />
                            </svg>
                          </div>
                          <div className="text-left select-none">
                            <span className="block text-sm sm:text-base font-serif font-black text-[#052316]">
                              51 - 100
                            </span>
                            <span className="block text-[10px] sm:text-xs text-gray-400 font-sans mt-0.5 font-medium">
                              Departmental Events
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-center font-serif font-bold text-sm sm:text-base md:text-lg text-[#052316]/85">₹149</td>
                      <td className="py-5 px-6 text-center font-serif font-bold text-sm sm:text-base md:text-lg text-[#b89547]">₹175</td>
                      <td className="py-5 px-6 text-center font-serif font-bold text-sm sm:text-base md:text-lg text-[#052316]/85">₹199</td>
                    </tr>
                  );
                })()}

                {/* Row 4: 101+ Guests (Townhalls & Conferences) */}
                {(() => {
                  const isActive = state.headcount > 100;
                  return (
                    <tr className={`transition-all duration-300 divide-x divide-[#ebd2a0]/10 ${
                      isActive ? "bg-[#fcfaf5]" : "hover:bg-[#fcfaf7]/50"
                    }`}>
                      <td className={`py-5 px-6 font-medium ${isActive ? "border-l-4 border-l-[#b89547]" : "border-l-4 border-l-transparent"}`}>
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${
                            isActive ? "bg-[#b89547]/10 border-[#b89547]/40" : "bg-[#ebd2a0]/5 border-[#ebd2a0]/20"
                          }`}>
                            <svg className="w-5 h-5 text-[#b89547]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                              <circle cx="9" cy="7" r="4" />
                            </svg>
                          </div>
                          <div className="text-left select-none">
                            <span className="block text-sm sm:text-base font-serif font-black text-[#052316]">
                              101 +
                            </span>
                            <span className="block text-[10px] sm:text-xs text-gray-400 font-sans mt-0.5 font-medium">
                              Townhalls & Conferences
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-center font-serif font-bold text-sm sm:text-base md:text-lg text-[#052316]/85">₹125</td>
                      <td className="py-5 px-6 text-center font-serif font-bold text-sm sm:text-base md:text-lg text-[#b89547]">₹150</td>
                      <td className="py-5 px-6 text-center font-serif font-bold text-sm sm:text-base md:text-lg text-[#052316]/85">₹175</td>
                    </tr>
                  );
                })()}

              </tbody>
            </table>
          </div>

          {/* Table Centered Highlight Pill for Key terms: Prices are per person | Taxes extra as applicable */}
          <div className="mt-5 flex items-center justify-center space-x-2.5 py-1.5 px-4 bg-[#fcfaf5] border border-[#ebd2a0]/20 rounded-full max-w-lg mx-auto select-none shadow-3xs">
            <svg className="w-4 h-4 text-[#052316]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[11px] sm:text-xs font-semibold text-[#052316]/80 tracking-wide font-sans">
              Prices are per person <span className="mx-2 text-gray-300">|</span> Taxes extra as applicable
            </span>
          </div>

          {/* Interactive Bottom Box Panel (TCH BOX + LIVE, SAME PRICE AS ABOVE, LABOUR CHARGES) */}
          <div className="mt-8 bg-[#fdfbf7] border border-[#f2ece0] rounded-[1.75rem] p-5 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[#f2ece0] shadow-2xs select-none">
            
            {/* Box 1 (Left): TCH BOX + LIVE */}
            <div className="flex items-center justify-center md:justify-start space-x-3.5 w-full md:w-1/3 pb-4 md:pb-0 md:pr-6 md:pl-2">
              <div className="w-10 h-10 rounded-full bg-[#052316] flex items-center justify-center text-[#ebd2a0] shrink-0 shadow-inner">
                <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-sans font-black tracking-wider text-[#052316]">
                TCH BOX + LIVE
              </span>
            </div>

            {/* Box 2 (Center): SAME PRICE AS ABOVE */}
            <div className="w-full md:w-1/3 text-center py-4 md:py-0 md:px-4 flex items-center justify-center">
              <span className="text-xs sm:text-sm font-sans font-black tracking-widest text-[#b89547]">
                SAME PRICE AS ABOVE
              </span>
            </div>

            {/* Box 3 (Right): LABOUR CHARGES */}
            <div className="flex items-center justify-center md:justify-end space-x-3.5 w-full md:w-1/3 pt-4 md:pt-0 md:pl-6 md:pr-2">
              <div className="w-7 h-7 rounded-full border-2 border-[#b89547] flex items-center justify-center text-[#b89547] bg-transparent shrink-0">
                <span className="text-sm font-black leading-none">+</span>
              </div>
              <span className="text-xs sm:text-sm font-sans font-black tracking-wider text-[#052316]">
                LABOUR CHARGES
              </span>
            </div>

          </div>

        </div>
        
        {/* Footnote with Shield Icon */}
        <div className="mt-4 flex items-center justify-center space-x-2 text-[10px] sm:text-xs text-gray-400 font-bold select-none text-center">
          <svg className="w-4 h-4 text-[#b89547] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 11l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Transportation charges apply based on distance from central kitchen. All calculation systems are integrated.</span>
        </div>

      </div>

    </div>
  );
}
