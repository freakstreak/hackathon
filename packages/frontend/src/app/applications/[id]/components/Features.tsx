import React from "react";

import { Button } from "@/components/ui/button";

type Props = {
  features: string[];
};

const Features = ({}: Props) => {
  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500">
        Features have not been generated yet.
      </p>

      <Button>Generate Features</Button>
    </div>
  );
};

export default Features;
