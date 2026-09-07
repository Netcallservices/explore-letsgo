import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useParallax } from "@/hooks/use-parallax";
import greeceImage from "@/assets/destination-greece.jpg";
import baliImage from "@/assets/destination-bali.jpg";
import parisImage from "@/assets/destination-paris.jpg";
import maldivesImage from "@/assets/destination-maldives.jpg";

const destinations = [
  {
    id: 1,
    name: "Santorini, Greece",
    image: greeceImage,
    price: "$1,299",
    rating: 4.9,
    tours: 24,
  },
  {
    id: 2,
    name: "Bali, Indonesia",
    image: baliImage,
    price: "$899",
    rating: 4.8,
    tours: 32,
  },
  {
    id: 3,
    name: "Paris, France",
    image: parisImage,
    price: "$1,599",
    rating: 4.9,
    tours: 18,
  },
  {
    id: 4,
    name: "Maldives",
    image: maldivesImage,
    price: "$2,499",
    rating: 5.0,
    tours: 15,
  },
];

const Destinations = () => {
  const parallaxOffset = useParallax(0.3);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20 bg-muted/30 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{ 
            transform: `translateY(${parallaxOffset}px)`,
            backgroundImage: 'radial-gradient(circle at 30% 20%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 70% 60%, hsl(var(--accent)) 0%, transparent 50%)',
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fade-up">
            <h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ transform: `translateY(${-parallaxOffset * 0.2}px)` }}
            >
              Popular Destinations
            </h1>
            <p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              style={{ transform: `translateY(${-parallaxOffset * 0.15}px)` }}
            >
              Discover the world's most amazing places handpicked for your next adventure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((destination, index) => (
              <Card
                key={destination.id}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-up cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-secondary text-secondary" />
                      <span className="font-semibold">{destination.rating}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-white/90">
                      <MapPin className="h-3 w-3" />
                      <span>{destination.tours} tours available</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Starting from</p>
                      <p className="text-2xl font-bold text-primary">{destination.price}</p>
                    </div>
                    <button className="text-sm font-semibold text-primary hover:underline">
                      View Tours →
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Destinations;
