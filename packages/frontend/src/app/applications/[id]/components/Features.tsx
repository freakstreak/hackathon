import React from "react";

import { Button } from "@/components/ui/button";
import FeatureList from "@/app/applications/[id]/FeatureList";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  generateFeatures,
  getDraftSchemas,
} from "@/services/draftSchemaService";

import { useToast } from "@/hooks/use-toast";

type Props = {
  applicationId: string | undefined;
  isGenerated: boolean;
};

const Features = ({ applicationId, isGenerated }: Props) => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { data: draftSchemas } = useQuery({
    queryKey: ["draftSchemas", applicationId?.toString()],
    queryFn: () => getDraftSchemas(applicationId as string),
  });

  const { mutate: generateFeaturesMutation, isPending } = useMutation({
    mutationFn: generateFeatures,
  });

  const handleGenerateFeatures = () => {
    if (!applicationId) return;

    generateFeaturesMutation(applicationId, {
      onSuccess: () => {
        toast({
          title: "Features generated successfully",
        });

        queryClient.invalidateQueries({
          queryKey: ["draftSchemas", applicationId.toString()],
        });
      },
    });
  };

  return (
    <div className="space-y-3">
      {!isGenerated ? (
        <>
          <p className="text-sm text-gray-500">
            Features have not been generated yet.
          </p>

          <Button onClick={handleGenerateFeatures} disabled={isPending}>
            {isPending ? "Generating..." : "Generate Features"}
          </Button>
        </>
      ) : (
        <FeatureList loading={isPending} features={draftSchemas?.json} />
      )}
    </div>
  );
};

export default Features;
