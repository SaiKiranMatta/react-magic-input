import React, { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce"; // Assuming this is your debounce hook
import { cn } from "../utils/tw-merge"; // Utility for merging class names
import hidePasswordImage from "../assets/hide-password.svg";
import showPasswordImage from "../assets/show-password.svg";

export interface PasswordInputProps {
    label?: string;
    name: string;
    placeholder?: string;
    required?: boolean;
    minLength?: number;
    onInputChange?: (name: string, value: string) => void;
    onError?: (name: string, error: string) => void;
    isSubmitted?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
    label = "Password",
    name,
    placeholder = `Enter your ${label}`,
    required,
    minLength = 6,
    onInputChange,
    onError = () => {},
    isSubmitted,
    className = "",
    style = {},
}) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const debouncedValue = useDebounce(value, 300);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        let errorMsg = "";

        if (debouncedValue.trim() === "") {
            errorMsg = "";
        } else if (debouncedValue.length < minLength) {
            errorMsg = `${label} must be at least ${minLength} characters long.`;
        }

        setError(errorMsg);
        onError(name, errorMsg);
        onInputChange?.(name, debouncedValue);
    }, [debouncedValue, minLength, label, name, onInputChange]);

    useEffect(() => {
        if (isSubmitted) {
            if (required && value.trim() === "") {
                const requiredError = `${label} is required.`;
                setError(requiredError);
                onError(name, requiredError);
            } else if (required && value.length < minLength) {
                const minLengthError = `${label} must be at least ${minLength} characters long.`;
                setError(minLengthError);
                onError(name, minLengthError);
            } else {
                setError("");
                onError(name, "");
            }
        }
    }, [isSubmitted, required, minLength, value, label, name, onError]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <div className="mb-4">
            <label className="block mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative mb-4">
                <input
                    className={cn(
                        `w-full px-4 py-2 border rounded-lg transition-colors duration-300 ease-in-out`,
                        error ? "border-red-500" : "border-gray-300",
                        "focus:border-blue-500 focus:ring focus:ring-blue-300 outline-none",
                        className
                    )}
                    type={showPassword ? "text" : "password"}
                    value={value}
                    placeholder={placeholder}
                    onChange={handleChange}
                    style={style}
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute transform -translate-y-1/2 right-3 top-1/2"
                >
                    <img
                        src={
                            showPassword ? hidePasswordImage : showPasswordImage
                        }
                        alt={showPassword ? "Hide Password" : "Show Password"}
                        width={20}
                        height={20}
                    />
                </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default PasswordInput;
