import React from "react";
import MembersByTeam from "@/components/sections/members/components/MembersByTeam";
import { Team } from "@/libs/interfaces/entities";
import CallToActionsSection from "@/container/about-pages/sections/CallToActionsSection";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";

const Members = () => {
  return (
    <div>
      <ContainerWrapper>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>{"Tous les membres"}</h1>
        </div>
      </ContainerWrapper>

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
