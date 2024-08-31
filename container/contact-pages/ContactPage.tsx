"use client";
import React, { useState } from "react";
import SubjectSection from "@/container/contact-pages/sections/SubjectSection";
import FormSection from "@/container/contact-pages/sections/FormSection";
import LocationSection from "@/container/contact-pages/sections/LocationSection";
import { ContactInfoInterface } from "@/libs/interfaces/mailType";

const ContactPage = () => {
  const defaultValue: ContactInfoInterface = {
    subject: {
      id: 0,
      subject: "Question sur l’association",
      image: "/icons/contact/contact.svg",
    },
    name: "",
    email: "",
    message: "",
    company: "",
    consent: false,
  };

  const [contactInfo, setContactInfo] =
    useState<ContactInfoInterface>(defaultValue);

  const resetInfo = () => {
    setContactInfo(defaultValue);
  };
  return (
    <div>
      <SubjectSection setSubject={setContactInfo} />
      <FormSection
        setContactInfo={setContactInfo}
        contactInfo={contactInfo}
        resetInfo={resetInfo}
      />
      <LocationSection />
    </div>
  );
};

export default ContactPage;
