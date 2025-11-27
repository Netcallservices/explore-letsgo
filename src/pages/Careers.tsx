import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, MapPin, Clock, Users, Globe, Heart, Upload } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Careers = () => {
  const [open, setOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const { toast } = useToast();

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

  const handleApply = (positionTitle: string) => {
    setSelectedPosition(positionTitle);
    setOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const phone = formData.get("phone") as string;
      const coverLetter = formData.get("coverLetter") as string;

      if (!resumeFile) {
        toast({
          title: "Error",
          description: "Please upload your resume",
          variant: "destructive",
        });
        return;
      }

      // Upload resume to storage
      const fileExt = resumeFile.name.split(".").pop();
      const fileName = `${Date.now()}_${name.replace(/\s+/g, "_")}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(fileName, resumeFile);

      if (uploadError) throw uploadError;

      // Save application to database
      const { error: insertError } = await supabase
        .from("job_applications")
        .insert({
          position_title: selectedPosition || "General Application",
          applicant_name: name,
          applicant_email: email,
          applicant_phone: phone,
          resume_url: uploadData.path,
          cover_letter: coverLetter,
        });

      if (insertError) throw insertError;

      toast({
        title: "Application Submitted!",
        description: "We've received your application and will be in touch soon.",
      });

      setOpen(false);
      setResumeFile(null);
      setSelectedPosition(null);
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

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
                  <Button 
                    className="w-full"
                    onClick={() => handleApply(position.title)}
                  >
                    Apply Now
                  </Button>
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
          <Button 
            size="lg"
            onClick={() => {
              setSelectedPosition(null);
              setOpen(true);
            }}
          >
            Send Your Resume
          </Button>
        </div>
      </section>

      {/* Application Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedPosition ? `Apply for ${selectedPosition}` : "Submit Your Resume"}
            </DialogTitle>
            <DialogDescription>
              Fill out the form below and upload your resume.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resume">Resume * (PDF, DOC, DOCX)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                  className="cursor-pointer"
                />
                {resumeFile && (
                  <Upload className="h-4 w-4 text-primary" />
                )}
              </div>
              {resumeFile && (
                <p className="text-xs text-muted-foreground">
                  {resumeFile.name}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="coverLetter">Cover Letter</Label>
              <Textarea
                id="coverLetter"
                name="coverLetter"
                placeholder="Tell us why you'd be a great fit..."
                rows={4}
              />
            </div>
            <Button type="submit" className="w-full" disabled={uploading}>
              {uploading ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Careers;
