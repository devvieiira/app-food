"use client";

import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { formatCurrency } from "@/app/_helpers/price";
// import { CartContext } from "@/app/contexts/cart";
import type { OrderStatus, Prisma } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
// import { useContext } from "react";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      products: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const getOrderStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case "CANCELED":
      return "Cancelado";
    case "COMPLETED":
      return "Entregue";
    case "CONFIRMED":
      return "Confirmado";
    case "DELIVERING":
      return "Em Transporte";
    case "PREPARING":
      return "Preparando";
  }
};

const OrderItem = ({ order }: OrderItemProps) => {
  // const { addProductToCart } = useContext(CartContext);
  return (
    <Card>
      <CardContent className="space-y-1 p-5">
        <div
          className={`w-fit rounded-full px-2 py-1 ${
            order.status !== "COMPLETED"
              ? "bg-green-500 text-white"
              : "bg-[#EEEEEE] text-muted-foreground"
          }`}
        >
          <span className="block text-xs font-semibold">
            {getOrderStatusLabel(order.status)}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={order.restaurant.imageUrl} />
            </Avatar>

            <span className="text-sm font-semibold">
              {order.restaurant.name}
            </span>
          </div>

          <Button variant="ghost" size="icon" className="h-5 w-5" asChild>
            <Link href={`/restaurants/${order.restaurantId}`}>
              <ChevronRightIcon />
            </Link>
          </Button>
        </div>
        <div className="py-3">
          <Separator />
        </div>
        <div className="space-y-2">
          {order.products.map((product) => (
            <div key={product.id} className="flex items-center gap-3">
              <div className="h5 flex w-5 items-center justify-center rounded-full bg-muted">
                <span className="block text-xs text-black">
                  {product.quantity}
                </span>
              </div>
              <span className="block text-xs text-muted-foreground">
                {product.product.name}
              </span>
            </div>
          ))}
        </div>

        <div className="py-3">
          <Separator />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm">{formatCurrency(Number(order.totalPrice))}</p>
          <Button
            variant="link"
            size="sm"
            className="text-xs"
            disabled={order.status !== "COMPLETED"}
          >
            Refazer pedido
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
