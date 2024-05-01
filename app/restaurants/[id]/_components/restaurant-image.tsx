"use client";
import { Button } from "@/app/_components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "name" | "imageUrl">;
}

const RestaurantImage = ({ restaurant }: RestaurantImageProps) => {
  const router = useRouter();
  return (
    <div className="relative h-[250px] w-full">
      <Image
        className="object-cover"
        src={restaurant?.imageUrl}
        alt={restaurant?.name}
        fill
      />

      <Button
        className="absolute left-2 top-2 rounded-full bg-white text-foreground"
        size="icon"
        onClick={() => router.back()}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        size="icon"
        className="absolute right-4 top-4 rounded-full bg-muted-foreground"
      >
        <HeartIcon size={24} className="fill-white" />
      </Button>
    </div>
  );
};

export default RestaurantImage;
