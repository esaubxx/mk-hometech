import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { SmartHomeServices } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Home, Wifi, Camera, Lightbulb, Settings, ArrowRight } from 'lucide-react';
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

export default function ServicesPage() {
  const [services, setServices] = useState<SmartHomeServices[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const result = await BaseCrudService.getAll<SmartHomeServices>('smarthomeservices');
      setServices(result.items);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const serviceIcons = [Home, Wifi, Camera, Lightbulb, Settings];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-background py-20 md:py-24">
        <div className="container mx-auto px-4">
          <AnimatedElement className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
              Our Smart Home Services
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-paragraph">
              Professional installation and setup services to transform your home into a connected smart living space.
            </p>
          </AnimatedElement>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-16 min-h-[400px]">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <LoadingSpinner />
              </div>
            ) : services.length > 0 ? (
              services.map((service, index) => {
                const IconComponent = serviceIcons[index % serviceIcons.length];
                const isEven = index % 2 === 0;
                
                return (
                  <AnimatedElement key={service._id} delay={index * 100}>
                    <div className={`grid md:grid-cols-2 gap-12 items-center ${!isEven ? 'md:grid-flow-dense' : ''}`}>
                      <div className={isEven ? 'md:order-1' : 'md:order-2'}>
                        <h3 className="text-3xl font-heading font-bold text-foreground mb-4">
                          {service.serviceTitle}
                        </h3>
                        <p className="text-lg text-muted-foreground font-paragraph mb-6">
                          {service.shortDescription}
                        </p>
                        
                        {service.installationProcess && (
                          <div className="mb-6">
                            <h4 className="font-heading font-bold text-foreground mb-3">Installation Process:</h4>
                            <p className="text-muted-foreground font-paragraph">
                              {service.installationProcess}
                            </p>
                          </div>
                        )}
                        
                        {service.keyBenefits && (
                          <div className="mb-6">
                            <h4 className="font-heading font-bold text-foreground mb-3">Key Benefits:</h4>
                            <p className="text-muted-foreground font-paragraph">
                              {service.keyBenefits}
                            </p>
                          </div>
                        )}
                        
                        <Link 
                          to={`/services/${service._id}`}
                          className="inline-flex items-center gap-2 text-primary font-semibold hover:underline group"
                        >
                          View Details
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                      
                      <div className={isEven ? 'md:order-2' : 'md:order-1'}>
                        {service.image && (
                          <div className="relative h-56 bg-secondary/50">
                            <Image
                              src={service.image}
                              alt={service.serviceTitle || 'Service'}
                              className="w-full h-full object-contain"
                              width={300}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </AnimatedElement>
                );
              })
            ) : (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">No services available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/30 to-background">
        <div className="container mx-auto px-4">
          <AnimatedElement className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Professional Installation Benefits
            </h2>
            <p className="text-lg text-muted-foreground font-paragraph max-w-2xl mx-auto">
              Why choose professional installation for your smart home devices
            </p>
          </AnimatedElement>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Expert Configuration',
                description: 'Our technicians ensure all devices are properly configured and optimized for your home network.'
              },
              {
                title: 'Seamless Integration',
                description: 'We integrate all your smart devices to work together harmoniously in one ecosystem.'
              },
              {
                title: 'Ongoing Support',
                description: 'Get continued support and assistance with your smart home setup whenever you need it.'
              }
            ].map((benefit, index) => (
              <AnimatedElement key={index} delay={index * 100}>
                <div className="bg-background rounded-2xl p-8 shadow-md hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground font-paragraph">
                    {benefit.description}
                  </p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
