import { useRef } from "react";
/**
 * useDebounce is a hook that makes it easy to implement debounce
 * @param {Function} callback - Functoin that you would like be run
 * @param {number} time - time in milliseconds between execution of callback
 */

export default function useDebounce(callback, time) {
  const debounceRef = useRef();

  return (...args) => {
    if (typeof debounceRef.current === "number") {
      clearTimeout(debounceRef.current);
    }
    const timeout = setTimeout(() => {
      callback(...args);
    }, time);
    debounceRef.current = timeout;
  };
}
