'use client';

import React from "react";
import { AppTab, GalleryItem, SavedInquiry } from "../types";
import Header from "../components/Header";
import BookingModal from "../components/BookingModal";
import EveningSnacks from "../components/EveningSnacks";
import CateringCalculator from "../components/CateringCalculator";
import AiMenuDesigner from "../components/AiMenuDesigner";
import TCHLogo from "../components/TCHLogo";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, ArrowDown, ShieldCheck, Timer, Award, Scale, RefreshCw, Layers, Sparkles, 
  ThumbsUp, CalendarClock, ChevronDown, ChefHat, Phone, Mail, MapPin, Search, 
  Expand, PlusCircle, Check, HelpCircle, X, Utensils, Building2, Clock,
  Briefcase, Crown, Star, MessageCircle, Globe, Leaf, Flame
} from "lucide-react";

export default function HomeClient() {
  const [activeTab, setActiveTab] = React.useState<AppTab>(AppTab.HOME);
  const [isBookingOpen, setIsBookingOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  
  // States of prefilled elements passed to booking
  const [prefilledPlan, setPrefilledPlan] = React.useState<"Silver" | "Gold" | "Platinum">("Gold");
  const [prefilledHeadcount, setPrefilledHeadcount] = React.useState<number>(75);

  // States for Inquiries and FAQ
  const [inquiries, setInquiries] = React.useState<SavedInquiry[]>([]);
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  // State for Gallery Lightbox
  const [lightboxItem, setLightboxItem] = React.useState<GalleryItem | null>(null);
  const [galleryFilter, setGalleryFilter] = React.useState<string>("all");

  // State for Strategic Solutions
  const [activeSolutionIdx, setActiveSolutionIdx] = React.useState(0);

  // Load inquiries from local storage
  const loadInquiries = () => {
    if (typeof window !== "undefined") {
      const list = JSON.parse(localStorage.getItem("tch_inquiries") || "[]");
      setInquiries(list);
    }
  };

  // Listen to scrolls to shadow header
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    loadInquiries();

    // Listen to local storage updates from modal
    window.addEventListener("tch_inquiries_updated", loadInquiries);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("tch_inquiries_updated", loadInquiries);
    };
  }, []);

  const openBookingWithPreset = (plan: "Silver" | "Gold" | "Platinum", headcount: number) => {
    setPrefilledPlan(plan);
    setPrefilledHeadcount(headcount);
    setIsBookingOpen(true);
  };

  const handleApplyAiMenuToBooking = (plan: "Silver" | "Gold" | "Platinum", headcount: number) => {
    setPrefilledPlan(plan);
    setPrefilledHeadcount(headcount);
    setIsBookingOpen(true);
  };

  const handleConfigurePlanBtn = (plan: "Silver" | "Gold" | "Platinum") => {
    setPrefilledPlan(plan);
    setActiveTab(AppTab.PRICING);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  // Strategic Solutions list (Home Page)
  const solutions = [
    {
      title: "TCH Box",
      subtitle: "Premium Individual Meal Box",
      description: "Specially portioned, beautifully packed individual meal grids designed for business efficiency without compromising on visual prestige and taste. Eco-friendly biodegradable partitions lock aromatic heat indefinitely.",
      price: "₹249/box starting",
      imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
      menuPreview: ["1 Specialty Paneer Curry", "Dry Roasted Seasonal Aloo", "Premium Dal Makhni", "Steamed Saffron Basmati", "1 Delicate Gulab Jamun", "Sandalwood Infused handwipe"]
    },
    {
      title: "Premium Buffets",
      subtitle: "Executive Banquet Spread",
      description: "Our signature catering style. Layouts include gleaming copper chafing visual sets, live baking ovens (tandoor), seasoned personal servers, dynamic steam elements, and curated table decorations tailored to your branding.",
      price: "₹495/plate starting",
      imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800",
      menuPreview: ["3 Gravy Options", "2 Dry Seasonal sautés", "Dal Tadka on Charcoal", "Assorted Stuffed Naans (Live)", "Double Artisanal Dessert station", "Mint-cucumber Shikanji"]
    },
    {
      title: "Live Counters",
      subtitle: "Gastronomic Theater Stations",
      description: "Interactive stations bringing authentic Street Food of India direct to office courtyards. Experience live puffing of fluffy bhaturas, the hiss of butter on massive tawa pans, or claypots delivering boiling masala cutting chai.",
      price: "₹220/plate starting",
      imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800",
      menuPreview: ["Shahi Paneer Pav sliders", "Miniature crisp samosas", "Deconstructed Jalebi-rabri boards", "Claypot piping Hot Chai (Kulhads)", "Fruit skewers with local spice dust"]
    }
  ];

  // Gallery Data
  const galleryItems: GalleryItem[] = [
    {
      id: "gal-1",
      title: "Royal Copper Chafing Buffet",
      category: "buffet",
      imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1200",
      description: "Bespoke traditional copper heating buffet layouts curated for executive catering spreads.",
      details: "Configured for direct table service at our major partner headquarters, complete with premium floral decor.",
      client: "Reliance Retail Boardroom",
      date: "June 2026",
      feedback: "The visual presence was absolutely stunning!"
    },
    {
      id: "gal-2",
      title: "Premium Cardboard Thali Stack",
      category: "box",
      imageUrl: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=800",
      description: "Our signature individual boxed meals featuring insulated eco-friendly compartments.",
      details: "Perfectly packaged hot meals arriving on time at peak temperature to corporate offices.",
      client: "Google Cloud",
      date: "May 2026",
      feedback: "Incredibly neat and keeps the food piping hot."
    },
    {
      id: "gal-3",
      title: "Live Hot Bhatura Cooking",
      category: "live",
      imageUrl: "https://images.unsplash.com/photo-1590412200988-a436bb705300?auto=format&fit=crop&q=80&w=800",
      description: "Interactive chef stations serving fluffy live-cooked breads and signature street starters.",
      details: "Sizzling performance counter setup outdoors to create an engaging gastronomic atmosphere.",
      client: "Inmobi Technology",
      date: "April 2026",
      feedback: "Flipping hot rotis straight to the plate was incredible."
    },
    {
      id: "gal-4",
      title: "Elegant Dessert Stand Representation",
      category: "lunch",
      imageUrl: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=800",
      description: "Premium three-tier luxury gold display stands featuring handcrafted Indian pastries.",
      details: "Perfect corporate lunch mixer centerpiece for networking meetings and high executive forums.",
      client: "Venture Capital Summit",
      date: "June 2026",
      feedback: "Delicious, clean, and extremely high class."
    },
    {
      id: "gal-5",
      title: "Artisanal Thali Plate Flatlay",
      category: "lunch",
      imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800",
      description: "Overhead detail of saffron basmati rice paired with creamy signature butter chicken.",
      details: "A classic look that combines visual styling with authentic five-star recipes.",
      client: "Razorpay HQ Bengaluru",
      date: "May 2026",
      feedback: "The flavor balance and presentation is fantastic."
    }
  ];

  const filteredGallery = galleryItems.filter(
    item => galleryFilter === "all" || item.category === galleryFilter
  );

  return (
    <div id="app-root-layout" className="min-h-screen flex flex-col bg-halwai-cream-50 font-sans selection:bg-halwai-gold-300 selection:text-halwai-green-950">
      
      {/* Navigation Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        openBookingModal={() => setIsBookingOpen(true)}
        isScrolled={isScrolled}
      />

      {/* Main Page Content Body */}
      <main className="flex-grow pt-20">
        
        <AnimatePresence mode="wait">
          {activeTab === AppTab.HOME && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              id="home-view-container"
              className="space-y-0"
            >
            
            {/* 1. HERO SECTION */}
            <section
              id="home-hero-billboard"
              className="relative min-h-[85vh] flex items-center justify-center bg-[#FAF9F6] overflow-hidden pt-16 md:pt-24 pb-16 px-4 md:px-8 border-b border-[#e5dfd3]/60"
            >
              {/* Mandala corner decorations — top-left */}
              <svg className="absolute top-0 left-0 w-52 h-52 pointer-events-none select-none opacity-[0.07]" viewBox="0 0 200 200" fill="none">
                <circle cx="0" cy="0" r="80" stroke="#b89547" strokeWidth="0.8" />
                <circle cx="0" cy="0" r="60" stroke="#b89547" strokeWidth="0.8" />
                <circle cx="0" cy="0" r="40" stroke="#b89547" strokeWidth="0.6" />
                {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg) => (
                  <line key={deg} x1="0" y1="0" x2={(80 * Math.cos(deg*Math.PI/180)).toFixed(4)} y2={(80 * Math.sin(deg*Math.PI/180)).toFixed(4)} stroke="#b89547" strokeWidth="0.5" />
                ))}
                {[0,45,90,135,180,225,270,315].map((deg) => {
                  const cx = (55 * Math.cos(deg*Math.PI/180)).toFixed(4);
                  const cy = (55 * Math.sin(deg*Math.PI/180)).toFixed(4);
                  return (
                    <ellipse key={deg} cx={cx} cy={cy} rx="8" ry="4" stroke="#b89547" strokeWidth="0.5" transform={`rotate(${deg} ${cx} ${cy})`} />
                  );
                })}
              </svg>

              {/* Leaf motif — top right */}
              <svg className="absolute top-6 right-6 w-28 h-28 pointer-events-none select-none opacity-[0.08]" viewBox="0 0 120 120" fill="none">
                <path d="M60 10 C90 10 110 40 110 70 C110 100 90 110 60 110 C30 110 10 100 10 70 C10 40 30 10 60 10 Z" stroke="#052316" strokeWidth="1" />
                <path d="M60 10 L60 110" stroke="#052316" strokeWidth="0.8" />
                <path d="M60 30 C75 35 85 45 85 60" stroke="#052316" strokeWidth="0.6" />
                <path d="M60 50 C75 55 82 62 80 75" stroke="#052316" strokeWidth="0.6" />
                <path d="M60 30 C45 35 35 45 35 60" stroke="#052316" strokeWidth="0.6" />
                <path d="M60 50 C45 55 38 62 40 75" stroke="#052316" strokeWidth="0.6" />
              </svg>

              {/* Outer decorative accents */}
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-[#b89547]/5 rounded-full filter blur-3xl pointer-events-none" />
              <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#052316]/5 rounded-full filter blur-3xl pointer-events-none" />

              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.12,
                    }
                  }
                }}
                className="relative z-10 max-w-7xl mx-auto w-full"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  
                  {/* Left Column: Premium Brand Messaging */}
                  <div className="space-y-6 text-left max-w-xl">
                    {/* Service category eyebrow */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
                      }}
                      className="flex flex-wrap items-center gap-2"
                    >
                      <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#b89547] uppercase">Premium Corporate Catering</span>
                      <span className="text-[#b89547]/40">·</span>
                      <div className="flex items-center gap-2 text-[10px] font-mono font-semibold text-[#052316]/50 uppercase tracking-widest">
                        <span>Office Meals</span>
                        <span className="text-[#b89547]/50">|</span>
                        <span>Events</span>
                        <span className="text-[#b89547]/50">|</span>
                        <span>Cafeteria Services</span>
                      </div>
                    </motion.div>

                    {/* Main tagline — THE brand headline from brochure */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                      }}
                    >
                      <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black text-[#052316] leading-[1.05] tracking-tight">
                        Desi Flavours.
                      </h2>
                      <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black text-[#b89547] italic leading-[1.05] tracking-tight">
                        Corporate Standards.
                      </h2>
                      <p className="mt-3 text-sm font-mono font-bold tracking-[0.2em] text-[#052316]/55 uppercase">
                        Great food. Seamless service.
                      </p>
                    </motion.div>

                    {/* Olive Oil USP badge */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
                      }}
                      className="inline-flex items-center gap-3 bg-[#052316] text-white px-4 py-2.5 rounded-full shadow-md border border-[#b89547]/30"
                    >
                      <div className="w-7 h-7 rounded-full bg-[#b89547]/20 border border-[#b89547]/40 flex items-center justify-center shrink-0">
                        <span className="text-sm">🫒</span>
                      </div>
                      <div className="text-left">
                        <span className="text-[9px] font-mono font-bold text-[#b89547] uppercase tracking-widest block">India's First</span>
                        <span className="text-[11px] font-bold leading-tight">Corporate Caterer to Cook in Olive Oil</span>
                      </div>
                    </motion.div>

                    {/* Serving Since 2015 chip */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }
                      }}
                      className="flex items-center gap-3"
                    >
                      <div className="flex items-center gap-2 px-4 py-2 bg-[#b89547]/10 border border-[#b89547]/25 rounded-full">
                        <CalendarClock className="w-4 h-4 text-[#b89547]" />
                        <span className="text-xs font-mono font-black text-[#b89547] tracking-widest uppercase">→→ Serving Since 2015 ←←</span>
                      </div>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
                      }}
                      className="space-y-3 pt-2"
                    >
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <button
                          id="hero-book-tasting-btn"
                          onClick={() => setIsBookingOpen(true)}
                          className="w-full sm:w-auto px-8 py-3.5 bg-[#052316] hover:bg-[#0b3c27] text-white font-bold text-xs tracking-wider uppercase rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                        >
                          <span>Book a Tasting Session</span>
                          <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
                        </button>
                        
                        <a
                          href="https://wa.me/919289030016?text=Hi%20The%20Corporate%20Halwai%2C%20I%27d%20like%20to%20book%20a%20tasting%20session."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto px-8 py-3.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/40 text-[#128C7E] font-bold text-xs tracking-wider uppercase rounded-full transition-all flex items-center justify-center space-x-2"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>WhatsApp Us</span>
                        </a>
                      </div>
                      {/* CTA sub-text from brochure */}
                      <p className="text-[11px] text-[#052316]/45 font-sans italic text-center sm:text-left">
                        Let us serve your team the experience they deserve.
                      </p>
                    </motion.div>
                  </div>

                  {/* Right Column: Hero Cinematic Video & Image card with badge */}
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, scale: 0.96, x: 20 },
                      visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    className="relative flex justify-center lg:justify-end w-full lg:w-auto"
                  >
                    <div className="relative w-full max-w-2xl aspect-video bg-[#052316]/5 rounded-[2rem] p-3 border border-[#e5dfd3]/50">
                      <div className="w-full h-full overflow-hidden rounded-[1.75rem] shadow-xl relative bg-[#041d12]">
                        {/* High-quality backup fallback image underneath, rendered with subtle scale */}
                        <img
                          src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800"
                          alt="Premium corporate hot clay pot culinary preparation"
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover opacity-20 scale-105"
                        />

                        {/* Beautiful Looping Sizzling Clay Pot Gourmet Video requested by User */}
                        <video
                          id="hero-cooking-video"
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover opacity-95 transition-opacity duration-700"
                          style={{ filter: "brightness(1.02) contrast(1.05)" }}
                        >
                          <source src="https://videos.pexels.com/video-files/3015488/3015488-sd_640_360_24fps.mp4" type="video/mp4" />
                          <source src="https://videos.pexels.com/video-files/3015488/3015488-hd_1280_720_24fps.mp4" type="video/mp4" />
                          <source src="https://videos.pexels.com/video-files/3015488/3015488-hd_1920_1080_24fps.mp4" type="video/mp4" />
                        </video>

                        {/* Mission quote overlay at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#052316]/90 via-[#052316]/50 to-transparent">
                          <p className="text-white text-[11px] font-serif italic leading-snug">
                            "Bringing the richness of Indian flavours to the modern workplace."
                          </p>
                        </div>
                      </div>

                      {/* Olive Oil floating badge on video */}
                      <motion.div
                        id="hero-olive-oil-badge"
                        animate={{ y: [0, -7, 0] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-6 right-6 flex items-center space-x-2 bg-white border border-[#e5dfd3] rounded-full px-3 py-1.5 shadow-lg z-20"
                      >
                        <span className="text-sm">🫒</span>
                        <span className="text-[9px] font-mono font-black text-[#052316] uppercase tracking-wider">Olive Oil Cooking</span>
                      </motion.div>

                      {/* Retention badge */}
                      <motion.div
                        id="hero-client-retention-badge"
                        animate={{ y: [0, -7, 0] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                        className="absolute bottom-6 left-6 flex items-center space-x-2.5 bg-[#FAF9F6] border border-[#e5dfd3] rounded-full px-4 py-2 shadow-lg z-20 cursor-default"
                      >
                        <div className="w-8 h-8 rounded-full bg-[#052316] flex items-center justify-center text-[#ebd2a0] shadow-sm shrink-0">
                          <span className="text-xs">★</span>
                        </div>
                        <div className="text-left font-sans">
                          <span className="block text-xs font-black text-[#052316] leading-none">Since 2015</span>
                          <span className="block text-[9px] font-mono font-bold uppercase text-gray-500 tracking-wider">Trusted Caterer</span>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>

                </div>
              </motion.div>
            </section>

            {/* 2. VALUE TRUST TICKER BAR */}
            <section id="trust-ticker-strip" className="bg-[#052316] py-4 border-y border-[#b89547]/20 overflow-hidden relative">
              <div className="flex w-max animate-marquee">
                <div className="flex items-center gap-12 px-6 text-xs sm:text-sm md:text-base text-[#ebf3ea] font-mono font-bold uppercase tracking-widest whitespace-nowrap">
                  <span className="flex items-center gap-2.5"><CalendarClock className="w-4 h-4 sm:w-5 h-5 text-[#b89547] shrink-0" /> Serving Since 2015</span>
                  <span className="flex items-center gap-2.5"><ShieldCheck className="w-4 h-4 sm:w-5 h-5 text-[#b89547] shrink-0" /> Hygiene & Food Safety</span>
                  <span className="flex items-center gap-2.5"><ChefHat className="w-4 h-4 sm:w-5 h-5 text-[#b89547] shrink-0" /> Experienced Professionals</span>
                  <span className="flex items-center gap-2.5"><Timer className="w-4 h-4 sm:w-5 h-5 text-[#b89547] shrink-0" /> On-Time Every Time</span>
                  <span className="flex items-center gap-2.5"><Layers className="w-4 h-4 sm:w-5 h-5 text-[#b89547] shrink-0" /> Customized Menus</span>
                  <span className="flex items-center gap-2.5"><Sparkles className="w-4 h-4 sm:w-5 h-5 text-[#b89547] shrink-0" /> Authentic Indian Flavours</span>
                </div>
                <div className="flex items-center gap-12 px-6 text-xs sm:text-sm md:text-base text-[#ebf3ea] font-mono font-bold uppercase tracking-widest whitespace-nowrap" aria-hidden="true">
                  <span className="flex items-center gap-2.5"><CalendarClock className="w-4 h-4 sm:w-5 h-5 text-[#b89547] shrink-0" /> Serving Since 2015</span>
                  <span className="flex items-center gap-2.5"><ShieldCheck className="w-4 h-4 sm:w-5 h-5 text-[#b89547] shrink-0" /> Hygiene & Food Safety</span>
                  <span className="flex items-center gap-2.5"><ChefHat className="w-4 h-4 sm:w-5 h-5 text-[#b89547] shrink-0" /> Experienced Professionals</span>
                  <span className="flex items-center gap-2.5"><Timer className="w-4 h-4 sm:w-5 h-5 text-[#b89547] shrink-0" /> On-Time Every Time</span>
                  <span className="flex items-center gap-2.5"><Layers className="w-4 h-4 sm:w-5 h-5 text-[#b89547] shrink-0" /> Customized Menus</span>
                  <span className="flex items-center gap-2.5"><Sparkles className="w-4 h-4 sm:w-5 h-5 text-[#b89547] shrink-0" /> Authentic Indian Flavours</span>
                </div>
              </div>
            </section>

            {/* NEW: CURATED FOR MODERN WORKPLACES */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              id="curated-for-modern-workplaces"
              className="py-16 bg-[#FAF9F6] border-b border-[#e5dfd3]/40"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <h3 className="text-3xl font-serif font-black text-[#052316] tracking-tight">
                    Curated for Modern Workplaces
                  </h3>
                  <div className="w-12 h-[1.5px] bg-[#b89547] mx-auto mt-3" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* Item 1: Balanced & Nutritious Meals */}
                  <div className="bg-white p-6 rounded-[2rem] border border-[#e5dfd3]/50 shadow-[0_8px_24px_rgba(5,35,22,0.02)] flex flex-col items-center text-center space-y-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#b89547]/30">
                    <div className="w-12 h-12 rounded-full bg-[#052316]/5 flex items-center justify-center text-[#b89547]">
                      <Leaf className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <h4 className="font-serif font-bold text-sm text-[#052316] text-center">
                      Balanced & Nutritious Meals
                    </h4>
                    <p className="text-xs text-gray-500 font-medium">
                      Healthy, low-oil options to keep your team light, focused, and energised.
                    </p>
                  </div>

                  {/* Item 2: Employee Satisfaction Focused */}
                  <div className="bg-white p-6 rounded-[2rem] border border-[#e5dfd3]/50 shadow-[0_8px_24px_rgba(5,35,22,0.02)] flex flex-col items-center text-center space-y-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#b89547]/30">
                    <div className="w-12 h-12 rounded-full bg-[#052316]/5 flex items-center justify-center text-[#b89547]">
                      <Utensils className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <h4 className="font-serif font-bold text-sm text-[#052316] text-center">
                      Employee Satisfaction Focused
                    </h4>
                    <p className="text-xs text-gray-500 font-medium">
                      Authentic desi taste that boosts workplace morale and dining satisfaction.
                    </p>
                  </div>

                  {/* Item 3: Flexible Plans for Teams of All Sizes */}
                  <div className="bg-white p-6 rounded-[2rem] border border-[#e5dfd3]/50 shadow-[0_8px_24px_rgba(5,35,22,0.02)] flex flex-col items-center text-center space-y-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#b89547]/30">
                    <div className="w-12 h-12 rounded-full bg-[#052316]/5 flex items-center justify-center text-[#b89547]">
                      <Layers className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <h4 className="font-serif font-bold text-sm text-[#052316] text-center">
                      Flexible Plans for Teams of All Sizes
                    </h4>
                    <p className="text-xs text-gray-500 font-medium">
                      Tailored options scaling from 10 individuals to large corporate gatherings.
                    </p>
                  </div>

                  {/* Item 4: Reliable Partner for Growing Businesses */}
                  <div className="bg-white p-6 rounded-[2rem] border border-[#e5dfd3]/50 shadow-[0_8px_24px_rgba(5,35,22,0.02)] flex flex-col items-center text-center space-y-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#b89547]/30">
                    <div className="w-12 h-12 rounded-full bg-[#052316]/5 flex items-center justify-center text-[#b89547]">
                      <Building2 className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <h4 className="font-serif font-bold text-sm text-[#052316] text-center">
                      Reliable Partner for Growing Businesses
                    </h4>
                    <p className="text-xs text-gray-500 font-medium">
                      Punctual delivery and consistent quality you can trust day after day.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* 3. STRATEGIC SOLUTIONS (Catering services slider) */}
            <motion.section
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              id="strategic-catering-solutions"
              className="py-24 bg-[#FCFAF7] border-b border-[#ebd2a0]/10"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Ornamental gold divider */}
                <div className="flex items-center justify-center gap-4 mb-12">
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#b89547]/30" />
                  <svg className="w-6 h-6 text-[#b89547]/60" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l2 4 4.5 0.5-3.5 3 1 4.5L12 12l-4 2 1-4.5-3.5-3L10 6z" />
                  </svg>
                  <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#b89547]/30" />
                </div>

                {/* Dark green banner header */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                  <div className="inline-block bg-[#052316] px-8 py-3 rounded-full border border-[#b89547]/30 shadow-sm mb-4">
                    <span className="text-xs font-mono font-bold tracking-[0.3em] text-[#b89547] uppercase">OUR SERVICES</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-serif text-[#052316] tracking-tight leading-none select-none">
                    Thoughtfully <span className="font-serif font-black italic text-[#d99a1f]">crafted</span> catering solutions
                  </h3>
                  <p className="text-sm md:text-base text-[#052316]/70 font-sans max-w-2xl mx-auto tracking-wide leading-relaxed font-medium">
                    Designed for every corporate need — office meals, events, and cafeteria services.
                  </p>
                </div>

                {/* Slider Layout displaying cards with dynamic centered focus */}
                <div className="relative py-4 max-w-[1240px] mx-auto">
                  {/* Outer flex container to manage centered card rendering with transition */}
                  <div className="relative flex items-center justify-center min-h-[460px] md:min-h-[520px] overflow-hidden py-6">
                    
                    {(() => {
                      const cateringCards = [
                      {
                          id: 0,
                          title: "The Corporate Halwai Box (TCH Box)",
                          subtitle: "MINIMUM 10 PERSONS",
                          description: "A premium food box that brings great taste and convenience to your corporate meetings, events and celebrations. Perfect for Corporate Meetings, Birthday Parties, Family Functions & Get Together.",
                          imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600",
                          actionText: "Explore Menu",
                          benefits: ["Complete multi-course food experience", "Hygienically packed & delivered", "Each box covers one dish of your choice", "Customisation available"]
                        },
                        {
                          id: 1,
                          title: "TCH Box + Live",
                          subtitle: "MEALS + LIVE COOKING STATIONS",
                          description: "Food boxes combined with live cooking stations — the perfect blend of convenience and culinary theatre. Custom menu selection for your event, with professional service staff.",
                          imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=600",
                          actionText: "Learn More",
                          benefits: ["Live food stations for hot & fresh food", "Premium presentation", "Custom menu selection", "Professional service staff", "Scalable for any event size"]
                        },
                        {
                          id: 2,
                          title: "Corporate Thali (Meal Box)",
                          subtitle: "SINGLE-SERVE COMPLETE MEALS",
                          description: "A complete single-serve meal solution for daily office meals, training programs, conferences and employee dining. Fresh, hygienic and easy to distribute.",
                          imageUrl: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=600",
                          actionText: "View Details",
                          benefits: ["Complete balanced meal in one box", "Fresh & hygienic preparation", "Single-serve for easy distribution", "Daily meal programs available"]
                        }
                      ];

                      const prevIdx = (activeSolutionIdx - 1 + 3) % 3;
                      const nextIdx = (activeSolutionIdx + 1) % 3;
                      const prevCard = cateringCards[prevIdx];
                      const nextCard = cateringCards[nextIdx];

                      return (
                        <>
                          {/* Previous Card Preview (peeking on the left for tablet & desktop) */}
                          <div className="hidden xl:block absolute -left-64 xl:-left-72 w-72 h-[420px] select-none pointer-events-none transform scale-90 blur-[1.5px] transition-all duration-500 z-0">
                            <div className="bg-white rounded-[2rem] overflow-hidden border border-[#ebd2a0]/25 shadow-sm flex flex-col h-full bg-[#FAF9F6] opacity-[0.3]">
                              <div className="aspect-[4/3] w-full overflow-hidden bg-[#010906]">
                                <img src={prevCard.imageUrl} alt={prevCard.title} className="w-full h-full object-cover" />
                              </div>
                              <div className="p-6 text-left flex-1 flex flex-col justify-between">
                                <div className="space-y-2">
                                  <span className="text-[8px] font-mono uppercase tracking-widest text-[#b89547] block">{prevCard.subtitle}</span>
                                  <h4 className="text-base font-serif font-black text-[#052316]">{prevCard.title}</h4>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Centered Active Card Container with robust Framer Motion layout transition */}
                          <div className="w-full max-w-[340px] sm:max-w-lg md:max-w-3xl lg:max-w-4xl z-10 px-2 sm:px-4 md:px-0">
                            {cateringCards.map((card, idx) => {
                              if (idx !== activeSolutionIdx) return null;
                              return (
                                <motion.div
                                  key={card.id}
                                  id={`active-focused-card-${card.id}`}
                                  initial={{ opacity: 0, scale: 0.97, y: 20 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.97, y: -20 }}
                                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                                  className="bg-white rounded-[2.5rem] overflow-hidden border border-[#ebd2a0]/40 shadow-[0_24px_64px_rgba(5,35,22,0.06)] hover:shadow-[0_32px_80px_rgba(5,35,22,0.1)] hover:border-[#b89547]/60 flex flex-col md:flex-row group relative w-full transition-all duration-500"
                                >
                                  <div className="w-full md:w-1/2 overflow-hidden relative min-h-[240px] md:min-h-[440px] bg-[#010906]">
                                    <img
                                      src={card.imageUrl}
                                      alt={card.title}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />
                                    
                                    {/* Elegant saffron status tag */}
                                    <div className="absolute top-5 left-5 bg-[#052316] text-[#ebd2a0] text-[9.5px] font-mono font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-[#ebd2a0]/30 shadow-lg select-none">
                                      {card.subtitle}
                                    </div>
                                  </div>
                                  
                                  <div className="w-full md:w-1/2 p-8 sm:p-11 text-left bg-gradient-to-b md:bg-gradient-to-r from-white to-[#FAF9F6]/30 flex flex-col justify-between space-y-6">
                                    <div className="space-y-4">
                                      <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#052316] rounded-full text-[9px] font-mono uppercase font-bold text-[#b89547] border border-[#b89547]/30">
                                        <Utensils className="w-3.5 h-3.5 text-[#b89547]" />
                                        <span>Deals in Bulk Orders Only</span>
                                      </div>
                                      <h4 className="text-3xl sm:text-4xl font-serif text-[#052316] tracking-tight leading-none flex items-center justify-between font-black">
                                        <span>{card.title}</span>
                                        <span className="relative flex h-3.5 w-3.5">
                                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b89547] opacity-75"></span>
                                          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#b89547] border-2 border-white"></span>
                                        </span>
                                      </h4>
                                      <p className="text-sm text-[#052316]/70 leading-relaxed font-sans font-medium">
                                        {card.description}
                                      </p>

                                      {/* Benefits list */}
                                      <ul className="space-y-2 pt-1">
                                        {card.benefits.map((b, bi) => (
                                          <li key={bi} className="flex items-center gap-2 text-xs text-[#052316]/70 font-sans">
                                            <Check className="w-3.5 h-3.5 text-[#b89547] shrink-0" />
                                            <span>{b}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                    
                                    <div className="flex items-center justify-between pt-6 border-t border-dashed border-[#e6dfd1]">
                                      <button
                                        onClick={() => {
                                          setActiveTab(AppTab.PRICING);
                                          window.scrollTo({ top: 400, behavior: "smooth" });
                                        }}
                                        className="flex items-center space-x-2 text-xs sm:text-sm font-bold text-[#b89547] hover:text-[#052316] uppercase tracking-widest transition-all cursor-pointer group/btn"
                                      >
                                        <span className="relative pb-0.5 font-sans">
                                          {card.actionText}
                                          <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#b89547] transition-all duration-300 group-hover/btn:w-full" />
                                        </span>
                                        <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                                      </button>
                                      
                                      <span className="text-xs font-mono font-bold text-[#b89547] bg-[#b89547]/5 px-3 py-1 rounded-full border border-[#ebd2a0]/15">
                                        0{idx + 1} / 03
                                      </span>
                                    </div>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>

                          {/* Next Card Preview (peeking on the right for tablet & desktop) */}
                          <div className="hidden xl:block absolute -right-64 xl:-right-72 w-72 h-[420px] select-none pointer-events-none transform scale-90 blur-[1.5px] transition-all duration-500 z-0">
                            <div className="bg-white rounded-[2rem] overflow-hidden border border-[#ebd2a0]/25 shadow-sm flex flex-col h-full bg-[#FAF9F6] opacity-[0.3]">
                              <div className="aspect-[4/3] w-full overflow-hidden bg-[#010906]">
                                <img src={nextCard.imageUrl} alt={nextCard.title} className="w-full h-full object-cover" />
                              </div>
                              <div className="p-6 text-left flex-1 flex flex-col justify-between">
                                <div className="space-y-2">
                                  <span className="text-[8px] font-mono uppercase tracking-widest text-[#b89547] block">{nextCard.subtitle}</span>
                                  <h4 className="text-base font-serif font-black text-[#052316]">{nextCard.title}</h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })()}

                  </div>

                  {/* Left & Right Absolute Saffron/White Chevrons */}
                  <div className="absolute top-1/2 -left-2 sm:left-4 md:-left-8 lg:-left-12 -translate-y-1/2 z-20">
                    <button
                      onClick={() => setActiveSolutionIdx((activeSolutionIdx - 1 + 3) % 3)}
                      className="w-12 h-12 rounded-full border border-[#ebd2a0]/35 bg-white hover:bg-[#052316] text-[#b89547] hover:text-[#ebd2a0] shadow-md hover:shadow-xl flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer group/btn"
                      title="Previous Service"
                    >
                      <ArrowRight className="w-4 h-4 rotate-180 group-hover/btn:-translate-x-0.5 transition-transform duration-300" />
                    </button>
                  </div>
                  <div className="absolute top-1/2 -right-2 sm:right-4 md:-right-8 lg:-right-12 -translate-y-1/2 z-20">
                    <button
                      onClick={() => setActiveSolutionIdx((activeSolutionIdx + 1) % 3)}
                      className="w-12 h-12 rounded-full border border-[#ebd2a0]/35 bg-white hover:bg-[#052316] text-[#b89547] hover:text-[#ebd2a0] shadow-md hover:shadow-xl flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer group/btn"
                      title="Next Service"
                    >
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform duration-300" />
                    </button>
                  </div>

                  {/* Dynamic indicator pill bullets */}
                  <div className="flex justify-center items-center space-x-2.5 mt-8">
                    {[0, 1, 2].map((idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveSolutionIdx(idx)}
                        className={`transition-all duration-300 rounded-full h-2 focus:outline-none cursor-pointer ${
                          idx === activeSolutionIdx 
                            ? "w-8 bg-[#b89547] shadow-[0_0_8px_rgba(184,149,71,0.4)]" 
                            : "w-2.5 bg-[#ebd2a0]/50 hover:bg-[#b89547]/50"
                        }`}
                        aria-label={`Show slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

              </div>
            </motion.section>

            {/* NEW: QUALITY PROMISE & TRUSTED INGREDIENTS */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              id="quality-and-ingredients"
              className="py-24 bg-[#052316] text-white border-y border-[#b89547]/20 relative overflow-hidden"
            >
              {/* Corner Mandala */}
              <svg className="absolute -bottom-10 -left-10 w-48 h-48 pointer-events-none select-none opacity-10" viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="80" stroke="#b89547" strokeWidth="0.8" />
                <circle cx="100" cy="100" r="60" stroke="#b89547" strokeWidth="0.8" />
                {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg) => (
                  <line key={deg} x1="100" y1="100" x2={(100 + 80 * Math.cos(deg*Math.PI/180)).toFixed(4)} y2={(100 + 80 * Math.sin(deg*Math.PI/180)).toFixed(4)} stroke="#b89547" strokeWidth="0.5" />
                ))}
              </svg>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column: Quality Promise Badge (4 cols) */}
                  <div className="lg:col-span-4 flex flex-col items-center text-center p-6 border border-[#b89547]/25 rounded-[2.5rem] bg-[#03140d]/40 relative">
                    <div className="absolute -top-4 bg-[#b89547] text-white text-[9px] font-mono font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                      Catering Partner
                    </div>
                    {/* Badge UI */}
                    <div className="w-36 h-36 rounded-full border-4 border-double border-[#b89547]/45 flex items-center justify-center p-2 relative my-6">
                      <div className="w-full h-full rounded-full bg-[#b89547]/10 flex flex-col items-center justify-center text-center p-3">
                        <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#b89547]">Our Promise</span>
                        <div className="w-12 h-[1px] bg-[#b89547]/30 my-1" />
                        <span className="text-xs font-serif font-black text-white leading-tight">Your Confidence</span>
                        <div className="w-12 h-[1px] bg-[#b89547]/30 my-1" />
                        <span className="text-[8px] font-bold text-gray-300 uppercase tracking-tight">Quality • Hygiene • Taste</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-300 font-medium">
                      Our Promise, Your Confidence. The hallmark of premium corporate standards in every serving.
                    </p>
                  </div>

                  {/* Right Column: Trusted Ingredients (8 cols) */}
                  <div className="lg:col-span-8 space-y-8 text-left">
                    <div className="space-y-3">
                      <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#b89547] uppercase block">INGREDIENTS WE TRUST</span>
                      <h3 className="text-3xl md:text-4.5xl font-serif text-white tracking-tight leading-none font-black">
                        Quality You Taste
                      </h3>
                      <p className="text-sm text-gray-300 max-w-xl font-sans">
                        We believe that exceptional food begins with exceptional ingredients. We never compromise on standard brands and fresh procurement.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-2">
                      {/* Ingredient 1: Cooking Oil */}
                      <div className="space-y-2 border-l border-[#b89547]/30 pl-4">
                        <span className="text-xs font-mono font-black text-[#b89547] block uppercase tracking-wider">01. Cooking Oil</span>
                        <h5 className="font-serif font-bold text-sm text-white">Olive Oil & Fortune Oil</h5>
                        <p className="text-[11px] text-gray-400">First corporate caterer cooking in healthy Olive Oil or premium Fortune Oil.</p>
                      </div>

                      {/* Ingredient 2: Flour */}
                      <div className="space-y-2 border-l border-[#b89547]/30 pl-4">
                        <span className="text-xs font-mono font-black text-[#b89547] block uppercase tracking-wider">02. Fresh Flour</span>
                        <h5 className="font-serif font-bold text-sm text-white">ITC Aashirvaad</h5>
                        <p className="text-[11px] text-gray-400">Using 100% whole wheat high-fibre flour for soft, nutritious tawa chapatis.</p>
                      </div>

                      {/* Ingredient 3: Spices */}
                      <div className="space-y-2 border-l border-[#b89547]/30 pl-4">
                        <span className="text-xs font-mono font-black text-[#b89547] block uppercase tracking-wider">03. Pure Spices</span>
                        <h5 className="font-serif font-bold text-sm text-white">MDH Spices</h5>
                        <p className="text-[11px] text-gray-400">Authentic recipes prepared using pure, certified raw spices from MDH.</p>
                      </div>

                      {/* Ingredient 4: Rice */}
                      <div className="space-y-2 border-l border-[#b89547]/30 pl-4">
                        <span className="text-xs font-mono font-black text-[#b89547] block uppercase tracking-wider">04. Long Grain Rice</span>
                        <h5 className="font-serif font-bold text-sm text-white">Premium Basmati</h5>
                        <p className="text-[11px] text-gray-400">Long-grain, aromatic aged basmati rice for perfect texture and fragrance.</p>
                      </div>

                      {/* Ingredient 5: Vegetables */}
                      <div className="space-y-2 border-l border-[#b89547]/30 pl-4">
                        <span className="text-xs font-mono font-black text-[#b89547] block uppercase tracking-wider">05. Vegetables</span>
                        <h5 className="font-serif font-bold text-sm text-white">Seasonal Fresh</h5>
                        <p className="text-[11px] text-gray-400">Sourced daily from local farmers, strictly washed and hygienically chopped.</p>
                      </div>

                      {/* Ingredient 6: Sweets */}
                      <div className="space-y-2 border-l border-[#b89547]/30 pl-4">
                        <span className="text-xs font-mono font-black text-[#b89547] block uppercase tracking-wider">06. Desserts</span>
                        <h5 className="font-serif font-bold text-sm text-white">Freshly Day-Prepared</h5>
                        <p className="text-[11px] text-gray-400">Authentic sweets prepared fresh daily without artificial preservatives.</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </motion.section>

            {/* 4. CURATED EVENING DELIGHTS */}
            <EveningSnacks />

            {/* 5. GOLD STANDARD FEATURES */}
            <motion.section
              initial={{ opacity: 0, scale: 0.98, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              id="the-gold-standard-features"
              className="py-24 bg-[#FAF8F5] border-t border-b border-[#ebd2a0]/10"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                  <div className="flex items-center justify-center space-x-2.5 text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#b89547]">
                    <div className="w-5 h-[1.5px] bg-[#b89547]/55" />
                    <span>OUR EXCELLENCE</span>
                    <div className="w-5 h-[1.5px] bg-[#b89547]/55" />
                  </div>
                  <h2 className="text-4xl md:text-5.5xl font-serif text-[#052316] tracking-tight leading-tight select-none">
                    The <span className="font-serif font-black italic text-[#d99a1f] pr-1">Gold</span> Standard of <br />
                    <span className="font-serif font-black">Corporate Dining</span>
                  </h2>
                  <div className="flex justify-center items-center py-1 text-[#b89547]/50">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 3c-1.5 3-4.5 4.5-8 4.5M12 3c1.5 3 4.5 4.5 8 4.5M12 3v18" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className="text-sm md:text-base text-[#052316]/70 font-sans max-w-xl mx-auto tracking-wide leading-relaxed font-medium">
                    We combine heritage recipes with professionalism to provide an unmatched dining experience for your workforce.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                  
                  {/* Left block: Gorgeous portrait image with structured bottom badge */}
                  <div className="lg:col-span-5 flex flex-col h-full">
                    <div id="gold-standard-left-panel" className="relative bg-[#052316] rounded-[2rem] overflow-hidden shadow-2xl border border-[#ebd2a0]/25 flex flex-col justify-between h-full group">
                      <div className="relative h-[280px] md:h-[350px] overflow-hidden bg-[#010906]">
                        <img
                          src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800"
                          alt="The luxury corporate workplace copper chaffing dishes"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#052316]/75 via-transparent to-transparent pointer-events-none" />
                      </div>
                      
                      {/* Foot of Card with premium brand building badge */}
                      <div className="bg-[#052316] p-6 md:p-8 flex items-center space-x-5 text-left border-t border-[#ebd2a0]/15">
                        <div className="w-14 h-14 rounded-full border-2 border-[#ebd2a0] flex items-center justify-center shrink-0 bg-[#092e1f] text-[#ebd2a0] shadow-md">
                          <Building2 className="w-6 h-6 stroke-[1.5]" />
                        </div>
                        <div className="space-y-1 text-left">
                          <span className="text-[10px] font-mono font-bold tracking-widest text-[#ebd2a0] uppercase block">
                            MODERN WORKPLACE
                          </span>
                          <p className="text-xs text-[#e5dfd3]/95 leading-relaxed font-sans font-medium">
                            Tailored for the 21st-century professional environment.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right block: 6 cards matching standard dining parameters */}
                  <div className="lg:col-span-7 flex flex-col justify-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
                      
                      {/* Card 1: Fresh Daily */}
                      <div className="bg-white border-2 border-[#f7f4ed] hover:border-[#ebd2a0]/30 shadow-[0_12px_36px_rgba(33,52,43,0.02)] p-6 rounded-[2rem] flex items-center space-x-5 transition-all hover:-translate-y-0.5 duration-300">
                        <div className="w-14 h-14 rounded-full bg-[#052316] border-2 border-[#ebd2a0]/35 flex items-center justify-center shrink-0 text-[#ebd2a0] shadow-md">
                          <ChefHat className="w-6 h-6 stroke-[1.5]" />
                        </div>
                        <div className="space-y-1 text-left">
                          <h4 className="text-base text-[#052316] font-serif font-black tracking-tight leading-snug">
                            Fresh Daily
                          </h4>
                          <p className="text-xs text-gray-500 leading-normal font-sans font-medium">
                            Prepared fresh in our central kitchen hours before delivery.
                          </p>
                        </div>
                      </div>

                      {/* Card 2: Expert Staff */}
                      <div className="bg-white border-2 border-[#f7f4ed] hover:border-[#ebd2a0]/30 shadow-[0_12px_36px_rgba(33,52,43,0.02)] p-6 rounded-[2rem] flex items-center space-x-5 transition-all hover:-translate-y-0.5 duration-300">
                        <div className="w-14 h-14 rounded-full bg-[#052316] border-2 border-[#ebd2a0]/35 flex items-center justify-center shrink-0 text-[#ebd2a0] shadow-md">
                          <Award className="w-6 h-6 stroke-[1.5]" />
                        </div>
                        <div className="space-y-1 text-left">
                          <h4 className="text-base text-[#052316] font-serif font-black tracking-tight leading-snug">
                            Expert Staff
                          </h4>
                          <p className="text-xs text-gray-500 leading-normal font-sans font-medium">
                            Trained for professional service in executive environments.
                          </p>
                        </div>
                      </div>

                      {/* Card 3: Vetted Team */}
                      <div className="bg-white border-2 border-[#f7f4ed] hover:border-[#ebd2a0]/30 shadow-[0_12px_36px_rgba(33,52,43,0.02)] p-6 rounded-[2rem] flex items-center space-x-5 transition-all hover:-translate-y-0.5 duration-300">
                        <div className="w-14 h-14 rounded-full bg-[#052316] border-2 border-[#ebd2a0]/35 flex items-center justify-center shrink-0 text-[#ebd2a0] shadow-md">
                          <ShieldCheck className="w-6 h-6 stroke-[1.5]" />
                        </div>
                        <div className="space-y-1 text-left">
                          <h4 className="text-base text-[#052316] font-serif font-black tracking-tight leading-snug">
                            Vetted Team
                          </h4>
                          <p className="text-xs text-gray-500 leading-normal font-sans font-medium">
                            Background-checked professional delivery & kitchen managers.
                          </p>
                        </div>
                      </div>

                      {/* Card 4: Heritage Recipes */}
                      <div className="bg-white border-2 border-[#f7f4ed] hover:border-[#ebd2a0]/30 shadow-[0_12px_36px_rgba(33,52,43,0.02)] p-6 rounded-[2rem] flex items-center space-x-5 transition-all hover:-translate-y-0.5 duration-300">
                        <div className="w-14 h-14 rounded-full bg-[#052316] border-2 border-[#ebd2a0]/35 flex items-center justify-center shrink-0 text-[#ebd2a0] shadow-md">
                          <Sparkles className="w-6 h-6 stroke-[1.5]" />
                        </div>
                        <div className="space-y-1 text-left">
                          <h4 className="text-base text-[#052316] font-serif font-black tracking-tight leading-snug">
                            Heritage Recipes
                          </h4>
                          <p className="text-xs text-gray-500 leading-normal font-sans font-medium">
                            Traditional Indian cooking methods, raw spices and zero additives.
                          </p>
                        </div>
                      </div>

                      {/* Card 5: Tailored Menus */}
                      <div className="bg-white border-2 border-[#f7f4ed] hover:border-[#ebd2a0]/30 shadow-[0_12px_36px_rgba(33,52,43,0.02)] p-6 rounded-[2rem] flex items-center space-x-5 transition-all hover:-translate-y-0.5 duration-300">
                        <div className="w-14 h-14 rounded-full bg-[#052316] border-2 border-[#ebd2a0]/35 flex items-center justify-center shrink-0 text-[#ebd2a0] shadow-md">
                          <Layers className="w-6 h-6 stroke-[1.5]" />
                        </div>
                        <div className="space-y-1 text-left">
                          <h4 className="text-base text-[#052316] font-serif font-black tracking-tight leading-snug">
                            Tailored Menus
                          </h4>
                          <p className="text-xs text-gray-500 leading-normal font-sans font-medium">
                            Custom menu engineering matching employee demographics.
                          </p>
                        </div>
                      </div>

                      {/* Card 6: Strict Hygiene */}
                      <div className="bg-white border-2 border-[#f7f4ed] hover:border-[#ebd2a0]/30 shadow-[0_12px_36px_rgba(33,52,43,0.02)] p-6 rounded-[2rem] flex items-center space-x-5 transition-all hover:-translate-y-0.5 duration-300">
                        <div className="w-14 h-14 rounded-full bg-[#052316] border-2 border-[#ebd2a0]/35 flex items-center justify-center shrink-0 text-[#ebd2a0] shadow-md">
                          <ShieldCheck className="w-6 h-6 stroke-[1.5]" />
                        </div>
                        <div className="space-y-1 text-left">
                          <h4 className="text-base text-[#052316] font-serif font-black tracking-tight leading-snug">
                            Strict Hygiene
                          </h4>
                          <p className="text-xs text-gray-500 leading-normal font-sans font-medium">
                            FSSAI certified process tracking, constant sanitization protocols.
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

              </div>
            </motion.section>

          </motion.div>
        )}

        {/* ==================== TAB 2: MENU SCREEN ==================== */}
        {activeTab === AppTab.MENU && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            id="menu-view-container"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16"
          >
            {/* Header info */}
            <div className="text-center max-w-3xl mx-auto space-y-6 pt-4 relative">
              <div className="inline-flex items-center space-x-1 px-3.5 py-1 bg-[#ebd2a0]/20 border border-[#b89547]/20 rounded-full">
                <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#ac843b]">
                  GOURMET SELECTIONS
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-serif font-black text-halwai-green-950 tracking-tight leading-tight md:leading-[1.12]">
                Our Menus,<br />
                <span className="italic font-normal text-halwai-gold-600">Desi Flavours, Corporate Standards.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#0e3d2a]/70 leading-relaxed max-w-2xl mx-auto">
                Explore our premium meal options, traditional selections, and curated corporate dining boxes. Customization is always available for your team.
              </p>
            </div>

            {/* TCH Box Menu explorer */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              id="tch-box-menu-explorer-tab"
              className="py-12 bg-white border border-[#e5dfd3]/65 rounded-[2.5rem] shadow-sm relative"
            >
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Dark Green Banner Header */}
                <div className="bg-[#052316] text-[#ebd2a0] py-6 px-8 rounded-3xl border border-[#b89547]/30 text-center shadow-lg mb-12 max-w-3xl mx-auto">
                  <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#b89547] uppercase block mb-1">Brochure Selection</span>
                  <h3 className="text-3xl font-serif font-black text-white tracking-tight uppercase">
                    TCH BOX MENU
                  </h3>
                  <div className="w-16 h-[1.5px] bg-[#b89547] mx-auto my-2" />
                  <p className="text-xs text-gray-300 font-sans tracking-wide">
                    Choose one option from each category to create your perfect corporate meal box.
                  </p>
                </div>

                {/* 8 Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(() => {
                    const categories = [
                      {
                        title: "1. Dal (Choice of One)",
                        items: ["Dal Makhni", "Dal Tadka", "Special Tandoori Dal"]
                      },
                      {
                        title: "2. Gravy Curries (Choice of One)",
                        items: ["Kadhai Paneer", "Shahi Paneer", "Paneer Lababdar", "Palak Paneer", "Malai Kofta", "Rajma Masala", "Chhole Masala", "Kadhi Pakora", "Lauki Kofta", "Soya Chaap Masala"]
                      },
                      {
                        title: "3. Vegetables (Choice of One)",
                        items: ["Mix Veg", "Aloo Gobhi", "Jeera Aloo", "Cabbage Matar", "Capsicum Masala", "Mushroom Matar", "Bhindi Masala", "Chana Masala"]
                      },
                      {
                        title: "4. Rice Selection",
                        items: ["Plain Rice", "Jeera Rice", "Matar Pulao"]
                      },
                      {
                        title: "5. Breads Selection",
                        items: ["Tawa Roti", "Tandoori Roti", "Butter Naan", "Stuffed Garlic Naan", "Aloo Parantha", "Paneer Parantha", "Aloo Onion Parantha", "Lacha Parantha", "Plain Roti", "Butter Roti"]
                      },
                      {
                        title: "6. Raita (Choice of One)",
                        items: ["Plain Raita", "Mix Raita", "Boondi Raita"]
                      },
                      {
                        title: "7. Dessert (Choice of One)",
                        items: ["Halwa", "Kheer", "Rasgulla", "Gulab Jamun", "Rabri Jalebi", "Rasmalai", "Ice Cream"]
                      },
                      {
                        title: "8. Salad & Chutney",
                        items: ["Green Salad", "Onion Salad", "Fruit Salad", "Mexican Salad", "Russian Salad", "Green Chutney"]
                      }
                    ];

                    return categories.map((cat, ci) => (
                      <div key={ci} className="bg-white border border-[#e5dfd3]/60 rounded-3xl p-6 shadow-[0_8px_24px_rgba(5,35,22,0.02)] hover:border-[#b89547]/30 transition-all duration-300 text-left">
                        <h4 className="font-serif font-black text-base text-[#052316] mb-4 flex items-center justify-between border-b border-[#e5dfd3]/40 pb-2">
                          <span>{cat.title}</span>
                          <span className="text-[10px] bg-[#b89547]/10 text-[#b89547] px-2 py-0.5 rounded-full font-mono uppercase">Select 1</span>
                        </h4>
                        <div className="flex flex-wrap gap-2 text-left">
                          {cat.items.map((item, ii) => (
                            <span
                              key={ii}
                              className="px-3.5 py-1.5 bg-[#FAF9F6] border border-[#e5dfd3]/50 text-xs font-sans text-[#052316]/80 rounded-full font-medium flex items-center gap-1.5 transition-all duration-200 hover:bg-[#052316]/5 hover:border-[#052316]/20"
                            >
                              <Check className="w-3 h-3 text-[#b89547]" />
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ));
                  })()}
                </div>

                {/* Callout banners */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 max-w-3xl mx-auto">
                  <div className="flex-1 bg-[#052316]/5 border border-[#b89547]/20 rounded-2xl p-4 flex items-center gap-3 text-left">
                    <div className="w-10 h-10 rounded-full bg-[#b89547]/10 flex items-center justify-center text-[#b89547] shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] font-mono font-bold text-[#b89547] uppercase tracking-wider block">Customization</span>
                      <span className="text-xs font-sans font-bold text-[#052316]">Menu Customization Available</span>
                    </div>
                  </div>

                  <div className="flex-1 bg-[#052316]/5 border border-[#b89547]/20 rounded-2xl p-4 flex items-center gap-3 text-left">
                    <div className="w-10 h-10 rounded-full bg-[#b89547]/10 flex items-center justify-center text-[#b89547] shrink-0">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] font-mono font-bold text-[#b89547] uppercase tracking-wider block">Bulk Orders</span>
                      <span className="text-xs font-sans font-bold text-[#052316]">Deals in Bulk Orders Only</span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.section>

            {/* Evening Snacks section */}
            <div className="border-t border-[#e5dfd3]/60 pt-14">
              <div className="text-center max-w-3xl mx-auto mb-10">
                <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#b89547] uppercase block mb-1">Light Delights</span>
                <h3 className="text-3xl font-serif font-black text-[#052316] tracking-tight uppercase">
                  Evening Snacks Menu
                </h3>
                <div className="w-16 h-[1.5px] bg-[#b89547] mx-auto my-2" />
                <p className="text-xs text-gray-500 font-sans">
                  Any 1 or 2 items combo served with fresh traditional beverages (Lassi, Buttermilk, or Fresh Lime Soda).
                </p>
                <div className="flex justify-center items-center gap-2 text-[10px] font-mono text-gray-400 mt-2">
                  <span>GST exclusive</span>
                  <span>•</span>
                  <span>Bulk orders only</span>
                </div>
              </div>

              {/* Evening Snacks Combos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pb-10 px-4">
                {/* Silver Snacks Combo */}
                <div className="bg-white border border-[#e5dfd3]/60 rounded-3xl p-6 text-center space-y-3 shadow-xs">
                  <span className="text-[10px] font-mono font-bold text-[#b89547] uppercase tracking-wider block">Silver Snack Combo</span>
                  <h4 className="font-serif font-bold text-sm text-[#052316]">Any 1 Item</h4>
                  <p className="text-xs text-gray-500 font-sans">Choose any single item from our extensive evening snacks selections.</p>
                </div>
                {/* Gold Snacks Combo */}
                <div className="bg-white border border-[#e5dfd3]/60 rounded-3xl p-6 text-center space-y-3 shadow-xs">
                  <span className="text-[10px] font-mono font-bold text-[#b89547] uppercase tracking-wider block">Gold Snack Combo</span>
                  <h4 className="font-serif font-bold text-sm text-[#052316]">Any 2 Items OR 1 Item + Beverage</h4>
                  <p className="text-xs text-gray-500 font-sans">Choice of any 2 snacks, or 1 snack paired with fresh Lassi, Buttermilk, or Fresh Lime Soda.</p>
                </div>
                {/* Platinum Snacks Combo */}
                <div className="bg-white border border-[#e5dfd3]/60 rounded-3xl p-6 text-center space-y-3 shadow-xs">
                  <span className="text-[10px] font-mono font-bold text-[#b89547] uppercase tracking-wider block">Platinum Snack Combo</span>
                  <h4 className="font-serif font-bold text-sm text-[#052316]">Any 2 Items + Beverage</h4>
                  <p className="text-xs text-gray-500 font-sans">Choice of any 2 snack items paired with fresh Lassi, Buttermilk, or Fresh Lime Soda.</p>
                </div>
              </div>

              <EveningSnacks />
            </div>

          </motion.div>
        )}

        {/* ==================== TAB 2: PRICING SCREEN ==================== */}
        {activeTab === AppTab.PRICING && (
          <motion.div
            key="pricing"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            id="pricing-view-container"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16"
          >
            
            {/* Hero Headers */}
            <div className="text-center max-w-3xl mx-auto space-y-6 pt-4 relative">
              {/* Subtle visual guide fork background vectors absolute positions */}
              <div className="absolute -right-16 top-0 opacity-10 pointer-events-none hidden lg:block select-none text-right">
                <span className="font-serif italic text-[#c5a059] text-9xl leading-none">🍴</span>
              </div>
              
              <div className="inline-flex items-center space-x-1 px-3.5 py-1 bg-[#ebd2a0]/20 border border-[#b89547]/20 rounded-full">
                <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#ac843b]">
                  TRANSPARENT INVESTMENT
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-serif font-black text-halwai-green-950 tracking-tight leading-tight md:leading-[1.12]">
                Premium Hospitality,<br />
                <span className="italic font-normal text-halwai-gold-600">Scaled for Performance.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#0e3d2a]/70 leading-relaxed max-w-2xl mx-auto">
                Predictable corporate catering budgets with the refinement of artisanal Indian cuisine. Choose a plan that matches your organization's rhythm.
              </p>
              
              <div className="pt-2 flex justify-center">
                <button
                  onClick={() => document.getElementById('interactive-catering-estimator')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center space-x-2.5 px-6 py-3 bg-[#052316] text-[#ebd2a0] text-xs font-sans font-bold uppercase tracking-[0.16em] rounded-full hover:bg-[#8b6b2a] hover:text-[#ebd2a0] transition-all duration-300 shadow-sm cursor-pointer active:scale-95"
                >
                  <span>View Price Tiers</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* AI Generator Toggle Segment */}
            <AiMenuDesigner onApplyMenuToBooking={handleApplyAiMenuToBooking} />

            {/* Calculator Section */}
            <div className="border-t border-[#e5dfd3]/60 pt-14 space-y-6">
              <CateringCalculator onQuoteRequested={openBookingWithPreset} />
            </div>

            {/* Detailed plan specifications (Corporate Thali Inclusions) */}
            <div className="space-y-8 pt-8 border-t border-[#e5dfd3]/60 text-center">
              
              <div className="space-y-3 max-w-2xl mx-auto">
                <div className="inline-block px-3 py-1 bg-[#ebd2a0]/20 border border-[#b89547]/20 rounded-full text-[10px] font-mono tracking-[0.2em] text-[#ac843b] uppercase font-bold">
                  INCLUSION DETAILS
                </div>
                <h3 className="text-3xl md:text-4.5xl font-serif font-black text-[#052316] tracking-tight">
                  Corporate Thali Specifies
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans">
                  Detailed breakdown of what each Tier offers for our signature corporate thali service.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-6xl mx-auto pt-4 items-stretch">
                
                {/* Card 1: Silver */}
                <div className="bg-white rounded-[2rem] p-8 border border-[#e5dfd3]/60 shadow-[0_10px_30px_rgba(5,35,22,0.02)] flex flex-col justify-between relative transition-all duration-300 hover:shadow-md text-left">
                  <div className="space-y-6">
                    <div className="border-b border-[#e5dfd3]/40 pb-5">
                      <h4 className="font-serif font-black text-[#052316] text-2xl leading-none">Silver Meal Thali</h4>
                      <div className="flex items-baseline mt-2">
                        <span className="text-sm font-sans font-black text-[#b89547] uppercase tracking-wide">Contact for Custom Quote</span>
                      </div>
                    </div>

                    <ul className="space-y-3.5 text-xs sm:text-sm text-gray-600 font-sans text-left">
                      {[
                        "1 Gravy Curry",
                        "Dal Makhni / Raita",
                        "Steam Rice",
                        "Fresh Tawa Chapati",
                        "Regular Salad, Jaggery Cubes, Pickle, Chutney",
                        "Olive Oil upgrade (+₹20/person) available",
                        "Taxes extra as applicable"
                      ].map((item, key) => (
                        <li key={key} className="flex items-start space-x-2.5">
                          <Check className="w-4 h-4 text-[#b89547] shrink-0 mt-0.5" />
                          <span className="leading-tight">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    id="thali-book-btn-0"
                    onClick={() => openBookingWithPreset("Silver", 50)}
                    className="w-full py-4 mt-8 bg-gray-100 hover:bg-gray-200 text-[#052316] text-xs font-sans font-bold uppercase tracking-[0.16em] rounded-xl transition-all duration-300 cursor-pointer active:scale-95"
                  >
                    Choose Silver
                  </button>
                </div>

                {/* Card 2: Gold (RECOMMENDED) */}
                <div className="bg-white rounded-[2rem] p-8 border-2 border-[#b89547] shadow-[0_15px_45px_rgba(184,149,71,0.08)] flex flex-col justify-between relative transition-all duration-300 hover:shadow-lg text-left">
                  {/* RECOMMENDED badge */}
                  <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[#8b6b2a] text-[#ebd2a0] text-[9px] font-mono tracking-[0.2em] uppercase font-extrabold px-5 py-1.5 rounded-full border border-[#ebd2a0]/40 shadow-sm z-10">
                    RECOMMENDED
                  </div>

                  <div className="space-y-6">
                    <div className="border-b border-[#e5dfd3]/40 pb-5">
                      <h4 className="font-serif font-black text-[#052316] text-2xl leading-none">Gold Meal Thali</h4>
                      <div className="flex items-baseline mt-2">
                        <span className="text-sm font-sans font-black text-[#b89547] uppercase tracking-wide">Contact for Custom Quote</span>
                      </div>
                    </div>

                    <ul className="space-y-3.5 text-xs sm:text-sm text-gray-700 font-sans text-left">
                      {[
                        "1 Premium Gravy",
                        "1 Dry Seasonal Veg",
                        "Dal Makhni",
                        "Boondi Raita / Veg Raita",
                        "Jeera Rice",
                        "Fresh Tawa Chapati",
                        "Green Salad, Jaggery, Pickle, Chutney",
                        "Olive Oil upgrade (+₹20/person) available",
                        "Taxes extra as applicable"
                      ].map((item, key) => (
                        <li key={key} className="flex items-start space-x-2.5">
                          <Check className="w-4 h-4 text-[#b89547] shrink-0 mt-0.5" />
                          <span className="leading-tight font-medium text-[#052316]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    id="thali-book-btn-1"
                    onClick={() => openBookingWithPreset("Gold", 50)}
                    className="w-full py-4 mt-8 bg-[#052316] hover:bg-[#09261a] text-[#ebd2a0] text-xs font-sans font-bold uppercase tracking-[0.16em] rounded-xl shadow-md transition-all duration-300 cursor-pointer active:scale-95"
                  >
                    Choose Gold
                  </button>
                </div>

                {/* Card 3: Platinum */}
                <div className="bg-white rounded-[2rem] p-8 border border-[#e5dfd3]/60 shadow-[0_10px_30px_rgba(5,35,22,0.02)] flex flex-col justify-between relative transition-all duration-300 hover:shadow-md text-left">
                  <div className="space-y-6">
                    <div className="border-b border-[#e5dfd3]/40 pb-5">
                      <h4 className="font-serif font-black text-[#052316] text-2xl leading-none">Platinum Meal Thali</h4>
                      <div className="flex items-baseline mt-2">
                        <span className="text-sm font-sans font-black text-[#b89547] uppercase tracking-wide">Contact for Custom Quote</span>
                      </div>
                    </div>

                    <ul className="space-y-3.5 text-xs sm:text-sm text-gray-600 font-sans text-left">
                      {[
                        "1 Premium Gravy",
                        "1 Dry Seasonal Veg",
                        "Dal Makhni",
                        "Boondi Raita / Veg Raita",
                        "Jeera Rice",
                        "Fresh Tawa Chapati & Laccha Paratha",
                        "Papad",
                        "Choice of Sweets (Mentioned in Menu)",
                        "Green Salad, Jaggery, Pickle, Chutney",
                        "Olive Oil upgrade (+₹20/person) available",
                        "Taxes extra as applicable"
                      ].map((item, key) => (
                        <li key={key} className="flex items-start space-x-2.5">
                          <Check className="w-4 h-4 text-[#b89547] shrink-0 mt-0.5" />
                          <span className={`leading-tight ${item === "Choice of Sweets (Mentioned in Menu)" ? "underline decoration-[#b89547] decoration-2 underline-offset-4 font-semibold text-[#052316]" : ""}`}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    id="thali-book-btn-2"
                    onClick={() => openBookingWithPreset("Platinum", 50)}
                    className="w-full py-4 mt-8 bg-gray-100 hover:bg-gray-200 text-[#052316] text-xs font-sans font-bold uppercase tracking-[0.16em] rounded-xl transition-all duration-300 cursor-pointer active:scale-95"
                  >
                    Choose Platinum
                  </button>
                </div>

              </div>
            </div>

            {/* Hybrid Logic Section (As requested by the images specs) */}
            <div id="hybrid-logic-layout" className="rounded-3xl overflow-hidden bg-[#052316] border border-[#ebd2a0]/10 shadow-[0_24px_60px_rgba(5,35,22,0.12)] max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Side: Copy and Details */}
                <div className="lg:col-span-7 p-8 md:p-12 space-y-6 text-left">
                  <div className="space-y-2">
                    <span className="text-gray-400 font-sans text-xs uppercase tracking-[0.2em] block">OPERATIONAL EXCELLENCE</span>
                    <h3 className="text-3xl md:text-4.5xl font-serif font-black text-white tracking-tight leading-tight">
                      The "Hybrid" Logic: <br />
                      <span className="text-[#ebd2a0] italic font-normal">TCH Box + Live</span>
                    </h3>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-[#ebd2a0]/80 leading-relaxed font-sans max-w-xl">
                    Our unique model combines pre-portioned efficiency with the magic of live cooking. Perfect for high-density offices where space and time are premium.
                  </p>
                  
                  <div className="space-y-5 pt-3">
                    <div className="flex items-start space-x-3.5">
                      <div className="w-5 h-5 rounded-full bg-[#ebd2a0]/15 border border-[#ebd2a0]/40 flex items-center justify-center text-[#ebd2a0] shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                      <div>
                        <span className="text-[#ebd2a0] block text-sm font-sans font-extrabold mb-0.5">The TCH Box efficiency:</span>
                        <p className="text-gray-300 text-xs leading-relaxed max-w-md font-sans">
                          Pre-cooked artisanal staples delivered in temperature-controlled sustainable containers.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3.5">
                      <div className="w-5 h-5 rounded-full bg-[#ebd2a0]/15 border border-[#ebd2a0]/40 flex items-center justify-center text-[#ebd2a0] shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                      <div>
                        <span className="text-[#ebd2a0] block text-sm font-sans font-extrabold mb-0.5">Live Experience/Taste:</span>
                        <p className="text-gray-300 text-xs leading-relaxed max-w-md font-sans">
                          On-site tandoor/soft-tawa for fresh breads and signature starters to maintain the '5-star' feel.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Photo and Overlay Badge */}
                <div className="lg:col-span-5 relative self-stretch min-h-[320px] lg:min-h-full">
                  <img
                    src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800"
                    alt="Active Chef Counter"
                    className="w-full h-full object-cover lg:absolute lg:inset-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#052316]/50 lg:bg-none pointer-events-none" />
                  
                  {/* Floating Saffron Orange lightning badge */}
                  <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm shadow-[0_10px_30px_rgba(5,35,22,0.15)] rounded-2xl p-4 border border-[#e5dfd3] flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-[#b89547]/10 text-[#ac843b]">
                      <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                      </svg>
                    </div>
                    <div className="text-left font-sans">
                      <span className="text-[9px] font-mono tracking-wider text-gray-400 block uppercase font-bold">HYBRID SAVINGS</span>
                      <span className="text-xs font-bold text-[#052316]">Save 15% vs Full Live</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Local Storage Quote Logs */}
            {inquiries.length > 0 && (
              <div id="saved-inquiries-history-section" className="space-y-4 pt-4">
                <div className="border-b border-halwai-cream-200 pb-2">
                  <h4 className="text-lg font-serif font-bold text-halwai-green-950">
                    Active Tasting Inquiries & Dynamic Quotes ({inquiries.length})
                  </h4>
                  <p className="text-xs text-halwai-green-800/70">
                    These are your temporary browser-saved pricing outlines. Share these during verification.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {inquiries.map((inq) => (
                    <div key={inq.id} className="bg-white rounded-lg p-5 border border-halwai-gold-500/20 shadow-xs flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] bg-halwai-gold-500/15 text-halwai-gold-600 font-mono font-bold px-2 py-0.5 rounded uppercase">
                              {inq.plan} level
                            </span>
                            <h5 className="font-serif font-bold text-halwai-green-950 mt-1">{inq.companyName}</h5>
                          </div>
                          <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded border border-emerald-100">
                            {inq.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs text-halwai-green-800">
                          <div>
                            <span className="opacity-75 block text-[10px] uppercase font-mono">Reference No</span>
                            <b className="font-mono text-halwai-green-950">{inq.id}</b>
                          </div>
                          <div>
                            <span className="opacity-75 block text-[10px] uppercase font-mono">Guests Target</span>
                            <b>{inq.headcount} Guests</b>
                          </div>
                          <div>
                            <span className="opacity-75 block text-[10px] uppercase font-mono">Inquiry Date</span>
                            <b>{inq.eventDate || "TBD"}</b>
                          </div>
                          <div>
                            <span className="opacity-75 block text-[10px] uppercase font-mono">Est Plate cost</span>
                            <b className="font-mono text-halwai-gold-600">₹{inq.estimatedPricePerPlate}</b>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 mt-3 border-t border-dashed border-halwai-cream-100 flex justify-between items-baseline text-sm">
                        <span className="text-xs text-halwai-green-800/80">Estimated Contract:</span>
                        <b className="font-mono text-halwai-green-950 text-base">₹{inq.estimatedTotal?.toLocaleString()}/-</b>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ Accordion Section */}
            <div id="faq-accordions-layout" className="space-y-6 max-w-4xl mx-auto pt-4 text-center">
              <div className="space-y-3">
                <div className="inline-block px-3 py-1 bg-[#ebd2a0]/20 border border-[#b89547]/20 rounded-full text-[10px] font-mono tracking-[0.2em] text-[#ac843b] uppercase font-bold">
                  QUESTIONS & ANSWERS
                </div>
                <h3 className="text-3xl font-serif font-black text-[#052316] tracking-tight">
                  Frequently Asked Questions
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto">
                  Everything you need to know about our corporate dining operations, custom dietary models, and hygiene standards.
                </p>
              </div>

              <div className="space-y-4 font-sans text-left pt-4">
                {[
                  {
                    q: "Do you provide staff for service?",
                    a: "Yes! All tier models include professional, fully uniformed service staff trained in luxury hygiene protocols to handle set-up, table service, and clean-up."
                  },
                  {
                    q: "Can we customize the menu for dietary restrictions?",
                    a: "Absolutely. We routinely draft specialized menus for vegetative, Jain, dairy-free, nut-free, and calorie-conscious corporate requirements."
                  },
                  {
                    q: "What is the minimum lead time for booking?",
                    a: "For daily scheduled meal thalis, we recommend registering 48 hours in advance. Mega live events and chef live-cooking counter orders require 5 to 7 days lead time to ensure premium ingredient sourcing and on-site setup."
                  },
                  {
                    q: "How do you manage quality at scale?",
                    a: "We maintain our signature taste standards through mechanized food temperature sensors, automated spice profiling setups, and rigid final inspection trials conducted by lead master chefs before dispatch."
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-white border border-[#e5dfd3]/60 rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(5,35,22,0.01)] transition-all hover:border-[#b89547]/30">
                    <button
                      id={`faq-toggle-btn-${index}`}
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full text-left p-5 md:p-6 flex justify-between items-center bg-transparent focus:outline-none transition-colors hover:bg-[#ebd2a0]/5 cursor-pointer"
                    >
                      <span className="font-serif font-black text-[#052316] pr-4 text-base antialiased">
                        {faq.q}
                      </span>
                      <ChevronDown className={`w-5 h-5 text-[#b89547] shrink-0 transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`} />
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-6 pt-1 text-sm text-[gray-600] border-t border-[#e5dfd3]/30 leading-relaxed font-sans bg-[#ebd2a0]/5">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        )}

        {/* ==================== TAB 3: GALLERY SCREEN ==================== */}
        {activeTab === AppTab.GALLERY && (
          <motion.div
            key="gallery"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            id="gallery-view-container"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 relative overflow-hidden"
          >
            
            {/* Header titles with elegant background blob */}
            <div className="relative text-center max-w-3xl mx-auto space-y-4 py-8">
              {/* Organic background abstract shape */}
              <div 
                className="absolute right-0 top-0 w-72 h-72 md:w-96 md:h-96 rounded-full bg-[#f3ede2]/65 -mr-16 -mt-10 pointer-events-none mix-blend-multiply filter blur-2xl animate-pulse" 
                style={{ animationDuration: "8s" }}
              />
              <div className="relative space-y-3 z-10">
                <span className="text-[10px] md:text-xs text-[#ac843b] uppercase font-mono tracking-[0.25em] font-extrabold block">
                  VISUAL EXCELLENCE
                </span>
                <h2 className="text-3xl md:text-[2.75rem] lg:text-[3.25rem] font-serif font-black text-[#052316] tracking-tight leading-[1.12]">
                  Culinary Artistry & <br className="hidden sm:inline" /> Corporate Precision
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed font-sans">
                  Experience the grandeur of premium corporate hospitality through our curated showcase of elite events across Gurugram and Delhi NCR.
                </p>
              </div>
            </div>

            {/* Filter Tabs layout */}
            <div className="flex flex-wrap items-center justify-center gap-3 pb-8">
              {[
                { label: "All Showcases", category: "all" },
                { label: "Corporate Lunches", category: "lunch" },
                { label: "Buffet Setups", category: "buffet" },
                { label: "Meal Boxes", category: "box" },
                { label: "Live Counters", category: "live" }
              ].map((tab) => {
                const isActive = galleryFilter === tab.category;
                return (
                  <button
                    key={tab.category}
                    id={`gallery-filter-pill-${tab.category}`}
                    onClick={() => setGalleryFilter(tab.category)}
                    className={`px-5 py-2.5 text-xs sm:text-sm font-sans font-medium rounded-full border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-[#052316] border-[#052316] text-white shadow-sm"
                        : "bg-white border-[#e5dfd3]/60 text-gray-700 hover:text-[#052316] hover:bg-gray-50/50"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Masonry Food Grid */}
            {galleryFilter === "all" && galleryItems.length >= 5 ? (
              <div className="space-y-8 max-w-6xl mx-auto pt-4">
                {/* Row 1: 1 Wide Card (col-span-2) + 1 Tall Card (col-span-1) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                  {/* Card 1: Wide buffet chafers */}
                  <div
                    id={`gallery-visual-card-${galleryItems[0].id}`}
                    onClick={() => setLightboxItem(galleryItems[0])}
                    className="lg:col-span-2 group relative overflow-hidden rounded-[2rem] shadow-[0_15px_45px_rgba(5,35,22,0.02)] border border-[#e5dfd3]/40 aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto h-full min-h-[380px] lg:min-h-[480px] cursor-pointer"
                  >
                    <img
                      src={galleryItems[0].imageUrl}
                      alt={galleryItems[0].title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    {/* Hover subtle glass overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/95 backdrop-blur-md px-6 py-3 rounded-full text-xs font-sans font-bold tracking-wide text-gray-800 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        View Presentation Details
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Tall/Vertical stacked meal boxes */}
                  <div
                    id={`gallery-visual-card-${galleryItems[1].id}`}
                    onClick={() => setLightboxItem(galleryItems[1])}
                    className="lg:col-span-1 group relative overflow-hidden rounded-[2rem] shadow-[0_15px_45px_rgba(5,35,22,0.02)] border border-[#e5dfd3]/40 aspect-[3/4] lg:aspect-auto h-full min-h-[380px] lg:min-h-[480px] cursor-pointer"
                  >
                    <img
                      src={galleryItems[1].imageUrl}
                      alt={galleryItems[1].title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    {/* Hover subtle glass overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/95 backdrop-blur-md px-6 py-3 rounded-full text-xs font-sans font-bold tracking-wide text-gray-800 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        View Packaging Details
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 2: Three Vertical Cards (each col-span-1) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-2">
                  {/* Card 3: Live oven cooking */}
                  <div
                    id={`gallery-visual-card-${galleryItems[2].id}`}
                    onClick={() => setLightboxItem(galleryItems[2])}
                    className="group relative overflow-hidden rounded-[2rem] shadow-[0_15px_45px_rgba(5,35,22,0.02)] border border-[#e5dfd3]/40 aspect-[3/4] cursor-pointer"
                  >
                    <img
                      src={galleryItems[2].imageUrl}
                      alt={galleryItems[2].title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/95 backdrop-blur-md px-6 py-3 rounded-full text-xs font-sans font-bold tracking-wide text-gray-800 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        View Live Show Details
                      </div>
                    </div>
                  </div>

                  {/* Card 4: Dessert table golden stand */}
                  <div
                    id={`gallery-visual-card-${galleryItems[3].id}`}
                    onClick={() => setLightboxItem(galleryItems[3])}
                    className="group relative overflow-hidden rounded-[2rem] shadow-[0_15px_45px_rgba(5,35,22,0.02)] border border-[#e5dfd3]/40 aspect-[3/4] cursor-pointer"
                  >
                    <img
                      src={galleryItems[3].imageUrl}
                      alt={galleryItems[3].title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/95 backdrop-blur-md px-6 py-3 rounded-full text-xs font-sans font-bold tracking-wide text-gray-800 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        View Dessert Displays
                      </div>
                    </div>
                  </div>

                  {/* Card 5: Thali flatlay */}
                  <div
                    id={`gallery-visual-card-${galleryItems[4].id}`}
                    onClick={() => setLightboxItem(galleryItems[4])}
                    className="group relative overflow-hidden rounded-[2rem] shadow-[0_15px_45px_rgba(5,35,22,0.02)] border border-[#e5dfd3]/40 aspect-[3/4] cursor-pointer"
                  >
                    <img
                      src={galleryItems[4].imageUrl}
                      alt={galleryItems[4].title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/95 backdrop-blur-md px-6 py-3 rounded-full text-xs font-sans font-bold tracking-wide text-gray-800 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        View Menu Composition
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Filtered Grid (Normal standard grid layout fallback) */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto pt-4">
                {filteredGallery.map((item) => (
                  <div
                    key={item.id}
                    id={`gallery-visual-card-${item.id}`}
                    onClick={() => setLightboxItem(item)}
                    className="group relative overflow-hidden rounded-[2rem] shadow-[0_15px_45px_rgba(5,35,22,0.02)] border border-[#e5dfd3]/40 aspect-[3/4] cursor-pointer"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/95 backdrop-blur-md px-6 py-3 rounded-full text-xs font-sans font-bold tracking-wide text-gray-800 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        View Details
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Bottom complementary invitation CTA */}
            <div className="bg-[#052316] text-white rounded-[2.5rem] border border-[#ebd2a0]/25 p-8 md:p-12 text-center max-w-5xl mx-auto space-y-6 shadow-[0_20px_50px_rgba(5,35,22,0.1)] mt-12 relative overflow-hidden">
              <div className="absolute top-1/2 left-10 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full filter blur-3xl pointer-events-none" />
              <div className="absolute top-1/2 right-10 -translate-y-1/2 w-64 h-64 bg-[#ebd2a0]/5 rounded-full filter blur-3xl pointer-events-none" />
              
              <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
                <span className="text-[10px] font-mono tracking-widest text-[#ebd2a0] uppercase block font-bold">
                  EXPERIENCE FIRST HAND
                </span>
                <h3 className="text-3xl font-serif text-[#ebd2a0] tracking-tight antialiased">
                  Taste the Standard of <span className="font-serif italic font-normal text-white">The Corporate Halwai</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                  We schedule exclusive boardroom tasting sessions for HR heads, facility leaders, and administration teams. Try our gourmet catalog before final contract setup.
                </p>
                <div className="pt-3">
                  <button
                    id="gallery-schedule-call-btn"
                    onClick={() => setIsBookingOpen(true)}
                    className="px-8 py-3 bg-gradient-to-r from-halwai-gold-500 to-halwai-gold-300 text-halwai-green-950 font-bold text-xs uppercase tracking-widest rounded shadow-md hover:shadow-lg transition-all"
                  >
                    Reserve complimentary Tasting Session
                  </button>
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </main>

      {/* ===================== BRAND LUXURY FOOTER ===================== */}
      <footer id="primary-app-footer" className="bg-[#05140d] text-halwai-cream-50 border-t border-[#b89547]/30 py-16 px-4 relative overflow-hidden">
        {/* Mughal monument silhouette in footer */}
        <div className="absolute bottom-0 right-0 left-0 h-24 opacity-[0.04] pointer-events-none select-none">
          <svg className="w-full h-full text-white" viewBox="0 0 1000 100" preserveAspectRatio="none" fill="currentColor">
            <path d="M0,100 L1000,100 L1000,70 Q950,55 900,70 T800,70 Q750,50 700,70 T600,70 Q550,55 500,70 T400,70 Q350,50 300,70 T200,70 Q150,55 100,70 T0,70 Z" />
            <path d="M150,70 L150,30 Q160,20 170,30 L170,70 Z M450,70 L450,20 Q465,5 480,20 L480,70 Z M750,70 L750,30 Q760,20 770,30 L770,70 Z" />
            <circle cx="160" cy="20" r="2" />
            <circle cx="465" cy="5" r="3" />
            <circle cx="760" cy="20" r="2" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10 text-left">
          
          {/* Col 1: Brand details */}
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 flex items-center justify-center">
                <TCHLogo className="w-full h-full" id="footer-tch-logo" />
              </div>
              <h2 className="text-base font-serif font-black text-white tracking-wide uppercase">
                The Corporate Halwai
              </h2>
            </div>
            <p className="text-xs text-halwai-cream-100/60 leading-relaxed font-sans">
              Premium corporate Indian gastronomy. Designed to deliver robust fuel, extreme health focus, and visual theater across office environments of modern teams.
            </p>
            <p className="text-[10px] font-mono text-halwai-gold-400">
              © {new Date().getFullYear()} The Corporate Halwai. All rights reserved.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3 text-left">
            <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[#b89547] select-none">
              Catering Tiers
            </h5>
            <div className="flex flex-col space-y-1.5 text-xs text-halwai-cream-100/60 font-sans">
              <button onClick={() => { setActiveTab(AppTab.HOME); window.scrollTo(0,0); }} className="hover:text-halwai-gold-300 text-left">The TCH Box Program</button>
              <button onClick={() => { setActiveTab(AppTab.HOME); window.scrollTo(0,0); }} className="hover:text-halwai-gold-300 text-left">Royal Buffet Setups</button>
              <button onClick={() => { setActiveTab(AppTab.HOME); window.scrollTo(0,0); }} className="hover:text-halwai-gold-300 text-left">Themed Street Food Carts</button>
              <button onClick={() => { setActiveTab(AppTab.MENU); window.scrollTo(0,0); }} className="hover:text-halwai-gold-300 text-left">Explore Menu & Selections</button>
            </div>
          </div>

          {/* Col 3: Operations Locations */}
          <div className="space-y-3 text-left">
            <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[#b89547] select-none">
              Sectors & Hubs
            </h5>
            <div className="space-y-2 text-xs text-halwai-cream-100/60 font-sans">
              <div className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-halwai-gold-400 shrink-0 mt-0.5" />
                <span>Gurugram & Delhi NCR Service Area.</span>
              </div>
              <div className="flex items-center space-x-2">
                <Timer className="w-3.5 h-3.5 text-halwai-gold-400 shrink-0" />
                <span>Operating hours: 07:00 AM - 10:00 PM Daily</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-3.5 h-3.5 text-halwai-gold-400 shrink-0" />
                <a href="https://www.thecorporatehalwai.com" target="_blank" rel="noopener noreferrer" className="hover:text-halwai-gold-300">www.thecorporatehalwai.com</a>
              </div>
            </div>
          </div>

          {/* Col 4: Contact details */}
          <div className="space-y-3 text-left">
            <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[#b89547] select-none">
              Business Desks
            </h5>
            <div className="space-y-2.5 text-xs text-halwai-cream-100/60 font-sans">
              <div className="flex flex-col space-y-1.5">
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-halwai-gold-400 shrink-0" />
                  <a href="tel:+919289030016" className="hover:text-halwai-gold-300 font-mono">9289030016</a>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-halwai-gold-400 shrink-0" />
                  <a href="tel:+919667314900" className="hover:text-halwai-gold-300 font-mono">9667314900 <span className="text-[10px] text-gray-400 font-sans">(Bulk Orders)</span></a>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-halwai-gold-400 shrink-0" />
                <a href="mailto:thecorporatehalwai@gmail.com" className="hover:text-halwai-gold-300 font-bold">thecorporatehalwai@gmail.com</a>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <a
                  href="https://wa.me/919289030016?text=Hi%20The%20Corporate%20Halwai%2C%20I%27d%20like%20to%20enquire%20about%20your%20catering%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-halwai-gold-300"
                >
                  WhatsApp Support
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Brand Statement + Quality Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-[#ebd2a0]/15 relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-halwai-cream-100/60 font-serif italic text-center md:text-left">
            "Food that Fuels Performance. Great meals. Happy teams. Better workplaces."
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-mono tracking-wider uppercase text-halwai-gold-400">
            <span>Deals in Bulk Orders Only</span>
            <span className="text-gray-600">•</span>
            <span>Professional Service</span>
            <span className="text-gray-600">•</span>
            <span>Consistent Quality</span>
            <span className="text-gray-600">•</span>
            <span>Complete Satisfaction</span>
          </div>
        </div>
      </footer>

      {/* ===================== BOOKING INQUIRY MODAL ===================== */}
      <AnimatePresence>
        {isBookingOpen && (
          <BookingModal
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
            prefilledPlan={prefilledPlan}
            prefilledHeadcount={prefilledHeadcount}
          />
        )}
      </AnimatePresence>

      {/* ===================== GALLERY LIGHTBOX MODAL ===================== */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            id="gallery-lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-halwai-charcoal-950/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative bg-white rounded-xl shadow-2xl border border-halwai-gold-500/20 max-w-3xl w-full overflow-hidden max-h-[92vh] flex flex-col md:flex-row"
            >
            
            {/* Left: big view */}
            <div className="md:w-1/2 aspect-video md:aspect-auto bg-halwai-green-950 min-h-[250px] relative">
              <img
                src={lightboxItem.imageUrl}
                alt={lightboxItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                id="close-lightbox-top-btn"
                onClick={() => setLightboxItem(null)}
                className="absolute top-3 left-3 p-1 rounded-full bg-halwai-green-950/80 border border-white/10 text-white md:hidden"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Right: details specifications */}
            <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-6 overflow-y-auto">
              
              <div className="space-y-4 text-left">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-halwai-gold-600 font-bold">
                      {lightboxItem.category} Case study
                    </span>
                    <h4 className="text-xl font-serif font-bold text-halwai-green-950 mt-1">
                      {lightboxItem.title}
                    </h4>
                  </div>
                  <button
                    id="close-lightbox-cross-btn"
                    onClick={() => setLightboxItem(null)}
                    className="hidden md:block p-1 text-halwai-green-950/60 hover:text-halwai-green-950 hover:bg-halwai-cream-100 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1.5 text-xs text-halwai-green-900 leading-relaxed font-sans">
                  <p><b>Executive Context:</b></p>
                  <p className="text-halwai-green-800/80 bg-halwai-cream-50 p-2.5 rounded border border-halwai-cream-100">{lightboxItem.details}</p>
                </div>

                {lightboxItem.feedback && (
                  <div className="p-3 bg-halwai-gold-500/5 border border-halwai-gold-500/15 rounded-lg text-xs italic text-halwai-green-950">
                    "{lightboxItem.feedback}"
                    <span className="block text-[10px] font-mono uppercase tracking-wider font-bold text-halwai-gold-600 mt-2 not-italic">
                      — facility representative
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-halwai-cream-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-left font-mono text-[10px] text-halwai-green-800">
                  <span className="block"><b>Client:</b> {lightboxItem.client}</span>
                  <span className="block"><b>Date:</b> {lightboxItem.date}</span>
                </div>
                <button
                  id="lightbox-book-match-btn"
                  onClick={() => {
                    setLightboxItem(null);
                    setIsBookingOpen(true);
                  }}
                  className="px-4 py-2 bg-halwai-green-950 hover:bg-halwai-green-950 text-halwai-gold-300 font-bold text-xs uppercase tracking-wider rounded shadow-sm"
                >
                  Request similar setup
                </button>
              </div>

            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919289030016?text=Hi%20The%20Corporate%20Halwai%2C%20I%27d%20like%20to%20enquire%20about%20your%20catering%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3.5 rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.4)] hover:bg-[#20ba5a] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center border border-white/10"
        title="WhatsApp Us"
      >
        <MessageCircle className="w-6.5 h-6.5 text-white" />
      </a>

    </div>
  );
}
