import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Instagram,
  Mail,
  Twitter,
  UtensilsCrossed,
} from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer className="bg-foreground text-white mt-16">
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <UtensilsCrossed className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">FlavorGo</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Delicious food from top local restaurants delivered to your door.
            </p>
            <div className="flex gap-3 mt-4">
              <span
                className="text-white/60 hover:text-white transition-colors cursor-pointer"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </span>
              <span
                className="text-white/60 hover:text-white transition-colors cursor-pointer"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </span>
              <span
                className="text-white/60 hover:text-white transition-colors cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </span>
            </div>
          </div>

          {/* Links col 1 */}
          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-white/80">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Careers
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Blog
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Press
                </span>
              </li>
            </ul>
          </div>

          {/* Links col 2 */}
          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-white/80">
              Support
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Help Center
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Contact Us
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-white/80">
              Newsletter
            </h4>
            <p className="text-sm text-white/60 mb-3">
              Get exclusive deals and updates.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="your@email.com"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 text-sm"
                data-ocid="footer.input"
              />
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:opacity-90 shrink-0"
              >
                <Mail className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="bg-white/10 rounded px-3 py-1.5 text-xs text-white/70 flex items-center gap-1">
                🍎 App Store
              </div>
              <div className="bg-white/10 rounded px-3 py-1.5 text-xs text-white/70 flex items-center gap-1">
                ▶ Google Play
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {year}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/70 underline transition-colors"
          >
            caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
