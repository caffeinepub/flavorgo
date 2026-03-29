import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { Clock, MapPin, Star } from "lucide-react";
import type { Restaurant } from "../data/menuData";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Card
      className="overflow-hidden shadow-card hover:shadow-md transition-shadow"
      data-ocid="restaurant.card"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-white/95 rounded-full px-2 py-0.5 flex items-center gap-1 text-xs font-semibold shadow-xs">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          {restaurant.rating}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-foreground text-base mb-1">
          {restaurant.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          {restaurant.cuisine}
        </p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {restaurant.distance}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {restaurant.deliveryTime}
          </span>
        </div>
        <Link to="/menu" search={{ restaurant: restaurant.id }}>
          <Button
            size="sm"
            className="w-full bg-primary text-primary-foreground hover:opacity-90"
            data-ocid="restaurant.view_menu.button"
          >
            View Menu
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
