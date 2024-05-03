import type { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link
      href={`/categories/${category.id}/products`}
      className="shadow-mds flex items-center gap-3 rounded-full bg-white px-4 py-3"
    >
      <Image
        src={category.imageUrl}
        alt={category.name}
        height={30}
        width={30}
      />

      <span className="text-sm font-semibold">{category.name}</span>
    </Link>
  );
};

export default CategoryItem;
