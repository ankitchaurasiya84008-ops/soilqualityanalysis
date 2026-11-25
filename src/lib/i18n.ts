import { createContext, useContext } from "react";

export type Lang = "en" | "hi";

export interface LangContextValue {
  lang: Lang;
  t: Translation;
  setLang: (l: Lang) => void;
}

export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      analysis: "Soil Analysis",
      crops: "Crop Recommendation",
      how: "How It Works",
      gallery: "Gallery",
      contact: "Contact",
    },
    hero: {
      badge: "Smart Farming for Every Field",
      title: "Know Your Soil. Grow the Right Crop.",
      sub: "Turn a handful of soil data into higher yields — analyze soil health, understand nutrient gaps, and get crop recommendations built for Indian farms.",
      cta1: "Check Soil Quality",
      cta2: "Get Crop Recommendation",
    },
    about: {
      title: "About the Project",
      sub: "Healthy soil is the foundation of every harvest. This tool helps farmers, students, and researchers read soil test numbers and act on them — choosing the right crop and the right amendment instead of guessing.",
      stats: [
        { value: "9", label: "Soil Parameters Analyzed" },
        { value: "20+", label: "Crops Supported" },
        { value: "92%", label: "Model Accuracy" },
        { value: "10,000+", label: "Farmers Helped" },
      ],
    },
    analysis: {
      title: "Soil Quality Analysis",
      sub: "Enter your soil test values below. Not sure? Take a sample to your nearest Krishi Vigyan Kendra or soil testing lab.",
      fields: {
        nitrogen: "Nitrogen (N)",
        phosphorus: "Phosphorus (P)",
        potassium: "Potassium (K)",
        ph: "pH Level",
        organicCarbon: "Organic Carbon",
        ec: "Electrical Conductivity",
        moisture: "Moisture",
        temperature: "Temperature",
        soilType: "Soil Type",
      },
      units: {
        nitrogen: "kg/ha",
        phosphorus: "kg/ha",
        potassium: "kg/ha",
        ph: "0–14",
        organicCarbon: "%",
        ec: "dS/m",
        moisture: "%",
        temperature: "°C",
      },
      soilTypes: ["Alluvial", "Black", "Red", "Sandy", "Clay", "Loamy"],
      submit: "Analyze Soil",
      submitting: "Analyzing…",
      placeholder: "e.g. 140",
      sample: "Fill sample values",
      result: {
        title: "Your Soil Report",
        rating: "Soil Quality Rating",
        nutrients: "Nutrient Levels",
        suggestions: "Suggestions to Improve Your Soil",
        crops: "Recommended Crops",
        good: "Good",
      },
    },
    crops: {
      title: "Crop Recommendation",
      sub: "Pick your soil type and season — we highlight the crops that thrive in those conditions, with sowing windows and water needs.",
      season: "Season",
      seasons: { kharif: "Kharif (Jun–Oct)", rabi: "Rabi (Nov–Mar)", zaid: "Zaid (Apr–Jun)", all: "Any season" },
      water: "Water need",
      duration: "Duration",
      sow: "Sow",
      noResults: "No crops match this combination — try another season.",
    },
    how: {
      title: "How It Works",
      steps: [
        { title: "Collect a Soil Sample", desc: "Take samples 15 cm deep from 5–6 spots across your field and mix them well." },
        { title: "Enter Your Values", desc: "Feed the lab report numbers — N, P, K, pH and more — into the analysis form." },
        { title: "Get Your Soil Score", desc: "Our model rates your soil Poor to Excellent and flags nutrient gaps instantly." },
        { title: "Act on Recommendations", desc: "Follow fertilizer, manure or lime suggestions and plant the recommended crops." },
      ],
    },
    gallery: {
      title: "From the Field",
      sub: "Healthy soils, happy harvests — a glimpse of what good soil management grows.",
    },
    contact: {
      title: "Contact Us",
      sub: "Questions about your soil report or the project? Write to us.",
      name: "Your Name",
      email: "Email Address",
      message: "Message",
      send: "Send Message",
      sent: "Thank you! We'll get back to you soon.",
      info: {
        email: "support@soilcrop.in",
        phone: "+91 1800 123 4567",
        address: "KVK Road, Agricultural Zone, New Delhi 110001",
      },
    },
    footer: { tagline: "Empowering Indian agriculture, one soil test at a time." },
  },
  hi: {
    nav: {
      home: "मुख्य पृष्ठ",
      about: "परियोजना के बारे में",
      analysis: "मिट्टी विश्लेषण",
      crops: "फसल सिफ़ारिश",
      how: "यह कैसे काम करता है",
      gallery: "गैलरी",
      contact: "संपर्क करें",
    },
    hero: {
      badge: "हर खेत के लिए स्मार्ट खेती",
      title: "अपनी मिट्टी जानें। सही फसल उगाएँ।",
      sub: "मिट्टी के आँकड़ों से बेहतर उपज पाएँ — मिट्टी की सेहत की जाँच करें, पोषक तत्वों की कमी समझें, और भारतीय खेतों के लिए बनी फसल सिफ़ारिश पाएँ।",
      cta1: "मिट्टी की गुणवत्ता जाँचें",
      cta2: "फसल सिफ़ारिश पाएँ",
    },
    about: {
      title: "परियोजना के बारे में",
      sub: "स्वस्थ मिट्टी हर फसल की नींव है। यह उपकरण किसानों, छात्रों और शोधकर्ताओं को मिट्टी परीक्षण के आँकड़े समझने और उन पर काम करने में मदद करता है — अंदाज़े की बजाय सही फसल और सही खाद चुनें।",
      stats: [
        { value: "9", label: "मिट्टी मापदंड विश्लेषित" },
        { value: "20+", label: "समर्थित फसलें" },
        { value: "92%", label: "मॉडल सटीकता" },
        { value: "10,000+", label: "लाभान्वित किसान" },
      ],
    },
    analysis: {
      title: "मिट्टी गुणवत्ता विश्लेषण",
      sub: "नीचे अपनी मिट्टी परीक्षण के मान भरें। अनिश्चित हैं? नमूना अपने नज़दीकी कृषि विज्ञान केंद्र या मिट्टी परीक्षण प्रयोगशाला में ले जाएँ।",
      fields: {
        nitrogen: "नाइट्रोजन (N)",
        phosphorus: "फास्फोरस (P)",
        potassium: "पोटैशियम (K)",
        ph: "पीएच स्तर",
        organicCarbon: "जैविक कार्बन",
        ec: "विद्युत चालकता",
        moisture: "नमी",
        temperature: "तापमान",
        soilType: "मिट्टी का प्रकार",
      },
      units: {
        nitrogen: "किग्रा/हे",
        phosphorus: "किग्रा/हे",
        potassium: "किग्रा/हे",
        ph: "0–14",
        organicCarbon: "%",
        ec: "dS/m",
        moisture: "%",
        temperature: "°से",
      },
      soilTypes: ["जलोढ़", "काली", "लाल", "बलुई", "चिकनी", "दोमट"],
      submit: "मिट्टी विश्लेषण करें",
      submitting: "विश्लेषण हो रहा है…",
      placeholder: "जैसे 140",
      sample: "नमूना मान भरें",
      result: {
        title: "आपकी मिट्टी रिपोर्ट",
        rating: "मिट्टी गुणवत्ता रेटिंग",
        nutrients: "पोषक तत्व स्तर",
        suggestions: "मिट्टी सुधार के सुझाव",
        crops: "अनुशंसित फसलें",
        good: "अच्छी",
      },
    },
    crops: {
      title: "फसल सिफ़ारिश",
      sub: "अपनी मिट्टी का प्रकार और मौसम चुनें — हम उन परिस्थितियों में उगने वाली फसलें, बुवाई समय और पानी की ज़रूरत के साथ दिखाते हैं।",
      season: "मौसम",
      seasons: { kharif: "खरीफ (जून–अक्टूबर)", rabi: "रबी (नव–मार्च)", zaid: "ज़ायद (अप्रैल–जून)", all: "कोई भी मौसम" },
      water: "पानी की ज़रूरत",
      duration: "अवधि",
      sow: "बुवाई",
      noResults: "इस संयोजन के लिए कोई फसल नहीं मिली — दूसरा मौसम आज़माएँ।",
    },
    how: {
      title: "यह कैसे काम करता है",
      steps: [
        { title: "मिट्टी का नमूना लें", desc: "खेत के 5–6 स्थानों से 15 सेमी गहराई तक नमूने लें और अच्छी तरह मिलाएँ।" },
        { title: "मान भरें", desc: "लैब रिपोर्ट के आँकड़े — N, P, K, पीएच आदि — विश्लेषण फॉर्म में भरें।" },
        { title: "मिट्टी स्कोर पाएँ", desc: "हमारा मॉडल तुरंत मिट्टी को खराब से उत्कृष्ट तक रेट करता है और कमी बताता है।" },
        { title: "सिफ़ारिश पर अमल करें", desc: "खाद, चूना या जिप्सम के सुझावों का पालन करें और अनुशंसित फसलें बोएँ।" },
      ],
    },
    gallery: {
      title: "खेत से",
      sub: "स्वस्थ मिट्टी, खुशहाल फसलें — अच्छी मिट्टी प्रबंधन का नतीजा।",
    },
    contact: {
      title: "संपर्क करें",
      sub: "अपनी मिट्टी रिपोर्ट या परियोजना के बारे में सवाल? हमें लिखें।",
      name: "आपका नाम",
      email: "ईमेल पता",
      message: "संदेश",
      send: "संदेश भेजें",
      sent: "धन्यवाद! हम जल्द उत्तर देंगे।",
      info: {
        email: "support@soilcrop.in",
        phone: "+91 1800 123 4567",
        address: "केवीके मार्ग, कृषि क्षेत्र, नई दिल्ली 110001",
      },
    },
    footer: { tagline: "एक मिट्टी परीक्षण से भारतीय कृषि को सशक्त बनाना।" },
  },
};

export type Translation = (typeof translations)["en"];

export const LangContext = createContext<LangContextValue>({
  lang: "en",
  t: translations.en,
  setLang: () => {},
});

export const useLang = () => useContext(LangContext);
