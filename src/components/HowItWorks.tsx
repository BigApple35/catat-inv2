import { FileQuestion, Sparkles, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: FileQuestion,
    title: "Ask Your Question",
    description: "Type or upload your question, homework, or study topic in any format.",
  },
  {
    icon: Sparkles,
    title: "AI Analyzes & Explains",
    description: "Our AI processes your question and generates detailed, step-by-step explanations.",
  },
  {
    icon: CheckCircle,
    title: "Master the Concept",
    description: "Review, practice, and get follow-up help until you fully understand the material.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-4 relative bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learning made simple in three easy steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-30"></div>
          
          {steps.map((step, index) => (
            <div key={index} className="text-center space-y-4 relative">
              <div className="relative inline-flex">
                <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow-primary relative z-10">
                  <step.icon className="w-10 h-10 text-background" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-background font-bold text-sm">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-muted-foreground max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
