import React from "react";
import { MenuResponse } from "../types";
import { Sparkles, Utensils, Wine, Salad, Flame, ChefHat, AlertTriangle, ArrowRight, ClipboardCheck } from "lucide-react";

interface AiMenuDesignerProps {
  onApplyMenuToBooking: (plan: "Silver" | "Gold" | "Platinum", headcount: number) => void;
}

export default function AiMenuDesigner({ onApplyMenuToBooking }: AiMenuDesignerProps) {
  // Local configuration inputs
  const [theme, setTheme] = React.useState("VIP Board Members Luncheon");
  const [dietary, setDietary] = React.useState("Strictly Vegetarian, Mild Spice, High Protein");
  const [plan, setPlan] = React.useState<"Silver" | "Gold" | "Platinum">("Gold");
  const [guests, setGuests] = React.useState(45);

  const [loading, setLoading] = React.useState(false);
  const [generatedMenu, setGeneratedMenu] = React.useState<MenuResponse | null>(null);
  const [infoMessage, setInfoMessage] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  // Generate Menu handler
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setInfoMessage(null);

    try {
      const response = await fetch("/api/generate-menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme, dietary, guests, plan })
      });

      const data = await response.json();
      if (data.success && data.menu) {
        setGeneratedMenu(data.menu);
        if (data.info) {
          setInfoMessage(data.info);
        }
      } else {
        throw new Error(data.message || "Failed to generate gourmet catalog");
      }
    } catch (err: any) {
      console.error("AI Generation Error", err);
      setErrorMessage("Could not connect to chef AI router. Loading our cached premium presets instead.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="ai-menu-architect-workspace" className="space-y-8">
      
      {/* Intro block */}
      <div className="bg-gradient-to-r from-halwai-green-950 to-halwai-green-900 border border-halwai-gold-500/25 p-6 rounded-xl flex flex-col md:flex-row items-center md:justify-between space-y-4 md:space-y-0 text-halwai-cream-50">
        <div className="space-y-1 text-center md:text-left">
          <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 bg-halwai-gold-600/20 border border-halwai-gold-500/40 rounded-full text-xs text-halwai-gold-300 font-mono font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-halwai-gold-400" />
            <span>Server-side Gemini AI Powered</span>
          </div>
          <h3 className="text-xl md:text-2xl font-serif font-bold text-white tracking-wide">
            Co-Create Bespoke Menus in Real Time
          </h3>
          <p className="text-xs text-halwai-cream-100/70 max-w-xl">
            Input your specialized corporate milestone, client profiles, and micro-dietary instructions. Our Gemini taste model will draft a perfect custom feast.
          </p>
        </div>
        <div className="shrink-0">
          <div className="w-16 h-16 rounded-full bg-halwai-gold-500/10 border-2 border-dashed border-halwai-gold-500 flex items-center justify-center text-halwai-gold-400 animate-[pulse_2s_infinite]">
            <ChefHat className="w-8 h-8" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Settings side (5 columns) */}
        <form onSubmit={handleGenerate} className="lg:col-span-5 bg-white p-6 rounded-xl border border-halwai-gold-500/10 shadow-sm space-y-4">
          
          <h4 className="text-sm font-bold text-halwai-green-950 uppercase tracking-wider border-b border-halwai-cream-100 pb-2">
            Chef Assistant Parameters
          </h4>

          {/* Theme */}
          <div>
            <label className="block text-xs font-semibold text-halwai-green-950 uppercase tracking-widest mb-1">
              🏢 Corporate Theme / Occasion
            </label>
            <input
              type="text"
              required
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="e.g. Independence Day High tea / Tech celebration"
              className="w-full px-3 py-2 border border-halwai-cream-200 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-halwai-gold-500"
            />
            <span className="text-[10px] text-halwai-green-800/60 block mt-0.5">
              Occasions heavily guide the presentation style and mood of foods.
            </span>
          </div>

          {/* Dietary style */}
          <div>
            <label className="block text-xs font-semibold text-halwai-green-950 uppercase tracking-widest mb-1">
              🥦 Dietary Limits & Instructions
            </label>
            <input
              type="text"
              required
              value={dietary}
              onChange={(e) => setDietary(e.target.value)}
              placeholder="e.g. 50% Vegan / Jain without onion-garlic / Low sodium"
              className="w-full px-3 py-2 border border-halwai-cream-200 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-halwai-gold-500"
            />
            <span className="text-[10px] text-halwai-green-800/60 block mt-0.5">
              Specify food tolerances. Gemini optimizes recipes to exclude these completely.
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Plan Tier selection */}
            <div>
              <label className="block text-xs font-semibold text-halwai-green-950 uppercase tracking-widest mb-1">
                💎 Plan Tier
              </label>
              <select
                value={plan}
                onChange={(e) => setPlan(e.target.value as any)}
                className="w-full px-3 py-2 border border-halwai-cream-200 rounded-md bg-white text-xs focus:outline-none focus:ring-1 focus:ring-halwai-gold-500 appearance-none font-medium"
              >
                <option value="Silver">Silver (Essential)</option>
                <option value="Gold">Gold (Signature)</option>
                <option value="Platinum">Platinum (Executive)</option>
              </select>
            </div>

            {/* Guests slider */}
            <div>
              <label className="block text-xs font-semibold text-halwai-green-950 uppercase tracking-widest mb-1 flex justify-between">
                <span>👥 Guests</span>
                <span className="font-mono text-halwai-gold-600 font-bold">{guests}</span>
              </label>
              <input
                type="range"
                min="10"
                max="500"
                step="5"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value) || 20)}
                className="w-full h-1.5 bg-halwai-cream-100 rounded-lg appearance-none cursor-pointer accent-halwai-gold-500 focus:outline-none mt-2"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              id="ai-generate-menu-btn"
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-halwai-green-900 via-halwai-green-800 to-halwai-green-900 border border-halwai-gold-500/20 text-white font-semibold text-xs tracking-widest uppercase rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2 disabled:opacity-75 disabled:pointer-events-none"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-halwai-gold-300 border-t-transparent rounded-full animate-spin shrink-0" />
                  <span>Curation in progress...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-halwai-gold-300 animate-pulse" />
                  <span>Generate Bespoke Feast</span>
                </>
              )}
            </button>
          </div>

        </form>

        {/* Display response side (7 columns) */}
        <div className="lg:col-span-7 bg-halwai-cream-100/45 p-6 rounded-xl border border-halwai-cream-200 min-h-[430px] flex flex-col justify-between">
          
          {loading ? (
            /* Loading Shimmer Card */
            <div id="ai-loading-skeleton" className="flex-1 flex flex-col justify-center items-center text-center space-y-4 py-12">
              <div className="relative w-16 h-16 flex items-center justify-center text-halwai-gold-500">
                <ChefHat className="w-10 h-10 animate-bounce absolute" />
                <div className="absolute inset-0 rounded-full border border-dashed border-halwai-gold-500/40 animate-spin" />
              </div>
              <div className="space-y-1">
                <h5 className="font-serif font-bold text-halwai-green-950 text-base">
                  Drafting Exquisite Culinary Layout
                </h5>
                <p className="text-xs text-halwai-green-800/70 max-w-sm">
                  Gemini AI is analyzing flavors, optimizing ingredient combinations, and detailing the culinary choreography of slow clay oven pastries...
                </p>
              </div>
            </div>
          ) : generatedMenu ? (
            /* Golden Menu Output Catalog */
            <div id="ai-menu-catalog-card" className="flex-1 flex flex-col justify-between space-y-6 animate-scale-up">
              
              <div className="space-y-4 text-left">
                {/* Header title */}
                <div className="border-b border-halwai-gold-500/20 pb-3 flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-halwai-gold-600 block">
                      {generatedMenu.isAiGenerated ? "✨ Real-time AI Curation" : "📋 Curated Luxury Concept"}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-halwai-green-950 mt-1">
                      {generatedMenu.menuName}
                    </h3>
                  </div>
                  <span className="bg-halwai-green-950 text-halwai-gold-300 font-mono text-[9px] font-bold px-2 py-0.5 rounded border border-halwai-gold-500/20 uppercase shrink-0">
                    {plan} Tier
                  </span>
                </div>

                <p className="text-xs italic text-halwai-green-800/80 leading-relaxed bg-white p-3 rounded-lg border border-halwai-gold-500/10 shadow-sm">
                  "{generatedMenu.themeDescription}"
                </p>

                {/* Subsections of menu */}
                <div className="space-y-3 pt-2">
                  
                  {/* Drinks */}
                  {generatedMenu.welcomeDrinks && generatedMenu.welcomeDrinks.length > 0 && (
                    <div className="space-y-1">
                      <h5 className="text-[10px] font-bold uppercase tracking-widest text-halwai-gold-600 flex items-center space-x-1">
                        <Wine className="w-3.5 h-3.5" />
                        <span>Welcome Beverages</span>
                      </h5>
                      <div className="grid grid-cols-1 gap-1.5 pl-4">
                        {generatedMenu.welcomeDrinks.map((d, index) => (
                          <div key={index} className="text-xs">
                            <b className="text-halwai-green-950 block">{d.name}</b>
                            <span className="text-halwai-green-800/75 block leading-tight">{d.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Starters */}
                  {generatedMenu.starters && generatedMenu.starters.length > 0 && (
                    <div className="space-y-1 pt-1.5">
                      <h5 className="text-[10px] font-bold uppercase tracking-widest text-halwai-gold-600 flex items-center space-x-1">
                        <Flame className="w-3.5 h-3.5" />
                        <span>Artisanal Starters</span>
                      </h5>
                      <div className="grid grid-cols-1 gap-1.5 pl-4">
                        {generatedMenu.starters.map((s, index) => (
                          <div key={index} className="text-xs">
                            <b className="text-halwai-green-950 block">{s.name}</b>
                            <span className="text-halwai-green-800/75 block leading-tight">{s.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mains & Extras */}
                  {(generatedMenu.mains || generatedMenu.breads || generatedMenu.desserts) && (
                    <div className="space-y-1 pt-1.5 border-t border-halwai-cream-200 pt-3">
                      <h5 className="text-[10px] font-bold uppercase tracking-widest text-halwai-gold-600 flex items-center space-x-1">
                        <Utensils className="w-3.5 h-3.5" />
                        <span>Main Courses & Saffron Sides</span>
                      </h5>
                      
                      <div className="pl-4 space-y-2 text-xs">
                        {generatedMenu.mains && generatedMenu.mains.map((m, index) => (
                          <div key={index}>
                            <b className="text-halwai-green-950 block">🥘 {m.name}</b>
                            <span className="text-halwai-green-800/75 block leading-tight">{m.description}</span>
                          </div>
                        ))}
                        
                        {generatedMenu.breads && generatedMenu.breads.map((b, index) => (
                          <div key={index}>
                            <b className="text-halwai-green-950 block">🫓 {b.name}</b>
                            <span className="text-halwai-green-800/75 block leading-tight">{b.description}</span>
                          </div>
                        ))}

                        {generatedMenu.desserts && generatedMenu.desserts.map((ds, index) => (
                          <div key={index}>
                            <b className="text-halwai-green-950 block">🍨 {ds.name}</b>
                            <span className="text-halwai-green-800/75 block leading-tight">{ds.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Presentation guidance tip */}
                  {generatedMenu.presentationTip && (
                    <div className="p-3 bg-white border border-halwai-gold-500/10 rounded-lg shadow-inner text-[11px] text-halwai-green-950 flex items-start space-x-2 mt-4">
                      <ChefHat className="w-4 h-4 text-halwai-gold-500 shrink-0 mt-0.5" />
                      <div>
                        <b className="uppercase tracking-wider font-bold block text-halwai-gold-600 text-[9px] font-mono">
                          Chef's Presentation Standard
                        </b>
                        <p className="leading-relaxed mt-0.5">{generatedMenu.presentationTip}</p>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Notification Banner / Instructions to active */}
              {infoMessage && (
                <div className="p-2.5 bg-sky-50 border border-sky-100 rounded text-[10px] text-sky-800 flex items-center space-x-2 my-2 text-left animate-slide-in">
                  <ClipboardCheck className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                  <span>{infoMessage}</span>
                </div>
              )}

              {/* Action bottom block */}
              <div className="pt-4 border-t border-halwai-cream-200 flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
                <span className="text-[10px] text-halwai-green-800/60 font-mono">
                  *Menus are fully editable during phone configuration call
                </span>
                <button
                  id="apply-ai-menu-to-booking-btn"
                  onClick={() => onApplyMenuToBooking(plan, guests)}
                  className="px-5 py-2.5 bg-halwai-green-950 hover:bg-halwai-green-900 border border-halwai-gold-500/20 text-halwai-gold-300 font-bold text-xs uppercase tracking-widest rounded shadow-sm hover:shadow-md hover:translate-x-1 transition-all flex items-center space-x-1"
                >
                  <span>Apply Proposal to Tasting Invite</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ) : (
            /* Default empty blueprint */
            <div id="ai-blank-state" className="flex-1 flex flex-col justify-center items-center text-center space-y-4 py-16 text-halwai-green-950/40">
              <ChefHat className="w-16 h-16 stroke-[1.5] text-halwai-green-800/10" />
              <div className="space-y-1">
                <p className="font-serif font-semibold text-sm">
                  Customize the parameters & ask the Chef Bot
                </p>
                <p className="text-xs max-w-xs mx-auto text-halwai-green-900/60">
                  Select your theme, ingredient requests, or dietary guidelines and trigger our taste model. An exquisite customized Indian proposal will generate instantly!
                </p>
              </div>
            </div>
          )}

          {/* Fallback alerts */}
          {errorMessage && (
            <div className="p-3 bg-amber-50 border border-amber-100 rounded text-[11px] text-amber-800 flex items-start space-x-2 mt-4 text-left font-sans">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <b>Standard Pre-Curation Active</b>
                <p>{errorMessage}</p>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
