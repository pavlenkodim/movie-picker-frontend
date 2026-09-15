"use client";

import { useLayoutEffect } from "react";

function useLockBodyScroll() {
  useLayoutEffect(() => {
    const scrollY = window.scrollY;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.documentElement.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.paddingRight = "";
      window.scrollTo(0, scrollY);
    };
  }, []);
}

export default useLockBodyScroll;
