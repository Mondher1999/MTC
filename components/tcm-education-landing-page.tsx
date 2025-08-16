"use client";

import { useEffect } from "react";
import { Header } from "./sections/header";
import { HeroSection } from "./sections/hero-section";
import { IntroductionSection } from "./sections/introduction-section";
import { TrainingBenefits } from "./sections/training-benefits";
import { LearningMethodology } from "./sections/learning-methodology";
import { ProgramDetails } from "./sections/program-details";
import { FAQSection } from "./sections/faq-section";
import { CTASection } from "./sections/cta-section";
import { Footer } from "./sections/footer";
import AuthBasic from "@/components/kokonutui/auth-basic"



export default function TCMEducationLandingPage() {
  useEffect(() => {
    // Intersection Observer for animations
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("animate-slide-up-stagger");

        // Animate staggered children
        const children = entry.target.querySelectorAll(".stagger-child");
        children.forEach((child, index) => {
          setTimeout(() => {
            (child as HTMLElement).classList.add("animate-scale-bounce");
          }, index * 100);
        });

        // Animate headings
        const headings = entry.target.querySelectorAll("h1, h2, h3");
        headings.forEach((heading, index) => {
          setTimeout(() => {
            (heading as HTMLElement).classList.add("text-reveal");
          }, index * 200);
        });
      });
    }, observerOptions);

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    // Scroll-based parallax effects
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;

      // Parallax for hero elements
      const heroElements = document.querySelectorAll(".parallax-hero");
      heroElements.forEach((element) => {
        (element as HTMLElement).style.transform = `translateY(${rate * 0.3}px)`;
      });

      // Parallax for floating elements
      const floatingElements = document.querySelectorAll(".parallax-float");
      floatingElements.forEach((element, index) => {
        const speed = 0.2 + index * 0.1;
        (element as HTMLElement).style.transform = `translateY(${
          scrolled * speed
        }px) rotate(${scrolled * 0.1}deg)`;
      });
    };

    // Magnetic button hover effect
    const magneticButtons = document.querySelectorAll(".magnetic-button");
    magneticButtons.forEach((button) => {
      button.addEventListener("mousemove", (e) => {
        const rect = button.getBoundingClientRect();
        const x = (e as MouseEvent).clientX - rect.left - rect.width / 2;
        const y = (e as MouseEvent).clientY - rect.top - rect.height / 2;

        (button as HTMLElement).style.transform = `translate(${x * 0.1}px, ${
          y * 0.1
        }px) scale(1.05)`;
      });

      button.addEventListener("mouseleave", () => {
        (button as HTMLElement).style.transform =
          "translate(0px, 0px) scale(1)";
      });
    });

    window.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

// Fond partagé pour toutes les sections
   function SharedGradientBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* Halo en haut à droite */}
      <div className="absolute -top-32 right-[-10%] h-[40rem] w-[40rem] rounded-full bg-gradient-to-br from-red-300/40 via-red-400/30 to-red-500/20 blur-3xl animate-pulse-slow" />
      {/* Halo en bas à gauche */}
      <div className="absolute -bottom-40 left-[-10%] h-[36rem] w-[36rem] rounded-full bg-gradient-to-tr from-rose-300/40 via-red-400/30 to-red-500/20 blur-3xl animate-pulse-slow" />
    </div>
  );
}

 function SharedGridBackdrop() {
  return (
    <svg aria-hidden className="absolute inset-0 -z-10 h-full w-full opacity-[0.05]">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}


  return (
    <div className="relative overflow-hidden ">
      {/* Fond partagé */}
      <SharedGradientBackdrop />
      <SharedGridBackdrop />

      {/* Sections */}
      <Header />
      <HeroSection />
      <IntroductionSection />
      <LearningMethodology />
      <TrainingBenefits />
  
      <ProgramDetails />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  )
}
