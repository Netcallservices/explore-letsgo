import { MapPin, Download, Eye, Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";

const destinations = [
  {
    id: "thailand",
    name: "Thailand",
    duration: "6 Days / 5 Nights",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=600&fit=crop",
    itinerary: [
      { day: 1, title: "Arrival in Bangkok", description: "Airport pickup, hotel check-in, evening temple tour", activities: ["Airport Transfer", "Hotel Check-in", "Wat Pho Visit", "Welcome Dinner"] },
      { day: 2, title: "Bangkok City Tour", description: "Grand Palace, floating markets, and street food tour", activities: ["Grand Palace", "Floating Market", "Street Food Tour", "River Cruise"] },
      { day: 3, title: "Phuket Beach Day", description: "Flight to Phuket, beach activities and water sports", activities: ["Flight to Phuket", "Beach Time", "Water Sports", "Sunset Dinner"] },
      { day: 4, title: "Island Hopping", description: "Phi Phi Islands tour with snorkeling", activities: ["Boat Tour", "Snorkeling", "Beach BBQ", "Maya Bay Visit"] },
      { day: 5, title: "Leisure Day", description: "Free time for shopping and relaxation", activities: ["Spa Treatment", "Shopping", "Optional Activities", "Farewell Dinner"] },
      { day: 6, title: "Departure", description: "Hotel checkout and airport transfer", activities: ["Breakfast", "Hotel Checkout", "Airport Transfer"] },
    ],
  },
  {
    id: "goa",
    name: "Goa",
    duration: "5 Days / 4 Nights",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop",
    itinerary: [
      { day: 1, title: "Arrival in Goa", description: "Airport pickup and beach resort check-in", activities: ["Airport Transfer", "Beach Resort Check-in", "Welcome Drinks", "Beach Walk"] },
      { day: 2, title: "North Goa Tour", description: "Explore famous beaches and forts", activities: ["Baga Beach", "Calangute Beach", "Aguada Fort", "Beach Shacks"] },
      { day: 3, title: "Water Sports Adventure", description: "Exciting water sports and activities", activities: ["Parasailing", "Jet Ski", "Banana Boat", "Beach Lunch"] },
      { day: 4, title: "South Goa Exploration", description: "Peaceful beaches and Portuguese churches", activities: ["Colva Beach", "Old Goa Churches", "Spice Plantation", "Sunset Cruise"] },
      { day: 5, title: "Departure", description: "Last minute shopping and departure", activities: ["Breakfast", "Shopping", "Hotel Checkout", "Airport Transfer"] },
    ],
  },
  {
    id: "rajasthan",
    name: "Rajasthan",
    duration: "8 Days / 7 Nights",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop",
    itinerary: [
      { day: 1, title: "Arrival in Jaipur", description: "The Pink City welcomes you", activities: ["Airport Pickup", "Heritage Hotel Check-in", "City Palace Visit", "Welcome Dinner"] },
      { day: 2, title: "Jaipur Sightseeing", description: "Amber Fort, Hawa Mahal, and local markets", activities: ["Amber Fort", "Hawa Mahal", "Jantar Mantar", "Shopping"] },
      { day: 3, title: "Jodhpur - Blue City", description: "Travel to Jodhpur and explore Mehrangarh Fort", activities: ["Drive to Jodhpur", "Mehrangarh Fort", "Clock Tower Market", "Hotel Check-in"] },
      { day: 4, title: "Jodhpur to Udaipur", description: "Journey through Rajasthan's countryside", activities: ["Ranakpur Temples", "Scenic Drive", "Udaipur Arrival", "Lake View Dinner"] },
      { day: 5, title: "Udaipur - City of Lakes", description: "Explore the romantic lake city", activities: ["City Palace", "Lake Pichola Boat Ride", "Jagdish Temple", "Sunset at Fateh Sagar"] },
      { day: 6, title: "Pushkar Excursion", description: "Visit the holy city of Pushkar", activities: ["Drive to Pushkar", "Brahma Temple", "Pushkar Lake", "Camel Safari"] },
      { day: 7, title: "Desert Safari", description: "Experience the Thar Desert", activities: ["Desert Safari", "Camel Ride", "Traditional Dance", "Desert Camping"] },
      { day: 8, title: "Departure", description: "End of your royal Rajasthan journey", activities: ["Breakfast", "Last Minute Shopping", "Airport Transfer"] },
    ],
  },
  {
    id: "paris",
    name: "Paris",
    duration: "4 Days / 3 Nights",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
    itinerary: [
      { day: 1, title: "Arrival in Paris", description: "Welcome to the City of Light", activities: ["Airport Transfer", "Hotel Check-in", "Seine River Walk", "Eiffel Tower Evening View"] },
      { day: 2, title: "Paris Landmarks", description: "Iconic monuments and museums", activities: ["Eiffel Tower Visit", "Louvre Museum", "Arc de Triomphe", "Champs-Élysées Shopping"] },
      { day: 3, title: "Montmartre & Culture", description: "Art, culture, and charming streets", activities: ["Sacré-Cœur", "Montmartre Walk", "Moulin Rouge", "French Cuisine Dinner"] },
      { day: 4, title: "Departure", description: "Au revoir, Paris!", activities: ["Breakfast", "Last Minute Sightseeing", "Shopping", "Airport Transfer"] },
    ],
  },
  {
    id: "singapore",
    name: "Singapore",
    duration: "4 Days / 3 Nights",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop",
    itinerary: [
      { day: 1, title: "Arrival in Singapore", description: "Welcome to the Lion City", activities: ["Airport Transfer", "Marina Bay Hotel", "Gardens by the Bay", "Light Show"] },
      { day: 2, title: "Universal Studios", description: "Full day of fun and entertainment", activities: ["Universal Studios", "Sentosa Island", "Beach Time", "Night Safari"] },
      { day: 3, title: "City Exploration", description: "Culture, shopping, and cuisine", activities: ["Chinatown", "Little India", "Orchard Road Shopping", "Hawker Center Food Tour"] },
      { day: 4, title: "Departure", description: "Goodbye, Singapore!", activities: ["Merlion Park", "Last Minute Shopping", "Airport Transfer"] },
    ],
  },
];

const Itinerary = () => {
  const handleDownload = (destination: string) => {
    toast({
      title: "Downloading Itinerary",
      description: `${destination} itinerary PDF is being prepared...`,
    });
  };

  const handleView = (destination: string) => {
    toast({
      title: "Opening Itinerary",
      description: `Viewing detailed ${destination} itinerary...`,
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="text-center animate-fade-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Tour Itineraries
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore detailed day-by-day plans for your perfect journey
            </p>
          </div>
        </div>
      </section>

      {/* Destination Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {destinations.map((destination, index) => (
              <Card
                key={destination.id}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6 w-full">
                      <h3 className="text-2xl font-bold text-white mb-2">{destination.name}</h3>
                      <div className="flex items-center gap-2 text-white/90 text-sm">
                        <Clock className="h-4 w-4" />
                        <span>{destination.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleView(destination.name)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button 
                      className="flex-1"
                      onClick={() => handleDownload(destination.name)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Itinerary Section */}
          <Card className="animate-fade-up">
            <CardHeader>
              <CardTitle className="text-3xl">Detailed Itineraries</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={destinations[0].id} className="w-full">
                <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto gap-2 mb-8">
                  {destinations.map((destination) => (
                    <TabsTrigger 
                      key={destination.id} 
                      value={destination.id}
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      {destination.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {destinations.map((destination) => (
                  <TabsContent key={destination.id} value={destination.id} className="space-y-6">
                    {destination.itinerary.map((day, idx) => (
                      <Card 
                        key={day.day}
                        className="animate-fade-up hover:shadow-lg transition-shadow"
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        <CardHeader>
                          <div className="flex items-start gap-4">
                            <Badge className="text-lg px-4 py-2">Day {day.day}</Badge>
                            <div className="flex-1">
                              <CardTitle className="text-xl mb-2">{day.title}</CardTitle>
                              <p className="text-muted-foreground">{day.description}</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {day.activities.map((activity, actIdx) => (
                              <div 
                                key={actIdx}
                                className="flex items-center gap-2 text-sm bg-secondary/10 rounded-lg p-3 hover:bg-secondary/20 transition-colors"
                              >
                                <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                                <span>{activity}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    <div className="flex justify-center pt-4">
                      <Button 
                        size="lg"
                        onClick={() => handleDownload(destination.name)}
                      >
                        <Download className="mr-2 h-5 w-5" />
                        Download Full {destination.name} Itinerary
                      </Button>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Itinerary;
