export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
  category: string;
  restaurantId: string;
}

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  cuisine: string;
  distance: string;
  deliveryTime: string;
  image: string;
  category: string;
}

export const restaurants: Restaurant[] = [
  {
    id: "pizza-palace",
    name: "Pizza Palace",
    rating: 4.8,
    cuisine: "Italian",
    distance: "0.8 mi",
    deliveryTime: "20-30 min",
    image: "/assets/generated/pizza-palace.dim_400x300.jpg",
    category: "Pizza",
  },
  {
    id: "burger-hub",
    name: "Burger Hub",
    rating: 4.6,
    cuisine: "American",
    distance: "1.2 mi",
    deliveryTime: "25-35 min",
    image: "/assets/generated/burger-hub.dim_400x300.jpg",
    category: "Burgers",
  },
  {
    id: "sushi-world",
    name: "Sushi World",
    rating: 4.9,
    cuisine: "Japanese",
    distance: "1.5 mi",
    deliveryTime: "30-40 min",
    image: "/assets/generated/sushi-world.dim_400x300.jpg",
    category: "Sushi",
  },
  {
    id: "salad-garden",
    name: "Salad Garden",
    rating: 4.7,
    cuisine: "Healthy",
    distance: "0.5 mi",
    deliveryTime: "15-25 min",
    image: "/assets/generated/salad-garden.dim_400x300.jpg",
    category: "Salads",
  },
];

export const menuItems: MenuItem[] = [
  // Pizza Palace
  {
    id: "pp-1",
    name: "Margherita Pizza",
    description: "Fresh tomato, mozzarella, basil",
    price: 12.99,
    emoji: "🍕",
    category: "Pizza",
    restaurantId: "pizza-palace",
  },
  {
    id: "pp-2",
    name: "Pepperoni Pizza",
    description: "Classic pepperoni with melted cheese",
    price: 14.99,
    emoji: "🍕",
    category: "Pizza",
    restaurantId: "pizza-palace",
  },
  {
    id: "pp-3",
    name: "BBQ Chicken Pizza",
    description: "Smoky BBQ sauce, grilled chicken, onions",
    price: 15.99,
    emoji: "🍕",
    category: "Pizza",
    restaurantId: "pizza-palace",
  },
  {
    id: "pp-4",
    name: "Veggie Supreme",
    description: "Bell peppers, mushrooms, olives, onions",
    price: 13.99,
    emoji: "🍕",
    category: "Pizza",
    restaurantId: "pizza-palace",
  },
  // Burger Hub
  {
    id: "bh-1",
    name: "Classic Burger",
    description: "Beef patty, lettuce, tomato, pickles",
    price: 9.99,
    emoji: "🍔",
    category: "Burgers",
    restaurantId: "burger-hub",
  },
  {
    id: "bh-2",
    name: "Cheese Burger",
    description: "Double cheddar, special sauce",
    price: 11.99,
    emoji: "🍔",
    category: "Burgers",
    restaurantId: "burger-hub",
  },
  {
    id: "bh-3",
    name: "Bacon Burger",
    description: "Crispy bacon, caramelized onions",
    price: 13.99,
    emoji: "🍔",
    category: "Burgers",
    restaurantId: "burger-hub",
  },
  {
    id: "bh-4",
    name: "Veggie Burger",
    description: "Plant-based patty, avocado, sprouts",
    price: 10.99,
    emoji: "🍔",
    category: "Burgers",
    restaurantId: "burger-hub",
  },
  // Sushi World
  {
    id: "sw-1",
    name: "California Roll",
    description: "Crab, avocado, cucumber",
    price: 13.99,
    emoji: "🍣",
    category: "Sushi",
    restaurantId: "sushi-world",
  },
  {
    id: "sw-2",
    name: "Dragon Roll",
    description: "Shrimp tempura, avocado, eel sauce",
    price: 16.99,
    emoji: "🍣",
    category: "Sushi",
    restaurantId: "sushi-world",
  },
  {
    id: "sw-3",
    name: "Salmon Sashimi",
    description: "8 pieces of fresh Atlantic salmon",
    price: 18.99,
    emoji: "🍣",
    category: "Sushi",
    restaurantId: "sushi-world",
  },
  {
    id: "sw-4",
    name: "Miso Soup",
    description: "Traditional dashi, tofu, wakame",
    price: 4.99,
    emoji: "🍜",
    category: "Sushi",
    restaurantId: "sushi-world",
  },
  // Salad Garden
  {
    id: "sg-1",
    name: "Caesar Salad",
    description: "Romaine, parmesan, croutons, caesar dressing",
    price: 8.99,
    emoji: "🥗",
    category: "Salads",
    restaurantId: "salad-garden",
  },
  {
    id: "sg-2",
    name: "Greek Salad",
    description: "Feta, olives, cucumber, red onion",
    price: 9.99,
    emoji: "🥗",
    category: "Salads",
    restaurantId: "salad-garden",
  },
  {
    id: "sg-3",
    name: "Quinoa Bowl",
    description: "Quinoa, roasted veggies, tahini dressing",
    price: 11.99,
    emoji: "🥙",
    category: "Salads",
    restaurantId: "salad-garden",
  },
  {
    id: "sg-4",
    name: "Avocado Toast",
    description: "Sourdough, smashed avocado, poached egg",
    price: 10.99,
    emoji: "🥑",
    category: "Salads",
    restaurantId: "salad-garden",
  },
];

export const categories = [
  { name: "Pizza", emoji: "🍕", color: "bg-red-50" },
  { name: "Burgers", emoji: "🍔", color: "bg-amber-50" },
  { name: "Sushi", emoji: "🍣", color: "bg-blue-50" },
  { name: "Salads", emoji: "🥗", color: "bg-green-50" },
  { name: "Thai", emoji: "🍜", color: "bg-yellow-50" },
  { name: "Chinese", emoji: "🥡", color: "bg-orange-50" },
];

export const sampleOrders = [
  {
    id: "#ORD-1042",
    restaurant: "Pizza Palace",
    items: "Margherita x1, Pepperoni x1",
    total: "$27.98",
    status: "Delivered",
  },
  {
    id: "#ORD-1038",
    restaurant: "Burger Hub",
    items: "Cheese Burger x2",
    total: "$23.98",
    status: "Preparing",
  },
  {
    id: "#ORD-1031",
    restaurant: "Sushi World",
    items: "Dragon Roll x1",
    total: "$16.99",
    status: "Delivered",
  },
];
