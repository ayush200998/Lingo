import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 uppercase",
  {
    variants: {
      variant: {
        locked: 'bg-neutral-200 text-primary-foreground hover:bg-nuetral-200/90 border-nuetral-400 border-b-4 active:border-b-0',
        default: "bg-white text-black border-slate-200 border-2 border-b-4 active:border-b-2 hover:bg-slate-100 text-slate-500",
        defaultOutline: 'bg-transparent text-slate-500 hover:bg-slate-100',
        primary: 'bg-sky-400 text-primary-foreground border-sky-500 border-2 border-b-4 active:border-b-0 hover:bg-sky-400/90',
        primaryOutline: 'bg-white text-sky-500 hover:bg-slate-100',
        secondary: 'bg-green-500 text-primary-foreground border-green-600 border-2 border-b-4 active:border-b-0 hover:bg-green-500/90',
        secondaryOutline: 'bg-white text-green-600 hover:bg-slate-100',
        danger: 'bg-rose-400 text-primary-foreground border-rose-500 border-2 border-b-4 active:border-b-0 hover:bg-rose-400/90',
        dangerOutline: 'bg-white text-rose-500 hover:bg-slate-100',
        super: 'bg-indigo-400 text-primary-foreground border-indigo-500 border-2 border-b-4 active:border-b-0 hover:bg-indigo-400/90',
        superOutline: 'bg-white text-indigo-500 hover:bg-slate-100',
        tertiary: 'bg-yellow-400 text-primary-foreground border-yellow-500 border-2 border-b-4 active:border-b-0 hover:bg-yellow-400/90',
        tertiaryOutline: 'bg-white text-yellow-500 hover:bg-slate-100',
        sidebar: 'bg-transparent text-slate-500 border-2 border-transparent hover:bg-slate-100 transition-none',
        sidebarOutline: 'bg-sky-500/15 text-sky-500 border-sky-300 border-2 hover:bg-sky-500/25 transition-none',
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-10 px-3",
        lg: "h-12 px-4",
        icon: "h-10 w-10",
        rounded: 'rounded-full'
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
