// pages/index.js

"use client"; // 1. Import the client-side runtime

import React from "react";
import Header from "./components/header.js";
import HeroSection from "./components/hero.js";
import FeaturesSection from "./components/features.js";
import Footer from "./components/footer.js";
import NewsletterSection from "./components/newsletter.js";
import ProductCarousel from "./components/carousel.js";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <ProductCarousel />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
