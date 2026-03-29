import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearch } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import Footer from "../components/Footer";
import MenuItemCard from "../components/MenuItemCard";
import { categories, menuItems, restaurants } from "../data/menuData";

export default function MenuPage() {
  const search = useSearch({ from: "/menu" });

  const initialCategory = (search as Record<string, string>).category || "All";
  const initialRestaurant =
    (search as Record<string, string>).restaurant || "all";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeRestaurant, setActiveRestaurant] = useState(initialRestaurant);

  const allCategories = ["All", ...categories.map((c) => c.name)];
  const allRestaurants = [
    { id: "all", name: "All Restaurants" },
    ...restaurants,
  ];

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const catMatch =
        activeCategory === "All" || item.category === activeCategory;
      const restMatch =
        activeRestaurant === "all" || item.restaurantId === activeRestaurant;
      return catMatch && restMatch;
    });
  }, [activeCategory, activeRestaurant]);

  const getRestaurantName = (restaurantId: string) => {
    return restaurants.find((r) => r.id === restaurantId)?.name || "";
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "oklch(0.971 0.009 240)" }}
    >
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-1">Our Menu</h1>
          <p className="text-muted-foreground text-sm">
            Fresh food from your favorite local spots
          </p>
        </div>

        {/* Restaurant filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {allRestaurants.map((r) => (
            <button
              type="button"
              key={r.id}
              onClick={() => setActiveRestaurant(r.id)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                activeRestaurant === r.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-white text-muted-foreground border-border hover:border-primary/50"
              }`}
              data-ocid="menu.restaurant.tab"
            >
              {r.name}
            </button>
          ))}
        </div>

        {/* Category tabs */}
        <Tabs
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="mb-6"
        >
          <TabsList className="flex-wrap h-auto gap-1 bg-white border border-border p-1">
            {allCategories.map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                className="text-sm"
                data-ocid="menu.category.tab"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Items grid */}
        {filteredItems.length === 0 ? (
          <div
            className="text-center py-16 text-muted-foreground"
            data-ocid="menu.empty_state"
          >
            <span className="text-4xl block mb-3">🍽️</span>
            <p className="font-medium">No items found</p>
            <p className="text-sm">Try a different category or restaurant</p>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            data-ocid="menu.list"
          >
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                data-ocid={`menu.item.${idx + 1}`}
              >
                <MenuItemCard
                  item={item}
                  restaurantName={getRestaurantName(item.restaurantId)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
