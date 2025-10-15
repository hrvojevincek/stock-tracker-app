// src/components/ui/loading-spinner.tsx
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
  showText?: boolean;
}

const sizeClasses = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-6 w-6",
};

export default function LoadingSpinner({
  size = "md",
  className,
  text = "Loading...",
  showText = false,
}: LoadingSpinnerProps) {
  return (
    <div className="flex items-center gap-2">
      <Loader2
        className={cn(
          "animate-spin text-gray-500",
          sizeClasses[size],
          className
        )}
      />
      {showText && <span className="text-sm text-gray-500">{text}</span>}
    </div>
  );
}
