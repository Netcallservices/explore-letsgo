import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import IntroAnimation from "@/components/IntroAnimation";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Check if this is truly the initial page load (not a route change)
    const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore');
    
    if (hasLoadedBefore) {
      // If we've loaded before in this session, skip the intro
      setShowIntro(false);
      setHasSeenIntro(true);
      setIsInitialLoad(false);
    } else {
      // Mark that we've loaded at least once in this session
      sessionStorage.setItem('hasLoadedBefore', 'true');
    }
  }, []);

  const handleIntroComplete = () => {
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
        <Footer />
      </div>
      <Chatbot />
    </>
  );
};

export default Index;
