"use client"
import React, {useEffect, useState} from 'react';
import BeneficiaryShipForm from "@/container/forme-pages/forms-blocks/BeneficiaryShipForm";
import SponsorShipForm from "@/container/forme-pages/forms-blocks/SponsorShipForm";
import VolunteerShipForm from "@/container/forme-pages/forms-blocks/VolunteerShipForm";

interface FormsPageProps {
    type: 'sponsor' | "beneficiary" | "volunteer"
}

const FormsPage = ({type}: FormsPageProps) => {
    const [countyFlags, setCountyFlags] = useState<any[]>([])

    const fetchCountry = async () => {
        try {
            const response = await fetch("/api/country")
            const result = await response.json()
            if (result) {
                setCountyFlags(Object.keys(result).map((key) => [key, result[key]]))
            }
        } catch (e: any) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchCountry().then()
    }, []);


    switch (type) {
        case "beneficiary":
            return <BeneficiaryShipForm countyFlags={countyFlags}/>
        case "sponsor":
            return <SponsorShipForm countyFlags={countyFlags}/>
        case "volunteer":
            return <VolunteerShipForm countyFlags={countyFlags}/>
    }
};

export default FormsPage;
