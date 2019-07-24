import { useState } from "react";

import useEvent from "./useEvent";

export default function useLocalStorage(key, initialValue) {
  const isJSON = typeof initialValue === "object";
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window === `undefined`) {
        return initialValue;
      }
      const item = window.localStorage.getItem(key);

      if (item) {
        return isJSON ? JSON.parse(item) : item;
      }
    } catch (error) {
      console.error(error);
    }
    return initialValue;
  });

  const setValue = value => {
    try {
      if (!window) {
        return;
      }
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      window.localStorage.setItem(
        key,
        isJSON ? JSON.stringify(valueToStore) : valueToStore
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Keep in sync with any other windows (ie, presenter mode)
  useEvent("storage", event => {
    if (event.key === key && event.newValue !== storedValue) {
      setValue(event.newValue);
    }
  });

  return [storedValue, setValue];
}
