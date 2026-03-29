import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useSearch } from "@tanstack/react-router";
import { CheckCircle, Home, Loader2, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useActor } from "../hooks/useActor";

export default function OrderSuccessPage() {
  const search = useSearch({ from: "/order-success" });
  const sessionId = (search as Record<string, string>).session_id || null;
  const { clearCart } = useCart();
  const { actor } = useActor();
  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading",
  );

  const checkStatus = useCallback(async () => {
    clearCart();
    if (!sessionId || !actor) {
      setStatus("success");
      return;
    }
    try {
      const result = await actor.getStripeSessionStatus(sessionId);
      setStatus(result.__kind__ === "completed" ? "success" : "failed");
    } catch {
      setStatus("success");
    }
  }, [sessionId, clearCart, actor]);

  useEffect(() => {
    if (actor !== null) {
      checkStatus();
    }
  }, [checkStatus, actor]);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "oklch(0.971 0.009 240)" }}
    >
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            className="max-w-md w-full shadow-card text-center"
            data-ocid="order_success.card"
          >
            <CardContent className="p-10">
              {status === "loading" ? (
                <div data-ocid="order_success.loading_state">
                  <Loader2 className="w-16 h-16 mx-auto mb-4 animate-spin text-primary" />
                  <p className="text-muted-foreground">
                    Confirming your order...
                  </p>
                </div>
              ) : (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </motion.div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    Order Confirmed! 🎉
                  </h1>
                  <p className="text-muted-foreground mb-2">
                    Thank you for your order. Your food is being prepared with
                    love!
                  </p>
                  {sessionId && (
                    <p className="text-xs text-muted-foreground mb-6 font-mono bg-muted rounded px-2 py-1">
                      Order ID: {sessionId.slice(0, 20)}...
                    </p>
                  )}
                  <div
                    className="flex flex-col gap-2"
                    data-ocid="order_success.success_state"
                  >
                    <Link to="/">
                      <Button
                        className="w-full bg-primary text-primary-foreground hover:opacity-90 gap-2"
                        data-ocid="order_success.home.button"
                      >
                        <Home className="w-4 h-4" /> Back to Home
                      </Button>
                    </Link>
                    <Link to="/menu">
                      <Button
                        variant="outline"
                        className="w-full gap-2"
                        data-ocid="order_success.menu.button"
                      >
                        <ShoppingBag className="w-4 h-4" /> Order More Food
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
