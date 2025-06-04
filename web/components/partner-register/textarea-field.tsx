interface TextAreaFieldProps {
    id: string
    className?: string
    label: string
    required?: boolean
    placeholder?: string
    rows?: number
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export function TextAreaField({
    id,
    className,
    label,
    required = false,
    placeholder,
    rows = 4,
    value,
    onChange,
}: TextAreaFieldProps) {
    return (
        <div className={className}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <textarea
                id={id}
                required={required}
                placeholder={placeholder}
                rows={rows}
                value={value}
                onChange={onChange}
                className="w-full rounded-md border border-gray-400 px-4 py-2 text-neutral-600 placeholder-gray-400 focus:border-blue-300 focus:outline-none"
            />
        </div>
    )
}