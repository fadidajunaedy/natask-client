import classNames from "classnames"

const FileInput = ({
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
    accept = ""
}) => {
    const fileInputClassNames = classNames(
        "w-full file-input bg-base-100 rounded-xl",
        {
            "file-input-xl": size === "xl",
            "file-input-lg": size === "lg",
            "file-input-md": size === "md",
            "file-input-sm": size === "sm",
        },
        {
            "input-error": error,
        }
    )
    return (
        <fieldset className="fieldset flex flex-col items-start">
            {label && <legend className="fieldset-legend">{label}</legend>}
            <input 
                type="file"
                name={name} 
                className={fileInputClassNames}
                placeholder={placeholder}
                value={value}
                accept={accept}
                onChange={onChange}
                required={required}
                disabled={disabled || loading}
                readOnly={readOnly} 
            />
            {error && <p className="validator-hint text-error mt-0">{error}</p>}
        </fieldset>
    )
}

export default FileInput