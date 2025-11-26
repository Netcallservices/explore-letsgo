import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useParallax } from "@/hooks/use-parallax";

const About = () => {
  const parallaxOffset = useParallax(0.3);
  const highlights = [
    "Over 10 years of travel expertise",
    "500,000+ happy travelers",
    "200+ destinations worldwide",
    "Award-winning customer service",
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="py-20 pt-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Why Choose Let's Go?
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                We're passionate about creating unforgettable travel experiences. Our expert team
                carefully curates every journey to ensure you discover the authentic beauty and
                culture of each destination.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                From adventure seekers to luxury travelers, we have the perfect trip for everyone.
                Let us handle the details while you create memories that last a lifetime.
              </p>
              <ul className="space-y-4 mb-8">
                {highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="text-lg">{highlight}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg">Learn More About Us</Button>
            </div>
            <div className="relative animate-scale-in mt-8 lg:mt-0">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=500&fit=crop"
                  alt="Travel adventure"
                  className="rounded-2xl w-full h-48 md:h-64 object-cover"
                  style={{ transform: `translateY(${parallaxOffset * 0.8}px)` }}
                />
                <img
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=500&fit=crop"
                  alt="Beautiful destination"
                  className="rounded-2xl w-full h-48 md:h-64 object-cover mt-8"
                  style={{ transform: `translateY(${-parallaxOffset * 0.6}px)` }}
                />
              </div>
              <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 bg-primary text-primary-foreground p-6 md:p-8 rounded-2xl shadow-xl">
                <p className="text-3xl md:text-4xl font-bold mb-2">10+</p>
                <p className="text-xs md:text-sm">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
