import { useEffect, useRef } from 'react';

export function useInterval(callback: () => void, delay: number | null) {
  // FIX: Initialize useRef with null to fix "Expected 1 arguments, but got 0." error.
  // The type has been updated to reflect that the ref can hold null.
  const savedCallback = useRef<(() => void) | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      // FIX: Use the 'delay' parameter for setInterval instead of a hardcoded value.
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
