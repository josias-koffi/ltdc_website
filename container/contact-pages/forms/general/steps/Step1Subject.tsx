"use client";
import React from "react";
import RHFRadioGroup from "../../../fields/RHFRadioGroup";
import { GENERAL_SUBJECTS } from "../schema";

const Step1Subject = () => (
  <RHFRadioGroup
    name="subject"
    label="Quel est l'objet de votre message ?"
    options={GENERAL_SUBJECTS}
    row={false}
  />
);

export default Step1Subject;
