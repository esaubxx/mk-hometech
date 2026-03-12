import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { SmartHomeProducts } from '@/entities';
import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AnimatedElement: React.FC<{children: React.ReactNode; className?: string; delay?: number}> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          el.classList.add('is-visible');
        }, delay);
        observer.unobserve(el);
      }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return (
    <div 
      ref={ref} 
      className={`${className || ''} opacity-0 translate-y-8 transition-all duration-700 ease-out`}
      style={{
        opacity: 0,
        transform: 'translateY(2rem)'
      }}
    >
      {children}
      <style>{`
        .is-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
};

export default function ProductsPage() {
  const [products, setProducts] = useState<SmartHomeProducts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addingItemId, actions } = useCart();
  const { currency } = useCurrency();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const result = await BaseCrudService.getAll<SmartHomeProducts>('smarthomeproducts');
      setProducts(result.items);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async (product: SmartHomeProducts) => {
    await actions.addToCart({
      collectionId: 'smarthomeproducts',
      itemId: product._id,
      quantity: 1
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-background py-20 md:py-24">
        <div className="container mx-auto px-4">
          <AnimatedElement className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
              Smart Home Products
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-paragraph">
              Quality smart home devices hand-picked by our experts for reliability and performance.
            </p>
          </AnimatedElement>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[400px]">
            {isLoading ? (
              <div className="col-span-full flex justify-center items-center py-20">
                <LoadingSpinner />
              </div>
            ) : products.length > 0 ? (
              products.map((product, index) => (
                <AnimatedElement key={product._id} delay={index * 50}>
                  <div className="bg-background border border-border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex flex-col h-full">
                    <Link to={`/products/${product._id}`}>
                      {product.itemImage && (
                        <div className="relative h-56 bg-secondary/50">
                          <Image
                            src={product.itemImage}
                            alt={product.itemName || 'Product'}
                            className="w-full h-full object-contain"
                            width={300}
                          />
                        </div>
                      )}
                    </Link>
                    <div className="p-6 flex flex-col flex-1">
                      <Link to={`/products/${product._id}`}>
                        <h3 className="text-lg font-heading font-bold text-foreground mb-2 hover:text-primary transition-colors">
                          {product.itemName}
                        </h3>
                      </Link>
                      {product.itemDescription && (
                        <p className="text-sm text-muted-foreground font-paragraph mb-4 line-clamp-2 flex-1">
                          {product.itemDescription}
                        </p>
                      )}
                      <div className="mt-auto">
                        <p className="text-xl font-bold text-foreground mb-4">
                          {formatPrice(product.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                        </p>
                        <Button
                          onClick={() => handleAddToCart(product)}
                          disabled={addingItemId === product._id}
                          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          {addingItemId === product._id ? 'Adding...' : 'Add to Cart'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </AnimatedElement>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-lg text-muted-foreground">No products available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/30 to-background">
        <div className="container mx-auto px-4">
          <AnimatedElement className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
              Professional Installation Available
            </h2>
            <p className="text-lg text-muted-foreground font-paragraph mb-8">
              All products come with optional professional installation services. Our certified technicians ensure proper setup and configuration.
            </p>
            <Button
              onClick={() => window.location.href = '/contact'}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold hover:scale-[1.02] transition-transform"
            >
              Schedule Installation
            </Button>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
