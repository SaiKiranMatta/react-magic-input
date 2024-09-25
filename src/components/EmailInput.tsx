import React, { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce"; // Assume this hook is defined elsewhere
import { cn } from "../utils/tw-merge"; // Utility for conditional class names

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic regex for email validation

export interface EmailInputProps {
    required?: boolean;
    placeholder?: string;
    onInputChange?: (name: string, value: string) => void;
    onError?: (name: string, error: string) => void;
    isSubmitted?: boolean;
    className?: string;
    label?: string;
    name: string;
    style?: React.CSSProperties;
}

const EmailInput: React.FC<EmailInputProps> = ({
    required = false,
    onInputChange,
    onError = () => {},
    isSubmitted = false,
    label = "Email",
    placeholder = `Enter your ${label}`,
    name,
    className = "",
    style = {},
}) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const debouncedValue = useDebounce(value, 300);

    useEffect(() => {
        let errorMsg = "";

        if (debouncedValue.trim() === "") {
            errorMsg = "";
        } else if (!EMAIL_PATTERN.test(debouncedValue)) {
            errorMsg = `${label} is not valid.`;
        }

        setError(errorMsg);
        onError(name, errorMsg);
        onInputChange?.(name, debouncedValue);
    }, [debouncedValue, label, name, onError, onInputChange]);

    useEffect(() => {
        if (isSubmitted) {
            let requiredError = "";
            let patternError = "";

            if (required && value.trim() === "") {
                requiredError = `${label} is required.`;
            } else if (!EMAIL_PATTERN.test(value)) {
                patternError = `${label} is not valid.`;
            }

            setError(requiredError || patternError);
            onError(name, requiredError || patternError);
        } else {
            if (!required && value.trim() !== "" && EMAIL_PATTERN.test(value)) {
                setError("");
                onError(name, "");
            }
        }
    }, [isSubmitted, required, value, label, name, onError]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <div className="mb-4">
            <label className="block mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                className={cn(
                    `w-full px-4 py-2 border rounded-lg transition-colors duration-300 ease-in-out`,
                    error ? "border-red-500" : "border-gray-300",
                    "focus:border-blue-500 focus:ring focus:ring-blue-300 outline-none",
                    className
                )}
                type="text"
                value={value}
                onChange={handleChange}
                style={style}
                placeholder={placeholder}
            />
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default EmailInput;
