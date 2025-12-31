import { Suspense } from "react";
import LoginForm from "./LoginForm";
import { LoadingOverlay } from "@/components/custom/LoadingOverlay/LoadingOverlay";
export const metadata = {
  title: "Login | TechVibe",
  description: "Login to your TechVibe account using email, password, or Google.",
};

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Suspense fallback={<LoadingOverlay visible blur />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
