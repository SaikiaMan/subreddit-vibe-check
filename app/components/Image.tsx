import NextImage from "next/image";
import clsx from "clsx";

interface ImageProps {
  path?: string;
  className?: string;
  alt?: string;
}

export function Image({
  path = "1",
  className = "w-4 h-4",
  alt = "",
}: ImageProps) {
  return (
    <NextImage
      src={`https://assets.codepen.io/3685267/${path}.jpg`}
      alt={alt}
      width={40}
      height={40}
      unoptimized
      className={clsx(className, "rounded-full")}
    />
  );
}
