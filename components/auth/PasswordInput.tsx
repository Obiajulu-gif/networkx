"use client";

import { useState } from "react";
import AuthInput from "./AuthInput";

type PasswordInputProps = {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoComplete?: string;
};

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 3l18 18" />
      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
      <path d="M9.9 5.1A9.8 9.8 0 0 1 12 5c6 0 9.5 7 9.5 7a16.6 16.6 0 0 1-3.1 4.2" />
      <path d="M6.4 6.4A16.5 16.5 0 0 0 2.5 12s3.5 7 9.5 7a9.8 9.8 0 0 0 3.7-.7" />
    </svg>
  );
}

export default function PasswordInput({
  label,
  name,
  placeholder,
  value,
  onChange,
  required,
  autoComplete,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <AuthInput
      label={label}
      name={name}
      type={visible ? "text" : "password"}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      autoComplete={autoComplete}
      rightElement={
        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className="flex h-8 w-8 items-center justify-center rounded-full text-[#9aa4b2] transition hover:text-[#d7dfef] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2d8cff]"
        >
          <span className="relative h-4 w-4">
            <EyeIcon
              className={`absolute inset-0 transition-opacity duration-200 ${
                visible ? "opacity-0" : "opacity-100"
              }`}
            />
            <EyeOffIcon
              className={`absolute inset-0 transition-opacity duration-200 ${
                visible ? "opacity-100" : "opacity-0"
              }`}
            />
          </span>
        </button>
      }
    />
  );
}
