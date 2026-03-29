import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import CartSidebar from "../components/CartSidebar";
import CategoryCard from "../components/CategoryCard";
import Footer from "../components/Footer";
import RestaurantCard from "../components/RestaurantCard";
import { categories, restaurants } from "../data/menuData";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate({
      to: "/menu",
      search: searchQuery.trim() ? { q: searchQuery } : {},
    });
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "oklch(0.971 0.009 240)" }}
    >
      {/* Hero Section */}
      <section className="relative w-full h-[480px] overflow-hidden">
        <img
          src="/assets/generated/hero-food-banner.dim_1400x600.jpg"
          alt="Delicious food"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div
          className="absolute inset-0 flex flex-col justify-center px-6 md:px-12"
          style={{ maxWidth: "1200px", margin: "0 auto", left: 0, right: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-3">
              Craving Something
              <br />
              Delicious?
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Order now from top local restaurants near you.
            </p>
            <div className="flex gap-2 max-w-lg">
              <Input
                placeholder="Search for food or restaurants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="bg-white text-foreground placeholder:text-muted-foreground h-11"
                data-ocid="hero.search_input"
              />
              <Button
                onClick={handleSearch}
                className="bg-primary text-primary-foreground hover:opacity-90 h-11 px-6 gap-2 shrink-0"
                data-ocid="hero.search.button"
              >
                <Search className="w-4 h-4" /> Find Food
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="flex gap-6 items-start">
          {/* Primary column */}
          <main className="flex-1 min-w-0">
            {/* Popular Categories */}
            <motion.section
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-xl font-bold text-foreground mb-4">
                Popular Categories
              </h2>
              <div
                className="grid grid-cols-3 sm:grid-cols-6 gap-3"
                data-ocid="categories.list"
              >
                {categories.map((cat, idx) => (
                  <motion.div
                    key={cat.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                    data-ocid={`categories.item.${idx + 1}`}
                  >
                    <CategoryCard
                      name={cat.name}
                      emoji={cat.emoji}
                      color={cat.color}
                      onClick={() =>
                        navigate({
                          to: "/menu",
                          search: { category: cat.name },
                        })
                      }
                    />
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Top Rated Restaurants */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-bold text-foreground mb-2">
                Top Rated Restaurants Near You
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Based on your location · Fast delivery
              </p>
              {/* Featured images row */}
              <div className="flex gap-3 mb-5 overflow-x-auto pb-2">
                {restaurants.map((r) => (
                  <div
                    key={r.id}
                    className="relative shrink-0 w-48 h-32 rounded-xl overflow-hidden shadow-xs"
                  >
                    <img
                      src={r.image}
                      alt={r.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-2 left-3 text-white text-xs font-semibold">
                      {r.name}
                    </span>
                  </div>
                ))}
              </div>
              {/* Restaurant grid */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
                data-ocid="restaurants.list"
              >
                {restaurants.map((restaurant, idx) => (
                  <motion.div
                    key={restaurant.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.08 }}
                    data-ocid={`restaurants.item.${idx + 1}`}
                  >
                    <RestaurantCard restaurant={restaurant} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </main>

          {/* Sidebar */}
          <aside className="w-72 shrink-0 hidden lg:block">
            <CartSidebar />
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
