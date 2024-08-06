"use client";
import React, {useState} from 'react';
import SubjectSection from "@/container/contact-pages/sections/SubjectSection";
import FormSection from "@/container/contact-pages/sections/FormSection";
import LocationSection from "@/container/contact-pages/sections/LocationSection";


interface ContactInfoInterface {
    subject: string | undefined,
    name: string,
    email: string | undefined,
    message: string | undefined,

}

const ContactPage = () => {
    const [contactInfo, setContactInfo] = useState<any>()
    return (
        <div>
            <SubjectSection setSubject={setContactInfo}/>
            <FormSection/>
            <LocationSection/>
        </div>
    );
};

export default ContactPage;
