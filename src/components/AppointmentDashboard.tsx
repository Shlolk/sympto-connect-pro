import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock appointment data
const upcomingAppointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Johnson",
    specialty: "Internal Medicine",
    date: "March 25, 2024",
    time: "10:30 AM",
    type: "Follow-up",
    location: "Medical Center Downtown",
    status: "confirmed"
  },
  {
    id: 2,
    doctor: "Dr. Michael Chen",
    specialty: "Cardiology",
    date: "March 28, 2024",
    time: "2:15 PM",
    type: "Consultation",
    location: "Heart Care Clinic",
    status: "pending"
  }
];

const pastAppointments = [
  {
    id: 3,
    doctor: "Dr. Emily Rodriguez",
    specialty: "Family Medicine",
    date: "March 15, 2024",
    time: "9:00 AM",
    type: "General Checkup",
    location: "Community Health Center",
    rating: 5,
    notes: "Regular checkup completed. All vitals normal."
  }
];

const AppointmentDashboard = () => {
  return (
    <section id="appointments" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Your Appointment Dashboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Manage your healthcare appointments, view medical history, and track your health journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Stats */}
          <div className="lg:col-span-3 grid md:grid-cols-4 gap-6 mb-8">
            <Card className="card-shadow text-center p-6">
              <div className="text-3xl mb-2">📅</div>
              <div className="text-2xl font-bold text-primary">2</div>
              <div className="text-sm text-muted-foreground">Upcoming</div>
            </Card>
            <Card className="card-shadow text-center p-6">
              <div className="text-3xl mb-2">✅</div>
              <div className="text-2xl font-bold text-success">12</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </Card>
            <Card className="card-shadow text-center p-6">
              <div className="text-3xl mb-2">👨‍⚕️</div>
              <div className="text-2xl font-bold text-secondary">5</div>
              <div className="text-sm text-muted-foreground">Doctors</div>
            </Card>
            <Card className="card-shadow text-center p-6">
              <div className="text-3xl mb-2">⭐</div>
              <div className="text-2xl font-bold text-accent">4.8</div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </Card>
          </div>

          {/* Upcoming Appointments */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-2xl font-semibold text-foreground">Upcoming Appointments</h3>
            
            {upcomingAppointments.map((appointment) => (
              <Card key={appointment.id} className="card-shadow hover:card-shadow-hover smooth-transition">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg text-foreground">{appointment.doctor}</CardTitle>
                      <p className="text-sm text-primary font-medium">{appointment.specialty}</p>
                    </div>
                    <Badge 
                      variant={appointment.status === "confirmed" ? "default" : "secondary"}
                    >
                      {appointment.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Date:</span>
                      <p className="font-medium text-foreground">{appointment.date}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Time:</span>
                      <p className="font-medium text-foreground">{appointment.time}</p>
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <span className="text-muted-foreground">Type:</span>
                    <p className="font-medium text-foreground">{appointment.type}</p>
                  </div>
                  
                  <div className="text-sm">
                    <span className="text-muted-foreground">Location:</span>
                    <p className="font-medium text-foreground">📍 {appointment.location}</p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Reschedule
                    </Button>
                    <Button variant="destructive" size="sm" className="flex-1">
                      Cancel
                    </Button>
                    <Button variant="medical" size="sm" className="flex-1">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button variant="hero" className="w-full">
              ➕ Book New Appointment
            </Button>
          </div>

          {/* Recent Activity & Past Appointments */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground">Recent Activity</h3>
            
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  🩺 Report New Symptoms
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📋 Upload Prescription
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📊 View Health Reports
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  💬 Message Doctor
                </Button>
              </CardContent>
            </Card>

            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Past Appointments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pastAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-foreground">{appointment.doctor}</p>
                        <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(appointment.rating)].map((_, i) => (
                          <span key={i} className="text-accent text-sm">⭐</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {appointment.date} • {appointment.type}
                    </p>
                    <p className="text-xs text-muted-foreground italic">
                      {appointment.notes}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentDashboard;