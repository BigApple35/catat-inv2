import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-learning.jpg";
import { useNavigate } from "react-router";

const Hero = () => {
    const nav = useNavigate()
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary animate-glow" />
              <span className="text-sm font-medium text-foreground">AI-Powered Learning</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Learn Smarter with{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                AI Assistance
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl">
              Transform your study experience with intelligent tools that adapt to your learning style. 
              Master any subject faster with personalized AI tutoring.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl" className="group" onClick={() => {nav("/login")}}>
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="flex items-center gap-8 justify-center lg:justify-start text-sm">
              <div>
                <p className="text-2xl font-bold text-foreground">50k+</p>
                <p className="text-muted-foreground">Active Students</p>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div>
                <p className="text-2xl font-bold text-foreground">95%</p>
                <p className="text-muted-foreground">Success Rate</p>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div>
                <p className="text-2xl font-bold text-foreground">4.9/5</p>
                <p className="text-muted-foreground">User Rating</p>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/20">
              <img 
                src={heroImage} 
                alt="AI Learning Platform" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-card border border-border rounded-lg p-4 shadow-lg animate-float">
              <p className="text-xs text-muted-foreground">AI Study Session</p>
              <p className="text-lg font-bold text-primary">+45%</p>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-lg p-4 shadow-lg animate-float" style={{ animationDelay: "0.5s" }}>
              <p className="text-xs text-muted-foreground">Progress This Week</p>
              <p className="text-lg font-bold text-accent">85%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
