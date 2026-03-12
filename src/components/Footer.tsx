import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">Mokutu HomeTech</h3>
            <p className="text-background/80 text-sm mb-4">
              Professional smart home installation and technology solutions for modern living.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-background/80 hover:text-primary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-background/80 hover:text-primary transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-background/80 hover:text-primary transition-colors text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-background/80 hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-background/80 hover:text-primary transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li className="text-background/80 text-sm">Smart Home Installation</li>
              <li className="text-background/80 text-sm">WiFi Setup & Optimization</li>
              <li className="text-background/80 text-sm">Security Camera Installation</li>
              <li className="text-background/80 text-sm">Smart Lighting Systems</li>
              <li className="text-background/80 text-sm">Device Configuration</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-background/80 text-sm">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>info@mokutuhometech.com</span>
              </li>
              <li className="flex items-start gap-2 text-background/80 text-sm">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>+27 (0) 11 123 4567</span>
              </li>
              <li className="flex items-start gap-2 text-background/80 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Johannesburg, South Africa</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-background/80 text-sm">
            © {currentYear} Mokutu HomeTech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
