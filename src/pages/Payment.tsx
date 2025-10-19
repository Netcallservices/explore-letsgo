import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CreditCard, Lock, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);

  if (!bookingData) {
    navigate("/view-tours");
    return null;
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      toast({
        title: "Payment Successful!",
        description: "Your booking has been confirmed. Check your email for details.",
      });
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="py-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12 animate-fade-up">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Secure Payment
            </h1>
            <p className="text-xl text-muted-foreground">
              Your payment information is safe and secure
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Payment Method */}
              <Card className="animate-fade-up">
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-3">
                      <Label
                        htmlFor="card"
                        className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors"
                      >
                        <RadioGroupItem value="card" id="card" />
                        <CreditCard className="h-5 w-5" />
                        <span>Credit/Debit Card</span>
                      </Label>
                      <Label
                        htmlFor="paypal"
                        className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors"
                      >
                        <RadioGroupItem value="paypal" id="paypal" />
                        <span>PayPal</span>
                      </Label>
                      <Label
                        htmlFor="bank"
                        className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors"
                      >
                        <RadioGroupItem value="bank" id="bank" />
                        <span>Bank Transfer</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Card Details */}
              {paymentMethod === "card" && (
                <Card className="animate-fade-up" style={{ animationDelay: "100ms" }}>
                  <CardHeader>
                    <CardTitle>Card Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePayment} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input id="cardName" placeholder="John Doe" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input 
                          id="cardNumber" 
                          placeholder="1234 5678 9012 3456" 
                          maxLength={19}
                          required 
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" maxLength={5} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input 
                            id="cvv" 
                            type="password" 
                            placeholder="123" 
                            maxLength={3}
                            required 
                          />
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full" 
                        size="lg"
                        disabled={processing}
                      >
                        {processing ? "Processing..." : `Pay $${bookingData.totalPrice}`}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Security Badge */}
              <div className="flex items-center gap-3 text-sm text-muted-foreground animate-fade-up" style={{ animationDelay: "200ms" }}>
                <Lock className="h-4 w-4" />
                <p>Your payment information is encrypted and secure</p>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 animate-fade-up" style={{ animationDelay: "100ms" }}>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Check-in</span>
                      <span className="font-semibold">
                        {bookingData.startDate && format(bookingData.startDate, "MMM dd, yyyy")}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Check-out</span>
                      <span className="font-semibold">
                        {bookingData.endDate && format(bookingData.endDate, "MMM dd, yyyy")}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Travelers</span>
                      <span className="font-semibold">
                        {bookingData.adults} Adult{bookingData.adults > 1 ? 's' : ''}
                        {bookingData.children > 0 && `, ${bookingData.children} Child${bookingData.children > 1 ? 'ren' : ''}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Package</span>
                      <span className="font-semibold capitalize">{bookingData.package}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total Amount</span>
                      <span className="text-3xl font-bold text-primary">
                        ${bookingData.totalPrice}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Free cancellation within 24 hours</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Instant confirmation</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary" />
                      <span>24/7 customer support</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Payment;
