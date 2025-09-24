import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SymptomInput from "@/components/SymptomInput";
import DoctorMap from "@/components/DoctorMap";
import AppointmentDashboard from "@/components/AppointmentDashboard";
import HealthTips from "@/components/HealthTips";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <SymptomInput />
      <DoctorMap />
      <AppointmentDashboard />
      <HealthTips />
      <Footer />
    </div>
  );
};

export default Index;
