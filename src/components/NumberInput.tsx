import React, { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { cn } from "../utils/tw-merge";

export interface NumberInputProps {
    label: string;
    name: string;
    required?: boolean;
    placeholder?: string;
    min?: number;
    max?: number;
    integer?: boolean;
    onInputChange?: (name: string, value: number) => void;
    onError?: (name: string, error: string) => void;
    isSubmitted?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

const NumberInput: React.FC<NumberInputProps> = ({
    label,
    name,
    required,
    placeholder = `Enter ${label}`,
    min,
    max,
    integer = false,
    onInputChange,
    onError = () => {},
    isSubmitted,
    className = "",
    style = {},
}) => {
    const [value, setValue] = useState<number | "">("");
    const [error, setError] = useState("");
    const debouncedValue = useDebounce(value, 300);

    useEffect(() => {
        let errorMsg = "";

        if (debouncedValue === "") {
            errorMsg = "";
        } else if (integer && !Number.isInteger(debouncedValue)) {
            errorMsg = `${label} must be an integer.`;
        } else if (min !== undefined && debouncedValue < min) {
            errorMsg = `${label} must be at least ${min}.`;
        } else if (max !== undefined && debouncedValue > max) {
            errorMsg = `${label} must not exceed ${max}.`;
        }

        setError(errorMsg);
        onError(name, errorMsg);
        onInputChange?.(name, debouncedValue as number);
    }, [debouncedValue, integer, min, max, label, name, onInputChange]);

    useEffect(() => {
        if (isSubmitted) {
            if (required && (value === "" || value === undefined)) {
                const requiredError = `${label} is required.`;
                setError(requiredError);
                onError(name, requiredError);
            } else if (integer && !Number.isInteger(value)) {
                const integerError = `${label} must be an integer.`;
                setError(integerError);
                onError(name, integerError);
            } else if (min !== undefined && (value as number) < min) {
                const minError = `${label} must be at least ${min}.`;
                setError(minError);
                onError(name, minError);
            } else if (max !== undefined && (value as number) > max) {
                const maxError = `${label} must not exceed ${max}.`;
                setError(maxError);
                onError(name, maxError);
            } else {
                setError("");
                onError(name, "");
            }
        }
    }, [isSubmitted, required, min, max, value, label, name, onError, integer]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue === "" ? "" : parseFloat(newValue));
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
                type="number"
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                style={style}
                min={min}
                max={max}
            />
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default NumberInput;
