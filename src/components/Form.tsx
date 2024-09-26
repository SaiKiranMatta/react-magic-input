import React, { useState, ReactElement, useCallback, useEffect } from "react";
import { cn } from "../utils/tw-merge";

export interface FormProps {
    onSubmit: (data: Record<string, any>) => void;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const Form: React.FC<FormProps> = ({
    onSubmit,
    children,
    className = "",
    style = {},
}) => {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = useCallback((name: string, value: any) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleError = useCallback((name: string, error: string) => {
        setErrors((prev) => ({ ...prev, [name]: error }));
    }, []);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);

        const newErrors: Record<string, string> = {};

        const filteredErrors = Object.values(errors).filter(
            (error) => error.trim() !== ""
        );

        if (filteredErrors.length > 0) {
            console.log("Cannot submit, errors present:", errors);
            setIsSubmitted(false);
            return;
        }

        React.Children.forEach(children, (child) => {
            // Check if the child is a valid React element and is required
            if (React.isValidElement(child) && child.props.required) {
                const { name, label } = child.props;
                const value = formData[name];

                // Only check for required fields; pattern validation is handled within the components
                if (!value || value === "") {
                    newErrors[name] = `${label || name} is required`;
                }
            }
        });

        // If there are any new errors, set them and stop submission
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            console.log("New errors found:", newErrors);
            setIsSubmitted(false);
            return;
        }

        setIsSubmitted(false);
        // If no errors, proceed with form submission
        onSubmit(formData);
    };

    return (
        <form
            onSubmit={handleFormSubmit}
            className={cn("space-y-4 p-6 rounded-lg border", className)}
            style={style}
        >
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child) && child.props.name) {
                    return React.cloneElement(child as ReactElement<any>, {
                        onInputChange: handleInputChange,
                        onError: handleError,
                        isSubmitted,
                    });
                }

                return child;
            })}
        </form>
    );
};

export default Form;
