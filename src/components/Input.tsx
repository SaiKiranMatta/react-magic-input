import React, { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { cn } from "../utils/tw-merge";

export interface InputProps {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    pattern?: RegExp;
    onInputChange?: (name: string, value: string) => void;
    onError?: (name: string, error: string) => void;
    isSubmitted?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

const Input: React.FC<InputProps> = ({
    label,
    name,
    type = "text",
    placeholder = `Enter ${label}`,
    required,
    pattern,
    onInputChange,
    onError = () => {},
    isSubmitted,
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
        } else if (pattern && !pattern.test(debouncedValue)) {
            errorMsg = `${label} is not valid.`;
        }

        setError(errorMsg);
        onError(name, errorMsg);
        onInputChange?.(name, debouncedValue);
    }, [debouncedValue, pattern, label, name, onInputChange]);

    useEffect(() => {
        if (isSubmitted) {
            if (required && value.trim() === "") {
                const requiredError = `${label} is required.`;
                setError(requiredError);
                onError(name, requiredError);
            } else if (pattern && !pattern.test(value)) {
                const patternError = `${label} is not valid.`;
                setError(patternError);
                onError(name, patternError);
            } else {
                setError("");
                onError(name, "");
            }
        }
    }, [isSubmitted, required, pattern, value, label, name, onError]);

    // useEffect(() => console.log("submitted", isSubmitted), [isSubmitted]);

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
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                style={style}
            />
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default Input;
