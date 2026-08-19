interface IconButtonProps {
  onClick?: () => void;
  icon?: string;
  className?: string;
}

export function IconButton({
  onClick = () => {},
  icon = "options",
  className = "w-4 h-4",
}: IconButtonProps) {
  return (
    <button onClick={onClick} type="button" className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://assets.codepen.io/3685267/${icon}.svg`}
        alt=""
        className="h-full w-full"
      />
    </button>
  );
}
