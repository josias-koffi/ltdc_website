import React from "react";
import Header from "@/components/header/Header";
import HistorySection from "@/container/about-pages/sections/HistorySection";
import AboutHeadSection from "@/container/about-pages/sections/AboutHeadSection";
import ValuesSection from "@/components/sections/values/ValuesSection";
import ActivitiesSection from "@/components/sections/activities/ActivitiesSection";
import MembersSection from "@/components/sections/members/MembersSection";
import CallToActionsSection from "@/container/about-pages/sections/CallToActionsSection";

const AboutPage = () => {
  return (
    <div>
      <AboutHeadSection />
      <HistorySection />
      <ValuesSection />
      <ActivitiesSection variant="minimal" />
      <MembersSection />
      <CallToActionsSection />
    </div>
  );
};

export default AboutPage;
