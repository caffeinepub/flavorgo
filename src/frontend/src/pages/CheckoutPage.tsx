import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, CreditCard, Loader2, Lock } from "lucide-react";
import { useState } from "react";
import type { ShoppingItem } from "../backend";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const { loginStatus, login, identity } = useInternetIdentity();
  const { actor } = useActor();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const DELIVERY_FEE = 2.99;
  const total = subtotal + DELIVERY_FEE;
  const isLoggedIn = loginStatus === "success" && !!identity;

  const handlePayment = async () => {
    if (!actor) return;
    setError("");
    setIsLoading(true);
    try {
      const shoppingItems: ShoppingItem[] = items.map((item) => ({
        productName: item.name,
        productDescription: item.restaurantName,
        priceInCents: BigInt(Math.round(item.price * 100)),
        quantity: BigInt(item.quantity),
        currency: "usd",
      }));

      const origin = window.location.origin;
      const successUrl = `${origin}/order-success?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${origin}/checkout`;

      const sessionUrl = await actor.createCheckoutSession(
        shoppingItems,
        successUrl,
        cancelUrl,
      );
      window.location.href = sessionUrl;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Payment failed. Please try again.",
      );
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "oklch(0.971 0.009 240)" }}
    >
      <div className="max-w-[800px] mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate({ to: "/cart" })}
            className="gap-2"
            data-ocid="checkout.back.button"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Checkout</h1>
        </div>

        {items.length === 0 ? (
          <Card className="text-center py-16" data-ocid="checkout.empty_state">
            <CardContent>
              <p className="text-muted-foreground mb-4">No items in cart</p>
              <Link to="/menu">
                <Button
                  className="bg-primary text-primary-foreground"
                  data-ocid="checkout.browse.button"
                >
                  Browse Menu
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Order items */}
            <div className="md:col-span-3">
              <Card className="shadow-xs">
                <CardHeader>
                  <CardTitle className="text-base">Order Items</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {items.map((item, idx) => (
                    <div
                      key={item.menuItemId}
                      className="flex items-center gap-3"
                      data-ocid={`checkout.item.${idx + 1}`}
                    >
                      <span className="text-2xl">{item.emoji}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.restaurantName} · x{item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Payment summary */}
            <div className="md:col-span-2">
              <Card className="shadow-card sticky top-20">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Lock className="w-4 h-4 text-primary" /> Secure Payment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Delivery</span>
                      <span>${DELIVERY_FEE.toFixed(2)}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  {!isLoggedIn ? (
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground text-center">
                        Please login to checkout
                      </p>
                      <Button
                        className="w-full bg-primary text-primary-foreground hover:opacity-90"
                        onClick={login}
                        data-ocid="checkout.login.button"
                      >
                        Login to Checkout
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="w-full bg-primary text-primary-foreground hover:opacity-90 gap-2"
                      onClick={handlePayment}
                      disabled={isLoading || !actor}
                      data-ocid="checkout.pay.button"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />{" "}
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" /> Pay with Card
                        </>
                      )}
                    </Button>
                  )}

                  {error && (
                    <p
                      className="text-xs text-destructive text-center"
                      data-ocid="checkout.error_state"
                    >
                      {error}
                    </p>
                  )}

                  <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3" /> Secured by Stripe
                  </p>
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
