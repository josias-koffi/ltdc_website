"use client";
import React, { useEffect, useState } from "react";
import BeneficiaryShipForm from "@/container/contact-pages/forms-blocks/BeneficiaryShipForm";
import SponsorShipForm from "@/container/contact-pages/forms-blocks/SponsorShipForm";
import VolunteerShipForm from "@/container/contact-pages/forms-blocks/VolunteerShipForm";
import ContactPage from "@/container/contact-pages/ContactPage";

interface FormsPageProps {
  type: "sponsor" | "beneficiary" | "volunteer" | "general";
}

const FormsPage = ({ type }: FormsPageProps) => {
  const [countyFlags, setCountyFlags] = useState<any[]>([]);

  const fetchCountry = async () => {
    try {
      const response = await fetch("/api/country");
      const result = await response.json();
      if (result) {
        setCountyFlags(Object.keys(result).map((key) => [key, result[key]]));
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchCountry().then();
  }, []);

  switch (type) {
    case "beneficiary":
      return <BeneficiaryShipForm countyFlags={countyFlags} />;
    case "sponsor":
      return <SponsorShipForm countyFlags={countyFlags} />;
    case "volunteer":
      return <VolunteerShipForm countyFlags={countyFlags} />;
    case "general":
      return <ContactPage countyFlags={countyFlags} />;
  }
};

export default FormsPage;
