import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { SITE_IMAGES } from '@/config/images';
import { Shield, Award, Users, Target, CheckCircle, Zap } from 'lucide-react';
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

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-background py-20 md:py-24">
        <div className="container mx-auto px-4">
          <AnimatedElement className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
              About Mokutu HomeTech
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-paragraph">
              Your trusted partner in smart home technology and professional installation services
            </p>
          </AnimatedElement>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedElement>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Who We Are
              </h2>
              <p className="text-lg text-muted-foreground font-paragraph mb-6">
                Mokutu HomeTech is a leading provider of smart home solutions and professional installation services. Based in Johannesburg, South Africa, we specialize in bringing cutting-edge home automation technology to residential and commercial properties.
              </p>
              <p className="text-lg text-muted-foreground font-paragraph mb-6">
                Our team of certified technicians has years of experience in smart home installation, network optimization, and system integration. We're committed to delivering exceptional service and helping our clients transform their living spaces.
              </p>
              <p className="text-lg text-muted-foreground font-paragraph">
                From initial consultation to post-installation support, we're dedicated to ensuring your smart home experience is seamless and enjoyable.
              </p>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl h-96">
                <Image
                  src={SITE_IMAGES.about.team}
                  alt={SITE_IMAGES.about.teamAlt}
                  className="w-full h-full object-cover"
                />
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/30 to-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedElement>
              <div className="relative rounded-2xl overflow-hidden shadow-xl h-96">
                <Image
                  src={SITE_IMAGES.about.office}
                  alt={SITE_IMAGES.about.officeAlt}
                  className="w-full h-full object-cover"
                />
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground font-paragraph mb-6">
                At Mokutu HomeTech, we believe that every home deserves to be smart, secure, and connected. Our mission is to make advanced home technology accessible and easy to use for everyone.
              </p>
              <p className="text-lg text-muted-foreground font-paragraph mb-6">
                We specialize in professional installation and configuration of smart home devices, ensuring that your technology works seamlessly together to enhance your daily life.
              </p>
              <p className="text-lg text-muted-foreground font-paragraph">
                With years of experience and a commitment to excellence, we transform houses into intelligent homes that are more comfortable, secure, and energy-efficient.
              </p>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Our Expertise Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedElement className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Our Expertise
            </h2>
            <p className="text-lg text-muted-foreground font-paragraph max-w-2xl mx-auto">
              Comprehensive smart home solutions backed by years of experience
            </p>
          </AnimatedElement>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              'Smart Home System Integration',
              'Network Infrastructure & WiFi Optimization',
              'Security Camera Installation & Monitoring',
              'Smart Lighting & Climate Control',
              'Voice Assistant Setup & Configuration',
              'Home Automation Programming',
              'Device Troubleshooting & Support',
              'Energy Management Solutions'
            ].map((expertise, index) => (
              <AnimatedElement key={index} delay={index * 50}>
                <div className="flex items-center gap-3 bg-secondary/30 rounded-xl p-4 hover:bg-secondary/50 transition-colors">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-foreground font-paragraph font-semibold">
                    {expertise}
                  </span>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Why Customers Trust Us Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/30 to-background">
        <div className="container mx-auto px-4">
          <AnimatedElement className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Why Customers Trust Us
            </h2>
            <p className="text-lg text-muted-foreground font-paragraph max-w-2xl mx-auto">
              We are built on a foundation of reliability, expertise, and customer satisfaction
            </p>
          </AnimatedElement>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: 'Reliable Service',
                description: 'We stand by our work with comprehensive warranties and ongoing support.'
              },
              {
                icon: Award,
                title: 'Modern Solutions',
                description: 'We stay current with the latest smart home technology and best practices.'
              },
              {
                icon: Users,
                title: 'Customer-Focused',
                description: 'Your satisfaction is our priority. We listen and deliver personalized solutions.'
              },
              {
                icon: Zap,
                title: 'Certified Expertise',
                description: 'Our technicians are certified and trained in the latest smart home systems.'
              }
            ].map((item, index) => (
              <AnimatedElement key={index} delay={index * 100}>
                <div className="bg-background rounded-2xl p-8 shadow-md hover:shadow-lg transition-all duration-300 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground font-paragraph text-sm">
                    {item.description}
                  </p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <AnimatedElement className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Ready to Transform Your Home?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Let our experts help you create the smart home of your dreams. Contact us today for a consultation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                onClick={() => navigate('/contact')}
                className="bg-background text-primary hover:bg-background/90 px-8 py-6 text-lg font-semibold hover:scale-[1.02] transition-transform"
              >
                Get Started
              </Button>
              <Button
                onClick={() => navigate('/services')}
                variant="outline"
                className="border-2 border-background text-background hover:bg-background hover:text-primary px-8 py-6 text-lg font-semibold hover:scale-[1.02] transition-transform"
              >
                View Services
              </Button>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
