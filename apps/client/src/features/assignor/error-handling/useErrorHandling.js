import { useState, useEffect } from "react";

export function useErrorHandling(error) {
  const [errorFlags, setErrorFlags] = useState({
    email: false,
    document: false,
  });

  const resetErrorFlags = () => {
    setErrorFlags({
      email: false,
      document: false,
    });
  };

  useEffect(() => {
    if (error) {
      const emailError = error.toLowerCase().includes("email");
      const documentError = error.toLowerCase().includes("document");

      setErrorFlags({
        email: emailError,
        document: documentError,
      });
    }
  }, [error]);

  return { errorFlags, resetErrorFlags };
}
