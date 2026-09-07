import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar as CalendarIcon, Users, Package, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const packages = [
  { id: "basic", name: "Basic Package", price: 899, features: ["Accommodation", "Breakfast", "Local Transport"] },
  { id: "standard", name: "Standard Package", price: 1299, features: ["Accommodation", "All Meals", "Transport", "Guided Tours"] },
  { id: "premium", name: "Premium Package", price: 1899, features: ["Luxury Accommodation", "All Meals", "Transport", "Guided Tours", "Activities"] },
];

const BookTour = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState("standard");

  const handleBooking = () => {
    if (!startDate || !endDate) {
      toast({
        title: "Missing Information",
        description: "Please select start and end dates",
        variant: "destructive",
      });
      return;
    }

    const bookingData = {
      tourId: id,
      startDate,
      endDate,
      adults,
      children,
      package: selectedPackage,
      totalPrice: calculateTotal(),
    };

    navigate("/payment", { state: bookingData });
  };

  const calculateTotal = () => {
    const packagePrice = packages.find(p => p.id === selectedPackage)?.price || 0;
    const totalPersons = adults + (children * 0.5);
    return Math.round(packagePrice * totalPersons);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="py-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12 animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Book Your Tour
            </h1>
            <p className="text-xl text-muted-foreground">
              Complete your booking details below
            </p>
          </div>

          <div className="space-y-8">
            {/* Date Selection */}
            <Card className="animate-fade-up" style={{ animationDelay: "100ms" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Select Dates
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        disabled={(date) => date < (startDate || new Date())}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </CardContent>
            </Card>

            {/* Travelers Selection */}
            <Card className="animate-fade-up" style={{ animationDelay: "200ms" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Number of Travelers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Adults</Label>
                    <p className="text-sm text-muted-foreground">Age 12+</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                    >
                      -
                    </Button>
                    <span className="text-xl font-semibold w-12 text-center">{adults}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setAdults(adults + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Children</Label>
                    <p className="text-sm text-muted-foreground">Age 2-11</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                    >
                      -
                    </Button>
                    <span className="text-xl font-semibold w-12 text-center">{children}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setChildren(children + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Package Selection */}
            <Card className="animate-fade-up" style={{ animationDelay: "300ms" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Select Package
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedPackage} onValueChange={setSelectedPackage}>
                  <div className="space-y-4">
                    {packages.map((pkg) => (
                      <Label
                        key={pkg.id}
                        htmlFor={pkg.id}
                        className={cn(
                          "flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition-all hover:border-primary",
                          selectedPackage === pkg.id && "border-primary bg-primary/5"
                        )}
                      >
                        <RadioGroupItem value={pkg.id} id={pkg.id} className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-semibold text-lg">{pkg.name}</p>
                            <p className="text-2xl font-bold text-primary">${pkg.price}</p>
                          </div>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {pkg.features.map((feature, idx) => (
                              <li key={idx}>• {feature}</li>
                            ))}
                          </ul>
                        </div>
                      </Label>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card className="animate-fade-up" style={{ animationDelay: "400ms" }}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-muted-foreground">Total Amount</p>
                    <p className="text-sm text-muted-foreground">
                      {adults} Adult{adults > 1 ? 's' : ''} {children > 0 && `+ ${children} Child${children > 1 ? 'ren' : ''}`}
                    </p>
                  </div>
                  <p className="text-4xl font-bold text-primary">${calculateTotal()}</p>
                </div>
                <Button className="w-full" size="lg" onClick={handleBooking}>
                  Proceed to Payment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookTour;
