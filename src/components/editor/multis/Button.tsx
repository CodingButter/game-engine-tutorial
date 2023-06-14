import classNames from "classnames"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode
    neutral?: boolean
    primary?: boolean
    success?: boolean
    info?: boolean
    danger?: boolean
    warn?: boolean
    size?: "xs" | "sm" | "md" | "lg" | "xl"
    className?: string
    dark?: boolean
    light?: boolean
}

const Button = ({ children,neutral, primary, success, info, danger, warn, size = "md", dark, light, className, ...rest }:ButtonProps) => {
    return (
        <button
            className={classNames(

                size === "xs"   && "px-1 py-0.5 text-xs",
                size === "sm"   && "px-2 py-1 text-sm",
                size === "md"   && "px-3 py-1.5 text-md",
                size === "lg"   && "px-4 py-2 text-lg",
                size === "xl"   && "px-5 py-2.5 text-xl",
                
                primary
                && "bg-primary-500 text-primary-100 hover:bg-primary-600"
                && ((dark && "bg-primary-500 text-primary-100 hover:bg-primary-600")
                    || (light && "bg-primary-100 text-primary-500 hover:bg-primary-200")),
                
                success
                && "bg-success-500 text-success-100 hover:bg-success-600"
                && ((dark && "bg-success-500 text-success-100 hover:bg-success-600")
                    || (light && "bg-success-100 text-success-500 hover:bg-success-200")),
               
                info
                && "bg-info-500 text-info-100 hover:bg-info-600"
                && ((dark && "bg-info-500 text-info-100 hover:bg-info-600")
                    || (light && "bg-info-100 text-info-500 hover:bg-info-200")),
               
                warn
                && "bg-warn-500 text-warn-100 hover:bg-warn-600"
                && ((dark && "bg-warn-500 text-warn-100 hover:bg-warn-600")
                    || (light && "bg-warn-100 text-warn-500 hover:bg-warn-200")),
               
                danger
                && "bg-danger-500 text-danger-100 hover:bg-danger-600"
                && ((dark && "bg-danger-500 text-danger-100 hover:bg-danger-600")
                    || (light && "bg-danger-100 text-danger-500 hover:bg-danger-200")),
               
                 "bg-neutral-500 text-neutral-100 hover:bg-neutral-600"
                && ((dark && "bg-neutral-500 text-neutral-100 hover:bg-neutral-600")
                    || (light && "bg-neutral-100 text-neutral-500 hover:bg-neutral-200")),
                
                "focus:outline-none",
                className
            )}
            {...rest}
        >
            {children}
        </button>
    )

}

export default Button