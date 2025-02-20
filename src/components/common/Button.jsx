import classNames from "classnames";

const Button = ({
  level = "neutral",
  type = "button",
  size = "md",
  align = "left",
  square = false,
  outline = false,
  onClick,
  disabled = false,
  loading = false,
  className,
  children,
}) => {
  const buttonClassNames = classNames(
    "btn rounded-xl font-semibold hover:outline outline-neutral cursor-pointer",
    {
      [`${className}`]: className,
    },
    {
      "text-neutral bg-base-100 border": level === "none",
      // "text-base-100": level !== "none",
      "btn-neutral": level === "neutral",
      "btn-brand-yellow": level === "brand-yellow",
      "btn-primary": level === "primary",
      "btn-secondary": level === "secondary",
      "btn-info": level === "info",
      "btn-success": level === "success",
      "btn-warning": level === "warning",
      "btn-error": level === "error",
    },
    {
      "btn-xl": size === "xl",
      "btn-lg": size === "lg",
      "btn-md": size === "md",
      "btn-sm": size === "sm",
      "btn-xs": size === "xs",
    },
    {
      "text-left": align === "left",
      "text-center": align === "center",
      "text-right": align === "right",
    },
    {
      "text-base-100": !outline,
      "btn-square": square,
      "btn-outline hover:text-base-100": outline,
    }
  );

  return (
    <button
      type={type}
      className={buttonClassNames}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {children}
    </button>
  );
};

export default Button;
