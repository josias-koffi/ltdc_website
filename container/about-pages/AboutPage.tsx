import React from "react";
import AssoHistorySection from "@/container/about-pages/sections/AssoHistorySection";
import AboutHeadSection from "@/container/about-pages/sections/AboutHeadSection";
import ValuesSection from "@/components/sections/values/ValuesSection";
import ActivitiesSection from "@/components/sections/activities/ActivitiesSection";
import MembersSection from "@/components/sections/members/MembersSection";
import CallToActionsSection from "@/container/about-pages/sections/CallToActionsSection";

const AboutPage = () => {
  return (
    <div>
      <AboutHeadSection />
      <AssoHistorySection />
      <ValuesSection />
      <ActivitiesSection variant="minimal" />
      <MembersSection />
      <CallToActionsSection />
    </div>
  );
};

export default AboutPage;
