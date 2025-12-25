import axios from "axios";

export const getErrorMessage = (error: unknown): string => {
  // 1. Check if it's an Axios Error
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message || 
      error.response?.data?.error ||   
      error.message ||                 
      "A network error occurred"
    );
  }

  // 2. Check if it's a standard JavaScript Error
  if (error instanceof Error) {
    return error.message;
  }
  // 3. Check if it's a simple string
  if (typeof error === "string") {
    return error;
  }

  // 4. Fallback for everything else (null, undefined, objects, etc.)
  return "An unexpected error occurred";
};