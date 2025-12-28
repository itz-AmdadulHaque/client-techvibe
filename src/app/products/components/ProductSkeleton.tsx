import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function ProductSkeleton() {
  return (
    <Card className="h-full py-0 rounded-sm">
      <CardContent className="h-full flex flex-col p-0">
        {/* The Link area (centered content) */}
        <div className="flex flex-col flex-grow text-center p-0">
          <div className="rounded-md flex flex-col gap-1">
            
            {/* Image Box: aspect-square matches your design */}
            <div className="overflow-hidden rounded-sm aspect-square shadow-sm">
              <Skeleton className="w-full h-full rounded-none" />
            </div>

            {/* Title: Centered to match your 'text-center' class */}
            <div className="flex flex-col items-center px-1 pt-2">
              <Skeleton className="h-5 w-4/5 mb-1" />
            </div>

            {/* Price: Centered */}
            <div className="flex justify-center mb-2 px-1">
              <Skeleton className="h-6 w-1/3" />
            </div>
          </div>
        </div>

        {/* AddToCart Button: Matches the bottom placement */}
        <Skeleton className="h-10 w-full rounded-none" />
      </CardContent>
    </Card>
  );
}