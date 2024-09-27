import React, { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { cn } from "../utils/tw-merge";
import hidePasswordImage from "../assets/hide-password.svg";
import showPasswordImage from "../assets/show-password.svg";

export interface PasswordSetterProps {
    label: string;
    name: string;
    placeholder?: string;
    placeholderConfirmPassword?: string;
    required?: boolean;
    pattern?: RegExp;
    onInputChange?: (name: string, value: string) => void;
    onError?: (name: string, error: string) => void;
    isSubmitted?: boolean;
    conditionsText?: string;
    className?: string;
    style?: React.CSSProperties;
}

const PasswordSetter: React.FC<PasswordSetterProps> = ({
    label,
    name,
    placeholder = `Enter your ${label}`,
    placeholderConfirmPassword = `Re-enter your ${label}`,
    required,
    pattern,
    onInputChange,
    onError = () => {},
    isSubmitted,
    conditionsText,
    className = "",
    style = {},
}) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordValidations, setPasswordValidations] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
    });
    const [error, setError] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
    const [showConditions, setShowConditions] = useState(false);
    const debouncedPassword = useDebounce(password, 300);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleShowConditions = () => {
        setShowConditions(!showConditions);
    };

    useEffect(() => {
        const newValidations = {
            length: debouncedPassword.length >= 8,
            uppercase: /[A-Z]/.test(debouncedPassword),
            lowercase: /[a-z]/.test(debouncedPassword),
            number: /[0-9]/.test(debouncedPassword),
        };

        setPasswordValidations(newValidations);

        const allValid = Object.values(newValidations).every(Boolean);

        setShowConditions(debouncedPassword.trim() !== "" && !allValid);

        let errorMsg = "";
        if (!allValid && debouncedPassword.trim() !== "") {
            errorMsg = `${label} does not meet the required conditions.`;
        }
        if (allValid) {
            onError(name, "");
        }

        onError(name, errorMsg);
    }, [debouncedPassword, label, name, onError]);

    useEffect(() => {
        if (isSubmitted) {
            let errorMsg = "";
            let confirmPasswordErrorMsg = "";

            if (required && password.trim() === "") {
                errorMsg = `${label} is required.`;
            } else if (required && confirmPassword.trim() === "") {
                confirmPasswordErrorMsg = `confirm password is required.`;
            } else if (pattern && !pattern.test(password)) {
                errorMsg = conditionsText || `${label} is not valid.`;
            }

            setError(errorMsg);
            setErrorConfirmPassword(confirmPasswordErrorMsg);
            onError(name, errorMsg);
        } else {
            setError("");
            onError(name, "");
            setErrorConfirmPassword("");
        }
    }, [
        isSubmitted,
        required,
        pattern,
        password,
        confirmPassword,
        label,
        onError,
        conditionsText,
    ]);

    useEffect(() => {
        if (password !== confirmPassword || confirmPassword.trim() === "") {
            onError("confirmPassword", "Does not match or is required");
        } else if (password === confirmPassword) {
            onError("confirmPassword", "");
        }
    }, [onError, password, confirmPassword]);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        onInputChange?.(name, e.target.value);
    };

    const handleConfirmPasswordChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setConfirmPassword(e.target.value);
    };

    const passwordInputClasses = cn(
        `w-full px-4 py-2 border rounded-lg transition-colors duration-300 ease-in-out`,
        error ? "border-red-500" : "border-gray-300",
        {
            "border-green-500":
                passwordValidations.length &&
                passwordValidations.uppercase &&
                passwordValidations.lowercase &&
                passwordValidations.number,
        },
        "focus:ring focus:ring-blue-300 outline-none"
    );

    return (
        <div className={cn("mb-4", className)} style={style}>
            <label className="block mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative mb-4">
                <input
                    className={passwordInputClasses}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder={placeholder}
                    name={name}
                    onChange={handlePasswordChange}
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

                {showConditions && !pattern && (
                    <div
                        className={`absolute right-4 mr-2 w-48 rounded-md bg-gray-200 text-gray-800 p-1 text-xs transition-opacity duration-300 z-20 ${
                            !error && password !== ""
                                ? "opacity-100"
                                : "opacity-0"
                        }`}
                    >
                        <p
                            className={`text-sm ${
                                passwordValidations.length
                                    ? "text-green-500"
                                    : "text-red-500"
                            }`}
                        >
                            Minimum 8 characters
                        </p>
                        <p
                            className={`text-sm ${
                                passwordValidations.uppercase
                                    ? "text-green-500"
                                    : "text-red-500"
                            }`}
                        >
                            At least one uppercase letter
                        </p>
                        <p
                            className={`text-sm ${
                                passwordValidations.lowercase
                                    ? "text-green-500"
                                    : "text-red-500"
                            }`}
                        >
                            At least one lowercase letter
                        </p>
                        <p
                            className={`text-sm ${
                                passwordValidations.number
                                    ? "text-green-500"
                                    : "text-red-500"
                            }`}
                        >
                            At least one number
                        </p>
                    </div>
                )}
            </div>
            {error && <p className="text-red-500">{error}</p>}

            <label className="block mt-4 mb-1">
                Confirm {label}{" "}
                {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                <input
                    className={cn(
                        `w-full px-4 py-2 border rounded-lg transition-colors duration-300 ease-in-out`,
                        confirmPassword && password === confirmPassword
                            ? "border-green-500"
                            : "border-gray-300",
                        "focus:border-blue-500 focus:ring focus:ring-blue-300 outline-none"
                    )}
                    name={name}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={placeholderConfirmPassword}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                />
                <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute transform -translate-y-1/2 right-3 top-1/2"
                >
                    <img
                        src={
                            showConfirmPassword
                                ? hidePasswordImage
                                : showPasswordImage
                        }
                        alt={
                            showConfirmPassword
                                ? "Hide Password"
                                : "Show Password"
                        }
                        width={20}
                        height={20}
                    />
                </button>
            </div>
            {password && confirmPassword && password !== confirmPassword && (
                <p className="text-red-500">Passwords do not match.</p>
            )}
            {errorConfirmPassword && (
                <p className="text-red-500">{errorConfirmPassword}</p>
            )}
        </div>
    );
};

export default PasswordSetter;
