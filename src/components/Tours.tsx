import { Clock, Users, Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const tours = [
  {
    id: 1,
    title: "Greek Island Hopping Adventure",
    duration: "7 Days",
    groupSize: "12 People",
    price: "$1,299",
    rating: 4.9,
    reviews: 128,
    category: "Adventure",
    image: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&h=600&fit=crop",
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
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop",
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
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
  },
];

const Tours = () => {
  const navigate = useNavigate();
  
  return (
    <section id="tours" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured Tours
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Carefully curated experiences designed to create lasting memories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour, index) => (
            <Card
              key={tour.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <Badge className="absolute top-4 left-4 bg-secondary">
                  {tour.category}
                </Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-secondary text-secondary" />
                    <span className="font-semibold">{tour.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({tour.reviews} reviews)
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-4">{tour.title}</h3>
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
                <Button className="w-full" onClick={() => navigate(`/book/${tour.id}`)}>
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tours;
