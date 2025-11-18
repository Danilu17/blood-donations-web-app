// src/hooks/useMockQuery.js
import { useEffect, useState } from "react";

export function useMockQuery(getDataFn, delay = 400) {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setIsError(false);

    const timeoutId = setTimeout(() => {
      try {
        if (cancelled) return;
        const result = getDataFn();
        setData(result);
      } catch (e) {
        console.error(e);
        setIsError(true);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [getDataFn, delay]);

  return { data, isLoading, isError };
}
