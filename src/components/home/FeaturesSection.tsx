import { Target, Zap, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Target,
    title: "High Model Accuracy",
    description: "Trained on validated public medical datasets for research and educational use.",
  },
  {
    icon: Zap,
    title: "Fast Analysis",
    description: "Get AI-generated insights within minutes of uploading medical images.",
  },
  {
    icon: Users,
    title: "Expert Guidance",
    description: "Results can be discussed with medical professionals for better understanding.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="text-gradient">NeuroMediAI</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Leveraging cutting-edge artificial intelligence for medical image analysis 
            and early risk screening support.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="card-hover glow-border glass border-border/50 overflow-hidden group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300" />
                </div>
                
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
