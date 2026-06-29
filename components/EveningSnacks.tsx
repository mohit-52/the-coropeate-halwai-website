import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { remoteConfig, fetchAndActivate, getValue } from "../lib/firebase";

interface SnackCard {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  calories: string;
  category: string;
}

const DEFAULT_CARDS: SnackCard[] = [
  {
    id: "spring-roll",
    name: "Spring Roll",
    subtitle: "CRISPY & SPICED",
    description: "Crispy golden golden wrappers stuffed with seasoned julienned veggies and ginger-garlic sauce. Served hot with spicy dip.",
    imageUrl: "https://images.unsplash.com/photo-1571951498979-cefeaf57476e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    calories: "140 kcal",
    category: "Crispy & Zesty Bites"
  },
  {
    id: "manchurian",
    name: "Manchurian",
    subtitle: "WOK-TOSSED INDO-CHINESE",
    description: "Crispy-fried vegetable dumplings tossed in a thick, savory chili-garlic and dark soy-carlic reduction sauce.",
    imageUrl: "https://www.mygingergarlickitchen.com/wp-content/rich-markup-images/4x3/4x3-veg-manchurian-recipe.jpg",
    calories: "195 kcal",
    category: "Wok-Tossed Spiced Balls"
  },
  {
    id: "noodles-chowmein",
    name: "Noodles / Chowmein",
    subtitle: "HIGH-FLAME WOK STYLE",
    description: "Stir-fried noodles loaded with raw-crisp cabbage, carrots, onion juliennes, bell peppers, soy sauce and white pepper.",
    imageUrl: "https://images.unsplash.com/photo-1565976469782-7c92daebc42e?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    calories: "230 kcal",
    category: "High-Flame Street Style"
  },
  {
    id: "veg-puff",
    name: "Veg Puff",
    subtitle: "BAKED FLAKY SAVORY",
    description: "Golden puff pastry leaves folded over a delicious seasoned potato, sweet green pea, and garden carrot mash stuffing.",
    imageUrl: "https://www.yummytummyaarthi.com/wp-content/uploads/2021/12/1-1.jpg",
    calories: "185 kcal",
    category: "Baked Savory Flaky"
  },
  {
    id: "french-fries",
    name: "French Fries",
    subtitle: "CLASSIC CRISP SIDES",
    description: "Golden double-crisped potato batons seasoned with rock salt, served with tangy tomato ketchup and cheese drizzle.",
    imageUrl: "https://plus.unsplash.com/premium_photo-1683121324545-196a903297f4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    calories: "155 kcal",
    category: "Classic Crispy potato"
  },
  {
    id: "paneer-pakoda",
    name: "Paneer Pakoda's",
    subtitle: "ELITE SPICED FRITTERS",
    description: "Creamy fresh paneer blocks layered with aromatic coriander-mint chutney, encased in seasoned bean batter and golden fried.",
    imageUrl: "https://tastedilli6.com/cdn/shop/files/paneer-pakora.jpg?v=1750662976",
    calories: "210 kcal",
    category: "Elite Fritters"
  },
  {
    id: "chilli-paneer",
    name: "Chilli Paneer",
    subtitle: "SPICY COTTAGE CHEESE",
    description: "Wok-tossed battered cottage cheese blocks, glazed with sweet dark soy, chili oil paste, diced capsicum and green chilies.",
    imageUrl: "https://images.unsplash.com/photo-1690401767645-595de0e0e5f8?q=80&w=2513&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    calories: "245 kcal",
    category: "Indo-Chinese"
  },
  {
    id: "mini-samosa",
    name: "Mini Samosa",
    subtitle: "COCKTAIL TEA PASTRY",
    description: "Flaky bite-sized cocktail samosas filled with sweet green peas and potatoes seasoned with authentic Indian garam masala.",
    imageUrl: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?q=80&w=2571&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    calories: "120 kcal",
    category: "High Tea Classic"
  },
  {
    id: "dahi-bhalla",
    name: "Dahi Bhalla",
    subtitle: "STREET SIDE AMBIENT CHAAT",
    description: "Fluffy, melted-lentil dumplings steeped in cold high-fat whipped curd, seasoned with roasted cumin and dry mango chutney.",
    imageUrl: "https://images.unsplash.com/photo-1559561723-bcb9e0db1d66?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    calories: "170 kcal",
    category: "Cooling Chaat"
  },
  {
    id: "fried-rice",
    name: "Fried Rice",
    subtitle: "PARSMATI INDO-CHINESE",
    description: "Finely sliced carrots, green beans, and capsicums tossed in seasoned sesame-oil and premium long grain basmati rice.",
    imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=2525&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    calories: "215 kcal",
    category: "Basmati Specalities"
  },
  {
    id: "hara-bhara",
    name: "Hara Bhara Kebab",
    subtitle: "GREENS & SPINACH MEDALLIONS",
    description: "Pan-fried spinach, sweet green pea, and potato medallions mixed with aromatic herbs and garnished with roasted cashews.",
    imageUrl: "https://img.global.news.samsung.com/in/wp-content/uploads/2020/06/Hara-Bhara-Kebab-June-26.jpg",
    calories: "135 kcal",
    category: "Iron-Rich Spinach"
  },
  {
    id: "chilli-potato",
    name: "Chilli Potato",
    subtitle: "GLAZED POTATO BATONS",
    description: "Crisp-fried finger potatoes coated with a tangy, sweet garlic-chili fusion sauce, finished with spring onions.",
    imageUrl: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_960,w_960//InstamartAssets/1/honey_chilli_potato.webp",
    calories: "220 kcal",
    category: "Hot Crispy Potato"
  },
  {
    id: "honey-chilli",
    name: "Honey Chilli Potato",
    subtitle: "SESAME & HONEY SHINE",
    description: "Deep-fried crispy potato batons glazed with warm sweet golden honey, dry chili, and sesame seeds.",
    imageUrl: "https://c.ndtvimg.com/2020-01/cve6o05_chilli-potato_625x300_21_January_20.jpg",
    calories: "235 kcal",
    category: "Sesame Glaze"
  },
  {
    id: "pav-bhaji",
    name: "Pav Bhaji",
    subtitle: "BUTTERY STREET DELICACY",
    description: "Thick slow-cooked mashed vegetable curry cooked with signature spices, served with golden-toasted soft buttered brioche buns.",
    imageUrl: "https://www.cubesnjuliennes.com/wp-content/uploads/2020/07/Instant-Pot-Mumbai-Pav-Bhaji-Recipe.jpg",
    calories: "295 kcal",
    category: "Warm Desi Treat"
  },
  {
    id: "fruits-bowl",
    name: "Assorted Fruits Bowl",
    subtitle: "NUTRITIOUS & FRESH CUT",
    description: "Vibrant combination of exotic hand-picked kiwi, sweet pomegranate drops, apples, green grapes, and oranges.",
    imageUrl: "https://images.unsplash.com/photo-1641642400143-6be68f1a0918?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    calories: "85 kcal",
    category: "Seasonal Wellness"
  },
  {
    id: "sprouts",
    name: "Sprouts",
    subtitle: "HIGH-PROTEIN CRUNCH",
    description: "Wholesome green gram sprouts tossed with finely chopped English cucumbers, fresh lime juice, tomatoes and chaat masala.",
    imageUrl: "https://images.unsplash.com/photo-1622732777601-e744c3401d44?q=80&w=2526&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    calories: "95 kcal",
    category: "Daily Health"
  },
  {
    id: "chana-chaat",
    name: "Black Chana Chaat",
    subtitle: "PROTEIN-RICH FIBER",
    description: "Tender boiled black chickpeas tossed with crunchy red onions, minced green chilies, coriander leaves, and rock salt spices.",
    imageUrl: "https://i.ytimg.com/vi/LH2sbTbl6F8/maxresdefault.jpg",
    calories: "145 kcal",
    category: "Organic Grains"
  },
  {
    id: "boiled-eggs",
    name: "Boiled Eggs",
    subtitle: "PERFECT HIGH-PROTEIN",
    description: "Fresh farm eggs boiled to perfection, sliced cleanly, and lightly dusted with crushed black pepper flakes and sea salt.",
    imageUrl: "https://cdn.jwplayer.com/v2/media/0vSmxpH0/thumbnails/GuxLvjgp.jpg?width=1280",
    calories: "155 kcal",
    category: "Fitness Fuels"
  },
  {
    id: "sandwich",
    name: "Sandwich",
    subtitle: "TEA TIME TRIANGLES",
    description: "Trifecta club triangles made of wholesome brown bread with refreshing hand-sliced cucumber, tomato and fresh green mint spread.",
    imageUrl: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    calories: "180 kcal",
    category: "Gourmet Fingers"
  },
  {
    id: "chhole-kulche",
    name: "Chhole Kulche",
    subtitle: "SIGNATURE PUNJABI PLATES",
    description: "Aromatic spicy white pea curry infused with dry ginger-garlic extracts, served with hand-rolled baked Butter Kulchas.",
    imageUrl: "https://b.zmtcdn.com/data/pictures/chains/0/21618500/17348640205f7034ba-7c47-4f82-92f6-046bbeea91fc.jpg?fit=around|960:500&crop=960:500;*,*",
    calories: "320 kcal",
    category: "Traditional Delicacy"
  }
];

export default function EveningSnacks() {
  const [cards, setCards] = React.useState<SnackCard[]>(DEFAULT_CARDS);
  const [activeIdx, setActiveIdx] = React.useState(0);

  React.useEffect(() => {
    const fetchSnacks = async () => {
      try {
        if (!remoteConfig) {
          console.log("Showing local fallback snacks (remoteConfig not initialized)");
          return;
        }

        await fetchAndActivate(remoteConfig);

        const value = getValue(remoteConfig, "snack_card").asString() || getValue(remoteConfig, "evening_snacks_data").asString() || getValue(remoteConfig, "snack_cards").asString();

        if (!value) {
          console.log("Showing local fallback snacks (no value for 'snack_card')");
          return;
        }

        const data = JSON.parse(value);

        // Handle both formats: if data is directly an array, or if it's nested under a property
        const cardsArray = Array.isArray(data) ? data : (data?.snack_cards || data?.snack_card);

        if (Array.isArray(cardsArray) && cardsArray.length > 0) {
          console.log("Showing remote config snacks!", cardsArray);
          setCards(cardsArray);
        } else {
          console.log("Showing local fallback snacks (invalid data format in remote config)");
        }
      } catch (error) {
        console.error("Error fetching snack cards:", error);
        console.log("Showing local fallback snacks (error during fetch)");
      }
    };

    fetchSnacks();
  }, []);
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

  const lastWheelTime = React.useRef(0);
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > 12) {
      const now = Date.now();
      if (now - lastWheelTime.current > 750) {
        if (e.deltaX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        lastWheelTime.current = now;
      }
    }
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
            Curated Delights
          </span>
          <div className="flex justify-center items-center py-1">
            <svg className="w-6 h-6 text-[#ebd2a0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8Z" />
              <path d="M6 2v2M10 2v2M14 2v2" strokeLinecap="round" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight font-light text-white">
            Evening <span className="font-serif font-black text-[#ebd2a0]"> Snacks</span>
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

        {/* MAIN BODY LAYOUT */}
        <div className="flex flex-col items-center justify-center min-h-[460px] md:min-h-[500px] w-full">

          {/* ELEGANT PORTRAIT SLIDER CAROUSEL */}
          <div className="w-full flex items-center justify-center relative py-6">

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
            <div
              onWheel={handleWheel}
              className="relative w-full max-w-5xl h-[460px] md:h-[510px] flex items-center justify-center overflow-hidden"
            >
              <AnimatePresence initial={false}>
                {cards.map((card, i) => {
                  const distance = getCardIndexInfo(i);
                  const isVisible = Math.abs(distance) <= 1;

                  let translateX = "0%";
                  let scale = 1.08;
                  let opacity = 1;
                  let zIndex = 30;

                  if (distance === -1) {
                    translateX = isMobile ? "-74%" : "calc(-66% - 14px)";
                    scale = isMobile ? 0.8 : 0.86;
                    opacity = 0.45; // 45% visible context as defined in previous conversations & mockup
                    zIndex = 10;
                  } else if (distance === 1) {
                    translateX = isMobile ? "74%" : "calc(66% + 14px)";
                    scale = isMobile ? 0.8 : 0.86;
                    opacity = 0.45; // 45% visible context as defined in previous conversations & mockup
                    zIndex = 10;
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
                        display: isVisible ? "block" : "none"
                      }}
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{
                        x: translateX,
                        scale: scale,
                        opacity: opacity,
                        zIndex: zIndex
                      }}
                      drag={distance === 0 ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.3}
                      onDragEnd={(event, info) => {
                        const swipeThreshold = 50;
                        if (info.offset.x < -swipeThreshold) {
                          nextSlide();
                        } else if (info.offset.x > swipeThreshold) {
                          prevSlide();
                        }
                      }}
                      transition={{
                        duration: 0.25,
                        ease: "easeOut"
                      }}
                      onClick={() => {
                        if (distance !== 0) {
                          setActiveIdx(i);
                        }
                      }}
                      className={`bg-[#02130b] rounded-[2rem] border overflow-hidden shadow-2xl transition-all duration-300 relative ${distance === 0
                          ? "border-[#ebd2a0] cursor-default ring-1 ring-[#ebd2a0]/40"
                          : "border-[#e5dfd3]/10 hover:border-white/25 cursor-pointer"
                        }`}
                    >
                      {distance !== 0 && (
                        <div className="absolute inset-0 bg-[#02130b]/60 z-40 pointer-events-none transition-opacity duration-300" />
                      )}
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
                        {/* <div className="absolute top-4 right-4 bg-black/60 border border-[#ebd2a0]/20 text-[10px] font-semibold font-mono text-[#ebd2a0] px-3 py-2 rounded-xl flex flex-col items-center justify-center leading-none min-w-[50px]"> */}
                        {/* <span className="text-sm font-bold text-white">{card.calories.split(" ")[0]}</span> */}
                        {/* <span className="text-[7px] text-[#ebd2a0]/70 uppercase tracking-widest mt-0.5">kcal</span> */}
                        {/* </div> */}
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
              className={`transition-all duration-300 h-2 rounded-full focus:outline-none cursor-pointer ${dotIdx === activeIdx ? "bg-[#ebd2a0] w-8" : "bg-white/10 hover:bg-white/30 w-2.5"
                }`}
              aria-label={`Select snack ${dotIdx + 1}`}
            />
          ))}
        </div>

        {/* HORIZONTAL GLASS SHELF OF COMMITMENT AND QUALITY */}


      </div>
    </section>
  );
}
