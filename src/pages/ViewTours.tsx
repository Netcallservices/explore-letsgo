import { useState } from "react";
import { Clock, Users, Star, MapPin } from "lucide-react";
import { useParallax } from "@/hooks/use-parallax";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const allTours = [
  {
    id: 1,
    title: "Greek Island Hopping Adventure",
    duration: "7 Days",
    groupSize: "12 People",
    price: "$1,299",
    rating: 4.9,
    reviews: 128,
    category: "Adventure",
    location: "Greece",
    image: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&h=600&fit=crop",
    description: "Explore the stunning Greek islands with crystal clear waters and ancient history.",
  },
  {
    id: 2,
    title: "Bali Cultural Experience",
    duration: "5 Days",
    groupSize: "8 People",
    price: "$899",
    rating: 4.8,
    reviews: 96,
    category: "Cultural",
    location: "Bali",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop",
    description: "Immerse yourself in Balinese culture, temples, and tropical paradise.",
  },
  {
    id: 3,
    title: "Paris Romantic Getaway",
    duration: "4 Days",
    groupSize: "2 People",
    price: "$1,599",
    rating: 5.0,
    reviews: 204,
    category: "Romance",
    location: "Paris",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
    description: "Experience the city of love with romantic walks and world-class cuisine.",
  },
  {
    id: 4,
    title: "Thailand Beach Paradise",
    duration: "6 Days",
    groupSize: "10 People",
    price: "$999",
    rating: 4.7,
    reviews: 156,
    category: "Beach",
    location: "Thailand",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=600&fit=crop",
    description: "Relax on pristine beaches and explore vibrant Thai culture.",
  },
  {
    id: 5,
    title: "Rajasthan Royal Heritage",
    duration: "8 Days",
    groupSize: "15 People",
    price: "$1,199",
    rating: 4.9,
    reviews: 142,
    category: "Cultural",
    location: "Rajasthan",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop",
    description: "Discover royal palaces, desert landscapes, and rich Indian heritage.",
  },
  {
    id: 6,
    title: "Singapore City Explorer",
    duration: "4 Days",
    groupSize: "8 People",
    price: "$1,099",
    rating: 4.8,
    reviews: 118,
    category: "City",
    location: "Singapore",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop",
    description: "Experience the futuristic city with amazing food and attractions.",
  },
  {
    id: 7,
    title: "Goa Beach Adventure",
    duration: "5 Days",
    groupSize: "12 People",
    price: "$799",
    rating: 4.6,
    reviews: 98,
    category: "Beach",
    location: "Goa",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop",
    description: "Enjoy beautiful beaches, water sports, and vibrant nightlife.",
  },
  {
    id: 8,
    title: "Maldives Luxury Escape",
    duration: "7 Days",
    groupSize: "2 People",
    price: "$2,499",
    rating: 5.0,
    reviews: 187,
    category: "Luxury",
    location: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=600&fit=crop",
    description: "Ultimate luxury with overwater villas and pristine coral reefs.",
  },
];

const ViewTours = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const parallaxOffset = useParallax(0.4);

  const categories = ["all", "Adventure", "Cultural", "Romance", "Beach", "City", "Luxury"];

  const filteredTours = selectedCategory === "all" 
    ? allTours 
    : allTours.filter(tour => tour.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{ 
            transform: `translateY(${parallaxOffset}px)`,
            backgroundImage: 'radial-gradient(circle at 20% 50%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 80% 80%, hsl(var(--secondary)) 0%, transparent 50%)',
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center animate-fade-up">
            <h1 
              className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in"
              style={{ transform: `translateY(${-parallaxOffset * 0.3}px)` }}
            >
              Explore Our Tours
            </h1>
            <p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" 
              style={{ 
                animationDelay: '100ms',
                transform: `translateY(${-parallaxOffset * 0.2}px)`
              }}
            >
              Discover unforgettable journeys curated just for you
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto gap-2">
              {categories.map((category, idx) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="capitalize hover:scale-110 transition-transform duration-300 animate-fade-in"
                  style={{ animationDelay: `${200 + idx * 50}ms` }}
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredTours.map((tour, index) => (
              <Card
                key={tour.id}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 animate-fade-up hover:-translate-y-3 opacity-0"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-1 transition-all duration-700"
                  />
                  <Badge className="absolute top-4 left-4 bg-secondary group-hover:scale-110 transition-transform duration-300">
                    {tour.category}
                  </Badge>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transform translate-y-0 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-1 text-white">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm font-semibold">{tour.location}</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <CardContent className="p-6 transform transition-all duration-300 group-hover:translate-y-[-4px]">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-secondary text-secondary" />
                      <span className="font-semibold">{tour.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({tour.reviews} reviews)
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 line-clamp-2">{tour.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {tour.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{tour.groupSize}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">From</p>
                      <p className="text-2xl font-bold text-primary">{tour.price}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button 
                    className="w-full group-hover:scale-105 transition-all duration-300 hover:shadow-lg" 
                    onClick={() => navigate(`/book/${tour.id}`)}
                  >
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ViewTours;
