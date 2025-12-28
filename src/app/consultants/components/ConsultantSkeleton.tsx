import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export function ConsultantSkeleton() {
  return (
    <Card className="shadow-md rounded-sm overflow-hidden flex flex-col h-full border-slate-200">
      <CardHeader className="flex flex-row items-center gap-4 mb-2">
        {/* Profile Image Circle */}
        <Skeleton className="w-24 h-24 rounded-full shrink-0" />
        
        <div className="space-y-2 flex-1">
          {/* Name */}
          <Skeleton className="h-7 w-3/4" />
          {/* Title */}
          <Skeleton className="h-4 w-1/2" />
          {/* Experience text */}
          <Skeleton className="h-3 w-2/3 mt-2" />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 pt-0">
        {/* Bio Paragraph Lines */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
        </div>

        {/* Specialization Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-14" />
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between gap-2 mt-auto pt-4 border-t">
          <Skeleton className="h-9 w-28" />
          <Skeleton className="h-9 w-28" />
        </div>
      </CardContent>
    </Card>
  );
}