import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience_years: number;
  rating: number;
  consultation_fee: number;
  location: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  bio: string | null;
  is_available: boolean;
}

const DoctorMap = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentNotes, setAppointmentNotes] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const { data, error } = await supabase
        .from("doctors")
        .select("*")
        .eq("is_available", true)
        .order("rating", { ascending: false });

      if (error) throw error;
      setDoctors(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load doctors. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to book an appointment.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedDoctor || !appointmentDate || !appointmentTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setBookingLoading(true);

    try {
      const appointmentDateTime = new Date(`${appointmentDate}T${appointmentTime}`);
      
      const { error } = await supabase
        .from("appointments")
        .insert({
          user_id: user.id,
          doctor_id: selectedDoctor.id,
          appointment_date: appointmentDateTime.toISOString(),
          notes: appointmentNotes,
          status: "scheduled",
        });

      if (error) throw error;

      toast({
        title: "Appointment Booked Successfully!",
        description: `Your appointment with ${selectedDoctor.name} has been scheduled.`,
      });

      // Reset form and close dialog
      setAppointmentDate("");
      setAppointmentTime("");
      setAppointmentNotes("");
      setSelectedDoctor(null);

      // Scroll to appointments section
      setTimeout(() => {
        document.getElementById("appointments")?.scrollIntoView({ behavior: "smooth" });
      }, 500);

    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to book appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setBookingLoading(false);
    }
  };
  return (
    <section id="doctors" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Doctors Near You
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Interactive map showing qualified healthcare professionals in your area, matched to your symptoms.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Placeholder */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] card-shadow hover:card-shadow-hover smooth-transition overflow-hidden">
              <div className="relative w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                {/* Map Placeholder */}
                <div className="text-center space-y-4">
                  <div className="text-6xl">🗺️</div>
                  <h3 className="text-2xl font-semibold text-foreground">Interactive Map</h3>
                  <p className="text-muted-foreground max-w-md">
                    Real map integration would show doctor locations with clickable markers. 
                    Each marker reveals doctor profiles and booking options.
                  </p>
                  <Button variant="outline">
                    🌍 Enable Location Services
                  </Button>
                </div>

                {/* Floating Doctor Markers Simulation */}
                <div className="absolute top-16 left-20 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer glow-effect floating-animation">
                  <span className="text-white text-xs">1</span>
                </div>
                <div className="absolute bottom-32 right-24 w-8 h-8 bg-secondary rounded-full flex items-center justify-center cursor-pointer glow-effect floating-animation" style={{ animationDelay: '1s' }}>
                  <span className="text-white text-xs">2</span>
                </div>
                <div className="absolute top-1/2 left-1/3 w-8 h-8 bg-accent rounded-full flex items-center justify-center cursor-pointer glow-effect floating-animation" style={{ animationDelay: '2s' }}>
                  <span className="text-white text-xs">3</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Doctor List */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-foreground mb-6">Available Doctors</h3>
            
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-3 bg-muted rounded"></div>
                        <div className="h-3 bg-muted rounded w-2/3"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              doctors.map((doctor) => (
                <Card key={doctor.id} className="card-shadow hover:card-shadow-hover smooth-transition cursor-pointer hover:scale-[1.02]">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                          <span className="text-white text-xl">👨‍⚕️</span>
                        </div>
                        <div>
                          <CardTitle className="text-lg text-foreground">{doctor.name}</CardTitle>
                          <p className="text-sm text-primary font-medium">{doctor.specialty}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        ⭐ {doctor.rating}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-muted-foreground">Experience:</div>
                      <div className="text-foreground font-medium">{doctor.experience_years} years</div>
                      
                      <div className="text-muted-foreground">Consultation:</div>
                      <div className="text-foreground font-medium">${doctor.consultation_fee}</div>
                      
                      <div className="text-muted-foreground">Location:</div>
                      <div className="text-foreground font-medium">{doctor.location}</div>
                    </div>

                    {doctor.address && (
                      <p className="text-sm text-muted-foreground">📍 {doctor.address}</p>
                    )}

                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="medical" 
                            className="flex-1 text-sm"
                            onClick={() => setSelectedDoctor(doctor)}
                          >
                            Book Appointment
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Book Appointment with {doctor.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="date">Date</Label>
                              <Input
                                id="date"
                                type="date"
                                value={appointmentDate}
                                onChange={(e) => setAppointmentDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                              />
                            </div>
                            <div>
                              <Label htmlFor="time">Time</Label>
                              <Input
                                id="time"
                                type="time"
                                value={appointmentTime}
                                onChange={(e) => setAppointmentTime(e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor="notes">Notes (Optional)</Label>
                              <Textarea
                                id="notes"
                                placeholder="Any additional notes about your symptoms or concerns..."
                                value={appointmentNotes}
                                onChange={(e) => setAppointmentNotes(e.target.value)}
                              />
                            </div>
                            <Button 
                              onClick={handleBookAppointment} 
                              className="w-full"
                              disabled={bookingLoading}
                            >
                              {bookingLoading ? "Booking..." : "Confirm Appointment"}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorMap;