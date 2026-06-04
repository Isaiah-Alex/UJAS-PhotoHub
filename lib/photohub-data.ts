import type { ImageKey } from "./images";

export type CategorySlug =
  | "Portrait"
  | "Wedding"
  | "Street"
  | "Nature"
  | "Fashion"
  | "Corporate"
  | "Lifestyle"
  | "Events";

export type PortfolioImage = {
  id: ImageKey;
  h: number;
  category: CategorySlug;
  photographerId: number;
  title: string;
};

export type Photographer = {
  id: number;
  name: string;
  specialty: string;
  specializations: CategorySlug[];
  avatar: ImageKey;
  cover: ImageKey;
  followers: string;
  rating: number;
  reviews: number;
  city: string;
  location: string;
  available: boolean;
  priceHourly: number;
  bio: string;
  equipment: string[];
};

export type MarketplaceItem = {
  id: number;
  photographerId: number;
  title: string;
  priceAmount: number;
  image: ImageKey;
  seller: string;
  downloads: number;
  rating: number;
  category: CategorySlug;
};

export type Testimonial = {
  id: number;
  photographerId: number;
  name: string;
  role: string;
  avatar: ImageKey;
  text: string;
  rating: number;
};

export const photographers: Photographer[] = [
  {
    id: 1,
    name: "Adaeze Okafor",
    specialty: "Portrait & Fashion",
    specializations: ["Portrait", "Fashion", "Lifestyle"],
    avatar: "portrait-woman-5",
    cover: "fashion-1",
    followers: "48.2K",
    rating: 4.9,
    reviews: 124,
    city: "Lagos",
    location: "Lagos, Nigeria",
    available: true,
    priceHourly: 45_000,
    bio: "Award-winning portrait and fashion photographer with 10+ years of experience across Lagos, Abuja, and Accra, working with leading African brands and editorial houses.",
    equipment: [
      "Canon EOS R5 - Primary Body",
      "Sony A7R IV - Backup Body",
      "Canon 85mm f/1.2L - Portraits",
      "Canon 24-70mm f/2.8L - Versatility",
    ],
  },
  {
    id: 2,
    name: "Emeka Nwosu",
    specialty: "Wedding & Events",
    specializations: ["Wedding", "Events", "Lifestyle"],
    avatar: "portrait-man-1",
    cover: "wedding-1",
    followers: "31.7K",
    rating: 4.8,
    reviews: 89,
    city: "Abuja",
    location: "Abuja, Nigeria",
    available: true,
    priceHourly: 35_000,
    bio: "Documentary wedding photographer capturing authentic emotion at ceremonies across Nigeria and West Africa for the past eight years.",
    equipment: [
      "Nikon Z8 - Primary Body",
      "Nikon Z6 II - Backup Body",
      "Nikon 70-200mm f/2.8 - Ceremonies",
      "Sigma 35mm f/1.4 - Receptions",
    ],
  },
  {
    id: 3,
    name: "Zara Okonkwo",
    specialty: "Street & Documentary",
    specializations: ["Street", "Portrait", "Events"],
    avatar: "portrait-woman-1",
    cover: "street-1",
    followers: "62.1K",
    rating: 5.0,
    reviews: 201,
    city: "Lagos",
    location: "Lagos, Nigeria",
    available: false,
    priceHourly: 55_000,
    bio: "Documentary photographer capturing raw human moments across Nigeria and the continent. World Press Photo finalist 2024.",
    equipment: [
      "Leica Q3 - Street Work",
      "Fujifilm X-T5 - Travel Kit",
      "Fujinon 23mm f/1.4 - Documentary",
      "Zoom H1n - Field Audio Notes",
    ],
  },
  {
    id: 4,
    name: "Kunle Bakare",
    specialty: "Nature & Landscape",
    specializations: ["Nature", "Lifestyle"],
    avatar: "portrait-man-3",
    cover: "nature-1",
    followers: "89.4K",
    rating: 4.9,
    reviews: 178,
    city: "Ibadan",
    location: "Ibadan, Nigeria",
    available: true,
    priceHourly: 30_000,
    bio: "Landscape photographer exploring Nigeria's coastlines, savannah, and city skylines with a minimalist, atmospheric style.",
    equipment: [
      "Sony A7R V - Landscape Body",
      "Sony 16-35mm f/2.8 GM - Wide Scenes",
      "DJI Air 3 - Aerials",
      "Lee Filter Kit - Long Exposure",
    ],
  },
  {
    id: 5,
    name: "Amara Eze",
    specialty: "Fashion & Lifestyle",
    specializations: ["Fashion", "Lifestyle", "Portrait"],
    avatar: "portrait-woman-2",
    cover: "lifestyle-1",
    followers: "74.8K",
    rating: 4.8,
    reviews: 156,
    city: "Port Harcourt",
    location: "Port Harcourt, Nigeria",
    available: true,
    priceHourly: 42_000,
    bio: "Fashion and lifestyle photographer collaborating with Nigerian designers, beauty brands, and creative directors nationwide.",
    equipment: [
      "Canon EOS R6 II - Editorial Body",
      "Canon 50mm f/1.2L - Lifestyle",
      "Profoto B10 - Location Lighting",
      "Aputure 300d - Motion Shoots",
    ],
  },
  {
    id: 6,
    name: "James Obi",
    specialty: "Corporate & Branding",
    specializations: ["Corporate", "Portrait"],
    avatar: "portrait-man-2",
    cover: "corporate-1",
    followers: "22.3K",
    rating: 4.7,
    reviews: 67,
    city: "Lagos",
    location: "Lagos, Nigeria",
    available: true,
    priceHourly: 28_000,
    bio: "Corporate and brand photographer specializing in executive portraits, team shoots, and product campaigns for Nigerian businesses.",
    equipment: [
      "Sony A7 IV - Studio Body",
      "Sony 90mm Macro - Product Work",
      "Godox AD600Pro - Studio Lighting",
      "ColorChecker Passport - Brand Accuracy",
    ],
  },
];

export const categories = [
  { name: "Wedding", count: "12.4K photos", image: "wedding-2" as ImageKey },
  { name: "Portrait", count: "28.1K photos", image: "portrait-woman-5" as ImageKey },
  { name: "Street", count: "9.7K photos", image: "street-1" as ImageKey },
  { name: "Nature", count: "34.2K photos", image: "nature-1" as ImageKey },
  { name: "Fashion", count: "15.8K photos", image: "fashion-1" as ImageKey },
  { name: "Corporate", count: "7.3K photos", image: "corporate-1" as ImageKey },
  { name: "Lifestyle", count: "19.6K photos", image: "lifestyle-1" as ImageKey },
  { name: "Events", count: "11.2K photos", image: "events-1" as ImageKey },
] as const;

export const portfolioImages: PortfolioImage[] = [
  { photographerId: 1, id: "portrait-woman-5", h: 280, category: "Portrait", title: "Studio Grace" },
  { photographerId: 1, id: "fashion-1", h: 360, category: "Fashion", title: "Runway Light" },
  { photographerId: 1, id: "fashion-2", h: 300, category: "Fashion", title: "Editorial Form" },
  { photographerId: 2, id: "wedding-1", h: 320, category: "Wedding", title: "First Dance" },
  { photographerId: 2, id: "wedding-2", h: 270, category: "Wedding", title: "Ceremony Glow" },
  { photographerId: 2, id: "events-1", h: 340, category: "Events", title: "Reception Energy" },
  { photographerId: 3, id: "street-1", h: 300, category: "Street", title: "Lagos Geometry" },
  { photographerId: 3, id: "portfolio-1", h: 260, category: "Portrait", title: "Quiet Frame" },
  { photographerId: 3, id: "events-1", h: 340, category: "Events", title: "Public Moment" },
  { photographerId: 4, id: "nature-1", h: 270, category: "Nature", title: "Morning Ridge" },
  { photographerId: 4, id: "nature-2", h: 330, category: "Nature", title: "Forest Air" },
  { photographerId: 4, id: "street-1", h: 300, category: "Street", title: "Skyline Edge" },
  { photographerId: 5, id: "lifestyle-1", h: 240, category: "Lifestyle", title: "Soft Motion" },
  { photographerId: 5, id: "fashion-2", h: 340, category: "Fashion", title: "Color Story" },
  { photographerId: 5, id: "portrait-woman-2", h: 290, category: "Portrait", title: "Natural Light" },
  { photographerId: 6, id: "corporate-1", h: 250, category: "Corporate", title: "Executive Presence" },
  { photographerId: 6, id: "corporate-2", h: 310, category: "Corporate", title: "Product Precision" },
  { photographerId: 6, id: "portrait-man-2", h: 280, category: "Portrait", title: "Founder Portrait" },
];

export const marketplaceItems: MarketplaceItem[] = [
  { id: 1, photographerId: 3, title: "Golden Hour Cityscape", priceAmount: 3_500, image: "street-1", seller: "Zara Okonkwo", downloads: 847, rating: 4.8, category: "Street" },
  { id: 2, photographerId: 1, title: "Ethereal Portrait Series", priceAmount: 5_000, image: "portrait-woman-5", seller: "Adaeze Okafor", downloads: 1204, rating: 4.9, category: "Portrait" },
  { id: 3, photographerId: 4, title: "Forest Morning Light", priceAmount: 7_500, image: "nature-1", seller: "Kunle Bakare", downloads: 563, rating: 5.0, category: "Nature" },
  { id: 4, photographerId: 3, title: "Urban Geometry Pack", priceAmount: 12_000, image: "corporate-1", seller: "Zara Okonkwo", downloads: 921, rating: 4.7, category: "Street" },
  { id: 5, photographerId: 2, title: "Wedding Moments Vol.2", priceAmount: 18_500, image: "wedding-1", seller: "Emeka Nwosu", downloads: 334, rating: 4.9, category: "Wedding" },
  { id: 6, photographerId: 5, title: "High Fashion Editorial", priceAmount: 15_000, image: "fashion-2", seller: "Amara Eze", downloads: 678, rating: 4.8, category: "Fashion" },
  { id: 7, photographerId: 6, title: "Corporate Excellence", priceAmount: 4_500, image: "corporate-2", seller: "James Obi", downloads: 412, rating: 4.6, category: "Corporate" },
  { id: 8, photographerId: 4, title: "Nature's Symphony", priceAmount: 9_000, image: "nature-2", seller: "Kunle Bakare", downloads: 789, rating: 5.0, category: "Nature" },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    photographerId: 1,
    name: "Ngozi Adebayo",
    role: "Creative Director, Lagos Fashion Week",
    avatar: "portrait-woman-3",
    text: "UJAS PhotoHub transformed how we discover talent. The quality here is unmatched - we've found three cover photographers through this platform alone.",
    rating: 5,
  },
  {
    id: 2,
    photographerId: 2,
    name: "Tunde Williams",
    role: "Wedding Client, Lagos",
    avatar: "portrait-man-1",
    text: "Booked Emeka Nwosu for our wedding and the results were beyond our dreams. The booking process was seamless and the final photos are absolutely stunning.",
    rating: 5,
  },
  {
    id: 3,
    photographerId: 3,
    name: "Chioma Nwachukwu",
    role: "Fashion Brand Owner, Abuja",
    avatar: "portrait-woman-4",
    text: "The marketplace is incredible. We license photos for our campaigns directly through the platform and save days of back-and-forth negotiations.",
    rating: 5,
  },
  {
    id: 4,
    photographerId: 4,
    name: "Aisha Bello",
    role: "Travel Editor",
    avatar: "portrait-woman-2",
    text: "Kunle's landscape work gave our campaign a clear sense of place. The files were organized, sharp, and ready for print.",
    rating: 5,
  },
  {
    id: 5,
    photographerId: 5,
    name: "Mariam Udo",
    role: "Beauty Founder",
    avatar: "portrait-woman-1",
    text: "Amara understood our brand language immediately and delivered a full lifestyle library we still use every week.",
    rating: 5,
  },
  {
    id: 6,
    photographerId: 6,
    name: "David Adeyemi",
    role: "Startup CEO",
    avatar: "portrait-man-3",
    text: "James made our team look polished without making the shoot feel stiff. The turnaround was fast and professional.",
    rating: 5,
  },
];

export function getPhotographerById(id: string | number) {
  return photographers.find((photographer) => photographer.id === Number(id));
}

export function getPhotographerPortfolio(photographerId: number) {
  return portfolioImages.filter((image) => image.photographerId === photographerId);
}

export function getPhotographerTestimonials(photographerId: number) {
  return testimonials.filter((testimonial) => testimonial.photographerId === photographerId);
}

export function getPhotographerMarketplaceItems(photographerId: number) {
  return marketplaceItems.filter((item) => item.photographerId === photographerId);
}

export function filterPhotographers({
  search = "",
  category = "All",
}: {
  search?: string;
  category?: CategorySlug | "All";
}) {
  const normalizedSearch = search.trim().toLowerCase();

  return photographers.filter((photographer) => {
    const matchesCategory =
      category === "All" || photographer.specializations.includes(category);

    const matchesSearch =
      !normalizedSearch ||
      [
        photographer.name,
        photographer.specialty,
        photographer.location,
        photographer.city,
        photographer.bio,
        ...photographer.specializations,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });
}

export function filterMarketplaceItems({
  search = "",
  sort = "Popular",
}: {
  search?: string;
  sort?: "Popular" | "Latest" | "Price: Low" | "Price: High" | "Top Rated";
}) {
  const normalizedSearch = search.trim().toLowerCase();
  const filtered = marketplaceItems.filter((item) =>
    !normalizedSearch
      ? true
      : [item.title, item.seller, item.category]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch),
  );

  return [...filtered].sort((a, b) => {
    if (sort === "Price: Low") return a.priceAmount - b.priceAmount;
    if (sort === "Price: High") return b.priceAmount - a.priceAmount;
    if (sort === "Top Rated") return b.rating - a.rating;
    if (sort === "Latest") return b.id - a.id;
    return b.downloads - a.downloads;
  });
}

export type NotificationType = "booking" | "message" | "review" | "follow" | "marketplace";

export type Notification = {
  id: number;
  type: NotificationType;
  title: string;
  body: string;
  time: string;
  unread: boolean;
  avatar: ImageKey;
  action: string;
};

export const notificationsData: Notification[] = [
  {
    id: 1,
    type: "booking",
    title: "Booking Confirmed",
    body: "Adaeze Okafor accepted your portrait session request for June 14 at 10:00 AM.",
    time: "2 min ago",
    unread: true,
    avatar: "portrait-woman-5",
    action: "View booking",
  },
  {
    id: 2,
    type: "message",
    title: "New message from Emeka",
    body: "Hey! Just confirming the venue for your wedding shoot next Saturday. Are we still good?",
    time: "18 min ago",
    unread: true,
    avatar: "portrait-man-1",
    action: "Reply",
  },
  {
    id: 3,
    type: "review",
    title: "New review on your profile",
    body: "Ngozi Adebayo left you a 5-star review: \"Absolutely stunning work, exceeded every expectation.\"",
    time: "1 hr ago",
    unread: true,
    avatar: "portrait-woman-3",
    action: "See review",
  },
  {
    id: 4,
    type: "follow",
    title: "Zara Okonkwo followed you",
    body: "World Press Photo finalist Zara Okonkwo is now following your portfolio.",
    time: "3 hrs ago",
    unread: true,
    avatar: "portrait-woman-1",
    action: "View profile",
  },
  {
    id: 5,
    type: "marketplace",
    title: "Your photo was purchased",
    body: "\"Golden Hour Cityscape\" was licensed by a buyer for commercial use. ₦3,500 added to your balance.",
    time: "5 hrs ago",
    unread: false,
    avatar: "portrait-woman-2",
    action: "View sale",
  },
  {
    id: 6,
    type: "booking",
    title: "Session reminder",
    body: "You have a fashion editorial shoot with Amara Eze tomorrow at 9:00 AM. Don't forget your mood board.",
    time: "Yesterday",
    unread: false,
    avatar: "portrait-woman-2",
    action: "View details",
  },
  {
    id: 7,
    type: "review",
    title: "Respond to your review",
    body: "Tunde Williams mentioned you in a review: \"Emeka captured every emotion perfectly.\"",
    time: "2 days ago",
    unread: false,
    avatar: "portrait-man-1",
    action: "See review",
  },
  {
    id: 8,
    type: "marketplace",
    title: "Price drop alert",
    body: "\"Forest Morning Light\" by Kunle Bakare is now 20% off. You saved this to your wishlist.",
    time: "3 days ago",
    unread: false,
    avatar: "portrait-man-3",
    action: "View item",
  },
];
