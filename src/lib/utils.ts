import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** generate url param string to pass in api calls for filter */
type QueryValue = string | number | null | undefined;
export function generateUrlString(options: Record<string, QueryValue>): string {
  const params = new URLSearchParams();

  for (const key in options) {
    const value = options[key];

    // Skip undefined, null, or empty string
    if (value !== undefined && value !== null && value !== '') {
      params.set(key, String(value));
    }
  }

  return params.toString();
}

export const capitalizeText = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const generateErrorMessage = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
  optionalMessage?: string
) => {
  if (!error.response?.data) {
    return capitalizeText(optionalMessage || "Something went wrong!");
  }

  const { message } = error.response.data;

  if (Array.isArray(message)) {
    return capitalizeText(message[0]);
  } else if (typeof message === "string") {
    return capitalizeText(message);
  } else if (typeof message === "object") {
    return capitalizeText(Object.values(message)[0] as string);
  }

  return capitalizeText(optionalMessage || "Something went wrong!");
};

export function truncateHtml(html: string, length: number) {
  // Strip tags for counting
  const text = html.replace(/<[^>]+>/g, "");
  return text.length > length ? text.slice(0, length) + "..." : text;
}
