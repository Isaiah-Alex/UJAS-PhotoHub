import Image from "next/image";
import { imageSrc } from "@/lib/images";
import { Star } from "lucide-react";

export const UImg = ({
  name,
  alt,
  className,
}: {
  name: string;
  alt: string;
  className?: string;
}) => (
  <Image
    src={imageSrc(name)}
    alt={alt}
    className={className}
    loading="lazy"
    width={500}
    height={800}

  />
);

export const Stars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        size={11}
        className={i <= Math.round(rating) ? "fill-primary text-primary" : "text-white/20 fill-white/10"}
      />
    ))}
  </div>
);