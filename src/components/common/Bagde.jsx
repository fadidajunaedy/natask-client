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
      "badge-xl": size === "xl",
      "badge-lg": size === "lg",
      "badge-md": size === "md",
      "badge-sm": size === "sm",
      "badge-xs": size === "xs",
    }
  );

  return <span className={buttonClassNames}>{children}</span>;
};

export default Badge;
