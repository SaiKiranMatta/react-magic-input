import React, { useState, useEffect } from "react";
import { cn } from "../utils/tw-merge";

export interface SelectInputProps {
    label: string;
    name: string;
    options: { value: string; label: string }[]; // Dropdown options
    placeholder?: string; // Placeholder text for the dropdown
    required?: boolean; // Whether the field is required
    defaultValue?: string; // Default selected value
    onInputChange?: (name: string, value: string) => void; // Callback on change
    onError?: (name: string, error: string) => void; // Callback for error
    isSubmitted?: boolean; // Submission status to trigger required validation
    className?: string; // Additional class names for the component
    style?: React.CSSProperties; // Inline styles for the component
}

const SelectInput: React.FC<SelectInputProps> = ({
    label,
    name,
    options,
    placeholder = `Select ${label}`,
    required,
    defaultValue = "",
    onInputChange,
    onError = () => {},
    isSubmitted,
    className = "",
    style = {},
}) => {
    const [value, setValue] = useState<string>(defaultValue);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        let errorMsg = "";

        if (value.trim() !== "") {
            // No need for complex validation beyond checking required status for a select input
            errorMsg = "";
        }

        setError(errorMsg);
        onError(name, errorMsg);
        onInputChange?.(name, value);
    }, [value, name, onError, onInputChange]);

    useEffect(() => {
        if (isSubmitted && required && value.trim() === "") {
            const requiredError = `${label} is required.`;
            setError(requiredError);
            onError(name, requiredError);
        } else if (isSubmitted) {
            setError("");
            onError(name, "");
        }
    }, [isSubmitted, required, value, label, name, onError]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.value);
    };

    return (
        <div className="mb-4">
            <label className="block mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <select
                className={cn(
                    `w-full px-4 py-2 border rounded-lg transition-colors duration-300 ease-in-out`,
                    error ? "border-red-500" : "border-gray-300",
                    "focus:border-blue-500 focus:ring focus:ring-blue-300 outline-none",
                    className
                )}
                value={value}
                onChange={handleChange}
                style={style}
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default SelectInput;
