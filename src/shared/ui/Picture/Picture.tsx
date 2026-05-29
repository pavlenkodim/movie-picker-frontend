"use client";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface PictureProps extends ImageProps {
  fallback?: string;
}

const Picture = ({ src, alt, fallback = "/data/movie-fallback.png", ...props }: PictureProps) => {
  const [imgSrc, setImgSrc] = useState<string | StaticImport>(src);
  return (
    <Image
      src={imgSrc ?? "/data/movie-fallback.png"}
      alt={alt ?? "Image not found"}
      onError={() => setImgSrc(fallback)}
      {...props}
    />
  );
};

export default Picture;
