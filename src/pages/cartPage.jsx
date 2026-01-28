import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";
import {
  addToCart,
  removeFromCart,
  decreaseCartItem,
} from "../features/cartSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { ScrollArea } from "../components/ui/scroll-area";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <>
      {/* CART BUTTON */}
      <Button
        onClick={() => setOpen(true)}
        className="bg-emerald-600 p-5 rounded-full"
      >
        <FiShoppingCart />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[95vw] sm:w-[420px] sm:h-[80vh] md:h-[75vh] p-0 flex flex-col">
          <DialogHeader className="p-6 border-b">
            <DialogTitle className="flex items-center gap-2">
              <FiShoppingCart className="text-emerald-600" />
              Your Basket
            </DialogTitle>
          </DialogHeader>

          {/* ITEMS */}
          <ScrollArea className="h-[60vh] p-4 sm:h-[40vh] ">
            {items.length === 0 ? (
              <p className="text-center text-slate-400 mt-20">
                Your cart is empty
              </p>
            ) : (
              items.map((item) => (
                <div
                  key={item.idMeal}
                  className="flex flex-col sm:flex-row gap-4 border rounded-xl p-4"
                >
                  <img
                    src={item.image}
                    className="w-full sm:w-16 h-40 sm:h-16 rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <h4 className="font-semibold text-sm truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-500">${item.price}</p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => dispatch(decreaseCartItem(item))}
                        >
                          −
                        </Button>

                        <span className="w-6 text-center">{item.quantity}</span>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => dispatch(addToCart(item))}
                        >
                          +
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500"
                        onClick={() => dispatch(removeFromCart(item.idMeal))}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </ScrollArea>

          {/* FOOTER */}
          <div className="rounded p-2 bg-white shrink-0">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Button className="w-full mt-4 bg-emerald-600">Checkout</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
