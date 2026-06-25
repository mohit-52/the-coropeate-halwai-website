import React from "react";
import { BookingFormState, SavedInquiry } from "../types";
import { 
  X, 
  CheckCircle, 
  Sparkles, 
  Calendar, 
  ShieldCheck, 
  Headphones, 
  ChevronDown, 
  ArrowRight,
  ClipboardCheck
} from "lucide-react";
import { motion } from "motion/react";
import TCHLogo from "./TCHLogo";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledPlan?: "Silver" | "Gold" | "Platinum";
  prefilledHeadcount?: number;
}

export default function BookingModal({ isOpen, onClose, prefilledPlan, prefilledHeadcount }: BookingModalProps) {
  const [formData, setFormData] = React.useState<BookingFormState>({
    fullName: "",
    corporateEmail: "",
    companyName: "",
    phoneNumber: "",
    eventDate: "",
    headcount: prefilledHeadcount || 50,
    plan: prefilledPlan || "Gold",
    specialInstructions: ""
  });

  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [createdRecord, setCreatedRecord] = React.useState<SavedInquiry | null>(null);

  // Synchronize prefilled values
  React.useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        plan: prefilledPlan || prev.plan,
        headcount: prefilledHeadcount || prev.headcount
      }));
      setIsSubmitted(false);
    }
  }, [isOpen, prefilledPlan, prefilledHeadcount]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Rates mapping for calculating simulated quotes on-the-fly
    const rates: Record<string, number> = { Silver: 249, Gold: 275, Platinum: 299 };
    const baseRate = rates[formData.plan];
    
    // Scale rates by headcount
    let adjustedRate = baseRate;
    if (formData.headcount > 100) adjustedRate = baseRate - 15;
    else if (formData.headcount > 50) adjustedRate = baseRate - 10;
    else if (formData.headcount <= 10) adjustedRate = baseRate + 50;

    const estimatedTotal = adjustedRate * formData.headcount;

    const newInquiry: SavedInquiry = {
      ...formData,
      id: `TCH-${Math.floor(1000 + Math.random() * 9000)}`,
      submittedAt: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      status: "Tasting Scheduled",
      estimatedPricePerPlate: adjustedRate,
      estimatedTotal: estimatedTotal
    };

    // Save to local storage
    const existing: SavedInquiry[] = JSON.parse(localStorage.getItem("tch_inquiries") || "[]");
    localStorage.setItem("tch_inquiries", JSON.stringify([newInquiry, ...existing]));

    setCreatedRecord(newInquiry);
    setIsSubmitted(true);

    // Trigger local storage custom event to refresh inquiry lists
    window.dispatchEvent(new Event("tch_inquiries_updated"));
  };

  // Close when clicking directly on overlay
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLElement && e.target.id === "booking-modal-overlay") {
      onClose();
    }
  };

  return (
    <motion.div
      id="booking-modal-overlay"
      onClick={handleOverlayClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <motion.div
        id="booking-modal-content"
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative bg-[#0d231c] rounded-[2rem] shadow-2xl border border-[#ebd2a0]/20 w-full max-w-4xl overflow-hidden max-h-[92vh] flex flex-col md:flex-row"
      >
        
        {/* LEFT COLUMN: BRAND & VALUE HIGHLIGHTS */}
        <div 
          id="booking-modal-left-panel"
          className="relative w-full md:w-[38%] bg-[#061c13] p-8 md:p-10 flex flex-col justify-between overflow-hidden border-b md:border-b-0 md:border-r border-[#ebd2a0]/10"
        >
          {/* Subtle decorative dot grid background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
            backgroundImage: "radial-gradient(#ebd2a0 1px, transparent 1px)",
            backgroundSize: "20px 20px"
          }} />

          {/* Premium semi-transparent cutlery/watermark asset */}
          <div className="absolute right-[-15%] bottom-[-5%] w-56 h-56 opacity-[0.06] text-[#ebd2a0] pointer-events-none rotate-12">
            <TCHLogo className="w-full h-full" />
          </div>

          <div className="relative z-10 space-y-6">
            {/* Elegant Header Text styling mimicking screenshot */}
            <div className="space-y-1">
              <h2 className="font-serif font-black text-2xl md:text-3xl tracking-wider text-[#ebd2a0] uppercase leading-none">
                THE
              </h2>
              <h2 className="font-serif font-black text-2xl md:text-3xl tracking-wider text-[#ebd2a0] uppercase leading-none">
                CORPORATE
              </h2>
              <h2 className="font-serif font-black text-2xl md:text-3xl tracking-wider text-[#ebd2a0] uppercase leading-none">
                HALWAI
              </h2>
            </div>

            {/* Custom subtle gold divider line */}
            <div className="w-16 border-t-2 border-[#ebd2a0]/45" />

            {/* Slogan */}
            <p className="text-white/90 text-sm md:text-base font-medium tracking-wide">
              Elevating Corporate Gastronomy
            </p>
          </div>

          {/* Core dynamic value proposition items with custom aesthetic bullet formatting */}
          <div className="relative z-10 mt-10 md:mt-16 space-y-5">
            <div className="flex items-center space-x-3.5">
              <div id="badge-icon-iso" className="flex items-center justify-center w-8 h-8 rounded-full bg-[#132d20]/50 border border-[#ebd2a0]/20">
                <ShieldCheck className="w-4 h-4 text-[#ebd2a0]" />
              </div>
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#ebd2a0]/90 uppercase">
                ISO 22000 CERTIFIED
              </span>
            </div>

            <div className="flex items-center space-x-3.5">
              <div id="badge-icon-bespoke" className="flex items-center justify-center w-8 h-8 rounded-full bg-[#132d20]/50 border border-[#ebd2a0]/20">
                <Sparkles className="w-4 h-4 text-[#ebd2a0]" />
              </div>
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#ebd2a0]/90 uppercase">
                BESPOKE MENUS
              </span>
            </div>

            <div className="flex items-center space-x-3.5">
              <div id="badge-icon-concierge" className="flex items-center justify-center w-8 h-8 rounded-full bg-[#132d20]/50 border border-[#ebd2a0]/20">
                <Headphones className="w-4 h-4 text-[#ebd2a0]" />
              </div>
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#ebd2a0]/90 uppercase">
                ELITE CONCIERGE
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE FORM CONTAINER */}
        <div 
          id="booking-modal-right-panel"
          className="relative w-full md:w-[62%] bg-[#081e15] p-8 md:p-10 flex flex-col justify-between overflow-y-auto max-h-[80vh] md:max-h-none"
        >
          {/* Pristine Minimalist Floating Close X Button */}
          <button
            id="close-booking-modal-btn"
            onClick={onClose}
            className="absolute top-6 right-6 p-1.5 rounded-full text-[#ebd2a0]/60 hover:text-white hover:bg-white/5 transition-all z-20"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {!isSubmitted ? (
            <form id="catering-inquiry-form" onSubmit={handleSubmit} className="space-y-5 pr-1">
              
              {/* Form parameters in a pristine symmetrical grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                
                {/* FULL NAME */}
                <div id="form-group-fn">
                  <label className="block text-[10px] font-bold tracking-widest text-[#ebd2a0]/90 uppercase mb-1.5">
                    FULL NAME <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Arjun Sharma"
                    className="w-full bg-[#0d231c] border-2 border-[#1c4333] hover:border-[#214f3b] rounded-xl px-4 py-3 text-sm text-[#fcfaf7] focus:outline-none focus:border-[#ebd2a0] focus:ring-0 transition-all font-medium placeholder-[#2c5243]"
                  />
                </div>

                {/* COMPANY NAME */}
                <div id="form-group-cn">
                  <label className="block text-[10px] font-bold tracking-widest text-[#ebd2a0]/90 uppercase mb-1.5">
                    COMPANY NAME <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="TechCorp Solutions"
                    className="w-full bg-[#0d231c] border-2 border-[#1c4333] hover:border-[#214f3b] rounded-xl px-4 py-3 text-sm text-[#fcfaf7] focus:outline-none focus:border-[#ebd2a0] focus:ring-0 transition-all font-medium placeholder-[#2c5243]"
                  />
                </div>

                {/* MOBILE NUMBER */}
                <div id="form-group-tel">
                  <label className="block text-[10px] font-bold tracking-widest text-[#ebd2a0]/90 uppercase mb-1.5">
                    MOBILE NUMBER <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-[#0d231c] border-2 border-[#1c4333] hover:border-[#214f3b] rounded-xl px-4 py-3 text-sm text-[#fcfaf7] focus:outline-none focus:border-[#ebd2a0] focus:ring-0 transition-all font-medium placeholder-[#2c5243]"
                  />
                </div>

                {/* CORPORATE EMAIL */}
                <div id="form-group-em">
                  <label className="block text-[10px] font-bold tracking-widest text-[#ebd2a0]/90 uppercase mb-1.5">
                    CORPORATE EMAIL <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.corporateEmail}
                    onChange={(e) => setFormData({ ...formData, corporateEmail: e.target.value })}
                    placeholder="arjun@techcorp.com"
                    className="w-full bg-[#0d231c] border-2 border-[#1c4333] hover:border-[#214f3b] rounded-xl px-4 py-3 text-sm text-[#fcfaf7] focus:outline-none focus:border-[#ebd2a0] focus:ring-0 transition-all font-medium placeholder-[#2c5243]"
                  />
                </div>

                {/* EVENT DATE */}
                <div id="form-group-dt">
                  <label className="block text-[10px] font-bold tracking-widest text-[#ebd2a0]/90 uppercase mb-1.5">
                    EVENT DATE <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full bg-[#0d231c] border-2 border-[#1c4333] hover:border-[#214f3b] rounded-xl px-4 py-3 text-sm text-[#fcfaf7] focus:outline-none focus:border-[#ebd2a0] focus:ring-0 transition-all font-medium appearance-none [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* NUMBER OF GUESTS */}
                <div id="form-group-hc">
                  <label className="block text-[10px] font-bold tracking-widest text-[#ebd2a0]/90 uppercase mb-1.5">
                    NUMBER OF GUESTS <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min={10}
                    max={10000}
                    value={formData.headcount}
                    onChange={(e) => setFormData({ ...formData, headcount: parseInt(e.target.value) || 10 })}
                    placeholder="Select headcount"
                    className="w-full bg-[#0d231c] border-2 border-[#1c4333] hover:border-[#214f3b] rounded-xl px-4 py-3 text-sm text-[#fcfaf7] focus:outline-none focus:border-[#ebd2a0] focus:ring-0 transition-all font-medium placeholder-[#2c5243]"
                  />
                </div>

              </div>

              {/* CATERING TYPE select field */}
              <div id="form-group-plan" className="w-full">
                <label className="block text-[10px] font-bold tracking-widest text-[#ebd2a0]/90 uppercase mb-1.5">
                  CATERING TYPE <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.plan}
                    onChange={(e) => setFormData({ ...formData, plan: e.target.value as any })}
                    className="w-full bg-[#0d231c] border-2 border-[#1c4333] hover:border-[#214f3b] rounded-xl px-4 py-3 text-sm text-[#fcfaf7] focus:outline-none focus:border-[#ebd2a0] focus:ring-0 transition-all font-medium appearance-none cursor-pointer"
                  >
                    <option value="Silver" className="bg-[#0c201a]">Silver (Essential Halwai Delights)</option>
                    <option value="Gold" className="bg-[#0c201a]">Gold (Signature Traditional Banquet)</option>
                    <option value="Platinum" className="bg-[#0c201a]">Platinum (Executive Bespoke Craft)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                    <ChevronDown className="w-5 h-5 text-[#ebd2a0]" />
                  </div>
                </div>
              </div>

              {/* SPECIAL INSTRUCTIONS */}
              <div id="form-group-notes">
                <label className="block text-[10px] font-bold tracking-widest text-[#ebd2a0]/90 uppercase mb-1.5">
                  SPECIAL INSTRUCTIONS / DIETARY PREFERENCES
                </label>
                <textarea
                  rows={2}
                  value={formData.specialInstructions}
                  onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                  placeholder="e.g. Vegetarian workspace, live clayoven setup or sugar-free desserts..."
                  className="w-full bg-[#0d231c] border-2 border-[#1c4333] hover:border-[#214f3b] rounded-xl px-4 py-2.5 text-sm text-[#fcfaf7] focus:outline-none focus:border-[#ebd2a0] focus:ring-0 transition-all font-medium resize-none placeholder-[#2c5243]"
                />
              </div>

              {/* Golden Yellow rounded pill Submit Button with Glow */}
              <div className="pt-2">
                <button
                  id="submit-catering-inquiry-btn"
                  type="submit"
                  className="w-full py-4 bg-[#d99a1f] hover:bg-[#ebd2a0] active:scale-[0.99] text-[#051c13] font-black text-xs rounded-full shadow-[0_0_20px_rgba(217,154,31,0.35)] hover:shadow-[0_0_30px_rgba(217,154,31,0.6)] hover:scale-[1.01] transition-all tracking-widest uppercase flex items-center justify-center space-x-2 border border-[#ebd2a0]/40"
                >
                  <span>REQUEST A PROPOSAL</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>

              {/* Dynamic bottom subtext */}
              <p className="text-[9px] md:text-[10px] tracking-widest text-center text-white/55 uppercase font-semibold">
                OUR CULINARY CONSULTANT WILL REACH OUT WITHIN 2 BUSINESS HOURS.
              </p>

            </form>
          ) : (
            /* IMMACULATE SUCCESS CONFIRMATION PANEL */
            <div id="booking-success-confirmation" className="text-center py-6 md:py-10 space-y-6 animate-scale-up flex flex-col justify-center items-center h-full">
              
              <div className="flex justify-center">
                <div className="p-4 bg-emerald-900/40 rounded-full border border-emerald-500/30">
                  <CheckCircle className="w-12 h-12 text-emerald-400" />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-2xl font-serif font-black text-white tracking-wide">
                  Proposal Submitted!
                </h4>
                <p className="text-sm text-white/80 max-w-md mx-auto leading-relaxed">
                  Your tracking ID is <b className="font-mono text-[#ebd2a0] text-base">{createdRecord?.id}</b>. Our Lead Culinary Architect is drafting a custom validation proposal for <span className="font-semibold text-[#ebd2a0]">{createdRecord?.companyName}</span>.
                </p>
              </div>

              {/* Polished interactive assessment board */}
              {createdRecord && (
                <div className="bg-[#0d231c]/90 rounded-2xl p-6 border border-[#ebd2a0]/20 max-w-md w-full text-left shadow-lg space-y-4">
                  <div className="flex justify-between pb-2 border-b border-[#ebd2a0]/10 text-[10px] uppercase tracking-wider font-bold text-[#ebd2a0]">
                    <span>Contract Parameter Summary</span>
                    <span className="text-[#ebd2a0]/60">ESTIMATE PREVIEW</span>
                  </div>
                  
                  <div className="space-y-2 text-xs md:text-sm text-white/90">
                    <div className="flex justify-between">
                      <span className="text-white/60">Estimated Headcount:</span>
                      <span className="font-semibold">{createdRecord.headcount} Members</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Service Standard Tier:</span>
                      <span className="font-semibold text-[#ebd2a0]">{createdRecord.plan} Plan</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Est. Price Per Plate:</span>
                      <span className="font-bold text-[#ebd2a0] font-mono">₹{createdRecord.estimatedPricePerPlate}</span>
                    </div>
                    
                    <div className="flex justify-between pt-3 border-t border-dashed border-[#ebd2a0]/15 text-sm md:text-base font-black text-[#ebd2a0]">
                      <span>Estimated Contract Total:</span>
                      <span className="font-mono">₹{createdRecord.estimatedTotal.toLocaleString()}/-</span>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-xs text-white/50 max-w-sm mx-auto leading-relaxed">
                An expert manager will text/call you within 2 business hours on <b className="text-white/80">{createdRecord?.phoneNumber}</b> to finalize the live kitchen validation setup.
              </p>

              <div className="pt-2">
                <button
                  id="booking-success-close-btn"
                  onClick={onClose}
                  className="px-8 py-3.5 bg-[#d99a1f] hover:bg-[#ebd2a0] active:scale-[0.98] text-[#051c13] text-xs font-black uppercase tracking-widest rounded-full transition-all shadow-[0_4px_15px_rgba(217,154,31,0.25)]"
                >
                  Return to Dashboard
                </button>
              </div>

            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
