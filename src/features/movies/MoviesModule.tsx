"use client";

import { useEffect } from "react";
import { MovieStack } from "./components/MovieStack";

const MoviesModule = () => {
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    const prevBodyOverflow = body.style.overflow;
    const prevBodyHeight = body.style.height;
    const prevBodyTouchAction = body.style.touchAction;
    const prevRootOverscroll = root.style.overscrollBehavior;
    const prevRootHeight = root.style.height;

    body.style.overflow = "hidden";
    body.style.height = "100%";
    body.style.touchAction = "none";
    root.style.overscrollBehavior = "none";
    root.style.height = "100%";

    return () => {
      body.style.overflow = prevBodyOverflow;
      body.style.height = prevBodyHeight;
      body.style.touchAction = prevBodyTouchAction;
      root.style.overscrollBehavior = prevRootOverscroll;
      root.style.height = prevRootHeight;
    };
  }, []);

  return (
    <div className="w-full h-full py-12 overflow-hidden md:overflow-visible touch-none overscroll-none">
      <MovieStack />
    </div>
  );
};

export default MoviesModule;
