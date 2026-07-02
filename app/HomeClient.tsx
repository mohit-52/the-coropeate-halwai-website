'use client';

import React from "react";
import { remoteConfig, fetchAndActivate, getValue } from "../lib/firebase";
import { AppTab, GalleryItem, SavedInquiry } from "../types";
import Header from "../components/Header";
import BookingModal from "../components/BookingModal";
import EveningSnacks from "../components/EveningSnacks";
import CateringCalculator from "../components/CateringCalculator";
import AiMenuDesigner from "../components/AiMenuDesigner";
import TCHLogo from "../components/TCHLogo";
import OurPartners from "../components/OurPartners";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight, ArrowDown, ShieldCheck, Timer, Award, Scale, RefreshCw, Layers, Sparkles,
  ThumbsUp, CalendarClock, ChevronDown, ChefHat, Phone, Mail, MapPin, Search,
  Expand, PlusCircle, Check, HelpCircle, X, Utensils, UtensilsCrossed, Building2, Clock,
  Briefcase, Crown, Star, MessageCircle, Globe, Leaf, Flame, Users, TrendingUp,
  Sprout, Package, Truck, Droplet, ClipboardList, FileText
} from "lucide-react";

export default function HomeClient() {
  const [isActive, setIsActive] = React.useState<boolean | null>(null);
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
  const [servicesTab, setServicesTab] = React.useState<"corporate" | "private">("corporate");
  const [brochureUrl, setBrochureUrl] = React.useState<string>("/corporate-catering-brochure.pdf");

  // Load inquiries from local storage
  const loadInquiries = () => {
    if (typeof window !== "undefined") {
      const list = JSON.parse(localStorage.getItem("tch_inquiries") || "[]");
      setInquiries(list);
    }
  };

  // Check feature flag
  React.useEffect(() => {
    const checkActiveStatus = async () => {
      try {
        if (!remoteConfig) {
          setIsActive(true);
          return;
        }
        await fetchAndActivate(remoteConfig);
        const activeFlag = getValue(remoteConfig, "is_active").asBoolean();
        setIsActive(activeFlag);
        
        // Fetch dynamic brochure URL
        const remoteBrochureUrl = getValue(remoteConfig, "brochure_asset_url").asString();
        if (remoteBrochureUrl) {
          setBrochureUrl(remoteBrochureUrl);
        }
      } catch (err) {
        console.error("Error fetching feature flag:", err);
        setIsActive(true); // Default to true on error so we don't break the app
      }
    };
    checkActiveStatus();
  }, []);

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

  if (isActive === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
        <TCHLogo className="w-32 h-32 animate-pulse text-[#b89547]" />
      </div>
    );
  }

  if (isActive === false) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F6] px-4 text-center">
        <TCHLogo className="w-24 h-24 mb-6 text-[#b89547] opacity-60" />
        <h1 className="text-3xl font-serif font-bold text-[#052316] mb-2">We'll be right back</h1>
        <p className="text-[#052316]/70 font-sans max-w-md">Our website is currently undergoing maintenance. Please check back later.</p>
      </div>
    );
  }

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
              {/* 1. HERO SECTION */}
              <section
                id="home-hero-billboard"
                className="relative min-h-[90vh] flex items-center justify-center bg-[#FAF9F6] overflow-hidden pt-20 md:pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#e5dfd3]/60"
              >
                {/* Mandala corner decorations — top-left */}
                <svg className="absolute top-0 left-0 w-64 h-64 pointer-events-none select-none opacity-[0.06]" viewBox="0 0 200 200" fill="none">
                  <circle cx="0" cy="0" r="100" stroke="#b89547" strokeWidth="0.8" />
                  <circle cx="0" cy="0" r="80" stroke="#b89547" strokeWidth="0.8" />
                  <circle cx="0" cy="0" r="60" stroke="#b89547" strokeWidth="0.6" />
                  {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180].map((deg) => (
                    <line key={deg} x1="0" y1="0" x2={(100 * Math.cos(deg * Math.PI / 180)).toFixed(4)} y2={(100 * Math.sin(deg * Math.PI / 180)).toFixed(4)} stroke="#b89547" strokeWidth="0.4" />
                  ))}
                </svg>

                {/* Decorative Leaf sketches on left and right edges matching visual design */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-[0.09] pointer-events-none select-none hidden xl:block">
                  <svg className="w-24 h-56 text-[#b89547]" viewBox="0 0 100 200" fill="none" stroke="currentColor" strokeWidth="0.75">
                    <path d="M10 20 C30 50 50 80 50 100 C50 120 30 150 10 180" />
                    <path d="M20 35 C40 60 60 85 60 100 C60 115 40 140 20 165" />
                    <path d="M30 50 C50 70 70 90 70 100 C70 110 50 130 30 150" />
                    <path d="M50 100 L0 100" />
                    <path d="M5 80 Q 25 75 45 100" />
                    <path d="M5 120 Q 25 125 45 100" />
                  </svg>
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.09] pointer-events-none select-none hidden xl:block">
                  <svg className="w-24 h-56 text-[#b89547] transform scale-x-[-1]" viewBox="0 0 100 200" fill="none" stroke="currentColor" strokeWidth="0.75">
                    <path d="M10 20 C30 50 50 80 50 100 C50 120 30 150 10 180" />
                    <path d="M20 35 C40 60 60 85 60 100 C60 115 40 140 20 165" />
                    <path d="M30 50 C50 70 70 90 70 100 C70 110 50 130 30 150" />
                    <path d="M50 100 L0 100" />
                    <path d="M5 80 Q 25 75 45 100" />
                    <path d="M5 120 Q 25 125 45 100" />
                  </svg>
                </div>

                {/* Outer decorative soft color blur accents */}
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
                        staggerChildren: 0.1,
                      }
                    }
                  }}
                  className="relative z-10 max-w-7xl mx-auto w-full"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                    {/* Left Column: Premium Brand Messaging */}
                    <div className="lg:col-span-6 space-y-7 text-center lg:text-left max-w-2xl order-2 lg:order-1 flex flex-col items-center lg:items-start w-full">

                      {/* Eyebrow Label with custom star separator */}
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 15 },
                          visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                        }}
                        className="flex items-center justify-center lg:justify-start gap-2 w-full"
                      >
                        <span className="text-[#b89547] text-sm">❖</span>
                        <span className="text-xs font-sans font-bold tracking-[0.15em] uppercase text-[#b89547]">Premium Corporate Catering</span>
                      </motion.div>

                      {/* Headline: Clean Serif typography matching screenshot exactly */}
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0, transition: { duration: 0.55 } }
                        }}
                        className="w-full"
                      >
                        <h1 className="text-5xl sm:text-6xl lg:text-[4.75rem] font-serif font-black leading-[1.05] tracking-tight flex flex-col items-center lg:items-start text-center lg:text-left">
                          <span className="text-[#052316]">Desi Flavours.</span>
                          <span className="text-[#b89547] font-normal">Corporate Standards.</span>
                        </h1>
                      </motion.div>

                      {/* Subheading / Description */}
                      <motion.p
                        variants={{
                          hidden: { opacity: 0, y: 15 },
                          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                        }}
                        className="text-[13px] sm:text-[15px] text-[#6b7280] font-sans font-medium leading-relaxed max-w-[90%] mx-auto lg:mx-0 text-center lg:text-left"
                      >
                        Authentic flavours. Hygienic preparation. Seamless service.<br />
                        Proudly serving events of all sizes,<br />
                        from <span className="font-bold text-[#052316]">10 to 10,000 people</span>.
                      </motion.p>

                      {/* We Cater To Block */}
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 15 },
                          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                        }}
                        className="w-full max-w-[90%] mt-4"
                      >
                        <div className="relative pt-3">
                          <div className="absolute inset-0 flex items-start justify-center">
                            <div className="w-full border-t border-[#b89547]/30 mt-[9px]" />
                          </div>
                          <div className="relative flex justify-center text-[9px] sm:text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-[#052316]">
                            <span className="bg-[#FAF9F6] px-3">We Cater To</span>
                          </div>
                        </div>

                        <div className="bg-white rounded-[1.25rem] border border-[#e5dfd3]/80 p-4 sm:p-5 mt-4 flex items-center justify-between shadow-sm">
                          {/* Weddings */}
                          <div className="flex flex-col items-center gap-1.5 flex-1 border-r border-[#e5dfd3]/60 last:border-0">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#052316]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <circle cx="9" cy="10" r="3" />
                              <circle cx="15" cy="10" r="3" />
                              <path d="M11 12.8A4.5 4.5 0 1 0 13 12.8" />
                            </svg>
                            <span className="text-[9px] sm:text-[10px] font-sans font-medium text-[#052316]">Weddings</span>
                          </div>
                          {/* Corporate Events */}
                          <div className="flex flex-col items-center gap-1.5 flex-1 border-r border-[#e5dfd3]/60 last:border-0">
                            <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-[#052316]" strokeWidth={1.5} />
                            <span className="text-[9px] sm:text-[10px] font-sans font-medium text-[#052316]">Corporate Events</span>
                          </div>
                          {/* Birthday Parties */}
                          <div className="flex flex-col items-center gap-1.5 flex-1 border-r border-[#e5dfd3]/60 last:border-0">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#052316]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M20 21H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2z" />
                              <path d="M12 12v-2" />
                              <path d="M8 12v-2" />
                              <path d="M16 12v-2" />
                              <path d="M12 7v-1" />
                              <path d="M8 7v-1" />
                              <path d="M16 7v-1" />
                            </svg>
                            <span className="text-[9px] sm:text-[10px] font-sans font-medium text-[#052316]">Birthday Parties</span>
                          </div>
                          {/* Family Gatherings */}
                          <div className="flex flex-col items-center gap-1.5 flex-1 border-r border-[#e5dfd3]/60 last:border-0">
                            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#052316]" strokeWidth={1.5} />
                            <span className="text-[9px] sm:text-[10px] font-sans font-medium text-[#052316]">Family Gatherings</span>
                          </div>
                          {/* & More */}
                          <div className="flex flex-col items-center gap-1.5 flex-1">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-[#052316] flex items-center justify-center">
                              <span className="text-[#052316] text-xs font-bold leading-none tracking-widest -mt-1">...</span>
                            </div>
                            <span className="text-[9px] sm:text-[10px] font-sans font-medium text-[#052316]">& More</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Action buttons row */}
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 15 },
                          visible: { opacity: 1, y: 0, transition: { duration: 0.55 } }
                        }}
                        className="pt-2 w-full"
                      >
                        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-4 w-full">
                          <button
                            id="hero-book-tasting-btn"
                            onClick={() => setIsBookingOpen(true)}
                            className="px-6 py-3.5 bg-[#052316] hover:bg-[#0b3c27] text-white font-sans font-bold text-[10px] sm:text-[11px] tracking-[0.15em] uppercase rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                          >
                            <span>Book a Tasting Session</span>
                            <ArrowRight className="w-3.5 h-3.5 text-white" />
                          </button>

                          <a
                            href="https://wa.me/919289030016?text=Hi%20The%20Corporate%20Halwai%2C%20I%27d%20like%20to%20book%20a%20tasting%20session."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3.5 bg-white border border-[#e5dfd3]/80 hover:bg-[#f8f6f0] text-[#052316] font-sans font-bold text-[10px] sm:text-[11px] tracking-[0.15em] uppercase rounded-full shadow-sm hover:shadow transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
                          >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            <span>WhatsApp Us</span>
                          </a>
                        </div>
                      </motion.div>

                    </div>

                    {/* Right Column: Hero Cinematic Card */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, scale: 0.97, x: 20 },
                        visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.65 } }
                      }}
                      className="lg:col-span-6 relative flex justify-center lg:justify-end w-full order-1 lg:order-2 lg:pl-10"
                    >
                      {/* Gold outline accent behind video */}
                      <div className="absolute top-[-2%] right-[-3%] bottom-[3%] left-[12%] border border-[#b89547] rounded-[2.5rem] pointer-events-none hidden lg:block" />

                      <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-[0_24px_54px_rgba(5,35,22,0.1)] bg-[#041d12] z-10 lg:ml-6">
                        {/* High-quality backup fallback image */}
                        <img
                          src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800"
                          alt="Premium corporate hot clay pot culinary preparation"
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover scale-105"
                        />

                        {/* Sizzling Clay Pot video */}
                        <video
                          id="hero-cooking-video"
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                          style={{ filter: "brightness(1.0) contrast(1.0)" }}
                        >
                          <source src="https://videos.pexels.com/video-files/3015488/3015488-sd_640_360_24fps.mp4" type="video/mp4" />
                          <source src="https://videos.pexels.com/video-files/3015488/3015488-hd_1280_720_24fps.mp4" type="video/mp4" />
                        </video>
                      </div>

                      {/* Floating Dark Green Card (Serving Events) */}
                      <div className="absolute top-[10%] left-[-2%] lg:left-0 bg-[#052316] rounded-2xl p-5 shadow-2xl flex flex-col items-center justify-center text-center w-36 sm:w-44 z-20 border border-white/10">
                        <Users className="w-6 h-6 text-[#b89547] mb-2" />
                        <span className="text-[9px] sm:text-[10px] text-white/80 font-sans tracking-wide">Serving Events</span>
                        <span className="text-sm sm:text-[18px] font-sans font-bold text-[#b89547] mt-1 leading-tight">10 to 10,000</span>
                        <span className="text-[9px] sm:text-[10px] text-white/80 font-sans mt-0.5">People</span>
                        <div className="w-8 h-[1px] bg-white/20 my-3" />
                        <span className="text-[9px] text-white/70 font-sans leading-snug px-2">Small get-togethers<br />to grand celebrations</span>
                      </div>

                      {/* Floating Trust Badge (Bottom Left) */}
                      <div className="absolute bottom-[-5%] lg:bottom-[5%] left-[5%] lg:left-[-5%] bg-white rounded-2xl p-4 shadow-xl flex items-center gap-4 z-20 border border-[#e5dfd3]/80">
                        <div className="w-10 h-10 rounded bg-[#f7eedd] flex items-center justify-center shrink-0">
                          <svg className="w-6 h-6 text-[#b89547]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11px] sm:text-xs font-sans font-bold text-[#b89547] tracking-wide">Hygienic <span className="mx-1">•</span> Reliable <span className="mx-1">•</span> Trusted</span>
                          <span className="text-[10px] text-gray-500 font-sans mt-0.5">Loved by 500+ businesses</span>
                        </div>
                      </div>

                    </motion.div>

                  </div>

                  {/* Bottom Trust Grid Row matching screenshot */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.25 } }
                    }}
                    className="flex flex-col md:flex-row items-center justify-between w-full py-5 px-6 sm:px-10 mt-16 sm:mt-24 bg-[#FAF9F6]/80 border border-[#e5dfd3]/60 rounded-[1.5rem] shadow-sm backdrop-blur-md max-w-[95%] mx-auto lg:max-w-none"
                  >
                    {/* Fresh & Hygienic */}
                    <div className="flex items-center gap-4 w-full md:w-1/3 md:border-r border-[#e5dfd3]/60 py-3 md:py-0 px-2 sm:px-4">
                      <div className="w-10 h-10 rounded-full bg-[#f7eedd] flex items-center justify-center shrink-0 border border-[#b89547]/20">
                        <Leaf className="w-5 h-5 text-[#052316]" strokeWidth={1.5} />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-widest text-[#052316]">Fresh & Hygienic</h4>
                        <p className="text-[10px] text-gray-500 font-medium mt-0.5">Quality ingredients,<br />prepared with care</p>
                      </div>
                    </div>

                    {/* On-Time Delivery */}
                    <div className="flex items-center gap-4 w-full md:w-1/3 md:border-r border-[#e5dfd3]/60 py-3 md:py-0 px-2 sm:px-6">
                      <div className="w-10 h-10 rounded-full bg-[#f7eedd] flex items-center justify-center shrink-0 border border-[#b89547]/20">
                        <Clock className="w-5 h-5 text-[#052316]" strokeWidth={1.5} />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-widest text-[#052316]">On-time Delivery</h4>
                        <p className="text-[10px] text-gray-500 font-medium mt-0.5">Always on schedule,<br />every time</p>
                      </div>
                    </div>

                    {/* Trusted by 500+ */}
                    <div className="flex items-center gap-4 w-full md:w-1/3 py-3 md:py-0 px-2 sm:px-6">
                      <div className="w-10 h-10 rounded-full bg-[#f7eedd] flex items-center justify-center shrink-0 border border-[#b89547]/20">
                        <ShieldCheck className="w-5 h-5 text-[#052316]" strokeWidth={1.5} />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-widest text-[#052316]">Trusted by 500+ Businesses</h4>
                        <p className="text-[10px] text-gray-500 font-medium mt-0.5">Consistency that<br />builds trust</p>
                      </div>
                    </div>
                  </motion.div>

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

              {/* NEW: OUR PARTNERS */}
              <OurPartners />

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

              {/* 3. OUR SERVICES — 3-column card grid */}
              <motion.section
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                id="strategic-catering-solutions"
                className="py-20 bg-[#FAF9F6] border-b border-[#ebd2a0]/15"
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                  {/* Section header */}
                  <div className="text-center mb-14 space-y-3">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <div className="w-6 h-[1px] bg-[#b89547]" />
                      <span className="text-[28px] font-mono font-bold tracking-[0.35em] text-[#b89547] uppercase">Our Services</span>
                      <div className="w-6 h-[1px] bg-[#b89547]" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#052316] tracking-tight leading-tight">
                      Catering Solutions for Every Corporate Need
                    </h2>
                    {/* Ornamental divider */}
                    <div className="flex items-center justify-center gap-2 pt-1">
                      <div className="w-10 h-[1px] bg-[#b89547]/40" />
                      <svg className="w-4 h-4 text-[#b89547]" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 1l1.5 4H16l-3.5 2.5 1.5 4L10 9l-4 2.5 1.5-4L4 5h4.5z" />
                      </svg>
                      <div className="w-10 h-[1px] bg-[#b89547]/40" />
                    </div>
                    <p className="text-sm md:text-base text-[#052316]/65 font-sans max-w-xl mx-auto font-medium">
                      Great food. Seamless service. Memorable experiences.
                    </p>
                  </div>

                  {/* Tab Switcher */}
                  <div className="flex justify-center mb-10">
                    <div className="inline-flex bg-white rounded-full p-1 border border-[#ebd2a0]/40 shadow-sm">
                      <button
                        onClick={() => setServicesTab("corporate")}
                        className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${servicesTab === "corporate"
                          ? "bg-[#052316] text-white shadow-md"
                          : "text-[#052316]/60 hover:text-[#052316] hover:bg-[#052316]/5"
                          }`}
                      >
                        Corporate Events
                      </button>
                      <button
                        onClick={() => setServicesTab("private")}
                        className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${servicesTab === "private"
                          ? "bg-[#052316] text-white shadow-md"
                          : "text-[#052316]/60 hover:text-[#052316] hover:bg-[#052316]/5"
                          }`}
                      >
                        Private Events
                      </button>
                    </div>
                  </div>

                  {servicesTab === "corporate" ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 mb-10">

                      {/* Card 01 — TCH Box */}
                      <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0 }}
                        className="bg-white rounded-[2rem] overflow-hidden border border-[#ebd2a0]/30 shadow-[0_8px_32px_rgba(5,35,22,0.03)] hover:shadow-[0_16px_48px_rgba(5,35,22,0.06)] hover:-translate-y-1 transition-all duration-400 flex flex-col relative"
                      >
                        {/* Top: number + title + image */}
                        <div className="flex items-start gap-4 p-8 pb-4 relative">
                          <div className="shrink-0 w-12 h-12 bg-[#052316] rounded-full flex items-center justify-center shadow-md">
                            <span className="text-lg font-serif font-black text-white leading-none">01</span>
                          </div>
                          <div className="flex-1 min-w-0 pr-24">
                            <h3 className="text-base font-serif font-bold text-[#052316] leading-snug uppercase tracking-wide">
                              The Corporate<br />Halwai Box
                            </h3>
                            <span className="inline-block mt-1 bg-[#d99a1f] text-white text-[8px] font-bold font-sans uppercase tracking-widest px-3 py-0.5 rounded-full leading-relaxed">
                              Minimum 10 Persons
                            </span>
                          </div>
                          {/* Food image: right-aligned, overlapping */}
                          <div className="absolute right-4 top-4 w-28 h-28 rounded-full overflow-hidden shadow-md border-4 border-white">
                            <img
                              src="https://plus.unsplash.com/premium_photo-1667389723440-dbbde959df52?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                              alt="TCH Box food"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Description */}
                        <div className="px-8 pb-4 pr-32">
                          <p className="text-xs text-gray-500 font-medium leading-relaxed">
                            A premium food box that brings great taste and convenience to your corporate meetings, events and celebrations.
                          </p>
                        </div>

                        {/* Feature icons row */}
                        <div className="bg-[#f0f5f2] mt-auto px-6 py-6 rounded-[1.75rem] mx-4 mb-4 flex flex-col gap-5 border border-[#e8dfc8]/30">
                          <div className="grid grid-cols-4 gap-1">
                            {[
                              { icon: <Droplet className="w-4 h-4" />, label: "Hygienically packed" },
                              { icon: <Sparkles className="w-4 h-4" />, label: "Complete multi-course" },
                              { icon: <Leaf className="w-4 h-4" />, label: "Balanced nutrition" },
                              { icon: <Users className="w-4 h-4" />, label: "Minimum 10 persons" },
                            ].map((f, i) => (
                              <div key={i} className="flex flex-col items-center text-center gap-1.5">
                                <div className="text-[#052316]">{f.icon}</div>
                                <span className="text-[8px] text-[#052316]/75 font-sans font-bold leading-tight">{f.label}</span>
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={() => { setActiveTab(AppTab.MENU); window.scrollTo({ top: 400, behavior: "smooth" }); }}
                            className="w-full flex items-center justify-center gap-2 bg-[#052316] hover:bg-[#b89547] text-white hover:text-[#052316] text-[10px] font-mono font-bold uppercase tracking-[0.2em] py-3.5 rounded-full transition-all duration-300 cursor-pointer group/cta shadow-sm"
                          >
                            Explore TCH Box
                            <ArrowRight className="w-3.5 h-3.5 group-hover/cta:translate-x-1 transition-transform duration-300" />
                          </button>
                        </div>
                      </motion.div>

                      {/* Card 02 — TCH Box + Live */}
                      <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-white rounded-[2rem] overflow-hidden border border-[#ebd2a0]/30 shadow-[0_8px_32px_rgba(5,35,22,0.03)] hover:shadow-[0_16px_48px_rgba(5,35,22,0.06)] hover:-translate-y-1 transition-all duration-400 flex flex-col relative"
                      >
                        {/* Top: number + title */}
                        <div className="flex items-start gap-4 p-8 pb-4 relative">
                          <div className="shrink-0 w-12 h-12 bg-[#052316] rounded-full flex items-center justify-center shadow-md">
                            <span className="text-lg font-serif font-black text-white leading-none">02</span>
                          </div>
                          <div className="flex-1 min-w-0 pr-24">
                            <h3 className="text-base font-serif font-bold text-[#052316] leading-snug uppercase tracking-wide">
                              TCH Box<br />+ Live
                            </h3>
                          </div>
                          {/* Food image */}
                          <div className="absolute right-4 top-4 w-28 h-28 rounded-[1.75rem] overflow-hidden shadow-md border-4 border-white">
                            <img
                              src="https://images.unsplash.com/photo-1691982800089-cb7a29c4596b?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                              alt="TCH Box + Live"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Description */}
                        <div className="px-8 pb-4 pr-32">
                          <p className="text-xs text-gray-500 font-medium leading-relaxed">
                            Enhance your event with our food boxes and live food counters for an engaging and memorable dining experience.
                          </p>
                        </div>

                        {/* Feature icons */}
                        <div className="bg-[#f0f5f2] mt-auto px-6 py-6 rounded-[1.75rem] mx-4 mb-4 flex flex-col gap-5 border border-[#e8dfc8]/30">
                          <div className="grid grid-cols-5 gap-0.5">
                            {[
                              { icon: <Star className="w-4 h-4" />, label: "Live food stations" },
                              { icon: <Sparkles className="w-4 h-4" />, label: "Premium presentation" },
                              { icon: <Utensils className="w-4 h-4" />, label: "Custom menu" },
                              { icon: <ChefHat className="w-4 h-4" />, label: "Professional staff" },
                              { icon: <TrendingUp className="w-4 h-4" />, label: "Scalable crowds" },
                            ].map((f, i) => (
                              <div key={i} className="flex flex-col items-center text-center gap-1.5">
                                <div className="text-[#052316]">{f.icon}</div>
                                <span className="text-[7.5px] text-[#052316]/75 font-sans font-bold leading-tight">{f.label}</span>
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={() => { setActiveTab(AppTab.MENU); window.scrollTo({ top: 400, behavior: "smooth" }); }}
                            className="w-full flex items-center justify-center gap-2 bg-[#052316] hover:bg-[#b89547] text-white hover:text-[#052316] text-[10px] font-mono font-bold uppercase tracking-[0.2em] py-3.5 rounded-full transition-all duration-300 cursor-pointer group/cta shadow-sm"
                          >
                            Explore Live Service
                            <ArrowRight className="w-3.5 h-3.5 group-hover/cta:translate-x-1 transition-transform duration-300" />
                          </button>
                        </div>
                      </motion.div>

                      {/* Card 03 — Corporate Thali */}
                      <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white rounded-[2rem] overflow-hidden border border-[#ebd2a0]/30 shadow-[0_8px_32px_rgba(5,35,22,0.03)] hover:shadow-[0_16px_48px_rgba(5,35,22,0.06)] hover:-translate-y-1 transition-all duration-400 flex flex-col relative"
                      >
                        {/* Top: number + title */}
                        <div className="flex items-start gap-4 p-8 pb-4 relative">
                          <div className="shrink-0 w-12 h-12 bg-[#052316] rounded-full flex items-center justify-center shadow-md">
                            <span className="text-lg font-serif font-black text-white leading-none">03</span>
                          </div>
                          <div className="flex-1 min-w-0 pr-24">
                            <h3 className="text-base font-serif font-bold text-[#052316] leading-snug uppercase tracking-wide">
                              Corporate Thali<br /><span className="text-sm normal-case font-normal">(Meal Box)</span>
                            </h3>
                          </div>
                          {/* Food image */}
                          <div className="absolute right-4 top-4 w-28 h-28 rounded-[1.75rem] overflow-hidden shadow-md border-4 border-white">
                            <img
                              src="https://images.unsplash.com/photo-1727404679933-99daa2a7573a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                              alt="Corporate Thali"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Description */}
                        <div className="px-8 pb-4 pr-32">
                          <p className="text-xs text-gray-500 font-medium leading-relaxed">
                            A complete single-serve meal solution for daily office meals, training programs, conferences and employee dining.
                          </p>
                        </div>

                        {/* Feature icons */}
                        <div className="bg-[#f0f5f2] mt-auto px-6 py-6 rounded-[1.75rem] mx-4 mb-4 flex flex-col gap-5 border border-[#e8dfc8]/30">
                          <div className="grid grid-cols-4 gap-1">
                            {[
                              { icon: <Leaf className="w-4 h-4" />, label: "Complete balanced meal" },
                              { icon: <ShieldCheck className="w-4 h-4" />, label: "Fresh & hygienic" },
                              { icon: <Package className="w-4 h-4" />, label: "Single convenience" },
                              { icon: <Truck className="w-4 h-4" />, label: "Easy distribution" },
                            ].map((f, i) => (
                              <div key={i} className="flex flex-col items-center text-center gap-1.5">
                                <div className="text-[#052316]">{f.icon}</div>
                                <span className="text-[8px] text-[#052316]/75 font-sans font-bold leading-tight">{f.label}</span>
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={() => { setActiveTab(AppTab.MENU); window.scrollTo({ top: 400, behavior: "smooth" }); }}
                            className="w-full flex items-center justify-center gap-2 bg-[#052316] hover:bg-[#b89547] text-white hover:text-[#052316] text-[10px] font-mono font-bold uppercase tracking-[0.2em] py-3.5 rounded-full transition-all duration-300 cursor-pointer group/cta shadow-sm"
                          >
                            Explore Thali
                            <ArrowRight className="w-3.5 h-3.5 group-hover/cta:translate-x-1 transition-transform duration-300" />
                          </button>
                        </div>
                      </motion.div>

                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 mb-10">
                      {/* Private Card 01 — Wedding */}
                      <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0 }}
                        className="bg-white rounded-[2rem] overflow-hidden border border-[#ebd2a0]/30 shadow-[0_8px_32px_rgba(5,35,22,0.03)] hover:shadow-[0_16px_48px_rgba(5,35,22,0.06)] hover:-translate-y-1 transition-all duration-400 flex flex-col relative"
                      >
                        <div className="flex items-start gap-4 p-8 pb-4 relative">
                          <div className="shrink-0 w-12 h-12 bg-[#052316] rounded-full flex items-center justify-center shadow-md">
                            <span className="text-lg font-serif font-black text-white leading-none">01</span>
                          </div>
                          <div className="flex-1 min-w-0 pr-24">
                            <h3 className="text-base font-serif font-bold text-[#052316] leading-snug uppercase tracking-wide">
                              Weddings
                            </h3>
                          </div>
                          <div className="absolute right-4 top-4 w-28 h-28 rounded-full overflow-hidden shadow-md border-4 border-white">
                            <img
                              src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                              alt="Wedding catering"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="px-8 pb-4 pr-32">
                          <p className="text-xs text-gray-500 font-medium leading-relaxed">
                            Elegant and exquisite catering services to make your special day truly memorable.
                          </p>
                        </div>
                        <div className="bg-[#f0f5f2] mt-auto px-6 py-6 rounded-[1.75rem] mx-4 mb-4 flex flex-col gap-5 border border-[#e8dfc8]/30">
                          <div className="grid grid-cols-3 gap-1">
                            {[
                              { icon: <Sparkles className="w-4 h-4" />, label: "Premium Menu" },
                              { icon: <Crown className="w-4 h-4" />, label: "Luxury Setup" },
                              { icon: <Users className="w-4 h-4" />, label: "Large Crowds" },
                            ].map((f, i) => (
                              <div key={i} className="flex flex-col items-center text-center gap-1.5">
                                <div className="text-[#052316]">{f.icon}</div>
                                <span className="text-[8px] text-[#052316]/75 font-sans font-bold leading-tight">{f.label}</span>
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={() => { setIsBookingOpen(true); }}
                            className="w-full flex items-center justify-center gap-2 bg-[#052316] hover:bg-[#b89547] text-white hover:text-[#052316] text-[10px] font-mono font-bold uppercase tracking-[0.2em] py-3.5 rounded-full transition-all duration-300 cursor-pointer group/cta shadow-sm"
                          >
                            Inquire Now
                            <ArrowRight className="w-3.5 h-3.5 group-hover/cta:translate-x-1 transition-transform duration-300" />
                          </button>
                        </div>
                      </motion.div>

                      {/* Private Card 02 — Birthday / Private Party */}
                      <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-white rounded-[2rem] overflow-hidden border border-[#ebd2a0]/30 shadow-[0_8px_32px_rgba(5,35,22,0.03)] hover:shadow-[0_16px_48px_rgba(5,35,22,0.06)] hover:-translate-y-1 transition-all duration-400 flex flex-col relative"
                      >
                        <div className="flex items-start gap-4 p-8 pb-4 relative">
                          <div className="shrink-0 w-12 h-12 bg-[#052316] rounded-full flex items-center justify-center shadow-md">
                            <span className="text-lg font-serif font-black text-white leading-none">02</span>
                          </div>
                          <div className="flex-1 min-w-0 pr-24">
                            <h3 className="text-base font-serif font-bold text-[#052316] leading-snug uppercase tracking-wide">
                              Private Parties
                            </h3>
                          </div>
                          <div className="absolute right-4 top-4 w-28 h-28 rounded-[1.75rem] overflow-hidden shadow-md border-4 border-white">
                            <img
                              src="https://images.unsplash.com/photo-1530103862676-de8892b0b144?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                              alt="Private Party"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="px-8 pb-4 pr-32">
                          <p className="text-xs text-gray-500 font-medium leading-relaxed">
                            Personalized menus and intimate service for your exclusive celebrations.
                          </p>
                        </div>
                        <div className="bg-[#f0f5f2] mt-auto px-6 py-6 rounded-[1.75rem] mx-4 mb-4 flex flex-col gap-5 border border-[#e8dfc8]/30">
                          <div className="grid grid-cols-3 gap-1">
                            {[
                              { icon: <Star className="w-4 h-4" />, label: "Custom Menu" },
                              { icon: <Flame className="w-4 h-4" />, label: "Live Counters" },
                              { icon: <Check className="w-4 h-4" />, label: "Hassle-free" },
                            ].map((f, i) => (
                              <div key={i} className="flex flex-col items-center text-center gap-1.5">
                                <div className="text-[#052316]">{f.icon}</div>
                                <span className="text-[8px] text-[#052316]/75 font-sans font-bold leading-tight">{f.label}</span>
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={() => { setIsBookingOpen(true); }}
                            className="w-full flex items-center justify-center gap-2 bg-[#052316] hover:bg-[#b89547] text-white hover:text-[#052316] text-[10px] font-mono font-bold uppercase tracking-[0.2em] py-3.5 rounded-full transition-all duration-300 cursor-pointer group/cta shadow-sm"
                          >
                            Inquire Now
                            <ArrowRight className="w-3.5 h-3.5 group-hover/cta:translate-x-1 transition-transform duration-300" />
                          </button>
                        </div>
                      </motion.div>

                      {/* Private Card 03 — Family / Social Gathering */}
                      <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white rounded-[2rem] overflow-hidden border border-[#ebd2a0]/30 shadow-[0_8px_32px_rgba(5,35,22,0.03)] hover:shadow-[0_16px_48px_rgba(5,35,22,0.06)] hover:-translate-y-1 transition-all duration-400 flex flex-col relative"
                      >
                        <div className="flex items-start gap-4 p-8 pb-4 relative">
                          <div className="shrink-0 w-12 h-12 bg-[#052316] rounded-full flex items-center justify-center shadow-md">
                            <span className="text-lg font-serif font-black text-white leading-none">03</span>
                          </div>
                          <div className="flex-1 min-w-0 pr-24">
                            <h3 className="text-base font-serif font-bold text-[#052316] leading-snug uppercase tracking-wide">
                              Social Gatherings
                            </h3>
                          </div>
                          <div className="absolute right-4 top-4 w-28 h-28 rounded-[1.75rem] overflow-hidden shadow-md border-4 border-white">
                            <img
                              src="https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                              alt="Social Gathering"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="px-8 pb-4 pr-32">
                          <p className="text-xs text-gray-500 font-medium leading-relaxed">
                            Bringing families and friends together with authentic Indian flavors and warmth.
                          </p>
                        </div>
                        <div className="bg-[#f0f5f2] mt-auto px-6 py-6 rounded-[1.75rem] mx-4 mb-4 flex flex-col gap-5 border border-[#e8dfc8]/30">
                          <div className="grid grid-cols-3 gap-1">
                            {[
                              { icon: <Leaf className="w-4 h-4" />, label: "Traditional Recipes" },
                              { icon: <ShieldCheck className="w-4 h-4" />, label: "Safe & Hygienic" },
                              { icon: <Utensils className="w-4 h-4" />, label: "Generous Portions" },
                            ].map((f, i) => (
                              <div key={i} className="flex flex-col items-center text-center gap-1.5">
                                <div className="text-[#052316]">{f.icon}</div>
                                <span className="text-[8px] text-[#052316]/75 font-sans font-bold leading-tight">{f.label}</span>
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={() => { setIsBookingOpen(true); }}
                            className="w-full flex items-center justify-center gap-2 bg-[#052316] hover:bg-[#b89547] text-white hover:text-[#052316] text-[10px] font-mono font-bold uppercase tracking-[0.2em] py-3.5 rounded-full transition-all duration-300 cursor-pointer group/cta shadow-sm"
                          >
                            Inquire Now
                            <ArrowRight className="w-3.5 h-3.5 group-hover/cta:translate-x-1 transition-transform duration-300" />
                          </button>
                        </div>
                      </motion.div>

                    </div>
                  )}

                  {/* Trust bar — 5 items */}
                  {/* <div className="bg-white rounded-[2rem] border border-[#ebd2a0]/40 shadow-[0_8px_32px_rgba(5,35,22,0.03)] px-8 py-8 mt-12">
                    <div className="grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-5 gap-8 sm:gap-4">
                      {[
                        { icon: <Leaf className="w-6 h-6 stroke-[1.5] text-[#b89547]" />, title: "Authentic\nIndian Flavours", desc: "Traditional recipes,\nexceptional taste" },
                        { icon: <ShieldCheck className="w-6 h-6 stroke-[1.5] text-[#b89547]" />, title: "Hygiene &\nFood Safety", desc: "Strict quality checks,\nsafe & hygienic food" },
                        { icon: <Users className="w-6 h-6 stroke-[1.5] text-[#b89547]" />, title: "Experienced\nProfessionals", desc: "Trained team delivering\ntop-notch service" },
                        { icon: <Clock className="w-6 h-6 stroke-[1.5] text-[#b89547]" />, title: "On-Time\nEvery Time", desc: "Punctual delivery,\nzero delays" },
                        { icon: <Utensils className="w-6 h-6 stroke-[1.5] text-[#b89547]" />, title: "Customised\nMenus", desc: "Tailored to your needs\n& preferences" },
                      ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center text-center gap-2">
                          <div className="text-[#b89547] mb-1">
                            {item.icon}
                          </div>
                          <h4 className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-[#052316] whitespace-pre-line leading-tight">
                            {item.title}
                          </h4>
                          <p className="text-[10px] text-gray-500 font-medium whitespace-pre-line leading-relaxed max-w-[160px] mx-auto">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div> */}

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
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                    <line key={deg} x1="100" y1="100" x2={(100 + 80 * Math.cos(deg * Math.PI / 180)).toFixed(4)} y2={(100 + 80 * Math.sin(deg * Math.PI / 180)).toFixed(4)} stroke="#b89547" strokeWidth="0.5" />
                  ))}
                </svg>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                  {/* Section header */}
                  <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-6 h-[1px] bg-[#b89547]" />
                      <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#b89547] uppercase">Ingredients We Trust</span>
                      <div className="w-6 h-[1px] bg-[#b89547]" />
                    </div>
                    <h2 className="text-4xl md:text-5.5xl font-serif font-black text-white tracking-tight leading-tight select-none">
                      Quality You Taste
                    </h2>
                    <p className="text-sm md:text-base text-gray-300 font-sans max-w-xl mx-auto leading-relaxed font-medium">
                      We believe that exceptional food begins with exceptional ingredients. We never compromise on standard brands and fresh procurement.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-14">

                    {/* Left Column: Quality Promise Badge (4 cols) */}
                    <div className="lg:col-span-4 relative flex flex-col h-full pt-5 md:pt-0">
                      {/* Absolute badge */}
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 bg-[#b89547] text-white text-[10px] font-sans font-bold uppercase tracking-widest pl-3.5 pr-5 py-2 rounded-full flex items-center gap-2 shadow-lg border border-[#ebd2a0]/25 min-w-max">
                        <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                          <ChefHat className="w-3 h-3 text-white" />
                        </div>
                        Catering Partner
                      </div>

                      {/* Card with overflow-hidden */}
                      <div className="bg-white border border-[#b89547]/30 rounded-[2.5rem] p-8 flex flex-col items-center justify-between text-center relative shadow-xl overflow-hidden min-h-[460px] h-full flex-1">
                        {/* Decorative leaf sketch absolute in background */}
                        <svg className="absolute -left-2 bottom-6 w-32 h-64 opacity-20 pointer-events-none select-none text-[#052316]" viewBox="0 0 100 200" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
                          <path d="M10 190 Q 25 140 30 50" />
                          <path d="M30 50 Q 12 40 10 25 Q 22 28 30 50" />
                          <path d="M28 75 Q 8 68 5 53 Q 18 55 28 75" />
                          <path d="M25 105 Q 4 100 2 85 Q 15 88 25 105" />
                          <path d="M22 135 Q 2 132 0 117 Q 12 120 22 135" />
                          <path d="M19 160 Q 3 158 2 143 Q 10 145 19 160" />
                          {/* side branch leaves */}
                          <path d="M16 140 Q 26 120 32 90" />
                          <path d="M32 90 Q 42 75 40 68 Q 30 75 32 90" />
                          <path d="M29 110 Q 42 100 45 93 Q 32 98 29 110" />
                        </svg>

                        {/* Circle Badge UI */}
                        <div className="relative w-52 h-52 flex items-center justify-center my-6 shrink-0">
                          {/* Outer circle line */}
                          <div className="absolute inset-0 rounded-full border border-[#b89547]/30" />
                          {/* Inner circle line */}
                          <div className="absolute inset-2 rounded-full border-2 border-[#b89547]/50 flex flex-col items-center justify-center p-6 text-center bg-[#052316]/5">
                            <ShieldCheck className="w-7 h-7 text-[#b89547] stroke-[1.5] mb-2" />
                            <span className="text-[9px] font-mono font-bold uppercase tracking-[0.25em] text-[#b89547]">Our Promise</span>
                            <h4 className="text-2xl font-serif font-black text-[#052316] tracking-tight leading-tight mt-1 mb-2">
                              Your<br />Confidence
                            </h4>
                            <span className="text-[8px] font-sans font-extrabold tracking-widest text-[#b89547] uppercase">
                              Quality • Hygiene •<br />Taste
                            </span>
                          </div>
                        </div>

                        <div className="w-full flex flex-col items-center">
                          {/* Divider */}
                          <div className="flex items-center justify-center gap-3 py-1 w-full mt-4">
                            <div className="w-16 h-[0.5px] bg-[#b89547]/40" />
                            <span className="text-[#b89547] text-xs">✦</span>
                            <div className="w-16 h-[0.5px] bg-[#b89547]/40" />
                          </div>

                          {/* Description */}
                          <div className="mt-4 space-y-1">
                            <h5 className="font-sans font-bold text-sm text-[#052316]">Our Promise, Your Confidence.</h5>
                            <p className="text-xs text-gray-600 font-medium leading-relaxed max-w-[240px] mx-auto">
                              The hallmark of premium corporate standards in every serving.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: 6 Ingredient Cards (8 cols) */}
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5">
                      {[
                        {
                          num: "01",
                          cat: "COOKING OIL",
                          title: "Olive Oil & Fortune Oil",
                          desc: "We use premium Olive Oil & Fortune Oil for healthy and flavorful cooking.",
                          image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=250"
                        },
                        {
                          num: "02",
                          cat: "FRESH FLOUR",
                          title: "ITC Aashirvaad",
                          desc: "Made with 100% whole wheat flour for soft, nutritious tawa chapatis.",
                          image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=250"
                        },
                        {
                          num: "03",
                          cat: "PURE SPICES",
                          title: "MDH Spices",
                          desc: "Authentic recipes prepared using pure, certified raw spices from MDH.",
                          image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=250"
                        },
                        {
                          num: "04",
                          cat: "LONG GRAIN RICE",
                          title: "Premium Basmati",
                          desc: "Long-grain, aromatic aged basmati rice for perfect texture and fragrance.",
                          image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=250"
                        },
                        {
                          num: "05",
                          cat: "VEGETABLES",
                          title: "Seasonal Fresh",
                          desc: "Sourced daily from local farmers, strictly washed and hygienically chopped.",
                          image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=250"
                        },
                        {
                          num: "06",
                          cat: "DESSERTS",
                          title: "Freshly Day-Prepared",
                          desc: "Authentic sweets prepared daily without artificial preservatives.",
                          image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=250"
                        }
                      ].map((item, i) => (
                        <div key={i} className="bg-white rounded-[1.75rem] border border-[#ebd2a0]/25 p-5 flex items-start gap-4 shadow-[0_4px_24px_rgba(5,35,22,0.02)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                          {/* Left image circle */}
                          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#b89547]/40 shrink-0 shadow-sm flex items-center justify-center">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          {/* Right text content */}
                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-center gap-1.5">
                              <span className="w-5 h-5 rounded-full bg-[#b89547] text-white flex items-center justify-center font-bold text-[9px] shrink-0 leading-none">
                                {item.num}
                              </span>
                              <span className="text-[9px] font-mono font-bold tracking-widest text-[#b89547] uppercase leading-none">
                                {item.cat}
                              </span>
                            </div>
                            <h4 className="text-sm font-serif font-bold text-[#052316] leading-snug">
                              {item.title}
                            </h4>
                            <p className="text-[11px] text-gray-500 font-medium leading-normal">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* Bottom trust bar inside section */}
                  {/* <div className="bg-[#FAF8F5] rounded-[2.5rem] border border-[#ebd2a0]/30 shadow-[0_8px_32px_rgba(5,35,22,0.03)] p-6 mt-12 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#ebd2a0]/30">
                      {[
                        { icon: <Leaf className="w-5 h-5" />, title: "PREMIUM QUALITY\nINGREDIENTS", desc: "Carefully selected for\nthe best taste" },
                        { icon: <ShieldCheck className="w-5 h-5" />, title: "HYGIENIC & SAFE\nPREPARATION", desc: "Maintaining highest\nstandards of hygiene" },
                        { icon: <Users className="w-5 h-5" />, title: "TRUSTED BY\nCORPORATES", desc: "Delivering excellence\nevery single day" },
                        { icon: <Clock className="w-5 h-5" />, title: "ON-TIME\nDELIVERY", desc: "Punctual delivery,\nevery time" },
                        { icon: <Utensils className="w-5 h-5" />, title: "CUSTOMISED\nMENUS", desc: "Tailored to your needs\nand preferences" },
                      ].map((item, i) => (
                        <div key={i} className={`flex items-center gap-4 text-left ${i > 0 ? "pt-5 md:pt-0 md:pl-6" : ""}`}>
                          <div className="w-10 h-10 rounded-full bg-[#052316] text-[#b89547] flex items-center justify-center shrink-0 shadow-sm">
                            {item.icon}
                          </div>
                          <div className="space-y-0.5">
                            <h4 className="text-[9px] font-sans font-extrabold tracking-wider text-[#052316] uppercase leading-tight whitespace-pre-line">
                              {item.title}
                            </h4>
                            <p className="text-[10px] text-gray-500 font-medium leading-snug whitespace-pre-line">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div> */}

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
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
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
                      className={`px-5 py-2.5 text-xs sm:text-sm font-sans font-medium rounded-full border transition-all duration-300 cursor-pointer ${isActive
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
                      className="px-8 py-3 bg-gradient-to-r from-halwai-gold-500 to-halwai-gold-300 text-halwai-green-950 font-bold text-xs uppercase tracking-widest rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-98"
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
              <button onClick={() => { setActiveTab(AppTab.HOME); window.scrollTo(0, 0); }} className="hover:text-halwai-gold-300 text-left">The TCH Box Program</button>
              <button onClick={() => { setActiveTab(AppTab.HOME); window.scrollTo(0, 0); }} className="hover:text-halwai-gold-300 text-left">Royal Buffet Setups</button>
              <button onClick={() => { setActiveTab(AppTab.HOME); window.scrollTo(0, 0); }} className="hover:text-halwai-gold-300 text-left">Themed Street Food Carts</button>
              <button onClick={() => { setActiveTab(AppTab.MENU); window.scrollTo(0, 0); }} className="hover:text-halwai-gold-300 text-left">Explore Menu & Selections</button>
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

      {/* Floating Brochure Button */}
      <a
        href={brochureUrl}
        download={!brochureUrl.startsWith("http")}
        target={brochureUrl.startsWith("http") ? "_blank" : undefined}
        rel={brochureUrl.startsWith("http") ? "noopener noreferrer" : undefined}
        className="fixed bottom-[88px] right-6 z-50 bg-gradient-to-r from-[#052316] to-[#093521] text-[#ebd2a0] border border-[#ebd2a0]/30 p-3.5 md:px-5 md:py-3.5 rounded-full flex items-center justify-center gap-2 shadow-[0_8px_25px_rgba(0,0,0,0.45)] hover:bg-[#ebd2a0] hover:text-[#052316] hover:border-[#ebd2a0] hover:scale-105 active:scale-95 transition-all duration-300"
        title="Download Brochure"
      >
        <FileText className="w-5 h-5 md:w-4.5 md:h-4.5" />
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider hidden md:inline">Detailed Brochure</span>
      </a>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919289030016?text=Hi%20The%20Corporate%20Halwai%2C%20I%27d%20like%20to%20enquire%20about%20your%20catering%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3.5 rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.4)] hover:bg-[#20ba5a] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center border border-white/10"
        title="WhatsApp Us"
      >
        <svg className="w-[26px] h-[26px] text-white fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

    </div>
  );
}
