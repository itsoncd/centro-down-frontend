import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/class-name.utils";

const spinnerVariants = cva(
  "rounded-full animate-spin border-blue-500 border-t-transparent",
  {
    variants: {
      size: {
        sm: "w-4 h-4 border-2",
        md: "w-8 h-8 border-4",
        lg: "w-12 h-12 border-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  // Texto opcional (ya traducido por quien lo usa); sin él solo se muestra el anillo
  message?: string;
  className?: string;
}

export const Spinner = ({ size, message, className }: SpinnerProps) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn("flex flex-col items-center justify-center gap-3", className)}
    >
      <div className={spinnerVariants({ size })} aria-hidden="true" />
      {message && <p className="text-sm text-gray-500 font-medium">{message}</p>}
    </div>
  );
};
