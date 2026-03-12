import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { SmartHomeProducts } from '@/entities';
import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AnimatedElement: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('is-visible');
        observer.unobserve(el);
      }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
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

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<SmartHomeProducts | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addingItemId, actions } = useCart();
  const { currency } = useCurrency();

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await BaseCrudService.getById<SmartHomeProducts>('smarthomeproducts', id!);
      setProduct(data);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (product) {
      await actions.addToCart({
        collectionId: 'smarthomeproducts',
        itemId: product._id,
        quantity: 1
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12 min-h-[600px]">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner />
          </div>
        ) : !product ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Product Not Found</h2>
            <Button onClick={() => navigate('/products')} className="bg-primary text-primary-foreground">
              Back to Products
            </Button>
          </div>
        ) : (
          <>
            <AnimatedElement>
              <Button
                onClick={() => navigate('/products')}
                variant="outline"
                className="mb-8 hover:scale-[1.02] transition-transform"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Button>
            </AnimatedElement>

            <div className="grid lg:grid-cols-2 gap-12">
              <AnimatedElement>
                {product.itemImage && (
                  <div className="relative rounded-2xl overflow-hidden shadow-xl bg-secondary/50">
                    <Image
                      src={product.itemImage}
                      alt={product.itemName || 'Product'}
                      className="w-full h-auto"
                      width={600}
                    />
                  </div>
                )}
              </AnimatedElement>

              <AnimatedElement className="space-y-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                    {product.itemName}
                  </h1>
                  <p className="text-4xl font-bold text-primary mb-6">
                    {formatPrice(product.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                  </p>
                </div>

                {product.itemDescription && (
                  <div className="bg-secondary/30 rounded-xl p-6">
                    <h2 className="text-xl font-heading font-bold text-foreground mb-3">
                      Description
                    </h2>
                    <p className="text-muted-foreground font-paragraph whitespace-pre-line">
                      {product.itemDescription}
                    </p>
                  </div>
                )}

                {product.technicalSpecifications && (
                  <div className="bg-gradient-to-br from-primary/5 to-background rounded-xl p-6">
                    <h2 className="text-xl font-heading font-bold text-foreground mb-3">
                      Technical Specifications
                    </h2>
                    <p className="text-muted-foreground font-paragraph whitespace-pre-line">
                      {product.technicalSpecifications}
                    </p>
                  </div>
                )}

                <div className="space-y-4 pt-4">
                  <Button
                    onClick={handleAddToCart}
                    disabled={addingItemId === product._id}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg font-semibold hover:scale-[1.02] transition-transform"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {addingItemId === product._id ? 'Adding to Cart...' : 'Add to Cart'}
                  </Button>

                  <Button
                    onClick={() => navigate('/contact')}
                    variant="outline"
                    className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground py-6 text-lg font-semibold hover:scale-[1.02] transition-transform"
                  >
                    Request Installation
                  </Button>
                </div>
              </AnimatedElement>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
