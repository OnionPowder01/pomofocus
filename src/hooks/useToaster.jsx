import React, { useEffect } from "react";
import { toast } from "react-toastify";

function useToaster(isDone, mode) {

    useEffect(() => {
        if (isDone) {
          const message =
            mode === "work"
              ? "Let's get back to work!"
              : "Take a break! You've earned it.";
    
          toast.success(message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
        // eslint-disable-next-line
      }, [mode]);
}

export default useToaster