import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/hero-medical.jpg";
import medicalIcons from "@/assets/medical-icons.jpg";

const HeroSection = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-hero">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      
      {/* Floating Medical Icons */}
      <div className="absolute top-20 right-10 w-32 h-32 opacity-10 floating-animation">
        <img src={medicalIcons} alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute bottom-32 left-10 w-24 h-24 opacity-10 floating-animation" style={{ animationDelay: '2s' }}>
        <img src={medicalIcons} alt="" className="w-full h-full object-contain" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Hero Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                Find the Right Doctor 
                <span className="block bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                  Instantly Based on
                </span>
                <span className="block text-white">Your Symptoms</span>
              </h1>
              
              <p className="text-xl text-white/90 max-w-lg leading-relaxed">
                Connect with qualified healthcare professionals near you. Upload prescriptions, 
                track symptoms, and book appointments seamlessly.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                🩺 Report Symptoms
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary">
                📋 Upload Prescription
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">2,500+</div>
                <div className="text-white/80">Verified Doctors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-white/80">Happy Patients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">4.9★</div>
                <div className="text-white/80">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Card className="overflow-hidden shadow-large">
              <img 
                src={heroImage} 
                alt="Healthcare professionals providing quality medical care"
                className="w-full h-auto object-cover"
              />
            </Card>
            
            {/* Floating Stats Card */}
            <Card className="absolute -bottom-6 -left-6 p-6 shadow-glow bg-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">✓</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">Instant Matching</div>
                  <div className="text-sm text-muted-foreground">AI-powered symptom analysis</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;