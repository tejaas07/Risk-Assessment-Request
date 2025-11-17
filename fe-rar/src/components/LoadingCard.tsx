import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent } from "./ui/card";

const LoadingCard = () => {
  return (
    <>
      <Card>
        <CardContent>
          <div className="flex items-center gap-4 justify-center py-10">
            <Spinner className="size-10" />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default LoadingCard;
