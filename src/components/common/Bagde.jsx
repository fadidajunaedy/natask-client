import classNames from "classnames"

const Badge = ({ 
    level = "none",
    size = "md",
    className,
    children
}) => {

    const buttonClassNames = classNames(
        "font-semibold text-base-100 py-2 px-4 rounded-xl",
        {
            [`${className}`]: className
        },
        {
            "text-neutral border": level === "none",
            "text-base-100": level !== "none",
            "bg-primary": level === "primary",
            "bg-secondary": level === "secondary",
            "bg-info": level === "info",
            "bg-success": level === "success",
            "bg-warning": level === "warning",
            "bg-error": level === "error"
        },
        {
            "text-xl": size === "xl",
            "text-lg": size === "lg",
            "text-md": size === "md",
            "text-sm": size === "sm",
        },
    )

    return <span className={buttonClassNames}>{children}</span>
}

export default Badge