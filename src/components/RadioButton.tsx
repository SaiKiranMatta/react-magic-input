import React from "react";
import { cn } from "../utils/tw-merge";

export interface RadioButtonProps {
    label: string;
    name: string;
    options: string[];
    required?: boolean;
    onInputChange?: (name: string, value: string) => void;
    onError?: (name: string, error: string) => void;
    className?: string;
    style?: React.CSSProperties;
}

const RadioButton: React.FC<RadioButtonProps> = ({
    label,
    name,
    options,
    required,
    onInputChange,
    className = "",
    style = {},
}) => {
    const handleChange = (value: string) => {
        onInputChange?.(name, value);
    };

    return (
        <div className={cn("mb-4 flex flex-col", className)} style={style}>
            <label className="font-semibold">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="flex mt-2 space-x-4">
                {options.map((option) => (
                    <label
                        key={option}
                        className="flex items-center cursor-pointer"
                    >
                        <input
                            type="radio"
                            name={name}
                            value={option}
                            onChange={() => handleChange(option)}
                            className="hidden peer"
                        />
                        <span className="inline-block w-4 h-4 mr-2 border-2 border-gray-300 rounded-full peer-checked:border-blue-500 peer-checked:bg-blue-500"></span>
                        <span className="text-gray-700">{option}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default RadioButton;
