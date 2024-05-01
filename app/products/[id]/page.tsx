import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";
import ProductInfo from "./_components/product-info";

interface ProductPageProps {
  params: {
    id: string;
  };
}
const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurant: {
        id: product?.restaurant.id,
      },
    },
    include: {
      restaurant: true,
    },
    take: 10,
  });

  if (!product) {
    return notFound();
  }
  return (
    <div>
      <ProductImage product={product} />

      <ProductInfo product={product} complementaryProducts={juices} />
    </div>
  );
};

export default ProductPage;
