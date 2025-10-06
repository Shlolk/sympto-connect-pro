import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-medical.jpg";
import medicalIcons from "@/assets/medical-icons.jpg";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollIndicator from "./ScrollIndicator";
import ParticlesBackground from "./ParticlesBackground";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !statsRef.current) return;

    // Parallax effect for background
    gsap.to(heroRef.current.querySelector(".hero-bg"), {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Animate stats on scroll
    gsap.from(statsRef.current.children, {
      scale: 0.5,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: statsRef.current,
        start: "top 80%",
      },
    });
  }, []);

  const handleReportSymptoms = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    document.getElementById("symptoms")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleUploadPrescription = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    document.getElementById("symptoms")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={heroRef} className="min-h-screen relative overflow-hidden bg-gradient-hero">
      <ParticlesBackground />
      
      {/* Background Elements */}
      <div className="hero-bg absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      
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
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                Find the Right Doctor 
                <span className="block bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                  Instantly Based on
                </span>
                <span className="block text-white">Your Symptoms</span>
              </h1>
              
              <motion.p 
                className="text-xl text-white/90 max-w-lg leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Connect with qualified healthcare professionals near you. Upload prescriptions, 
                track symptoms, and book appointments seamlessly.
              </motion.p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Button 
                variant="hero" 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={handleReportSymptoms}
              >
                🩺 Report Symptoms
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary"
                onClick={handleUploadPrescription}
              >
                📋 Upload Prescription
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              ref={statsRef}
              className="flex items-center gap-8 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
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
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
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
          </motion.div>
        </div>
      </div>
      
      <ScrollIndicator />
    </div>
  );
};

export default HeroSection;