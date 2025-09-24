import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const healthTips = [
  {
    icon: "💧",
    title: "Stay Hydrated",
    description: "Drink at least 8 glasses of water daily to maintain optimal body function and prevent dehydration.",
    category: "Wellness"
  },
  {
    icon: "🏃‍♀️",
    title: "Regular Exercise",
    description: "Aim for 30 minutes of moderate exercise daily to boost cardiovascular health and mental wellbeing.",
    category: "Fitness"
  },
  {
    icon: "🥗",
    title: "Balanced Nutrition",
    description: "Include fruits, vegetables, whole grains, and lean proteins in your daily diet for optimal health.",
    category: "Nutrition"
  },
  {
    icon: "😴",
    title: "Quality Sleep",
    description: "Get 7-9 hours of quality sleep each night to support immune system and cognitive function.",
    category: "Sleep"
  },
  {
    icon: "🧘‍♀️",
    title: "Stress Management",
    description: "Practice mindfulness, meditation, or deep breathing exercises to manage daily stress effectively.",
    category: "Mental Health"
  },
  {
    icon: "🩺",
    title: "Regular Checkups",
    description: "Schedule annual health screenings and preventive care visits to catch issues early.",
    category: "Prevention"
  }
];

const HealthTips = () => {
  return (
    <section id="health-tips" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Health Tips & Prevention
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expert-curated health tips to help you maintain optimal wellness and prevent common health issues.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {healthTips.map((tip, index) => (
            <Card 
              key={index} 
              className="card-shadow hover:card-shadow-hover smooth-transition hover:scale-[1.02] cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center text-2xl">
                    {tip.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl text-foreground">{tip.title}</CardTitle>
                    <span className="text-sm text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">
                      {tip.category}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{tip.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="max-w-2xl mx-auto card-shadow bg-gradient-card">
          <CardContent className="p-8 text-center">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Get Weekly Health Tips</h3>
                <p className="text-muted-foreground">
                  Subscribe to our newsletter for personalized health advice and wellness updates.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button variant="medical" className="px-8">
                  Subscribe
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground">
                No spam, unsubscribe anytime. Your privacy is protected.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HealthTips;