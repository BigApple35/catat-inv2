import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { Navigate } from "react-router";

const HomaPage = () => {
    const token = localStorage.getItem("token")
    if(token){
        return <Navigate to={"/dashboard"}/>
    }
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <div id="features">
          <Features />
        </div>
        <div id="how-it-works">
          <HowItWorks />
        </div>
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default HomaPage;
