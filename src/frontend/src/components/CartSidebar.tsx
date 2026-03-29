import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "@tanstack/react-router";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { sampleOrders } from "../data/menuData";
import OrderStatusBadge from "./OrderStatusBadge";

export default function CartSidebar() {
  const { items, removeItem, subtotal } = useCart();
  const navigate = useNavigate();
  const DELIVERY_FEE = 2.99;

  return (
    <div className="space-y-4">
      {/* Cart widget */}
      <Card className="shadow-card" data-ocid="cart.panel">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <ShoppingCart className="w-4 h-4 text-primary" /> Your Cart
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {items.length === 0 ? (
            <div
              className="text-center py-6 text-muted-foreground text-sm"
              data-ocid="cart.empty_state"
            >
              <ShoppingCart className="w-8 h-8 mx-auto mb-2 opacity-30" />
              Your cart is empty
            </div>
          ) : (
            <div className="space-y-2">
              {items.map((item, idx) => (
                <div
                  key={item.menuItemId}
                  className="flex items-center justify-between gap-2"
                  data-ocid={`cart.item.${idx + 1}`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {item.emoji} {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      x{item.quantity} · $
                      {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                    onClick={() => removeItem(item.menuItemId)}
                    data-ocid={`cart.delete_button.${idx + 1}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
              <Separator className="my-3" />
              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery</span>
                  <span>${DELIVERY_FEE.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-foreground pt-1">
                  <span>Total</span>
                  <span>${(subtotal + DELIVERY_FEE).toFixed(2)}</span>
                </div>
              </div>
              <Button
                className="w-full mt-3 bg-primary text-primary-foreground hover:opacity-90"
                onClick={() => navigate({ to: "/checkout" })}
                data-ocid="cart.checkout.button"
              >
                Checkout
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Management */}
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Order Management</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          {sampleOrders.map((order, idx) => (
            <div
              key={order.id}
              className="text-sm"
              data-ocid={`orders.item.${idx + 1}`}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-medium">{order.id}</span>
                <OrderStatusBadge status={order.status} />
              </div>
              <p className="text-xs text-muted-foreground">
                {order.restaurant}
              </p>
              <p className="text-xs text-muted-foreground">{order.total}</p>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-1 text-xs"
            data-ocid="orders.track.button"
          >
            Track Orders
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
