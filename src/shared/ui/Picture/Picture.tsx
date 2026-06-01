"use client";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface PictureProps extends Omit<ImageProps, "src"> {
  src?: string | StaticImport;
  fallback?: string;
}

const Picture = ({ src, alt, fallback = "/data/movie-fallback.png", ...props }: PictureProps) => {
  const [imgSrc, setImgSrc] = useState<string | StaticImport>(src || fallback);
  return <Image src={imgSrc} alt={alt} onError={() => setImgSrc(fallback)} {...props} />;
};

export default Picture;
