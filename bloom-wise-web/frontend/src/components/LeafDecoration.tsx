import leafDecoration from "@/assets/leaf-decoration.png";

interface LeafDecorationProps {
  position: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  className?: string;
}

export const LeafDecoration = ({ position, className = "" }: LeafDecorationProps) => {
  const positionClasses = {
    "top-right": "absolute top-0 right-0 w-48 h-48 opacity-30",
    "top-left": "absolute top-0 left-0 w-48 h-48 opacity-30 scale-x-[-1]",
    "bottom-right": "absolute bottom-0 right-0 w-48 h-48 opacity-30 scale-y-[-1]",
    "bottom-left": "absolute bottom-0 left-0 w-48 h-48 opacity-30 scale-[-1]",
  };

  return (
    <img
      src={leafDecoration}
      alt=""
      className={`${positionClasses[position]} ${className} pointer-events-none select-none`}
      aria-hidden="true"
    />
  );
};
