import { Button } from "@/components/ui/button";
import { Lightbulb, Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const nav = useNavigate()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-background" />
            </div>
            <span className="text-xl font-bold text-foreground">AI Learn</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-foreground text-white hover:text-primary transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Pricing
            </a>
            <a href="#about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              About
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" onClick={() => {nav("/login")}}>Sign In</Button>
            <Button variant="hero" onClick={() => {nav("/signup")}}>Get Started</Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 border-t border-border pt-4">
            <a href="#features" className="block text-sm font-medium text-foreground hover:text-primary transition-colors ">
              Features
            </a>
            <a href="#how-it-works" className="block text-sm font-medium text-foreground hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="block text-sm font-medium text-foreground hover:text-primary transition-colors">
              Pricing
            </a>
            <a href="#about" className="block text-sm font-medium text-foreground hover:text-primary transition-colors">
              About
            </a>
            <div className="flex flex-col gap-2 pt-4">
              <Button variant="ghost" className="w-full" onClick={() => {nav("/login")}}>Sign In</Button>
              <Button variant="hero" className="w-full" onClick={() => {nav("/signup")}}>Get Started</Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
