import React from "react";
import MembersByTeam from "@/container/members-pages/MembersByTeam";
import { Team } from "@/libs/interfaces/entities";
import CallToActionsSection from "@/container/about-pages/sections/CallToActionsSection";

const Members = () => {
  return (
    <div>
      <MembersByTeam team={Team.ADMINISTRATION} />
      <MembersByTeam team={Team.LEGAL} />
      <MembersByTeam team={Team.FINANCE} />
      <MembersByTeam team={Team.MARKETING} />
      <MembersByTeam team={Team.IT} />
      <CallToActionsSection />
    </div>
  );
};

export default Members;
