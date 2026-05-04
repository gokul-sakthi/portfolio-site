import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[hsl(199_89%_48%/0.15)] text-[hsl(199_89%_70%)] hover:bg-[hsl(199_89%_48%/0.25)]",
        outline:
          "border-[hsl(217_32%_22%)] text-[hsl(215_20%_65%)] hover:border-[hsl(199_89%_48%/0.4)] hover:text-[hsl(199_89%_70%)]",
        secondary:
          "border-transparent bg-[hsl(217_32%_12%)] text-[hsl(215_20%_65%)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
