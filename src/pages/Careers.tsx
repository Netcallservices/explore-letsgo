import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, Clock, Users, Globe, Heart } from "lucide-react";

const Careers = () => {
  const openPositions = [
    {
      title: "Travel Consultant",
      location: "Remote",
      type: "Full-time",
      description: "Help customers plan their dream vacations and provide expert travel advice.",
    },
    {
      title: "Tour Guide",
      location: "Multiple Locations",
      type: "Full-time",
      description: "Lead exciting tours and create memorable experiences for travelers.",
    },
    {
      title: "Marketing Manager",
      location: "New York, NY",
      type: "Full-time",
      description: "Drive our marketing strategy and promote amazing travel experiences.",
    },
    {
      title: "Customer Support Specialist",
      location: "Remote",
      type: "Full-time",
      description: "Provide exceptional 24/7 support to our global customer base.",
    },
    {
      title: "Content Writer",
      location: "Remote",
      type: "Part-time",
      description: "Create engaging travel content, destination guides, and blog posts.",
    },
    {
      title: "Operations Coordinator",
      location: "Los Angeles, CA",
      type: "Full-time",
      description: "Coordinate tour logistics and ensure smooth operations across destinations.",
    },
  ];

  const benefits = [
    {
      icon: Globe,
      title: "Travel Perks",
      description: "Enjoy discounted travel and familiarization trips to explore our destinations.",
    },
    {
      icon: Users,
      title: "Great Team",
      description: "Work with passionate, diverse team members who love travel as much as you do.",
    },
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, wellness programs, and mental health support.",
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Remote work options and flexible hours to maintain work-life balance.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help people discover the world and create unforgettable memories. 
            Build your career with Let's Go!
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-12 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Why Work With Us?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Open Positions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {openPositions.map((position, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-start gap-2">
                    <Briefcase className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <span>{position.title}</span>
                  </CardTitle>
                  <CardDescription className="space-y-1 mt-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4" />
                      {position.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4" />
                      {position.type}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {position.description}
                  </p>
                  <Button className="w-full">Apply Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-12 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">Our Culture</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Innovation & Creativity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We encourage new ideas and creative solutions. Your voice matters, and we're 
                  always looking for ways to improve the travel experience for our customers.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Diversity & Inclusion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We celebrate diverse perspectives and backgrounds. Our team represents the global 
                  community we serve, and we're committed to creating an inclusive workplace.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Growth & Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Invest in your future with our professional development programs, training 
                  opportunities, and clear career progression paths.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Don't See Your Role?</h2>
          <p className="text-muted-foreground mb-6">
            We're always looking for talented individuals to join our team. 
            Send us your resume and let us know how you'd like to contribute!
          </p>
          <Button size="lg">Send Your Resume</Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
