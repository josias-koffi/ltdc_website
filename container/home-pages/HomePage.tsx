import React from "react";
import HeroSection from "@/container/home-pages/sections/HeroSection";
import ValuesSection from "@/components/sections/values/ValuesSection";
import ActivitiesSection from "@/components/sections/activities/ActivitiesSection";
import CampaignSection from "@/container/home-pages/sections/CampaignSection";
import ReviewSection from "@/components/sections/review/ReviewSection";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <ValuesSection />
      <ActivitiesSection />
      <CampaignSection />
      <ReviewSection />
    </div>
  );
};

export default HomePage;
