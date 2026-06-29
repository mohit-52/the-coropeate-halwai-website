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
      "1 Gravy Curry",
      "Dal Makhni / Raita",
      "Steam Rice",
      "Fresh Tawa Chapati",
      "Regular Salad, Jaggery Cubes, Pickle, Chutney"
    ],
    Gold: [
      "1 Premium Gravy",
      "1 Dry Seasonal Veg",
      "Dal Makhni",
      "Boondi Raita / Veg Raita",
      "Jeera Rice",
      "Fresh Tawa Chapati",
      "Green Salad, Jaggery, Pickle, Chutney"
    ],
    Platinum: [
      "1 Premium Gravy",
      "1 Dry Seasonal Veg",
      "Dal Makhni",
      "Boondi Raita / Veg Raita",
      "Jeera Rice",
      "Fresh Tawa Chapati & Laccha Paratha",
      "Papad",
      "Choice of Sweets (Mentioned in Menu)",
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
                    SELECTED PLAN LEVEL
                  </span>
                  <div className="flex items-center justify-center space-x-1 text-[#052316] pt-3">
                    <span className="text-3xl md:text-5xl font-serif font-black tracking-tight leading-none overflow-hidden text-[#b89547]">
                      {state.plan}
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
                  Based on daily service for <span className="font-sans font-black text-[#052316]">{state.headcount} guests</span>. Includes premium service staffing, custom brass-fitted warmers, ceramic crockery, and tailored buffet setup.
                </p>
              </div>

              {/* Grid with 4 beautiful columns inside border */}
              <div className="grid grid-cols-2 sm:grid-cols-4 border border-[#f2ece0] rounded-2.5xl sm:divide-x divide-[#f2ece0] bg-[#fdfcf9] py-4 sm:py-5 shadow-xs select-none gap-y-4 sm:gap-y-0">
                
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
                  <span className="font-black font-sans tracking-widest">REQUEST CUSTOM QUOTE</span>
                  <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                </button>

                {/* Shield sub text */}
                <div className="flex items-center justify-center space-x-1.5 text-xs text-gray-400 font-bold select-none">
                  <ShieldCheck className="w-4 h-4 text-[#b89547]" />
                  <span>Custom menu. Professional service. Consistent quality.</span>
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
          <span>Final details may vary based on location, menu customization, and additional service requirements.</span>
        </div>
      </div>

      {/* Pricing Matrix Table removed per user request */}
    </div>
  );
}
