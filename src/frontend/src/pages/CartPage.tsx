import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const navigate = useNavigate();
  const DELIVERY_FEE = 2.99;
  const total = subtotal + DELIVERY_FEE;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "oklch(0.971 0.009 240)" }}
    >
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate({ to: "/" })}
            className="gap-2"
            data-ocid="cart.back.button"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Your Cart</h1>
        </div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
            data-ocid="cart.empty_state"
          >
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-40" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground mb-6">
              Add some delicious items from our menu
            </p>
            <Link to="/menu">
              <Button
                className="bg-primary text-primary-foreground hover:opacity-90"
                data-ocid="cart.browse_menu.button"
              >
                Browse Menu
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-3" data-ocid="cart.list">
              {items.map((item, idx) => (
                <motion.div
                  key={item.menuItemId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  data-ocid={`cart.item.${idx + 1}`}
                >
                  <Card className="shadow-xs">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{item.emoji}</span>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">
                            {item.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {item.restaurantName}
                          </p>
                          <p className="text-sm font-bold text-foreground mt-1">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() =>
                              updateQuantity(item.menuItemId, item.quantity - 1)
                            }
                            data-ocid={`cart.quantity_decrease.${idx + 1}`}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center font-medium text-sm">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() =>
                              updateQuantity(item.menuItemId, item.quantity + 1)
                            }
                            data-ocid={`cart.quantity_increase.${idx + 1}`}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-foreground">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive mt-1"
                            onClick={() => removeItem(item.menuItemId)}
                            data-ocid={`cart.delete_button.${idx + 1}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Order summary */}
            <div>
              <Card className="shadow-card sticky top-20">
                <CardHeader>
                  <CardTitle className="text-base">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>
                        Subtotal ({items.reduce((s, i) => s + i.quantity, 0)}{" "}
                        items)
                      </span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Delivery fee</span>
                      <span>${DELIVERY_FEE.toFixed(2)}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-foreground">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:opacity-90 mt-2"
                    onClick={() => navigate({ to: "/checkout" })}
                    data-ocid="cart.proceed_checkout.button"
                  >
                    Proceed to Checkout
                  </Button>
                  <Link to="/menu">
                    <Button
                      variant="outline"
                      className="w-full"
                      data-ocid="cart.continue_shopping.button"
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
