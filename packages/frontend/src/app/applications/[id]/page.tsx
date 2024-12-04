"use client";

import React from "react";
import { useParams } from "next/navigation";

import Form from "@/app/applications/[id]/Accordion";
import Output from "@/app/applications/[id]/Output";

import { useQuery } from "@tanstack/react-query";
import { getApplicationById } from "@/services/applicationService";

import { ApplicationProvider } from "@/contexts/ApplicationContext";

import { Step } from "@/types/step";

const Application = () => {
  const { id } = useParams();

  const { data: application } = useQuery({
    queryKey: ["application", id],
    enabled: !!id,
    queryFn: () => getApplicationById(id as string),
  });

  const status =
    application?.status !== "pending" && application?.status !== null
      ? (application?.status as Step)
      : Step.FEATURES_GENERATION;

  return (
    <ApplicationProvider>
      <div className="flex flex-col min-h-screen">
        <div className="grid grid-cols-2 flex-1">
          {/* left */}
          <Form
            applicationId={application?.id}
            name={application?.name}
            description={application?.description}
            status={status}
          />

          {/* right */}
          <Output applicationId={application?.id} status={status} />
        </div>
      </div>
    </ApplicationProvider>
  );
};

export default Application;
