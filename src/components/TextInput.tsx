import React, { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { cn } from "../utils/tw-merge";

export interface TextInputProps {
    label: string;
    name: string;
    placeholder?: string;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    allowSpecialChars?: boolean;
    allowSpaces?: boolean;
    transformToUppercase?: boolean;
    allowNumbers?: boolean;
    onInputChange?: (name: string, value: string) => void;
    onError?: (name: string, error: string) => void;
    isSubmitted?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

const TextInput: React.FC<TextInputProps> = ({
    label,
    name,
    placeholder = `Enter ${label}`,
    required,
    minLength,
    maxLength,
    allowSpecialChars = true,
    allowSpaces = true,
    transformToUppercase = false,
    allowNumbers = true,
    onInputChange,
    onError = () => {},
    isSubmitted,
    className = "",
    style = {},
}) => {
    const [value, setValue] = useState<string>("");
    const [error, setError] = useState<string>("");
    const debouncedValue = useDebounce(value, 300);

    const validateInput = (input: string): string => {
        let errorMsg = "";

        if (minLength && input.length < minLength) {
            errorMsg = `${label} must be at least ${minLength} characters.`;
        } else if (maxLength && input.length > maxLength) {
            errorMsg = `${label} must not exceed ${maxLength} characters.`;
        } else if (!allowSpecialChars && /[!@#$%^&*(),.?":{}|<>]/.test(input)) {
            errorMsg = `${label} cannot contain special characters.`;
        } else if (!allowSpaces && /\s/.test(input)) {
            errorMsg = `${label} cannot contain spaces.`;
        } else if (!allowNumbers && /\d/.test(input)) {
            errorMsg = `${label} cannot contain numbers.`;
        }

        return errorMsg;
    };

    useEffect(() => {
        let errorMsg = "";

        if (debouncedValue.trim() !== "") {
            errorMsg = validateInput(debouncedValue);
        }

        setError(errorMsg);
        onError(name, errorMsg);
        onInputChange?.(name, debouncedValue);
    }, [
        debouncedValue,
        minLength,
        maxLength,
        allowSpecialChars,
        allowSpaces,
        allowNumbers,
        label,
        name,
        onInputChange,
    ]);

    useEffect(() => {
        if (isSubmitted) {
            let errorMsg = "";

            if (required && value.trim() === "") {
                errorMsg = `${label} is required.`;
            } else {
                errorMsg = validateInput(value);
            }

            setError(errorMsg);
            onError(name, errorMsg);
        }
    }, [
        isSubmitted,
        value,
        required,
        minLength,
        maxLength,
        allowSpecialChars,
        allowSpaces,
        allowNumbers,
        label,
        name,
        onError,
    ]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;

        if (transformToUppercase) {
            inputValue = inputValue.toUpperCase();
        }

        setValue(inputValue);
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
                placeholder={placeholder}
                onChange={handleChange}
                style={style}
            />
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default TextInput;
