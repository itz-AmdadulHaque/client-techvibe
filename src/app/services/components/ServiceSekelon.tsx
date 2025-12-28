import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function ServiceCardSkeleton() {
  return (
    <Card className="rounded-sm overflow-hidden shadow-sm py-0 border-none">
      <CardContent className="relative p-0 h-[340px] bg-slate-300">
        {/* 1. Background Skeleton (Simulating the Image) */}
        <Skeleton className="absolute inset-0 w-full h-full rounded-none bg-slate-300" />

        {/* 2. Overlay (Matches your real card's gradient) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60 shadow-sm"></div>

        {/* 3. Bottom Content Area */}
        <div className="absolute bottom-0 w-full px-4 py-4 space-y-3">
          {/* Title line */}
          <Skeleton className="h-6 w-3/4 bg-slate-400/50" />

          {/* Description lines (mimics line-clamp-2) */}
          <div className="space-y-2">
            <Skeleton className="h-3 w-full bg-slate-400/30" />
            <Skeleton className="h-3 w-4/5 bg-slate-400/30" />
          </div>

          {/* Price placeholder */}
          <Skeleton className="h-5 w-16 bg-green-900/30" />

          {/* Buttons Group */}
          <div className="flex gap-2 pt-1">
            {/* View Details Skeleton */}
            <Skeleton className="h-10 flex-1 rounded-sm bg-slate-400/40" />
            {/* Add to Cart Skeleton */}
            <Skeleton className="h-10 flex-1 rounded-sm bg-slate-100/80" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
