import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SnackCard {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  calories: string;
  category: string;
}

export default function EveningSnacks() {
  const cards: SnackCard[] = [
    {
      id: "spring-roll",
      name: "Spring Roll",
      subtitle: "CRISPY & SPICED",
      description: "Crispy golden golden wrappers stuffed with seasoned julienned veggies and ginger-garlic sauce. Served hot with spicy dip.",
      imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600",
      calories: "140 kcal",
      category: "Crispy & Zesty Bites"
    },
    {
      id: "manchurian",
      name: "Manchurian",
      subtitle: "WOK-TOSSED INDO-CHINESE",
      description: "Crispy-fried vegetable dumplings tossed in a thick, savory chili-garlic and dark soy-carlic reduction sauce.",
      imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=600",
      calories: "195 kcal",
      category: "Wok-Tossed Spiced Balls"
    },
    {
      id: "noodles-chowmein",
      name: "Noodles / Chowmein",
      subtitle: "HIGH-FLAME WOK STYLE",
      description: "Stir-fried noodles loaded with raw-crisp cabbage, carrots, onion juliennes, bell peppers, soy sauce and white pepper.",
      imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600",
      calories: "230 kcal",
      category: "High-Flame Street Style"
    },
    {
      id: "veg-puff",
      name: "Veg Puff",
      subtitle: "BAKED FLAKY SAVORY",
      description: "Golden puff pastry leaves folded over a delicious seasoned potato, sweet green pea, and garden carrot mash stuffing.",
      imageUrl: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=600",
      calories: "185 kcal",
      category: "Baked Savory Flaky"
    },
    {
      id: "french-fries",
      name: "French Fries",
      subtitle: "CLASSIC CRISP SIDES",
      description: "Golden double-crisped potato batons seasoned with rock salt, served with tangy tomato ketchup and cheese drizzle.",
      imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=600",
      calories: "155 kcal",
      category: "Classic Crispy potato"
    },
    {
      id: "paneer-pakoda",
      name: "Paneer Pakoda's",
      subtitle: "ELITE SPICED FRITTERS",
      description: "Creamy fresh paneer blocks layered with aromatic coriander-mint chutney, encased in seasoned bean batter and golden fried.",
      imageUrl: "https://images.unsplash.com/photo-1599307767316-776533aa74bc?auto=format&fit=crop&q=80&w=600",
      calories: "210 kcal",
      category: "Elite Fritters"
    },
    {
      id: "chilli-paneer",
      name: "Chilli Paneer",
      subtitle: "SPICY COTTAGE CHEESE",
      description: "Wok-tossed battered cottage cheese blocks, glazed with sweet dark soy, chili oil paste, diced capsicum and green chilies.",
      imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600",
      calories: "245 kcal",
      category: "Indo-Chinese"
    },
    {
      id: "mini-samosa",
      name: "Mini Samosa",
      subtitle: "COCKTAIL TEA PASTRY",
      description: "Flaky bite-sized cocktail samosas filled with sweet green peas and potatoes seasoned with authentic Indian garam masala.",
      imageUrl: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=600",
      calories: "120 kcal",
      category: "High Tea Classic"
    },
    {
      id: "dahi-bhalla",
      name: "Dahi Bhalla",
      subtitle: "STREET SIDE AMBIENT CHAAT",
      description: "Fluffy, melted-lentil dumplings steeped in cold high-fat whipped curd, seasoned with roasted cumin and dry mango chutney.",
      imageUrl: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=600",
      calories: "170 kcal",
      category: "Cooling Chaat"
    },
    {
      id: "fried-rice",
      name: "Fried Rice",
      subtitle: "PARSMATI INDO-CHINESE",
      description: "Finely sliced carrots, green beans, and capsicums tossed in seasoned sesame-oil and premium long grain basmati rice.",
      imageUrl: "https://images.unsplash.com/photo-1603133872878-68550a5e7b64?auto=format&fit=crop&q=80&w=600",
      calories: "215 kcal",
      category: "Basmati Specalities"
    },
    {
      id: "hara-bhara",
      name: "Hara Bhara Kebab",
      subtitle: "GREENS & SPINACH MEDALLIONS",
      description: "Pan-fried spinach, sweet green pea, and potato medallions mixed with aromatic herbs and garnished with roasted cashews.",
      imageUrl: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&q=80&w=600",
      calories: "135 kcal",
      category: "Iron-Rich Spinach"
    },
    {
      id: "chilli-potato",
      name: "Chilli Potato",
      subtitle: "GLAZED POTATO BATONS",
      description: "Crisp-fried finger potatoes coated with a tangy, sweet garlic-chili fusion sauce, finished with spring onions.",
      imageUrl: "https://images.unsplash.com/photo-1518013041235-0133b2894867?auto=format&fit=crop&q=80&w=600",
      calories: "220 kcal",
      category: "Hot Crispy Potato"
    },
    {
      id: "honey-chilli",
      name: "Honey Chilli Potato",
      subtitle: "SESAME & HONEY SHINE",
      description: "Deep-fried crispy potato batons glazed with warm sweet golden honey, dry chili, and sesame seeds.",
      imageUrl: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&q=80&w=600",
      calories: "235 kcal",
      category: "Sesame Glaze"
    },
    {
      id: "pav-bhaji",
      name: "Pav Bhaji",
      subtitle: "BUTTERY STREET DELICACY",
      description: "Thick slow-cooked mashed vegetable curry cooked with signature spices, served with golden-toasted soft buttered brioche buns.",
      imageUrl: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=600",
      calories: "295 kcal",
      category: "Warm Desi Treat"
    },
    {
      id: "fruits-bowl",
      name: "Assorted Fruits Bowl",
      subtitle: "NUTRITIOUS & FRESH CUT",
      description: "Vibrant combination of exotic hand-picked kiwi, sweet pomegranate drops, apples, green grapes, and oranges.",
      imageUrl: "https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&q=80&w=600",
      calories: "85 kcal",
      category: "Seasonal Wellness"
    },
    {
      id: "sprouts",
      name: "Sprouts",
      subtitle: "HIGH-PROTEIN CRUNCH",
      description: "Wholesome green gram sprouts tossed with finely chopped English cucumbers, fresh lime juice, tomatoes and chaat masala.",
      imageUrl: "https://images.unsplash.com/photo-1505252585461-04db1ebb846d?auto=format&fit=crop&q=80&w=600",
      calories: "95 kcal",
      category: "Daily Health"
    },
    {
      id: "chana-chaat",
      name: "Black Chana Chaat",
      subtitle: "PROTEIN-RICH FIBER",
      description: "Tender boiled black chickpeas tossed with crunchy red onions, minced green chilies, coriander leaves, and rock salt spices.",
      imageUrl: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=600",
      calories: "145 kcal",
      category: "Organic Grains"
    },
    {
      id: "boiled-eggs",
      name: "Boiled Eggs",
      subtitle: "PERFECT HIGH-PROTEIN",
      description: "Fresh farm eggs boiled to perfection, sliced cleanly, and lightly dusted with crushed black pepper flakes and sea salt.",
      imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=600",
      calories: "155 kcal",
      category: "Fitness Fuels"
    },
    {
      id: "sandwich",
      name: "Sandwich",
      subtitle: "TEA TIME TRIANGLES",
      description: "Trifecta club triangles made of wholesome brown bread with refreshing hand-sliced cucumber, tomato and fresh green mint spread.",
      imageUrl: "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?auto=format&fit=crop&q=80&w=600",
      calories: "180 kcal",
      category: "Gourmet Fingers"
    },
    {
      id: "chhole-kulche",
      name: "Chhole Kulche",
      subtitle: "SIGNATURE PUNJABI PLATES",
      description: "Aromatic spicy white pea curry infused with dry ginger-garlic extracts, served with hand-rolled baked Butter Kulchas.",
      imageUrl: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=600",
      calories: "320 kcal",
      category: "Traditional Delicacy"
    }
  ];

  const [activeIdx, setActiveIdx] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const prevSlide = () => {
    setActiveIdx((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIdx((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  // Helper to determine the circular index for carousel positioning
  const getCardIndexInfo = (index: number) => {
    const diff = (index - activeIdx + cards.length) % cards.length;
    let distance = diff;
    if (distance > cards.length / 2) {
      distance -= cards.length;
    }
    return distance;
  };

  return (
    <section
      id="evening-snacks-showcase"
      className="bg-[#031d12] text-white py-20 px-4 md:px-8 relative overflow-hidden border-t border-b border-[#ebd2a0]/10"
    >
      {/* Decorative vector background circles */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute -top-12 -left-12 w-96 h-96 rounded-full border border-dashed border-[#ebd2a0]" />
        <div className="absolute -bottom-12 -right-12 w-96 h-96 rounded-full border border-dashed border-[#ebd2a0]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* UPPER TITLE HEADER */}
        <div className="text-center space-y-3">
          <span className="text-[10px] md:text-xs font-mono font-bold tracking-[0.25em] text-[#ebd2a0] block uppercase">
            EVENING SNACKS MENU
          </span>
          <div className="flex justify-center items-center py-1">
            <svg className="w-6 h-6 text-[#ebd2a0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8Z" />
              <path d="M6 2v2M10 2v2M14 2v2" strokeLinecap="round" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight font-light text-white">
            Curated <span className="font-serif font-black text-[#ebd2a0]">Evening Delights</span>
          </h2>
          <p className="text-xs md:text-sm text-[#e5dfd3]/70 max-w-xl mx-auto font-sans font-medium tracking-wide leading-relaxed">
            Elevate your team's break time with our high-end, freshly prepared signature corporate snacks.
          </p>
          <div className="flex justify-center items-center pt-2">
            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#ebd2a0]/40 to-transparent relative">
              <div className="absolute -top-1 left-12 w-2 h-2 rounded-full bg-[#ebd2a0] border border-[#031d12]" />
            </div>
          </div>
        </div>

        {/* MAIN BODY GRID LAYOUT MATCHING IMAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[460px] md:min-h-[500px]">
          
          {/* COLUMN 1: LEFT INGREDIENT/ pledge LIST */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col justify-between lg:justify-start lg:space-y-6 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 gap-6 lg:gap-0 scrollbar-none border-b lg:border-b-0 border-[#ebd2a0]/10">
            
            {/* Pledge Item 1: Cooking Oil */}
            <div className="flex items-center space-x-3.5 min-w-[150px] lg:min-w-0 group">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#ebd2a0]/30 bg-[#02140c] flex items-center justify-center shrink-0 shadow-[0_4px_10px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-105">
                <img
                  src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=150"
                  alt="Cooking Oil"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <h4 className="text-[10px] font-mono font-extrabold tracking-widest text-[#ebd2a0] uppercase leading-none">COOKING OIL</h4>
                <p className="text-[11px] text-white/60 font-sans font-medium mt-0.5 leading-tight">Olive / Fortune</p>
              </div>
            </div>

            {/* Pledge Item 2: Vegetables */}
            <div className="flex items-center space-x-3.5 min-w-[170px] lg:min-w-0 group">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#ebd2a0]/30 bg-[#02140c] flex items-center justify-center shrink-0 shadow-[0_4px_10px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-105">
                <img
                  src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=150"
                  alt="Vegetables"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <h4 className="text-[10px] font-mono font-extrabold tracking-widest text-[#ebd2a0] uppercase leading-none">VEGETABLES</h4>
                <p className="text-[11px] text-white/60 font-sans font-medium mt-0.5 leading-tight">Seasonal Fresh – Daily Orders best in quality</p>
              </div>
            </div>

            {/* Pledge Item 3: Flour */}
            <div className="flex items-center space-x-3.5 min-w-[150px] lg:min-w-0 group">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#ebd2a0]/30 bg-[#02140c] flex items-center justify-center shrink-0 shadow-[0_4px_10px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-105">
                <img
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=150"
                  alt="Flour"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <h4 className="text-[10px] font-mono font-extrabold tracking-widest text-[#ebd2a0] uppercase leading-none">FLOUR</h4>
                <p className="text-[11px] text-white/60 font-sans font-medium mt-0.5 leading-tight">ITC - Aashirwad</p>
              </div>
            </div>

            {/* Pledge Item 4: Rice */}
            <div className="flex items-center space-x-3.5 min-w-[120px] lg:min-w-0 group">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#ebd2a0]/30 bg-[#02140c] flex items-center justify-center shrink-0 shadow-[0_4px_10px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-105">
                <img
                  src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=150"
                  alt="Rice"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <h4 className="text-[10px] font-mono font-extrabold tracking-widest text-[#ebd2a0] uppercase leading-none">RICE</h4>
                <p className="text-[11px] text-white/60 font-sans font-medium mt-0.5 leading-tight">Basmati rice</p>
              </div>
            </div>

            {/* Pledge Item 5: Spices */}
            <div className="flex items-center space-x-3.5 min-w-[120px] lg:min-w-0 group">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#ebd2a0]/30 bg-[#02140c] flex items-center justify-center shrink-0 shadow-[0_4px_10px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-105">
                <img
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=150"
                  alt="Spices"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <h4 className="text-[10px] font-mono font-extrabold tracking-widest text-[#ebd2a0] uppercase leading-none">SPICES</h4>
                <p className="text-[11px] text-white/60 font-sans font-medium mt-0.5 leading-tight">MDH</p>
              </div>
            </div>

            {/* Pledge Item 6: Sweets */}
            <div className="flex items-center space-x-3.5 min-w-[150px] lg:min-w-0 group">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#ebd2a0]/30 bg-[#02140c] flex items-center justify-center shrink-0 shadow-[0_4px_10px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-105">
                <img
                  src="https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=150"
                  alt="Sweets"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <h4 className="text-[10px] font-mono font-extrabold tracking-widest text-[#ebd2a0] uppercase leading-none">SWEETS</h4>
                <p className="text-[11px] text-white/60 font-sans font-medium mt-0.5 leading-tight">Freshly Day Prepared</p>
              </div>
            </div>

          </div>

          {/* COLUMN 2: ELEGANT PORTRAIT SLIDER CAROUSEL */}
          <div className="lg:col-span-9 flex items-center justify-center relative py-6">
            
            {/* Left Circular Arrow button */}
            <button
              id="snacks-prev-btn"
              onClick={prevSlide}
              className="absolute left-0 lg:-left-4 z-40 w-11 h-11 rounded-full border border-[#ebd2a0]/25 bg-[#031d12]/95 hover:bg-[#ebd2a0] hover:border-[#ebd2a0] flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all text-[#ebd2a0] hover:text-[#031d12] cursor-pointer"
              aria-label="Previous Snack"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2]" />
            </button>

            {/* Center Carousel Frame */}
            <div className="relative w-full max-w-5xl h-[460px] md:h-[510px] flex items-center justify-center overflow-hidden">
              <AnimatePresence initial={false}>
                {cards.map((card, i) => {
                  const distance = getCardIndexInfo(i);
                  const isVisible = Math.abs(distance) <= 1;

                  let translateX = "0%";
                  let scale = 1.08; 
                  let opacity = 1;
                  let zIndex = 30;
                  let filterVal = "brightness(1.02) contrast(1.02)";

                  if (distance === -1) {
                    translateX = isMobile ? "-74%" : "calc(-66% - 14px)";
                    scale = isMobile ? 0.8 : 0.86;
                    opacity = 0.45; // 45% visible context as defined in previous conversations & mockup
                    zIndex = 10;
                    filterVal = "brightness(0.65) contrast(0.95)";
                  } else if (distance === 1) {
                    translateX = isMobile ? "74%" : "calc(66% + 14px)";
                    scale = isMobile ? 0.8 : 0.86;
                    opacity = 0.45; // 45% visible context as defined in previous conversations & mockup
                    zIndex = 10;
                    filterVal = "brightness(0.65) contrast(0.95)";
                  } else if (distance !== 0) {
                    opacity = 0;
                    zIndex = 0;
                    scale = 0.6;
                    translateX = distance < 0 ? "-150%" : "150%";
                  }

                  return (
                    <motion.div
                      key={card.id}
                      id={`evening-snack-slide-${card.id}`}
                      style={{
                        position: "absolute",
                        width: "100%",
                        maxWidth: isMobile ? "275px" : "360px",
                        display: isVisible ? "block" : "none",
                        filter: filterVal
                      }}
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{
                        x: translateX,
                        scale: scale,
                        opacity: opacity,
                        zIndex: zIndex
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 280,
                        damping: 26
                      }}
                      onClick={() => {
                        if (distance !== 0) {
                          setActiveIdx(i);
                        }
                      }}
                      className={`bg-[#02130b] rounded-[2rem] border overflow-hidden shadow-2xl transition-all duration-300 ${
                        distance === 0
                          ? "border-[#ebd2a0] cursor-default ring-1 ring-[#ebd2a0]/40"
                          : "border-[#e5dfd3]/10 hover:border-white/25 cursor-pointer"
                      }`}
                    >
                      {/* Image Frame */}
                      <div className="aspect-[16/11] w-full overflow-hidden relative bg-[#010b06]">
                        <img
                          src={card.imageUrl}
                          alt={card.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#02130b] via-transparent to-transparent pointer-events-none" />
                        
                        {/* Golden Label Indicator */}
                        <span className="absolute top-4 left-4 bg-[#0a291b] border border-[#ebd2a0]/30 text-[#ebd2a0] text-[8px] font-mono font-bold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full shadow-lg">
                          {card.subtitle}
                        </span>

                        {/* Beautiful Kcal circle-pill badge */}
                        <div className="absolute top-4 right-4 bg-black/60 border border-[#ebd2a0]/20 text-[10px] font-semibold font-mono text-[#ebd2a0] px-3 py-2 rounded-xl flex flex-col items-center justify-center leading-none min-w-[50px]">
                          <span className="text-sm font-bold text-white">{card.calories.split(" ")[0]}</span>
                          <span className="text-[7px] text-[#ebd2a0]/70 uppercase tracking-widest mt-0.5">kcal</span>
                        </div>
                      </div>

                      {/* Content Card Panel */}
                      <div className="p-6 space-y-4 text-left">
                        <div className="space-y-2">
                          <h3 className="text-lg sm:text-xl font-serif font-black text-white tracking-tight leading-snug">
                            {card.name}
                          </h3>
                          {/* Tiny subtle line under title inside card */}
                          {distance === 0 && (
                            <div className="w-10 h-[1.5px] bg-[#ebd2a0]/30 relative">
                              <div className="absolute -top-[1.5px] left-3 w-1.5 h-1.5 rounded-full bg-[#ebd2a0]" />
                            </div>
                          )}
                          <p className="text-xs text-white/70 leading-relaxed font-sans min-h-[50px] font-medium">
                            {card.description}
                          </p>
                        </div>

                        {/* Interactive action indicators inside the card */}
                        <div className="flex items-center justify-between pt-4 border-t border-dashed border-[#e5dfd3]/10">
                          {distance === 0 ? (
                            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#ebd2a0] flex items-center space-x-1">
                              <span className="text-xs">★</span> <span>CURRENT SELECTION</span>
                            </span>
                          ) : (
                            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors flex items-center space-x-1.5">
                              <span>VIEW DETAILS</span> <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          )}
                          <span className="text-[10px] font-mono font-bold text-[#ebd2a0]">
                            0{i + 1} / 0{cards.length}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Right Circular Arrow button */}
            <button
              id="snacks-next-btn"
              onClick={nextSlide}
              className="absolute right-0 lg:-right-4 z-40 w-11 h-11 rounded-full border border-[#ebd2a0]/25 bg-[#031d12]/95 hover:bg-[#ebd2a0] hover:border-[#ebd2a0] flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all text-[#ebd2a0] hover:text-[#031d12] cursor-pointer"
              aria-label="Next Snack"
            >
              <ChevronRight className="w-5 h-5 stroke-[2]" />
            </button>

          </div>

        </div>

        {/* CAROUSEL PAGINATION SYSTEM */}
        <div className="flex items-center justify-center space-x-2 pt-2">
          {cards.map((_, dotIdx) => (
            <button
              key={dotIdx}
              id={`snack-dot-${dotIdx}`}
              onClick={() => setActiveIdx(dotIdx)}
              className={`transition-all duration-300 h-2 rounded-full focus:outline-none cursor-pointer ${
                dotIdx === activeIdx ? "bg-[#ebd2a0] w-8" : "bg-white/10 hover:bg-white/30 w-2.5"
              }`}
              aria-label={`Select snack ${dotIdx + 1}`}
            />
          ))}
        </div>

        {/* HORIZONTAL GLASS SHELF OF COMMITMENT AND QUALITY */}
        <div className="pt-6">
          <div className="bg-[#02130b]/60 border border-[#ebd2a0]/15 rounded-[1.75rem] py-4 px-6 md:px-10 flex flex-wrap justify-center md:justify-between items-center gap-6 text-[10px] md:text-xs font-mono font-bold tracking-wider text-[#ebd2a0]/95 backdrop-blur-md">
            
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-[#ebd2a0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z" />
              </svg>
              <span>PREMIUM OIL</span>
            </div>

            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-[#ebd2a0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              <span>FRESH INGREDIENTS</span>
            </div>

            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-[#ebd2a0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1.5-3-1.5 1.5-2 2-2 3a2.5 2.5 0 0 0 1 2.5Z" />
              </svg>
              <span>AUTHENTIC SPICES</span>
            </div>

            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-[#ebd2a0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span>QUALITY RICE</span>
            </div>

            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-[#ebd2a0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8Z" />
              </svg>
              <span>FRESHLY PREPARED</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
