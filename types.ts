export enum AppTab {
  HOME = "HOME",
  PRICING = "PRICING",
  GALLERY = "GALLERY"
}

export interface MenuItem {
  name: string;
  description: string;
}

export interface MenuResponse {
  menuName: string;
  themeDescription: string;
  welcomeDrinks: MenuItem[];
  starters: MenuItem[];
  mains: MenuItem[];
  breads: MenuItem[];
  desserts: MenuItem[];
  presentationTip: string;
  isAiGenerated: boolean;
}

export interface CalculatorState {
  headcount: number;
  plan: "Silver" | "Gold" | "Platinum";
  frequency: "single" | "weekly" | "contract";
  addOnLiveStation: boolean;
  addOnDessert: boolean;
  addOnMocktails: boolean;
  addOnServers: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "lunch" | "buffet" | "box" | "live" | "all";
  imageUrl: string;
  description: string;
  details: string;
  client?: string;
  date?: string;
  feedback?: string;
}

export interface BookingFormState {
  fullName: string;
  corporateEmail: string;
  companyName: string;
  phoneNumber: string;
  eventDate: string;
  headcount: number;
  plan: "Silver" | "Gold" | "Platinum";
  specialInstructions: string;
}

export interface SavedInquiry extends BookingFormState {
  id: string;
  submittedAt: string;
  status: "Pending Review" | "Under Negotiation" | "Tasting Scheduled";
  estimatedPricePerPlate: number;
  estimatedTotal: number;
}
