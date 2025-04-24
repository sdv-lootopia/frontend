interface FormFieldProps {
    id: string
    label: string
    required?: boolean
    placeholder?: string
    type?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function FormField({
    id,
    label,
    required = false,
    placeholder,
    type = "text",
    value,
    onChange,
}: FormFieldProps) {
    return (
        <div className="space-y-2">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                id={id}
                type={type}
                required={required}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-neutral-600 placeholder-gray-400 focus:border-indigo-500 focus:outline-none"
            />
        </div>
    )
}