import React from "react";
import MembersByTeam from "@/components/sections/members/components/MembersByTeam";
import { Team } from "@/libs/interfaces/entities";
import CallToActionsSection from "@/container/about-pages/sections/CallToActionsSection";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";

const Members = () => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1 style={{ fontSize: 42 }}>{"Tous les membres"}</h1>
      </div>
      <MembersByTeam team={Team.DIRECTION} />
      <MembersByTeam team={Team.LEGAL} />
      <MembersByTeam team={Team.FINANCE} />
      <MembersByTeam team={Team.MARKETING} />
      <MembersByTeam team={Team.IT} />
      <CallToActionsSection />
    </div>
  );
};

export default Members;
