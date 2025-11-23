import { Brain, Zap, Target, TrendingUp, BookOpen, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Tutoring",
    description: "Get personalized explanations and guidance from our advanced AI tutor that adapts to your learning pace.",
  },
  {
    icon: Zap,
    title: "Instant Answers",
    description: "No more waiting. Get immediate, accurate answers to your questions anytime, anywhere.",
  },
  {
    icon: Target,
    title: "Smart Practice",
    description: "AI generates custom practice problems based on your weak areas to maximize learning efficiency.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Visualize your learning journey with detailed analytics and insights powered by AI.",
  },
  {
    icon: BookOpen,
    title: "Study Materials",
    description: "Access AI-generated summaries, flashcards, and study guides tailored to your subjects.",
  },
  {
    icon: Users,
    title: "Collaborative Learning",
    description: "Connect with peers and join study groups with AI-facilitated discussions and Q&A.",
  },
];

const Features = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Everything You Need to{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Excel
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful AI tools designed to make learning more effective and enjoyable
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group"
            >
              <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
