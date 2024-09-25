import React from "react";
import { cn } from "../utils/tw-merge";

export interface ButtonProps {
    type: "button" | "submit";
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
    type,
    onClick,
    children,
    className = "",
    style = {},
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            style={style}
            className={cn(
                `px-4 py-2 bg-blue-500 text-white rounded-lg`,
                className
            )}
        >
            {children}
        </button>
    );
};

export default Button;
