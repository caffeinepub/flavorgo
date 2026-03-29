import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useCart } from "../context/CartContext";
import type { MenuItem } from "../data/menuData";

interface MenuItemCardProps {
  item: MenuItem;
  restaurantName: string;
}

export default function MenuItemCard({
  item,
  restaurantName,
}: MenuItemCardProps) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      restaurantName,
      emoji: item.emoji,
    });
  };

  return (
    <Card
      className="shadow-xs hover:shadow-card transition-shadow"
      data-ocid="menu.item.card"
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{item.emoji}</span>
              <h3 className="font-semibold text-foreground text-sm">
                {item.name}
              </h3>
            </div>
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              {item.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-foreground">
                ${item.price.toFixed(2)}
              </span>
              <Button
                size="sm"
                onClick={handleAdd}
                className="bg-primary text-primary-foreground hover:opacity-90 h-8 gap-1 px-3"
                data-ocid="menu.add_to_cart.button"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
