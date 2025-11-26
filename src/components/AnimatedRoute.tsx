import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface AnimatedRouteProps {
  children: React.ReactNode;
}

const AnimatedRoute = ({ children }: AnimatedRouteProps) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Trigger animation on route change
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 50);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div
      className={`transition-all duration-500 ${
        isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
      }`}
    >
      {children}
    </div>
  );
};

export default AnimatedRoute;
