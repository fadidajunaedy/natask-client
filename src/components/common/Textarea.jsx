import classNames from "classnames"

const Textarea = ({
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
    const textareaClassNames = classNames(
        "w-full",
        "textarea rounded-xl",
        {
            "textarea-xl": size === "xl",
            "textarea-lg": size === "lg",
            "textarea-md": size === "md",
            "textarea-sm": size === "sm",
        },
        {
            "textarea-error": error,
        }
    )
    return (
        <fieldset className="w-full fieldset">
            {label && <legend className="fieldset-legend">{label}</legend>}
            <textarea 
                name={name} 
                className={textareaClassNames}
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

export default Textarea