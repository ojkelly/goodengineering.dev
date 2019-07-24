import { useEffect } from "react";

export default function useEvent(event, handler, passive = false) {
  useEffect(() => {
    // initiate the event handler
    if (typeof window !== `undefined`) {
      window.addEventListener(event, handler, passive);
    }

    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      if (typeof window !== `undefined`) {
        window.removeEventListener(event, handler);
      }
    };
  });
}
