import React from "react";
import { cn } from "../utils/tw-merge";

export interface CheckboxGroupProps {
    label: string;
    name: string;
    options: string[];
    required?: boolean;
    onInputChange?: (name: string, selectedValues: string[]) => void;
    className?: string;
    style?: React.CSSProperties; // Allow for normal CSS styles
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
    label,
    name,
    options,
    required,
    onInputChange,
    className = "",
    style = {},
}) => {
    const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

    const handleChange = (option: string) => {
        const updatedSelectedValues = selectedValues.includes(option)
            ? selectedValues.filter((value) => value !== option) // Deselect if already selected
            : [...selectedValues, option]; // Select if not already selected

        setSelectedValues(updatedSelectedValues);
        onInputChange?.(name, updatedSelectedValues);
    };

    return (
        <div className={cn("mb-4", className)} style={style}>
            <label className="font-semibold">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="flex flex-col mt-2 space-y-2">
                {options.map((option) => (
                    <label
                        key={option}
                        className="flex items-center cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            name={name}
                            value={option}
                            onChange={() => handleChange(option)}
                            className="hidden peer"
                        />
                        <span className="inline-block w-4 h-4 mr-2 border-2 border-gray-300 rounded-md peer-checked:border-blue-500 peer-checked:bg-blue-500"></span>
                        <span className="text-gray-700">{option}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default CheckboxGroup;
