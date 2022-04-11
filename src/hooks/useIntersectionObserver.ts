import { useEffect, useState } from "react";

export const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit | undefined
) => {
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    setObserver(observer);
  }, []);

  return observer;
};
