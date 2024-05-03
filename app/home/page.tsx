import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import CatergoryList from "../_components/category-list";
import Header from "../_components/header";
import ProductList from "../_components/product-list";
import PromoBanner from "../_components/promo-banner";
import RestaurantList from "../_components/restaurant-list";
import Search from "../_components/search";
import { Button } from "../_components/ui/button";
import { db } from "../_lib/prisma";

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="px-5 pt-6">
        <CatergoryList />
      </div>
      <div className="px-5 pt-6">
        <PromoBanner src="/banner-promo.png" alt="Até 30% de desconto!" />
      </div>
      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/products/recommended">
              Ver todos
              <ChevronRightIcon />
            </Link>
          </Button>
        </div>
        <ProductList products={products} />
      </div>

      <div className="px-5 pt-6">
        <PromoBanner
          src="/banner-promo-2.png"
          alt="A partir de R$17,90 em lanches"
        />
      </div>

      <div className="space-y-4 py-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/restaurants/recommended">
              Ver todos!
              <ChevronRightIcon />
            </Link>
          </Button>
        </div>
        <RestaurantList />
      </div>
    </>
  );
};

export default Home;
