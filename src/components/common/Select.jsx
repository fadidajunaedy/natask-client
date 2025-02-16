import classNames from "classnames"

const Select = ({
    size = "md",
    label,
    name,
    value,
    onChange,
    error,
    required = false,
    disabled = false,
    loading = false,
    readOnly = false,
    children
}) => {
    const selectClassNames = classNames(
        "w-full",
        "select rounded-xl",
        {
            "select-xl": size === "xl",
            "select-lg": size === "lg",
            "select-md": size === "md",
            "select-sm": size === "sm",
        },
        {
            "select-error": error,
        }
    )
    return (
        <fieldset className="w-full fieldset">
            {label && <legend className="fieldset-legend">{label}</legend>}
            <select 
                name={name} 
                className={selectClassNames}
                value={value}
                onChange={onChange} 
                required={required}
                disabled={disabled || loading}
                readOnly={readOnly} 
            >
                {children}
            </select>
            {error && <p className="validator-hint text-error mt-0">{error}</p>}
        </fieldset>
    )
}

export default Select