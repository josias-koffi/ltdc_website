"use client";
import React from 'react';
import SubjectSection from "@/container/contact-pages/sections/SubjectSection";
import FormSection from "@/container/contact-pages/sections/FormSection";
import LocationSection from "@/container/contact-pages/sections/LocationSection";

const ContactPage = () => {
  return (
    <div>
      <SubjectSection/>
      <FormSection/>
      <LocationSection/>
    </div>
  );
};

export default ContactPage;
