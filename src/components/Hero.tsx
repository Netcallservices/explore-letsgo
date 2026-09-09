import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-beach.jpg";
import { useParallax } from "@/hooks/use-parallax";

const Hero = () => {
  const parallaxOffset = useParallax(0.5);
  
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Beautiful travel destination"
          className="w-full h-full object-cover"
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/50" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 animate-fade-up">
            Best Tour Operator in
            <span className="block text-primary">Berhampore</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-12 animate-fade-up">
            Your trusted travel agency in Berhampore, Murshidabad. Explore breathtaking destinations and create unforgettable memories with Let's Go.
          </p>

          {/* Search Box */}
          <div className="bg-card/95 backdrop-blur-sm p-4 md:p-6 rounded-2xl shadow-2xl animate-scale-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <div className="flex items-center gap-3 bg-background rounded-lg px-4 py-3">
                <MapPin className="h-5 w-5 text-primary" />
                <Input
                  placeholder="Where to?"
                  className="border-0 bg-transparent focus-visible:ring-0 p-0"
                />
              </div>
              <div className="flex items-center gap-3 bg-background rounded-lg px-4 py-3">
                <Calendar className="h-5 w-5 text-primary" />
                <Input
                  type="date"
                  className="border-0 bg-transparent focus-visible:ring-0 p-0"
                />
              </div>
              <div className="flex items-center gap-3 bg-background rounded-lg px-4 py-3">
                <Users className="h-5 w-5 text-primary" />
                <Input
                  type="number"
                  placeholder="Guests"
                  min="1"
                  className="border-0 bg-transparent focus-visible:ring-0 p-0"
                />
              </div>
              <Button size="lg" className="w-full gap-2">
                <Search className="h-5 w-5" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-float" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
