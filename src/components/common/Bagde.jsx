import classNames from "classnames";

const Badge = ({
  level = "none",
  size = "md",
  soft = false,
  className,
  children,
}) => {
  const buttonClassNames = classNames(
    "badge font-semibold text-base-100 p-4 rounded-xl",
    {
      [`${className}`]: className,
    },
    {
      "text-neutral border opacity-80": level === "none",
      "text-base-100": level !== "none",
      "badge-primary": level === "primary",
      "badge-secondary": level === "secondary",
      "badge-info": level === "info",
      "badge-success": level === "success",
      "badge-warning": level === "warning",
      "badge-error": level === "error",
    },
    {
      "badge-soft": soft,
    },
    {
      "text-xl": size === "xl",
      "text-lg": size === "lg",
      "text-md": size === "md",
      "text-sm": size === "sm",
      "text-xs": size === "xs",
    }
  );

  return <span className={buttonClassNames}>{children}</span>;
};

export default Badge;
