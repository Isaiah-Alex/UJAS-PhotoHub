export const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const sessionTypes = [
    { id: "portrait",   label: "Portrait Session",  duration: "1–2 hrs",  price: 10000,  icon: "🎭" },
    { id: "fashion",    label: "Fashion Editorial", duration: "3–4 hrs",  price: 12000,  icon: "✨" },
    { id: "event",      label: "Event Coverage",    duration: "4–6 hrs",  price: 15000,  icon: "🎉" },
    { id: "commercial", label: "Commercial Shoot",  duration: "Full day", price: 30000, icon: "💼" },
    { id: "headshot",   label: "Headshots",         duration: "45 min",   price: 7000,  icon: "📸" },
    { id: "wedding",    label: "Wedding Package",   duration: "Full day", price: 13000, icon: "💍" },
] as const;

export type SessionType = (typeof sessionTypes)[number];

export const extras = [
    { id: "editing", label: "Premium Photo Editing", price: 3000 },
    { id: "rush",    label: "Rush Delivery (48 hrs)", price: 2000  },
    { id: "prints",  label: "Print Package (20 pcs)", price: 5000 },
    { id: "rights",  label: "Commercial License",     price: 4000 },
] as const;

export type Extra = (typeof extras)[number];

export const timeSlots = [
    "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
];

export const bookedSlots: Record<number, string[]> = {
    5:  ["9:00 AM", "10:00 AM"],
    12: ["2:00 PM", "3:00 PM"],
    18: ["11:00 AM"],
    22: ["8:00 AM", "9:00 AM", "4:00 PM"],
};

export const sessionLocation =  [
    { id: "studio",  label: "Studio",     icon: "🏛️", sub: "Photographer's studio" },
    { id: "outdoor", label: "Outdoor",    icon: "🌿", sub: "Park, street, etc."    },
    { id: "client",  label: "Your venue", icon: "📍", sub: "You choose the spot"   },
]

export function buildCalendar(year: number, month: number): (number | null)[] {
    const first = new Date(year, month, 1).getDay();
    const days  = new Date(year, month + 1, 0).getDate();
    const cells: (number | null)[] = Array(first).fill(null);
    for (let d = 1; d <= days; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
}

export function isPastDay(year: number, month: number, day: number): boolean {
    const dt = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dt < today;
}

export function calcPricing(sessionPrice: number, selectedAddOnIds: string[]) {
    const addOnTotal = extras
        .filter((e) => selectedAddOnIds.includes(e.id))
        .reduce((sum, e) => sum + e.price, 0);
    const subtotal = sessionPrice + addOnTotal;
    const fee      = Math.round(subtotal * 0.05);
    const total    = subtotal + fee;
    return { addOnTotal, subtotal, fee, total };
}