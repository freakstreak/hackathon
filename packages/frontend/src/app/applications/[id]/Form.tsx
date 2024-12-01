import React, { useEffect, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Details from "@/app/applications/[id]/components/Details";
import Schema from "@/app/applications/[id]/components/Schema";
import Endpoints from "@/app/applications/[id]/components/Endpoints";
import Deployment from "@/app/applications/[id]/components/Deployment";
import Features from "@/app/applications/[id]/components/Features";
import Operations from "@/app/applications/[id]/components/Operations";

import { Step } from "@/types/step";

type Props = {
  applicationId: string | undefined;
  name: string | undefined;
  description: string | null | undefined;
  status: Step;
};

const Form = ({ applicationId, name, description, status }: Props) => {
  const [openItems, setOpenItems] = useState([status]);

  const getAccordionContent = (step: Step) => {
    const stepsArray = Object.values(Step);

    const isDisabled =
      status === null || stepsArray.indexOf(step) > stepsArray.indexOf(status);

    switch (step) {
      case Step.DETAILS:
        return <Details name={name} description={description} />;

      case Step.FEATURES_GENERATION:
        return (
          <Features
            applicationId={applicationId}
            isGenerated={
              status !== Step.FEATURES_GENERATION &&
              status !== Step.DETAILS &&
              status !== null
            }
            isDisabled={isDisabled}
          />
        );

      case Step.SCHEMA:
        return (
          <Schema
            applicationId={applicationId}
            isGenerated={
              status !== Step.FEATURES_GENERATION &&
              status !== Step.SCHEMA &&
              status !== Step.DETAILS &&
              status !== null
            }
            isDisabled={isDisabled}
          />
        );

      case Step.ENDPOINTS:
        return (
          <Endpoints
            applicationId={applicationId}
            isGenerated={
              status !== Step.ENDPOINTS &&
              status !== Step.SCHEMA &&
              status !== Step.FEATURES_GENERATION &&
              status !== Step.DETAILS &&
              status !== null
            }
          />
        );
      case Step.OPERATION_SELECTION:
        return <Operations isDisabled={isDisabled} />;

      case Step.DEPLOYMENT:
        return <Deployment isDisabled={isDisabled} />;
    }
  };

  useEffect(() => {
    setOpenItems([status]);
  }, [status]);

  return (
    <Accordion
      type="multiple"
      className="w-full px-4 max-h-screen overflow-auto"
      value={openItems}
      onValueChange={(value) => setOpenItems(value as unknown as Step[])}
    >
      {Object.values(Step).map((step) => (
        <AccordionItem value={step} key={step}>
          <AccordionTrigger className="text-lg font-semibold">
            {step}
          </AccordionTrigger>

          <AccordionContent>{getAccordionContent(step)}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Form;
