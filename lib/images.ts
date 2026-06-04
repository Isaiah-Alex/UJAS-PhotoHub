/** Local image keys mapped to files in /public/images. */
export const IMAGE_SOURCES = {
  hero: "/images/hero.jpg",
  "portrait-woman-1": "/images/portrait-woman-1.jpg",
  "portrait-woman-2": "/images/portrait-woman-2.jpg",
  "portrait-woman-3": "/images/portrait-woman-3.jpg",
  "portrait-woman-4": "/images/portrait-woman-4.jpg",
  "portrait-woman-5": "/images/portrait-woman-5.jpg",
  "portrait-man-1": "/images/portrait-man-3.jpg",
  "portrait-man-2": "/images/portrait-man-2.jpg",
  "portrait-man-3": "/images/portrait-man-3.jpg",
  "fashion-1": "/images/fashion-1.jpg",
  "fashion-2": "/images/fashion-2.jpg",
  "wedding-1": "/images/wedding-1.jpg",
  "wedding-2": "/images/wedding-2.jpg",
  "street-1": "/images/street-1.jpg",
  "nature-1": "/images/nature-1.jpg",
  "corporate-1": "/images/corporate-1.jpg",
  "lifestyle-1": "/images/lifestyle-1.jpg",
  "events-1": "/images/events-1.jpg",
  "corporate-2": "/images/corporate-2.jpg",
  "nature-2": "/images/nature-2.jpg",
  "portfolio-1": "/images/portfolio-1.jpg",
} as const;

export type ImageKey = keyof typeof IMAGE_SOURCES;

export function imageSrc(key: ImageKey): string {
  return IMAGE_SOURCES[key];
}
