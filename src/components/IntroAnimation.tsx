import { useState, useEffect } from "react";
import { Plane } from "lucide-react";

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage 0: Initial black screen (0-500ms)
    const timer1 = setTimeout(() => setStage(1), 500);
    
    // Stage 1: Power flicker (500-1000ms)
    const timer2 = setTimeout(() => setStage(2), 1000);
    
    // Stage 2: Logo reveal (1000-2500ms)
    const timer3 = setTimeout(() => setStage(3), 2500);
    
    // Stage 3: Fade out (2500-3200ms)
    const timer4 = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-opacity duration-700 ${
        stage === 3 ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Scan line effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent ${
          stage >= 1 ? "animate-scan-line" : "opacity-0"
        }`}
      />

      {/* Flicker overlay */}
      <div
        className={`absolute inset-0 bg-primary/10 ${
          stage === 1 ? "animate-flicker" : "opacity-0"
        }`}
      />

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Logo container with power-on effect */}
        <div
          className={`transition-all duration-1000 ${
            stage >= 2
              ? "opacity-100 scale-100"
              : "opacity-0 scale-50"
          }`}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 -z-10 animate-pulse">
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
          </div>

          {/* Icon */}
          <div className="relative">
            <Plane className="w-24 h-24 mx-auto text-primary animate-float mb-6" />
            
            {/* Brand name */}
            <h1 className="text-6xl font-bold text-foreground mb-2 tracking-tight">
              Let's Go
            </h1>
            
            {/* Tagline with typewriter effect */}
            <p
              className={`text-xl text-muted-foreground transition-opacity duration-500 ${
                stage >= 2 ? "opacity-100" : "opacity-0"
              }`}
            >
              Powering Your Adventures
            </p>
          </div>

          {/* Loading bar */}
          <div className="mt-8 w-64 mx-auto h-1 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r from-primary via-secondary to-primary transition-all duration-1000 ${
                stage >= 2 ? "w-full" : "w-0"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Corner power indicators */}
      <div
        className={`absolute top-8 right-8 flex items-center gap-2 transition-opacity duration-300 ${
          stage >= 1 ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-xs text-muted-foreground font-mono">ONLINE</span>
      </div>
    </div>
  );
};

export default IntroAnimation;
