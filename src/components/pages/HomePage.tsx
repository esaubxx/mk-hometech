// WI-HPI
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { SmartHomeServices, SmartHomeProducts } from '@/entities';
import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { 
  Home, 
  Wifi, 
  Camera, 
  Lightbulb, 
  Settings, 
  CheckCircle, 
  Shield, 
  Award, 
  DollarSign,
  ArrowRight,
  Smartphone
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Robust Animated Element for scroll reveals
const AnimatedElement: React.FC<{
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
}> = ({ children, className = '', delay = 0, direction = 'up' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setIsVisible(true), delay);
        observer.unobserve(el);
      }
    }, { threshold: 0.1, rootMargin: '50px' });
    
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const getTransform = () => {
    if (isVisible) return 'translate(0, 0) scale(1)';
    switch (direction) {
      case 'up': return 'translateY(30px) scale(0.98)';
      case 'left': return 'translateX(-30px) scale(0.98)';
      case 'right': return 'translateX(30px) scale(0.98)';
      default: return 'translate(0, 0) scale(0.98)';
    }
  };

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
};

export default function HomePage() {
  const navigate = useNavigate();
  const [services, setServices] = useState<SmartHomeServices[]>([]);
  const [products, setProducts] = useState<SmartHomeProducts[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const { addingItemId, actions } = useCart();
  const { currency } = useCurrency();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const result = await BaseCrudService.getAll<SmartHomeServices>('smarthomeservices', {}, { limit: 5 });
        setServices(result.items || []);
      } catch (error) {
        console.error('Error loading services:', error);
      } finally {
        setIsLoadingServices(false);
      }
    };

    const fetchProducts = async () => {
      try {
        const result = await BaseCrudService.getAll<SmartHomeProducts>('smarthomeproducts', {}, { limit: 5 });
        setProducts(result.items || []);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchServices();
    fetchProducts();
  }, []);

  const handleAddToCart = async (product: SmartHomeProducts, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await actions.addToCart({
      collectionId: 'smarthomeproducts',
      itemId: product._id,
      quantity: 1
    });
  };

  // Map icons to services based on index for visual variety
  const getServiceIcon = (index: number) => {
    const icons = [Home, Wifi, Camera, Lightbulb, Smartphone, Settings];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className="w-6 h-6 text-primary" />;
  };

  const features = [
    {
      icon: CheckCircle,
      title: 'Professional Installation',
      description: 'Our certified technicians ensure every device is installed correctly and configured for optimal performance.'
    },
    {
      icon: Shield,
      title: 'Reliable Connectivity',
      description: 'We optimize your network infrastructure to ensure stable connections for all your smart devices.'
    },
    {
      icon: Award,
      title: 'Smart Home Expertise',
      description: 'Years of experience with the latest smart home technology and integration solutions.'
    },
    {
      icon: DollarSign,
      title: 'Affordable Upgrades',
      description: 'Quality smart home solutions at competitive prices with flexible payment options available.'
    }
  ];

  return (
    <div className="min-h-screen bg-background font-paragraph text-foreground selection:bg-primary/20 selection:text-primary">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pt-32 md:pb-32 overflow-hidden bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedElement direction="right" className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.1] tracking-tight mb-6">
                Smart Technology for Modern Homes
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed max-w-lg">
                Mokutu HomeTech helps homeowners upgrade their living spaces with smart devices, better connectivity, and modern security solutions.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <Button 
                  onClick={() => navigate('/contact')}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 h-auto text-base font-medium rounded-md shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
                >
                  Book Installation
                </Button>
                <button 
                  onClick={() => navigate('/services')}
                  className="text-foreground font-medium hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  Explore Services
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </AnimatedElement>

            <AnimatedElement direction="left" delay={200} className="relative lg:ml-auto w-full max-w-lg lg:max-w-none">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-square group">
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-overlay"></div>
                <Image
                  src="https://static.wixstatic.com/media/7ab59d_cadb6df63e42419f8a8d4a348e9c7031~mv2.jpg"
                  alt="Modern smart home interior with automated lighting and WiFi connectivity"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-secondary rounded-full -z-10 blur-2xl opacity-60"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 rounded-full -z-10 blur-3xl opacity-60"></div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-[#F9FAFB]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <AnimatedElement className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Our Smart Home Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Professional installation and setup services to transform your home into a connected smart living space.
            </p>
          </AnimatedElement>

          <div className="relative min-h-[300px]">
            {isLoadingServices && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <LoadingSpinner className="w-8 h-8 text-primary" />
              </div>
            )}
            
            <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-500 ${isLoadingServices ? 'opacity-0' : 'opacity-100'}`}>
              {services.map((service, index) => (
                <AnimatedElement key={service._id} delay={index * 100}>
                  <Link 
                    to={`/services/${service._id}`}
                    className="block h-full bg-background rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-transparent hover:border-primary/10"
                  >
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                      {getServiceIcon(index)}
                    </div>
                    <h3 className="text-xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {service.serviceTitle}
                    </h3>
                    <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                      {service.shortDescription}
                    </p>
                    <div className="text-primary font-medium flex items-center gap-2 mt-auto">
                      <span className="relative overflow-hidden">
                        <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">Learn More</span>
                        <span className="absolute top-0 left-0 inline-block transition-transform duration-300 translate-y-full group-hover:translate-y-0">Learn More</span>
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </AnimatedElement>
              ))}
            </div>
            
            {!isLoadingServices && services.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No services available at the moment.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <AnimatedElement className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Popular HomeTech Products
            </h2>
            <p className="text-lg text-muted-foreground">
              Quality smart home devices hand-picked by our experts for reliability and performance.
            </p>
          </AnimatedElement>

          <div className="relative min-h-[400px]">
            {isLoadingProducts && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <LoadingSpinner className="w-8 h-8 text-primary" />
              </div>
            )}

            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 transition-opacity duration-500 ${isLoadingProducts ? 'opacity-0' : 'opacity-100'}`}>
              {products.map((product, index) => (
                <AnimatedElement key={product._id} delay={index * 100}>
                  <div className="group flex flex-col h-full cursor-pointer" onClick={() => navigate(`/products/${product._id}`)}>
                    <div className="bg-[#F5F5F5] rounded-lg p-6 flex items-center justify-center aspect-square mb-5 overflow-hidden relative">
                      {product.itemImage ? (
                        <Image
                          src={product.itemImage}
                          alt={product.itemName || 'Product'}
                          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <Settings className="w-12 h-12 opacity-20" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="flex flex-col flex-1 px-1">
                      <h3 className="text-base font-heading font-bold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                        {product.itemName}
                      </h3>
                      <p className="text-sm font-bold text-foreground mb-4">
                        {formatPrice(product.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                      </p>
                      <Button
                        onClick={(e) => handleAddToCart(product, e)}
                        disabled={addingItemId === product._id}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-auto rounded-md py-5 h-auto font-medium transition-all active:scale-95"
                      >
                        {addingItemId === product._id ? (
                          <span className="flex items-center gap-2">
                            <LoadingSpinner className="w-4 h-4" /> Adding...
                          </span>
                        ) : 'Add to Cart'}
                      </Button>
                    </div>
                  </div>
                </AnimatedElement>
              ))}
            </div>

            {!isLoadingProducts && products.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No products available at the moment.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-[#F9FAFB] border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <AnimatedElement className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Why Choose Mokutu HomeTech
            </h2>
            <p className="text-lg text-muted-foreground">
              We bring expertise, reliability, and customer-focused service to every installation.
            </p>
          </AnimatedElement>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {features.map((feature, index) => (
              <AnimatedElement key={index} delay={index * 100} direction="up">
                <div className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <feature.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[150%] bg-white/5 rotate-12 transform origin-center"></div>
          <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[150%] bg-black/5 -rotate-12 transform origin-center"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
          <AnimatedElement className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-6 leading-tight">
              Upgrade Your Home With Smart Technology
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto font-light">
              Transform your living space into an intelligent, connected environment. Get started today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Button
                onClick={() => navigate('/contact')}
                className="w-full sm:w-auto bg-background text-primary hover:bg-background/90 px-8 py-6 h-auto text-base font-semibold rounded-md shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                Book Installation
              </Button>
              <Button
                onClick={() => navigate('/contact')}
                variant="outline"
                className="w-full sm:w-auto border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground px-8 py-6 h-auto text-base font-semibold rounded-md transition-all"
              >
                Contact Us
              </Button>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}