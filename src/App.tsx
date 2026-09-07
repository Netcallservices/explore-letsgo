import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnimatedRoute from "@/components/AnimatedRoute";
import Index from "./pages/Index";
import Tours from "./pages/Tours";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Destinations from "./pages/Destinations";
import ViewTours from "./pages/ViewTours";
import BookTour from "./pages/BookTour";
import Payment from "./pages/Payment";
import Itinerary from "./pages/Itinerary";
import Careers from "./pages/Careers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tours" element={<AnimatedRoute><Tours /></AnimatedRoute>} />
          <Route path="/about" element={<AnimatedRoute><About /></AnimatedRoute>} />
          <Route path="/contact" element={<AnimatedRoute><Contact /></AnimatedRoute>} />
          <Route path="/destinations" element={<AnimatedRoute><Destinations /></AnimatedRoute>} />
          <Route path="/view-tours" element={<AnimatedRoute><ViewTours /></AnimatedRoute>} />
          <Route path="/book/:id" element={<AnimatedRoute><BookTour /></AnimatedRoute>} />
          <Route path="/payment" element={<AnimatedRoute><Payment /></AnimatedRoute>} />
          <Route path="/itinerary" element={<AnimatedRoute><Itinerary /></AnimatedRoute>} />
          <Route path="/careers" element={<AnimatedRoute><Careers /></AnimatedRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<AnimatedRoute><NotFound /></AnimatedRoute>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
