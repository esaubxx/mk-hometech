import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/integrations';
import Cart from '@/components/Cart';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { itemCount, actions } = useCart();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Shop', path: '/products' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-[100rem] mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <span className="text-sm font-paragraph text-foreground">Mokutu</span>
              <span className="text-sm font-paragraph font-bold text-primary">HomeTech</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-paragraph text-sm transition-colors ${
                    isActive(link.path)
                      ? 'text-foreground font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Section: Cart & Contact Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={actions.toggleCart}
                className="relative p-2 hover:bg-secondary rounded transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-5 h-5 text-foreground" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              <Link to="/contact">
                <Button className="hidden md:inline-flex bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-paragraph font-semibold px-6 py-2 h-auto">
                  Contact Us
                </Button>
              </Link>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 hover:bg-secondary rounded transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-foreground" />
                ) : (
                  <Menu className="w-6 h-6 text-foreground" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`font-paragraph text-sm transition-colors ${
                      isActive(link.path)
                        ? 'text-foreground font-semibold'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-paragraph font-semibold mt-2">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>
      <Cart />
    </>
  );
}
