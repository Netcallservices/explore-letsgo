import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Destinations from "@/components/Destinations";
import Tours from "@/components/Tours";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import IntroAnimation from "@/components/IntroAnimation";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);

  useEffect(() => {
    // Check if user has seen the intro in this session
    const seen = sessionStorage.getItem("hasSeenIntro");
    if (seen) {
      setShowIntro(false);
      setHasSeenIntro(true);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem("hasSeenIntro", "true");
    setShowIntro(false);
    setHasSeenIntro(true);
  };

  return (
    <>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      <div className={`min-h-screen ${hasSeenIntro ? "animate-fade-in" : ""}`}>
        <Navbar />
        <Hero />
        <Features />
        <Destinations />
        <Tours />
        <About />
        <Contact />
        <Footer />
      </div>
      <Chatbot />
    </>
  );
};

export default Index;
