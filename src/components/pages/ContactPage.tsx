import { useState, useRef, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { ContactInquiries } from '@/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Image } from '@/components/ui/image';
import { SITE_IMAGES } from '@/config/images';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
    interest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await BaseCrudService.create<ContactInquiries>('contactinquiries', {
        _id: crypto.randomUUID(),
        fullName: formData.fullName,
        emailAddress: formData.emailAddress,
        phoneNumber: formData.phoneNumber,
        interest: formData.interest,
        message: formData.message
      });

      setSubmitSuccess(true);
      setFormData({
        fullName: '',
        emailAddress: '',
        phoneNumber: '',
        interest: '',
        message: ''
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-background py-20 md:py-24">
        <div className="container mx-auto px-4">
          <AnimatedElement className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
              Get In Touch
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-paragraph">
              Ready to upgrade your home with smart technology? Contact us today for a consultation or to schedule an installation.
            </p>
          </AnimatedElement>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <AnimatedElement>
              <div className="bg-secondary/30 rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
                  Send Us a Message
                </h2>

                {submitSuccess && (
                  <div className="bg-primary/10 border border-primary text-primary rounded-lg p-4 mb-6">
                    <p className="font-semibold">Thank you for your inquiry!</p>
                    <p className="text-sm">We&apos;ll get back to you as soon as possible.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="fullName" className="text-foreground font-semibold mb-2 block">
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <Label htmlFor="emailAddress" className="text-foreground font-semibold mb-2 block">
                      Email Address *
                    </Label>
                    <Input
                      id="emailAddress"
                      name="emailAddress"
                      type="email"
                      required
                      value={formData.emailAddress}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phoneNumber" className="text-foreground font-semibold mb-2 block">
                      Phone Number
                    </Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="+27 11 123 4567"
                    />
                  </div>

                  <div>
                    <Label htmlFor="interest" className="text-foreground font-semibold mb-2 block">
                      Service Interest
                    </Label>
                    <select
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select a service</option>
                      <option value="Smart Home Installation">Smart Home Installation</option>
                      <option value="WiFi Setup">WiFi Setup & Optimization</option>
                      <option value="Security Cameras">Security Camera Installation</option>
                      <option value="Smart Lighting">Smart Lighting Installation</option>
                      <option value="Device Configuration">Device Configuration</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-foreground font-semibold mb-2 block">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full min-h-[150px]"
                      placeholder="Tell us about your project or inquiry..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg font-semibold hover:scale-[1.02] transition-transform"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </AnimatedElement>

            {/* Contact Information with Image */}
            <AnimatedElement delay={200}>
              <div className="space-y-8">
                <div className="relative rounded-2xl overflow-hidden shadow-xl h-96 mb-8">
                  <Image
                    src={SITE_IMAGES.contact.banner}
                    alt={SITE_IMAGES.contact.bannerAlt}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
                    Contact Information
                  </h2>
                  <p className="text-lg text-muted-foreground font-paragraph mb-8">
                    Have questions? Reach out to us through any of these channels, and our team will be happy to assist you.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 bg-gradient-to-br from-primary/5 to-background rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-bold text-foreground mb-1">
                        Email
                      </h3>
                      <p className="text-muted-foreground font-paragraph">
                        info@mokutuhometech.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-gradient-to-br from-primary/5 to-background rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-bold text-foreground mb-1">
                        Phone
                      </h3>
                      <p className="text-muted-foreground font-paragraph">
                        +27 (0) 11 123 4567
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-gradient-to-br from-primary/5 to-background rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-bold text-foreground mb-1">
                        Location
                      </h3>
                      <p className="text-muted-foreground font-paragraph">
                        Johannesburg, South Africa
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-gradient-to-br from-primary/5 to-background rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-bold text-foreground mb-1">
                        Business Hours
                      </h3>
                      <p className="text-muted-foreground font-paragraph">
                        Monday - Friday: 8:00 AM - 6:00 PM<br />
                        Saturday: 9:00 AM - 2:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/30 to-background">
        <div className="container mx-auto px-4">
          <AnimatedElement className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground font-paragraph mb-8">
              Book a consultation today and let us help you create the smart home you&apos;ve always wanted.
            </p>
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold hover:scale-[1.02] transition-transform"
            >
              Schedule Consultation
            </Button>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
