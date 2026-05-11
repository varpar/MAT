// Editorial wedding/portrait imagery (Unsplash placeholders).
export const MAT_IMAGES = {
  hero:    "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&auto=format&fit=crop&q=80",
  heroAlt: "https://images.unsplash.com/photo-1525258946800-98cfd641d0de?w=1600&auto=format&fit=crop&q=80",
  couple1: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&auto=format&fit=crop&q=80",
  couple2: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&auto=format&fit=crop&q=80",
  couple3: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=1200&auto=format&fit=crop&q=80",
  bride1:  "https://images.unsplash.com/photo-1594472484576-ddc5c1709e7e?w=1200&auto=format&fit=crop&q=80",
  bride2:  "https://images.unsplash.com/photo-1604881991720-f91add269bed?w=1200&auto=format&fit=crop&q=80",
  bride3:  "https://images.unsplash.com/photo-1610631066894-62452ccb927c?w=1200&auto=format&fit=crop&q=80",
  haldi:   "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=1200&auto=format&fit=crop&q=80",
  mehendi: "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?w=1200&auto=format&fit=crop&q=80",
  sangeet: "https://images.unsplash.com/photo-1583939411023-14783179e581?w=1200&auto=format&fit=crop&q=80",
  pheras:  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&auto=format&fit=crop&q=80",
  vidaai:  "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&auto=format&fit=crop&q=80",
  detail1: "https://images.unsplash.com/photo-1606490194859-07c18c9f0968?w=1000&auto=format&fit=crop&q=80",
  detail2: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&auto=format&fit=crop&q=80",
  detail3: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1000&auto=format&fit=crop&q=80",
  detail4: "https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?w=1000&auto=format&fit=crop&q=80",
  detail5: "https://images.unsplash.com/photo-1530021232320-687d8e3dba54?w=1000&auto=format&fit=crop&q=80",
  detail6: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1000&auto=format&fit=crop&q=80",
  detail7: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1000&auto=format&fit=crop&q=80",
  detail8: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1000&auto=format&fit=crop&q=80",
  // Wide cinematic frames for the home reel
  reel1: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1800&auto=format&fit=crop&q=80",
  reel2: "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?w=1800&auto=format&fit=crop&q=80",
  reel3: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1800&auto=format&fit=crop&q=80",
  reel4: "https://images.unsplash.com/photo-1583939411023-14783179e581?w=1800&auto=format&fit=crop&q=80",
  reel5: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1800&auto=format&fit=crop&q=80",
  reel6: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1800&auto=format&fit=crop&q=80",
  // Tall portraits for the triptych
  portrait1: "https://images.unsplash.com/photo-1604881991720-f91add269bed?w=1200&auto=format&fit=crop&q=80",
  portrait2: "https://images.unsplash.com/photo-1594472484576-ddc5c1709e7e?w=1200&auto=format&fit=crop&q=80",
  portrait3: "https://images.unsplash.com/photo-1610631066894-62452ccb927c?w=1200&auto=format&fit=crop&q=80",
  portrait4: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&auto=format&fit=crop&q=80",
  // Atmospheric / details
  atmos1: "https://images.unsplash.com/photo-1606490194859-07c18c9f0968?w=1400&auto=format&fit=crop&q=80",
  atmos2: "https://images.unsplash.com/photo-1530021232320-687d8e3dba54?w=1400&auto=format&fit=crop&q=80",
  atmos3: "https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?w=1400&auto=format&fit=crop&q=80",
  // Quote backdrop (broad cinematic)
  cinemaQuote: "https://images.unsplash.com/photo-1525258946800-98cfd641d0de?w=2000&auto=format&fit=crop&q=80",
} as const;

export type Couple = {
  bride: string;
  groom: string;
  place: string;
  img: string;
  slug?: string;
};

export const FEATURED: Couple[] = [
  { bride: "Riya",   groom: "Mohit",   place: "Udaipur",         img: MAT_IMAGES.couple1, slug: "riya-sang-mohit" },
  { bride: "Aarya",  groom: "Vikram",  place: "Jaipur",          img: MAT_IMAGES.couple2, slug: "aarya-sang-vikram" },
  { bride: "Saanvi", groom: "Aditya",  place: "Goa",             img: MAT_IMAGES.couple3, slug: "saanvi-sang-aditya" },
  { bride: "Ishita", groom: "Rohan",   place: "Jodhpur",         img: MAT_IMAGES.bride1,  slug: "ishita-sang-rohan" },
  { bride: "Aanya",  groom: "Karan",   place: "Hyderabad",       img: MAT_IMAGES.bride2,  slug: "aanya-sang-karan" },
  { bride: "Meher",  groom: "Devansh", place: "Florence, Italy", img: MAT_IMAGES.bride3,  slug: "meher-sang-devansh" },
];

export const RITUALS = [
  { num: "01", name: "Haldi",   desc: "A morning of turmeric, laughter, and family hands.", img: MAT_IMAGES.haldi },
  { num: "02", name: "Mehendi", desc: "Hours of henna while the women sing the old songs.", img: MAT_IMAGES.mehendi },
  { num: "03", name: "Sangeet", desc: "The night before. Dholki, dance, and dupatta blur.", img: MAT_IMAGES.sangeet },
  { num: "04", name: "Pheras",  desc: "Seven steps around the fire. The vow itself.",       img: MAT_IMAGES.pheras },
  { num: "05", name: "Vidaai",  desc: "The threshold. The handful of rice. The car door.",  img: MAT_IMAGES.vidaai },
];
