import { Card, CardContent } from "@/components/ui/card";
import { Shield, Star, Truck, UtensilsCrossed } from "lucide-react";
import { motion } from "motion/react";
import Footer from "../components/Footer";

const stats = [
  { label: "Partner Restaurants", value: "500+" },
  { label: "Happy Customers", value: "50K+" },
  { label: "Cities Served", value: "25+" },
  { label: "Orders Delivered", value: "1M+" },
];

const values = [
  {
    icon: UtensilsCrossed,
    title: "Quality First",
    desc: "We partner only with top-rated restaurants that meet our quality standards.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Average delivery time under 30 minutes from top local restaurants.",
  },
  {
    icon: Star,
    title: "Best Selection",
    desc: "From pizza to sushi, we offer the widest variety of cuisines in your city.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    desc: "Built on the Internet Computer with secure payments via Stripe.",
  },
];

export default function AboutPage() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "oklch(0.971 0.009 240)" }}
    >
      {/* Hero */}
      <section className="bg-foreground text-white py-20 px-4">
        <div className="max-w-[800px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-6">
              <UtensilsCrossed className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-extrabold mb-4">About FlavorGo</h1>
            <p className="text-lg text-white/70 max-w-xl mx-auto">
              We connect food lovers with their favorite local restaurants,
              making it easy to order delicious meals with just a few clicks.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1000px] mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="text-center shadow-xs">
                <CardContent className="py-6">
                  <p className="text-3xl font-extrabold text-primary mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mission */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Our Mission
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            FlavorGo was founded with a simple mission: make great food
            accessible to everyone. We believe everyone deserves
            restaurant-quality meals, whether you're at home, in the office, or
            on the go. By partnering with the best local restaurants, we bring
            diverse cuisines right to your doorstep.
          </p>
        </div>

        {/* Values */}
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {values.map((v, idx) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
            >
              <Card className="shadow-xs">
                <CardContent className="p-6 flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <v.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {v.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
