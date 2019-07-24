// https://gist.github.com/gragland/b61b8f46114edbcf2a9e4bd5eb9f47f5#gistcomment-2936691
import { useState, useEffect } from "react";

// Usage
// const escapePressed = useKeyPress('Escape', onPressDown, onPressUp);
export default function useKeyPress(
  targetKey,
  onPressDown = () => {},
  onPressUp = () => {}
) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    // If pressed key is our target key then set to true
    function downHandler({ key }) {
      if (key === targetKey) {
        setKeyPressed(true);
        onPressDown();
      }
    }

    // If released key is our target key then set to false
    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
        onPressUp();
      }
    };

    // Add event listeners

    if (typeof window !== `undefined`) {
      window.addEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);
    }

    // Remove event listeners on cleanup
    return () => {
      if (typeof window !== `undefined`) {
        window.removeEventListener("keydown", downHandler);
        window.removeEventListener("keyup", upHandler);
      }
    };
  });

  return keyPressed;
}
