import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ConsultantType } from "@/Types/Types";
import Image from "next/image";
import ContactAdmin from "./ContactAdmin";

export function ConsultantDetails({
  consultant,
}: {
  consultant: ConsultantType;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-black hover:bg-slate-100">
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-2xl font-bold tracking-tight">
            Consultant Profile
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* Top Section: Photo & Identity */}
          <div className="flex gap-6 items-start">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${consultant.image}`}
              alt={consultant.fullName}
              width={120}
              height={120}
              className="w-32 h-32 object-cover rounded-md border shadow-sm shrink-0"
            />
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                {consultant.fullName}
              </h1>
              <p className="text-sm font-medium text-blue-600 uppercase tracking-wide">
                {consultant.title}
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                <span className="font-semibold text-gray-700">
                  {consultant.experience} Years
                </span>{" "}
                of Professional Experience
              </p>
            </div>
          </div>

          {/* Bio Section */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
              About
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed text-justify">
              {consultant.bio}
            </p>
          </div>

          {/* Specializations - Moved here for better width handling */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
              Expertise & Specializations
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {consultant.specializations.map((spec, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-[11px] font-semibold bg-slate-100 text-slate-700 rounded-sm border border-slate-200"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Grid for Qualifications and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                Education
              </h2>
              <div className="space-y-3">
                {consultant.qualifications.map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <span className="text-sm font-bold text-gray-800">
                      {item.title}
                    </span>
                    <span className="text-xs text-gray-500 italic">
                      {item.institute}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                Office Location
              </h2>
              <div className="flex items-start gap-2 text-sm text-gray-700">
                <p>{consultant.address}</p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="border-t pt-4 mt-2">
          <DialogClose asChild>
            <Button variant="ghost">Close</Button>
          </DialogClose>
          <ContactAdmin />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
