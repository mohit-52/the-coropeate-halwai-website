import { NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";

const FALLBACK_MENUS: Record<string, any> = {
  "board": {
    menuName: "Saffron & Truffle Executive Assemblage",
    themeDescription: "A high-end, sophisticated culinary curation featuring subtle aromas, visually clean individual thalis, and low-sodium premium ingredients suited for executive discussion and board alignment.",
    welcomeDrinks: [
      { name: "Smoked Jamun Shahi Sherbet", description: "Infused with wild berries, sparkling water, and roasted cumin dust." },
      { name: "Saffron Almond Thandai Espuma", description: "Chilled milk foam reduction layered with pure organic Kashmiri saffron strands." }
    ],
    starters: [
      { name: "Truffle Malai Broccoli Florets", description: "Slow-baked in clay ovens, seasoned with white truffle oil and premium Himalayan pink salt." },
      { name: "Quinoa-Crusted Beetroot Galouti", description: "Melt-in-mouth pan-seared patties served with a crisp organic mint relish." }
    ],
    mains: [
      { name: "Paneer Shahi Khas (Avadhi Dum)", description: "Premium artisanal cottage cheese cubes simmered in a rich, slow-cooked cashew and melon-seed gravy." },
      { name: "Smoked Black Dal TCH Signature", description: "Slow-simmered for 24 hours on premium charcoal embers, finished with white organic butter." },
      { name: "Dry Roasted Asparagus & Waterchestnut Subz", description: "Tossed with ginger juliennes and tempered with organic yellow mustard seeds." }
    ],
    breads: [
      { name: "Saffron-Yeast Sheermal", description: "Traditional sweet-tasting baked flatbread, dusted with organic cardamoms." },
      { name: "Organic Multigrain Tawa Paratha", description: "Layered with low-fat organic ghee, cooked live." }
    ],
    desserts: [
      { name: "Deconstructed Golden Halwa Tart", description: "Bespoke moong dal halwa nestled in a crisp butter crust, garnished with 24-carat gold leaf." },
      { name: "Chilled Rose Petal Kulfi Parfait", description: "Slow-churned premium milk reduction infused with wild damask rose preserve." }
    ],
    presentationTip: "Present in individual modular bronze thalis with pristine copper partitions. Table settings should include fresh jasmine flowers and warm organic linen hand cloths.",
    isAiGenerated: false
  },
  "celebration": {
    menuName: "Royal Shahi Festival Feast",
    themeDescription: "A grand, celebratory buffet layout designed to evoke the opulence of classic Indian royal halls, perfect for festive events, milestones, or town hall celebrations.",
    welcomeDrinks: [
      { name: "Aam Panna Mint Elixir", description: "Roasted green mango nectar balanced with organic black salt, fresh mint, and cane sugar." },
      { name: "Kashmiri Kahwa gold", description: "Double-brewed green tea leaves infused with saffron, sweet almonds, and cinnamon." }
    ],
    starters: [
      { name: "Stuffed Awadhi Paneer Tikka", description: "Cottage cheese slabs loaded with dry fruits and marinated in a double-cream yoghurt mix." },
      { name: "Crispy Lotus Stem Honey Cumin", description: "Crisp-fried lotus root disks tossed with organic honey, toasted sesame, and fresh coriander." }
    ],
    mains: [
      { name: "Nawabi Paneer Lababdar", description: "Paneer cubes stewed in a tangy, robust tomato and butter onion reduction, finished with dried fenugreek leaves." },
      { name: "Subz Dry Fruit Biryani", description: "Long-grain basmati rice layered with royal vegetables, golden raisins, toasted cashews, and saffron water, sealed under clay lid (Dum)." },
      { name: "Banarasi Dum Aloo Kashmiri", description: "Golden scooped potatoes stuffed with organic cottage cheese, simmered in a rich Kashmiri red chilli broth." }
    ],
    breads: [
      { name: "Butter Garlic Naan (Live Clay Oven)", description: "Baked fresh with crushed organic garlic cloves and local white butter." },
      { name: "Laccha Pudina Paratha", description: "Multi-layered dynamic wheat bread covered in hand-crushed roasted mint dust." }
    ],
    desserts: [
      { name: "Artisanal Kesari Jalebi with Rabri", description: "Crisp golden swirls fried in pure cow ghee, served over thick chilled sweet milk reduction." },
      { name: "Warm Baked Gulab Jamun Lasagna", description: "Layered warm milk dumplings baked in a luscious cardamom-infused condensed saffron cream." }
    ],
    presentationTip: "Serve from matching bright copper chauka warming dishes with dynamic steam elements. Incorporate live food theater counters with clay ovens (Tandoors) and active tawa displays.",
    isAiGenerated: false
  },
  "casual": {
    menuName: "High-Tea Street Fusion & Bites",
    themeDescription: "An engaging, versatile selection of easy-to-consume bites, finger foods, and street-inspired treats designed for high-tea breaks, networking mixers, or informal team briefings.",
    welcomeDrinks: [
      { name: "Cutting Masala Chai (Live Counter)", description: "Premium Assam tea leaves boiled with fresh ginger, crushed green cardamoms, and lemongrass." },
      { name: "Zesty Peach & Gondhoraj Shikanji", description: "Local premium lime juice balanced with ripe peach extract and carbonated fizz." }
    ],
    starters: [
      { name: "Crispy Vegetable Spring Rolls", description: "Julienned fresh bell peppers, carrots, and cabbage in dry hand-rolled crisp wheat wrappers." },
      { name: "Cheese & Jalapeno Kurkure Samosa", description: "Our gourmet miniature samosas bursting with molten cheddar, paneer, and diced green chillies." }
    ],
    mains: [
      { name: "TCH Special Amritsari Chana Culatta", description: "Slow-stewed spicy chickpeas served in individual bite-sized shot glasses with mini puffed bhatura clouds." },
      { name: "Paneer Khurchan Slider", description: "Shredded cottage cheese stir-fried with onions and tomatoes, served in butter-toasted brioche sliders." }
    ],
    breads: [
      { name: "Assorted Mini Stuffed Kulchas", description: "Assortment of minced potato, onion, and herbal cottage cheese fresh from the tawa grid." }
    ],
    desserts: [
      { name: "Rose Petal Coconut Ladoo Duet", description: "Traditional sweet spheres of shredded organic coconut encasing dry sweet gulkand center." },
      { name: "Mini baked Chocolate Gujiya", description: "Crisp crescent crispy turnovers containing dark cocoa fudge and dried milk solid crumble." }
    ],
    presentationTip: "Set up interactive wooden handcarts resembling traditional markets. Present food on compostable dried sal-leaf platters with rustic clay cups (kulhads) for warm masala chai.",
    isAiGenerated: false
  }
};

export async function POST(request: Request) {
  try {
    const { theme, dietary, guests, plan } = await request.json();

    console.log(`[Generate Menu] requested config -> theme: ${theme}, dietary: ${dietary}, guests: ${guests}, plan: ${plan}`);

    // If Gemini key is missing, or we are in manual preview, serve high-end fallbacks immediately
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY" || process.env.GEMINI_API_KEY.trim() === "") {
      console.log("[Generate Menu] GEMINI_API_KEY not configured. Serving rich preset menu.");
      let menuKey = "casual";
      const lowerTheme = (theme || "").toLowerCase();
      if (lowerTheme.includes("board") || lowerTheme.includes("vip") || lowerTheme.includes("director") || lowerTheme.includes("executive")) {
        menuKey = "board";
      } else if (lowerTheme.includes("celebration") || lowerTheme.includes("diwali") || lowerTheme.includes("festive") || lowerTheme.includes("launch")) {
        menuKey = "celebration";
      } else if (lowerTheme.includes("tea") || lowerTheme.includes("snack") || lowerTheme.includes("casual") || lowerTheme.includes("break")) {
        menuKey = "casual";
      } else {
        // map based on plan
        if (plan === "Platinum") {
          menuKey = "board";
        } else if (plan === "Gold") {
          menuKey = "celebration";
        } else {
          menuKey = "casual";
        }
      }

      const selectedMenu = JSON.parse(JSON.stringify(FALLBACK_MENUS[menuKey]));
      // Adjust details slightly based on user inputs so it feels highly custom
      selectedMenu.menuName = `${selectedMenu.menuName} (Curated for ${guests} Guests)`;
      selectedMenu.themeDescription = `${selectedMenu.themeDescription} Perfectly configured for dietary style: "${dietary || 'Standard Vegetarian'}".`;
      selectedMenu.isAiGenerated = false;

      return NextResponse.json({
        success: true,
        menu: selectedMenu,
        info: "Running in preview mode. To unlock personalized real-time AI menus, configure your GEMINI_API_KEY under Settings > Secrets."
      });
    }

    // Real Gemini invocation if key is present
    try {
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const systemPrompt = `You are "TCH TasteBot" - the chief gourmet menu architect for "The Corporate Halwai", a premier, ultra-high-end Indian corporate catering brand celebrated for culinary precision.
Your mission is to design a cohesive, Michelin-standard Indian Menu layout mapped to the requested theme, dietary preferences, headcount, and budget plan level.

Choose titles and culinary descriptions that evoke luxury hospitality. All cuisines should be premium Indian (could incorporate modern fusion element if appropriate).
Provide the output strictly in the requested JSON structure. No markdown wrappers like \`\`\`json. Return bare outer JSON only.`;

      const promptMsg = `Create a custom detailed gourmet Indian menu for:
- Corporate Event Theme: "${theme || 'Modern Team Luncheon'}"
- Dietary preferences/constraints: "${dietary || 'Standard Vegetarian'}"
- Headcount / Expected Guests: ${guests || 50}
- Premium Tier Budget level: "${plan || 'Gold'}" (Silver is Essential Luxury, Gold is Signature Culinary, Platinum is Executive Suite)

The output MUST strictly match this JSON schema:
{
  "menuName": "Seductive and sophisticated name for this custom menu, e.g., 'Saffron & Cardamom Boardroom Coterie'",
  "themeDescription": "A poetic description of the theme, dietary adjustments, and culinary direction (approx 2 sentences)",
  "welcomeDrinks": [
    { "name": "Name of welcome drink", "description": "Compelling sensory description of ingredients and serving method" }
  ],
  "starters": [
    { "name": "Name of starter", "description": "Compelling description of preparation and flavours (typically 2 items)" }
  ],
  "mains": [
    { "name": "Name of main curry or gravy dish", "description": "Preparation details, slow cooking techniques, specific spices (typically 3 items)" }
  ],
  "breads": [
    { "name": "Name of flatbread or rice style", "description": "Serving temperature and style, e.g. saffron basmati, live baked naan" }
  ],
  "desserts": [
    { "name": "Name of rich dessert or sweet", "description": "Ingredients and temperature, e.g., baked condensed milk dumpling or warm saffron syrup" }
  ],
  "presentationTip": "A professional tip on the absolute best way to lay down the buffet or thalis for this corporate crowd (e.g. bronze plates, live charcoal garnish smoke, compostable materials)."
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: promptMsg,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          temperature: 0.8
        }
      });

      const responseText = response.text || "";
      let parsedMenu;
      try {
        parsedMenu = JSON.parse(responseText.trim());
        parsedMenu.isAiGenerated = true;
      } catch (parseErr) {
        console.error("Failed to parse Gemini output as JSON, fallback initiated.", parseErr, responseText);
        throw new Error("Invalid format received");
      }

      return NextResponse.json({
        success: true,
        menu: parsedMenu
      });

    } catch (err: any) {
      console.error("Gemini API Error, falling back to cached catalog.", err);
      // Fallback in case of server error or billing threshold
      return NextResponse.json({
        success: true,
        menu: {
          ...FALLBACK_MENUS.casual,
          menuName: `The Corporate Curation (${theme || 'Event'})`,
          themeDescription: "A gourmet, clean catering collection customized dynamically for your business guests.",
          isAiGenerated: false
        },
        warning: "Gemini AI server was temporarily unable to resolve. Provided high-end fallback preset instead."
      });
    }
  } catch (globalErr: any) {
    console.error("Global API Error:", globalErr);
    return NextResponse.json({ success: false, message: globalErr.message || "Server Error" }, { status: 500 });
  }
}
