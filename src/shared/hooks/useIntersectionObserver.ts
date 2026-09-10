import { useEffect, useRef } from "react";

type UseIntersectionObserverOptions = {
  onIntersect: () => void;
  enabled?: boolean;
  rootMargin?: string;
};

export function useIntersectionObserver<T extends Element>({
  onIntersect,
  enabled = true,
  rootMargin = "0px",
}: UseIntersectionObserverOptions) {
  const targetRef = useRef<T>(null);
  const callbackRef = useRef(onIntersect);

  useEffect(() => {
    callbackRef.current = onIntersect;
  }, [onIntersect]);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || !enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          callbackRef.current();
        }
      },
      { rootMargin },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [enabled, rootMargin]);

  return targetRef;
}
