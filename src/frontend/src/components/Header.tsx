import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  LogOut,
  Menu,
  ShoppingCart,
  User,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function Header() {
  const { totalItems } = useCart();
  const { login, clear, loginStatus, identity, isInitializing } =
    useInternetIdentity();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoggedIn = loginStatus === "success" && !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  const principalShort = identity
    ? `${identity.getPrincipal().toString().slice(0, 8)}...`
    : "";

  const navLinks = [
    { label: "Home", to: "/" as const },
    { label: "Restaurants", to: "/menu" as const },
    { label: "Menu", to: "/menu" as const },
    { label: "About", to: "/about" as const },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border shadow-xs">
      <div className="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0"
          data-ocid="nav.link"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
            <UtensilsCrossed className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">FlavorGo</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              data-ocid="nav.link"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {!isInitializing &&
            (isLoggedIn ? (
              <div className="hidden md:flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{principalShort}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clear}
                  className="gap-1.5"
                  data-ocid="nav.logout.button"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                onClick={login}
                disabled={isLoggingIn}
                className="hidden md:flex gap-1.5 bg-primary text-primary-foreground hover:opacity-90"
                data-ocid="nav.login.button"
              >
                <User className="w-3.5 h-3.5" />
                {isLoggingIn ? "Signing in..." : "Login"}
              </Button>
            ))}

          {/* Cart */}
          <Button
            variant="outline"
            size="sm"
            className="relative gap-1.5"
            onClick={() => navigate({ to: "/cart" })}
            data-ocid="nav.cart.button"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground">
                {totalItems}
              </Badge>
            )}
          </Button>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-ocid="nav.mobile.toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white px-4 py-3 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm font-medium text-muted-foreground hover:text-primary py-1"
              onClick={() => setMobileOpen(false)}
              data-ocid="nav.link"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-border">
            {isLoggedIn ? (
              <Button
                variant="outline"
                size="sm"
                onClick={clear}
                className="w-full gap-1.5"
                data-ocid="nav.logout.button"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={login}
                className="w-full bg-primary text-primary-foreground"
                data-ocid="nav.login.button"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
