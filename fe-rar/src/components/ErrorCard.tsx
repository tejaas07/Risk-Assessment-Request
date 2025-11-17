import React from "react";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent } from "./ui/card";

const ErrorCard = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-4 justify-center py-10">
          Error loading data
        </div>
      </CardContent>
    </Card>
  );
};

export default ErrorCard;
