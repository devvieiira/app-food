"use client";
import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductImageProps {
  product: Pick<Product, "name" | "imageUrl">;
}

const ProductImage = ({ product }: ProductImageProps) => {
  const router = useRouter();
  return (
    <div className="relative h-[360px] w-full">
      <Image
        className="object-cover"
        src={product?.imageUrl}
        alt={product?.name}
        fill
      />

      <Button
        className="absolute left-2 top-2 rounded-full bg-white text-foreground"
        size="icon"
        onClick={() => router.back()}
      >
        <ChevronLeftIcon />
      </Button>
    </div>
  );
};

export default ProductImage;
