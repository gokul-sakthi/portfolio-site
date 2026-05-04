import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(199_89%_48%)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[hsl(199_89%_48%)] text-[hsl(222_47%_5%)] hover:bg-[hsl(199_89%_55%)] shadow-[0_0_20px_hsla(199,89%,48%,0.3)] hover:shadow-[0_0_28px_hsla(199,89%,48%,0.45)] font-semibold",
        outline:
          "border border-[hsl(217_32%_22%)] bg-transparent text-[hsl(210_40%_85%)] hover:border-[hsl(199_89%_48%/0.6)] hover:text-[hsl(199_89%_70%)] hover:bg-[hsl(199_89%_48%/0.06)]",
        ghost:
          "text-[hsl(215_20%_65%)] hover:text-[hsl(199_89%_70%)] hover:bg-[hsl(199_89%_48%/0.08)]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-7 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
