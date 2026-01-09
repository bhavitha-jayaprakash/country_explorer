import * as React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline' | 'secondary'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', ...props }, ref) => {
        const baseStyles = "px-4 py-2 rounded font-medium transition-colors"
        
        const variants = {
            default: "bg-slate-900 text-white hover:bg-slate-800",
            outline: "border border-slate-200 hover:bg-slate-50",
            secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200"
        }

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], className)}
                {...props}
            />
        )
    }
)

Button.displayName = "Button"

export { Button }