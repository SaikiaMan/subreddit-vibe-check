import clsx from "clsx";

interface IconProps {
  path?: string;
  className?: string;
}

export function Icon({ path = "options", className = "w-4 h-4" }: IconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://assets.codepen.io/3685267/${path}.svg`}
      alt=""
      className={clsx(className)}
    />
  );
}
