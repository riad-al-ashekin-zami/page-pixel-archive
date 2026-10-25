export type PortfolioCategoryKey =
  | "aesthetic"
  | "medical"
  | "multiLocation"
  | "brand"
  | "international"
  | "specialty";

export interface PortfolioSite {
  name: string;
  url: string;
  domain: string;
  category: PortfolioCategoryKey;
  tagline: string;
  location?: string;
}

export const PORTFOLIO_CATEGORIES: { key: PortfolioCategoryKey | "all"; label: string }[] = [
  { key: "all", label: "All practices" },
  { key: "aesthetic", label: "Aesthetic & cosmetic" },
  { key: "medical", label: "Medical dermatology" },
  { key: "multiLocation", label: "Multi-location groups" },
  { key: "brand", label: "Enterprise & brand" },
  { key: "international", label: "MENA & international" },
  { key: "specialty", label: "Specialty & resources" },
];

export const PORTFOLIO_SITES: PortfolioSite[] = [
  { name: "Central Austin Dermatology", url: "https://centralaustinderm.com/", domain: "centralaustinderm.com", category: "medical", tagline: "Full-service dermatology in downtown Austin.", location: "Austin, TX" },
  { name: "Clear Dermatology", url: "https://www.cleardermatology.net/", domain: "cleardermatology.net", category: "medical", tagline: "Board-certified medical & cosmetic care.", location: "Scottsdale, AZ" },
  { name: "Olansky Dermatology", url: "https://www.olanskydermatology.com/", domain: "olanskydermatology.com", category: "aesthetic", tagline: "Aesthetic dermatology + aesthetic suite.", location: "Atlanta, GA" },
  { name: "Sanova Dermatology", url: "https://sanovadermatology.com/", domain: "sanovadermatology.com", category: "aesthetic", tagline: "Cosmetic, medical & surgical dermatology.", location: "TX & LA" },
  { name: "Dermatology & Laser Center of San Antonio", url: "https://dermsanantonio.com/", domain: "dermsanantonio.com", category: "aesthetic", tagline: "Laser + medical dermatology campus.", location: "San Antonio, TX" },
  { name: "Direct Derm", url: "https://www.directderm.com/", domain: "directderm.com", category: "specialty", tagline: "Direct-to-patient teledermatology.", location: "USA" },
  { name: "Clinical Dermatology Center", url: "https://clinicaldermatologycenter.com/", domain: "clinicaldermatologycenter.com", category: "medical", tagline: "Research-forward clinical dermatology.", location: "Cincinnati, OH" },
  { name: "Derm & Laser Center", url: "https://www.dermlasercenter.com/", domain: "dermlasercenter.com", category: "aesthetic", tagline: "Advanced laser + skin cancer center.", location: "USA" },
  { name: "Colorado Dermatology", url: "https://coloradodermatology.com/", domain: "coloradodermatology.com", category: "medical", tagline: "Front Range medical dermatology.", location: "Colorado" },
  { name: "SkyMD", url: "https://www.skymd.com/", domain: "skymd.com", category: "multiLocation", tagline: "50-state teledermatology network.", location: "USA" },
  { name: "Chicago Dermatology", url: "https://www.chicagodermatology.co/", domain: "chicagodermatology.co", category: "medical", tagline: "Boutique medical & cosmetic dermatology.", location: "Chicago, IL" },
  { name: "Cura Clinics", url: "https://cura.sa/", domain: "cura.sa", category: "international", tagline: "Premium dermatology & wellness in KSA.", location: "Saudi Arabia" },
  { name: "Galderma", url: "https://www.galderma.com/", domain: "galderma.com", category: "brand", tagline: "Global dermatology pharma & aesthetics.", location: "Global" },
  { name: "Badr Health", url: "https://badrhealth.com/", domain: "badrhealth.com", category: "international", tagline: "Multi-specialty dermatology group.", location: "Saudi Arabia" },
  { name: "ZMMCO Medical", url: "https://zmmcomedical.com/", domain: "zmmcomedical.com", category: "international", tagline: "Medical + aesthetic dermatology group.", location: "MENA" },
  { name: "Naturium", url: "https://naturium.com/", domain: "naturium.com", category: "brand", tagline: "Dermatologist-loved skincare brand.", location: "USA" },
  { name: "West Dermatology", url: "https://www.westdermatology.com/", domain: "westdermatology.com", category: "multiLocation", tagline: "60+ location western US network.", location: "AZ · CA · NV · NM" },
  { name: "Bay Dermatology", url: "https://www.baydermatology.com/", domain: "baydermatology.com", category: "medical", tagline: "General & pediatric dermatology.", location: "Florida" },
  { name: "Laser Care Specialists", url: "https://lasercarespecialists.com/", domain: "lasercarespecialists.com", category: "specialty", tagline: "Focused laser + skin rejuvenation.", location: "USA" },
  { name: "Fort Worth Dermatology", url: "https://www.fwdermatology.com/", domain: "fwdermatology.com", category: "medical", tagline: "Family & surgical dermatology.", location: "Fort Worth, TX" },
  { name: "Westlake Dermatology", url: "https://www.westlakedermatology.com/", domain: "westlakedermatology.com", category: "aesthetic", tagline: "Top-tier cosmetic dermatology brand.", location: "Texas" },
  { name: "Platinum Dermatology Partners", url: "https://www.platinumderm.com/", domain: "platinumderm.com", category: "aesthetic", tagline: "Modern platinum-tier practice group.", location: "USA" },
  { name: "SD Family Dermatology", url: "https://www.sdfamilyderm.com/", domain: "sdfamilyderm.com", category: "medical", tagline: "Family-first dermatology in San Diego.", location: "San Diego, CA" },
  { name: "Candela Medical", url: "https://candelamedical.com/", domain: "candelamedical.com", category: "brand", tagline: "Global aesthetic device manufacturer.", location: "Global" },
  { name: "eDermatology", url: "https://www.edermatology.com/", domain: "edermatology.com", category: "medical", tagline: "Concierge medical dermatology.", location: "USA" },
  { name: "Dermatologist On Call", url: "https://dermatologistoncall.com/", domain: "dermatologistoncall.com", category: "multiLocation", tagline: "On-demand virtual dermatology visits.", location: "USA" },
  { name: "Neo Dermatologist", url: "https://www.neodermatologist.com/", domain: "neodermatologist.com", category: "medical", tagline: "Next-gen concierge dermatology.", location: "USA" },
  { name: "Dora Clinic", url: "https://doraclinic.sa/", domain: "doraclinic.sa", category: "international", tagline: "Luxury dermatology in Saudi Arabia.", location: "Saudi Arabia" },
  { name: "Reveal Clinics", url: "https://reveal-clinics.com/", domain: "reveal-clinics.com", category: "aesthetic", tagline: "Aesthetic clinic chain, UK-based.", location: "United Kingdom" },
  { name: "Derm & Skin Cancer Center", url: "https://dermskincancercenter.com/", domain: "dermskincancercenter.com", category: "medical", tagline: "Mohs & skin cancer specialists.", location: "USA" },
  { name: "Colorado Springs Dermatology Clinic", url: "https://coloradospringsdermatologyclinic.com/", domain: "coloradospringsdermatologyclinic.com", category: "aesthetic", tagline: "Cosmetic + medical dermatology.", location: "Colorado Springs, CO" },
  { name: "Arizona Center for Dermatology", url: "https://azcdps.com/", domain: "azcdps.com", category: "medical", tagline: "Comprehensive AZ dermatology practice.", location: "Arizona" },
  { name: "Lumenis", url: "https://lumenis.com/", domain: "lumenis.com", category: "brand", tagline: "Energy-based aesthetic technology.", location: "Global" },
  { name: "Skinsight", url: "https://skinsight.com/", domain: "skinsight.com", category: "specialty", tagline: "Visual skin condition reference library.", location: "Global" },
  { name: "Skin of Color Society", url: "https://skinofcolorsociety.org/", domain: "skinofcolorsociety.org", category: "specialty", tagline: "Non-profit for skin of color research.", location: "Global" },
  { name: "Clini Derma", url: "https://clini-derma.com/", domain: "clini-derma.com", category: "aesthetic", tagline: "Modern aesthetic dermatology clinic.", location: "Europe" },
  { name: "Skin + Me", url: "https://www.skinandme.com/", domain: "skinandme.com", category: "specialty", tagline: "Prescription skincare, delivered monthly.", location: "United Kingdom" },
  { name: "Union MD", url: "https://unionmd.ca/", domain: "unionmd.ca", category: "medical", tagline: "Premium medical & aesthetic care.", location: "Montreal, CA" },
  { name: "Sydney Dermatology", url: "https://sydneyderm.com.au/", domain: "sydneyderm.com.au", category: "medical", tagline: "Specialist dermatology in Sydney CBD.", location: "Sydney, AU" },
  { name: "Dr Haus Dermatology", url: "https://drhausdermatology.com/", domain: "drhausdermatology.com", category: "aesthetic", tagline: "Harley Street dermatology & aesthetics.", location: "London, UK" },
  { name: "Teladoc Health", url: "https://www.teladochealth.com/", domain: "teladochealth.com", category: "brand", tagline: "Global virtual care enterprise.", location: "Global" },
  { name: "Skincare by Dr V", url: "https://www.skincarebydrv.com/", domain: "skincarebydrv.com", category: "specialty", tagline: "Skin of colour expert brand.", location: "United Kingdom" },
  { name: "Sunpark Dermatology", url: "https://sunparkdermatology.ca/", domain: "sunparkdermatology.ca", category: "medical", tagline: "Family medical dermatology practice.", location: "Calgary, CA" },
  { name: "Alma Lasers", url: "https://almalasers.com/", domain: "almalasers.com", category: "brand", tagline: "Global energy-based device maker.", location: "Global" },
  { name: "CPSO", url: "https://www.cpso.on.ca/", domain: "cpso.on.ca", category: "specialty", tagline: "Ontario physicians regulatory body.", location: "Ontario, CA" },
  { name: "The Ottawa Hospital", url: "https://www.ottawahospital.on.ca/", domain: "ottawahospital.on.ca", category: "multiLocation", tagline: "Academic multi-campus hospital.", location: "Ottawa, CA" },
  { name: "The Derma Co", url: "https://thedermaco.com/", domain: "thedermaco.com", category: "brand", tagline: "Science-backed skincare brand.", location: "India" },
  { name: "Rejuv Vancouver", url: "https://vancouver.rejuv.ca/", domain: "vancouver.rejuv.ca", category: "aesthetic", tagline: "Medical aesthetics & rejuvenation.", location: "Vancouver, CA" },
  { name: "Eudelo", url: "https://eudelo.com/", domain: "eudelo.com", category: "aesthetic", tagline: "London dermatology & skin wellness.", location: "London, UK" },
  { name: "Derma Clinic UK", url: "https://derma-clinic.co.uk/", domain: "derma-clinic.co.uk", category: "medical", tagline: "Consultant-led UK dermatology.", location: "United Kingdom" },
  { name: "Belfast Skin Clinic", url: "https://belfastskinclinic.com/", domain: "belfastskinclinic.com", category: "medical", tagline: "Northern Ireland skin specialists.", location: "Belfast, UK" },
  { name: "Cathedral Dermatology", url: "https://cathedraldermatology.com/", domain: "cathedraldermatology.com", category: "medical", tagline: "Comprehensive dermatology care.", location: "USA" },
  { name: "The Mole Clinic", url: "https://themoleclinic.co.uk/", domain: "themoleclinic.co.uk", category: "specialty", tagline: "UK's leading mole screening service.", location: "United Kingdom" },
  { name: "Blemish Clinic", url: "https://blemishclinic.co.uk/", domain: "blemishclinic.co.uk", category: "specialty", tagline: "Skin lesion removal specialists.", location: "United Kingdom" },
  { name: "Norvic Hospital", url: "https://norvichospital.com/", domain: "norvichospital.com", category: "multiLocation", tagline: "Multi-specialty private hospital.", location: "Bangladesh" },
  { name: "Heidelberg Medical", url: "https://heidelbergmedical.com.au/", domain: "heidelbergmedical.com.au", category: "aesthetic", tagline: "Cosmetic dermatology & anti-ageing.", location: "Melbourne, AU" },
  { name: "DermScreen", url: "https://dermscreen.com.au/", domain: "dermscreen.com.au", category: "specialty", tagline: "Skin cancer screening specialists.", location: "Australia" },
  { name: "St George Dermatology", url: "https://stgeorgedermatology.com.au/", domain: "stgeorgedermatology.com.au", category: "medical", tagline: "Sydney specialist dermatology.", location: "Sydney, AU" },
  { name: "The Skin Lab", url: "https://theskinlab.com.au/", domain: "theskinlab.com.au", category: "aesthetic", tagline: "Cosmetic dermatology & aesthetic.", location: "Australia" },
  { name: "ASEC", url: "https://asec.net.au/", domain: "asec.net.au", category: "specialty", tagline: "Australian Skin Excellence Centre.", location: "Australia" },
];
