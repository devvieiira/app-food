import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";
import { calcProductTotalPrice, formatCurrency } from "../_helpers/price";
import { CartContext, type CartProduct } from "../_providers/contexts/cart";
import { Button } from "./ui/button";

interface CartItemProps {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDeacreaseQuantityClick = () =>
    decreaseProductQuantity(cartProduct.id);

  const handleIncreaseQuantityClick = () => {
    increaseProductQuantity(cartProduct.id);
  };

  const handleRemoveClick = () => {
    removeProductFromCart(cartProduct.id);
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* IMAGE */}
        <div className="relative h-20 w-20 rounded-lg shadow-md">
          <Image
            className="rounded-lg object-cover"
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-xs">{cartProduct.name}</h3>
          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {formatCurrency(
                calcProductTotalPrice(cartProduct) * cartProduct.quantity,
              )}
            </h4>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-muted-foregrond text-xs line-through">
                {formatCurrency(
                  Number(cartProduct.price) * cartProduct.quantity,
                )}
              </span>
            )}
          </div>
          {/* QUANTIDADE */}
          <div className="flex items-center text-center">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 border border-solid border-muted-foreground"
            >
              <ChevronLeftIcon
                size={18}
                onClick={handleDeacreaseQuantityClick}
              />
            </Button>
            <span className="block w-10 text-xs">{cartProduct.quantity}</span>
            <Button
              className="h-8 w-8"
              size="icon"
              onClick={handleIncreaseQuantityClick}
            >
              <ChevronRightIcon size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* DELETE BUTTON */}
      <Button
        className="h-8 w-8 border border-solid border-muted-foreground"
        variant="ghost"
        size="icon"
        onClick={handleRemoveClick}
      >
        <TrashIcon size={18} />
      </Button>
    </div>
  );
};

export default CartItem;
