import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const SymptomInput = () => {
  const [hasVisitedDoctor, setHasVisitedDoctor] = useState<boolean | null>(null);
  const [symptoms, setSymptoms] = useState("");

  return (
    <section id="symptoms" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Tell Us About Your Symptoms
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered system will match you with the right healthcare professionals based on your symptoms and medical history.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="card-shadow hover:card-shadow-hover smooth-transition">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Symptom Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Symptom Input */}
              <div className="space-y-4">
                <label className="text-lg font-semibold text-foreground">
                  Describe your symptoms
                </label>
                <Textarea
                  placeholder="Tell us what you're experiencing... (e.g., headache, fever, chest pain, difficulty breathing)"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="min-h-32 text-base"
                />
              </div>

              {/* Previous Doctor Visit Question */}
              <div className="space-y-4">
                <label className="text-lg font-semibold text-foreground">
                  Have you visited a doctor before for similar symptoms?
                </label>
                <div className="flex gap-4">
                  <Button
                    variant={hasVisitedDoctor === true ? "medical" : "outline"}
                    onClick={() => setHasVisitedDoctor(true)}
                    className="flex-1"
                  >
                    Yes, I have
                  </Button>
                  <Button
                    variant={hasVisitedDoctor === false ? "medical" : "outline"}
                    onClick={() => setHasVisitedDoctor(false)}
                    className="flex-1"
                  >
                    No, first time
                  </Button>
                </div>
              </div>

              {/* Conditional Content */}
              {hasVisitedDoctor === true && (
                <div className="space-y-6 p-6 bg-secondary/10 rounded-lg border border-secondary/20 animate-slide-up">
                  <h3 className="text-xl font-semibold text-foreground">Previous Medical History</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Previous Doctor's Name
                      </label>
                      <Input placeholder="Dr. John Smith" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Upload Prescription/Receipt (Optional)
                      </label>
                      <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/50 smooth-transition cursor-pointer">
                        <div className="space-y-2">
                          <div className="text-4xl">📄</div>
                          <p className="text-foreground font-medium">Click to upload or drag files here</p>
                          <p className="text-sm text-muted-foreground">Supports JPG, PNG, PDF files</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button variant="secondary" className="w-full">
                    🔄 Schedule Follow-up with Previous Doctor
                  </Button>
                </div>
              )}

              {hasVisitedDoctor === false && (
                <div className="space-y-6 p-6 bg-accent/10 rounded-lg border border-accent/20 animate-slide-up">
                  <h3 className="text-xl font-semibold text-foreground">Find New Doctors</h3>
                  <p className="text-muted-foreground">
                    We'll analyze your symptoms and show you qualified doctors in your area who specialize in treating your condition.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-soft">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-white">🎯</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Smart Matching</p>
                        <p className="text-sm text-muted-foreground">AI-powered doctor selection</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-soft">
                      <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center">
                        <span className="text-white">📍</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Location Based</p>
                        <p className="text-sm text-muted-foreground">Doctors near you</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button 
                variant="hero" 
                size="lg" 
                className="w-full text-lg py-6"
                disabled={!symptoms.trim() || hasVisitedDoctor === null}
              >
                {hasVisitedDoctor === true ? "Find Follow-up Options" : "Find Doctors Near Me"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SymptomInput;