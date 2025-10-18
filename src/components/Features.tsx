import { Shield, Headphones, Award, Globe } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Best Price Guarantee",
    description: "Find a lower price? We'll refund the difference",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our team is here to help you anytime, anywhere",
  },
  {
    icon: Award,
    title: "Expert Guides",
    description: "Local experts who know every hidden gem",
  },
  {
    icon: Globe,
    title: "200+ Destinations",
    description: "Explore stunning locations around the world",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-foreground/10 mb-4">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-primary-foreground/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
