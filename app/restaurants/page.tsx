"use client";
import { Restaurant } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurants } from "./_actions/search";
import Header from "../_components/header";
import RestaurantItem from "../_components/restaurant-item";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchRestaurants = async () => {
      const searchFor = searchParams.get("search");
      if (!searchFor) return;
      const foundRestaurants = await searchForRestaurants(searchFor);
      setRestaurants(foundRestaurants);
    };

    fetchRestaurants();
  }, [searchParams]);
  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Encontrados</h2>
        <div className="flex w-full flex-col gap-6">
          {restaurants.map((item) => (
            <RestaurantItem
              key={item.id}
              restaurant={item}
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
