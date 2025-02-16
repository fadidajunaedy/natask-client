import classNames from "classnames"

const Heading = ({ 
    level,
    size = "base",
    align = "left",
    className,
    children,
    ...props
 }) => {
    const HeadingTag = level
    const headingClassNames = classNames(
        "font-extrabold",
        className,
        {
            "text-4xl md:text-5xl lg:text-6xl": size === "6xl",
            "text-3xl md:text-4xl lg:text-5xl": size === "5xl",
            "text-2xl md:text-3xl lg:text-4xl": size === "4xl",
            "text-xl md:text-2xl lg:text-3xl": size === "3xl",
            "text-lg md:text-xl lg:text-2xl": size === "2xl",
            "text-xl": size === "xl",
            "text-lg": size === "lg",
            "text-base": size === "base",
            "text-sm": size === "sm",
        },
        {
            "text-left": align === "left",
            "text-center": align === "center",
            "text-right": align === "right",
        }
    )

    return <HeadingTag className={headingClassNames} {...props}>{children}</HeadingTag>
}

export default Heading