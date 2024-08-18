"use client";
import React, {useState} from 'react';
import SubjectSection, {SubjectStateInterface} from "@/container/contact-pages/sections/SubjectSection";
import FormSection from "@/container/contact-pages/sections/FormSection";
import LocationSection from "@/container/contact-pages/sections/LocationSection";


export interface ContactInfoInterface {
    subject: SubjectStateInterface |  undefined,
    name: string,
    email: string | undefined,
    message: string | undefined,
    company: string | undefined

}

const ContactPage = () => {
    const [contactInfo, setContactInfo] = useState<any>()
    return (
        <div>
            <SubjectSection setSubject={setContactInfo}/>
            <FormSection setContactInfo={setContactInfo} contactInfo={contactInfo}/>
            <LocationSection/>
        </div>
    );
};

export default ContactPage;
