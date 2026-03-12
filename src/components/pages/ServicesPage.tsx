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

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
            {isLoading ? (
              <div className="col-span-full flex justify-center items-center py-20">
                <LoadingSpinner />
              </div>
            ) : services.length > 0 ? (
              services.map((service, index) => {
                const IconComponent = serviceIcons[index % serviceIcons.length];
                return (
                  <AnimatedElement key={service._id} delay={index * 100}>
                    <div className="bg-background border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex flex-col h-full">
                      {service.serviceImage && (
                        <div className="relative h-56 bg-secondary/50">
                          <Image
                            src={service.serviceImage}
                            alt={service.serviceTitle || 'Service'}
                            className="w-full h-full object-cover"
                            width={400}
                          />
                        </div>
                      )}
                      <div className="p-6 flex flex-col flex-1">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-2xl font-heading font-bold text-foreground mb-3">
                          {service.serviceTitle}
                        </h3>
                        <p className="text-muted-foreground font-paragraph mb-4 flex-1">
                          {service.shortDescription}
                        </p>
                        <Link 
                          to={`/services/${service._id}`}
                          className="inline-flex items-center gap-2 text-primary font-semibold hover:underline group"
                        >
                          View Details
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </AnimatedElement>
                );
              })
            ) : (
              <div className="col-span-full text-center py-20">
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
