import React, { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { cn } from "../utils/tw-merge";

export interface SliderInputProps {
    label: string;
    name: string;
    required?: boolean;
    min?: number;
    max?: number;
    step?: number;
    onInputChange?: (name: string, value: number) => void;
    onError?: (name: string, error: string) => void;
    isSubmitted?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

const SliderInput: React.FC<SliderInputProps> = ({
    label,
    name,
    required,
    min = 0,
    max = 100,
    step = 1,
    onInputChange,
    onError = () => {},
    isSubmitted,
    className = "",
    style = {},
}) => {
    const [value, setValue] = useState<number>(min);
    const [error, setError] = useState("");
    const debouncedValue = useDebounce(value, 300);

    useEffect(() => {
        let errorMsg = "";

        if (debouncedValue < min || debouncedValue > max) {
            errorMsg = `${label} must be between ${min} and ${max}.`;
        }

        setError(errorMsg);
        onError(name, errorMsg);
        onInputChange?.(name, debouncedValue);
    }, [debouncedValue, min, max, label, name, onError, onInputChange]);

    // Handle submission validation
    useEffect(() => {
        if (isSubmitted && required && (value < min || value > max)) {
            const requiredError = `${label} is required and must be between ${min} and ${max}.`;
            setError(requiredError);
            onError(name, requiredError);
        } else if (isSubmitted) {
            setError("");
            onError(name, "");
        }
    }, [isSubmitted, required, value, min, max, label, name, onError]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        setValue(newValue);
    };

    return (
        <div className="mb-4">
            <label className="block mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleChange}
                className={cn(
                    `w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer`,
                    error ? "border-red-500" : "border-gray-300",
                    className
                )}
                style={style}
            />
            <div className="mt-2 text-center">
                <span>{value}</span>
            </div>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default SliderInput;
