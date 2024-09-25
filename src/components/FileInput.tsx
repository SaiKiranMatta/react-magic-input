import React, { useState, useEffect } from "react";
import { cn } from "../utils/tw-merge";

export interface FileInputProps {
    label: string;
    name: string;
    required?: boolean;
    acceptedTypes?: string[];
    maxSizeMB?: number;
    onInputChange?: (name: string, value: File | null) => void;
    onError?: (name: string, error: string) => void;
    isSubmitted?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

const FileInput: React.FC<FileInputProps> = ({
    label,
    name,
    required = false,
    acceptedTypes = [],
    maxSizeMB = 5,
    onInputChange,
    onError = () => {},
    isSubmitted,
    className = "",
    style = {},
}) => {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string>("");
    const [isUploading, setIsUploading] = useState<boolean>(false);

    useEffect(() => {
        if (isSubmitted && required && !file) {
            setError(`${label} is required.`);
            onError(name, `${label} is required.`);
        } else {
            setError("");
            onError(name, "");
        }
    }, [isSubmitted, required, file, label, name, onError]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        if (!selectedFile) {
            setFile(null);
            setError("No file selected.");
            onError(name, "No file selected.");
            return;
        }

        if (
            acceptedTypes.length &&
            !acceptedTypes.includes(selectedFile.type)
        ) {
            setError(
                `Invalid file type. Accepted: ${acceptedTypes.join(", ")}`
            );
            onError(name, `Invalid file type.`);
            return;
        }

        if (maxSizeMB && selectedFile.size / 1024 / 1024 > maxSizeMB) {
            setError(`File size exceeds ${maxSizeMB} MB.`);
            onError(name, `File size exceeds ${maxSizeMB} MB.`);
            return;
        }

        setIsUploading(true);
        setFile(selectedFile);
        onInputChange?.(name, selectedFile);

        setTimeout(() => {
            setIsUploading(false);
            setError("");
        }, 1500);
    };

    return (
        <div className="mb-4">
            <label className="block mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div
                className={cn(
                    "relative w-full p-4 border border-dashed rounded-lg transition-colors duration-300 ease-in-out",
                    error ? "border-red-500" : "border-gray-300",
                    "focus-within:border-blue-500 focus-within:ring focus-within:ring-blue-300",
                    className
                )}
                style={style}
            >
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept={acceptedTypes.join(",")}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="text-center">
                    {file ? (
                        <div className="text-gray-700">
                            {file.name}
                            <p className="text-sm text-gray-500">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                        </div>
                    ) : (
                        <p className="text-gray-500">No file selected</p>
                    )}
                </div>
            </div>
            {isUploading && (
                <div className="mt-2">
                    <div className="relative w-full h-1 overflow-hidden bg-gray-300 rounded-full">
                        <div
                            className="absolute h-full bg-blue-500 rounded-full animate-pulse"
                            style={{ width: "100%" }}
                        />
                    </div>
                    <p className="mt-1 text-sm text-blue-500">Uploading...</p>
                </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default FileInput;
