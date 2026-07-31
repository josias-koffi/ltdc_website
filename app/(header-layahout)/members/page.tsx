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
      <MembersByTeam team={Team.DIRECTION} isInteractive />
      <MembersByTeam team={Team.LEGAL} isInteractive />
      <MembersByTeam team={Team.FINANCE} isInteractive />
      <MembersByTeam team={Team.MARKETING} isInteractive />
      <MembersByTeam team={Team.IT} isInteractive />
      <MembersByTeam team={Team.PROJET} isInteractive />
      <CallToActionsSection />
    </div>
  );
};

export default Members;
