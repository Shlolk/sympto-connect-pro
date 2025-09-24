import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock doctor data - in real app this would come from API
const mockDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Internal Medicine",
    rating: 4.9,
    experience: "15 years",
    fees: "$150",
    location: "Medical Center Downtown",
    distance: "0.8 miles",
    availability: "Available Today",
    image: "👩‍⚕️"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Cardiology",
    rating: 4.8,
    experience: "12 years",
    fees: "$200",
    location: "Heart Care Clinic",
    distance: "1.2 miles",
    availability: "Available Tomorrow",
    image: "👨‍⚕️"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Family Medicine",
    rating: 4.9,
    experience: "10 years",
    fees: "$120",
    location: "Community Health Center",
    distance: "2.1 miles",
    availability: "Available Today",
    image: "👩‍⚕️"
  }
];

const DoctorMap = () => {
  return (
    <section className="py-20 bg-background">
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
            
            {mockDoctors.map((doctor) => (
              <Card key={doctor.id} className="card-shadow hover:card-shadow-hover smooth-transition cursor-pointer hover:scale-[1.02]">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{doctor.image}</div>
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
                    <div className="text-foreground font-medium">{doctor.experience}</div>
                    
                    <div className="text-muted-foreground">Consultation:</div>
                    <div className="text-foreground font-medium">{doctor.fees}</div>
                    
                    <div className="text-muted-foreground">Distance:</div>
                    <div className="text-foreground font-medium">{doctor.distance}</div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">📍 {doctor.location}</p>
                    <Badge 
                      variant={doctor.availability.includes("Today") ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {doctor.availability}
                    </Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="medical" className="flex-1 text-sm">
                      Book Appointment
                    </Button>
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorMap;