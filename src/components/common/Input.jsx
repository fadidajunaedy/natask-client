import classNames from "classnames"

const Input = ({
    type = "text",
    size = "md",
    label,
    name,
    value,
    placeholder,
    onChange,
    error,
    required = false,
    disabled = false,
    loading = false,
    readOnly = false,
}) => {
    const inputClassNames = classNames(
        "w-full",
        "input rounded-xl",
        {
            "input-xl": size === "xl",
            "input-lg": size === "lg",
            "input-md": size === "md",
            "input-sm": size === "sm",
        },
        {
            "input-error": error,
        }
    )
    return (
        <fieldset className="w-full fieldset">
            {label && <legend className="fieldset-legend text-md">{label}</legend>}
            <input 
                type={type}
                name={name} 
                className={inputClassNames}
                placeholder={placeholder}
                value={value}
                onChange={onChange} 
                required={required}
                disabled={disabled || loading}
                readOnly={readOnly} 
            />
            {error && <p className="validator-hint text-error mt-0">{error}</p>}
        </fieldset>
    )
}

export default Input