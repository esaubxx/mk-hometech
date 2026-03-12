import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { SmartHomeServices } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle } from 'lucide-react';
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

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<SmartHomeServices | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadService();
    }
  }, [id]);

  const loadService = async () => {
    try {
      const data = await BaseCrudService.getById<SmartHomeServices>('smarthomeservices', id!);
      setService(data);
    } catch (error) {
      console.error('Error loading service:', error);
    } finally {
      setIsLoading(false);
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
        ) : !service ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Service Not Found</h2>
            <Button onClick={() => navigate('/services')} className="bg-primary text-primary-foreground">
              Back to Services
            </Button>
          </div>
        ) : (
          <>
            <AnimatedElement>
              <Button
                onClick={() => navigate('/services')}
                variant="outline"
                className="mb-8 hover:scale-[1.02] transition-transform"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Services
              </Button>
            </AnimatedElement>

            <div className="grid lg:grid-cols-2 gap-12 mb-12">
              <AnimatedElement>
                {service.serviceImage && (
                  <div className="relative rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={service.serviceImage}
                      alt={service.serviceTitle || 'Service'}
                      className="w-full h-auto"
                      width={600}
                    />
                  </div>
                )}
              </AnimatedElement>

              <AnimatedElement className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                  {service.serviceTitle}
                </h1>
                <p className="text-xl text-muted-foreground font-paragraph">
                  {service.shortDescription}
                </p>
                <Button
                  onClick={() => navigate('/contact')}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold hover:scale-[1.02] transition-transform"
                >
                  Book This Service
                </Button>
              </AnimatedElement>
            </div>

            {service.installationProcess && (
              <AnimatedElement className="mb-12">
                <div className="bg-secondary/30 rounded-2xl p-8">
                  <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
                    Installation Process
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-muted-foreground font-paragraph whitespace-pre-line">
                      {service.installationProcess}
                    </p>
                  </div>
                </div>
              </AnimatedElement>
            )}

            {service.keyBenefits && (
              <AnimatedElement>
                <div className="bg-gradient-to-br from-primary/5 to-background rounded-2xl p-8">
                  <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
                    Key Benefits
                  </h2>
                  <div className="space-y-4">
                    {service.keyBenefits.split('\n').filter(b => b.trim()).map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                        <p className="text-muted-foreground font-paragraph text-lg">
                          {benefit}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedElement>
            )}

            <AnimatedElement className="mt-12 text-center bg-primary text-primary-foreground rounded-2xl p-12">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Contact us today to schedule your professional installation
              </p>
              <Button
                onClick={() => navigate('/contact')}
                className="bg-background text-primary hover:bg-background/90 px-8 py-6 text-lg font-semibold hover:scale-[1.02] transition-transform"
              >
                Contact Us Now
              </Button>
            </AnimatedElement>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
