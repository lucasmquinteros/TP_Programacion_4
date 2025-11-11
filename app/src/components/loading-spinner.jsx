import { Spinner } from "flowbite-react";

export function LoadingSpinner() {
  return (
    <Spinner
      color="warning"
      aria-label="Warning spinner example"
      className="w-[6%] block h-screen mx-auto"
    />
  );
}
