import type { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";

export type AuthInputProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoComplete?: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
  rightElement?: ReactNode;
  leftElement?: ReactNode;
  disabled?: boolean;
};

export default function AuthInput({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  autoComplete,
  inputMode,
  rightElement,
  leftElement,
  disabled,
}: AuthInputProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="text-xs font-medium text-[#9aa4b2]"
      >
        {label}
        {required && <span className="text-[#2d8cff]"> *</span>}
      </label>
      <div className="relative">
        {leftElement && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            {leftElement}
          </div>
        )}
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          inputMode={inputMode}
          disabled={disabled}
          className={`h-11 w-full rounded-lg border border-[#262c35] bg-[#11161c] px-4 text-sm text-[#eef2ff] placeholder:text-[#6c7483] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition focus-visible:border-[#2d8cff] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2d8cff] focus-visible:shadow-[0_0_0_4px_rgba(45,140,255,0.16)] disabled:cursor-not-allowed disabled:opacity-70 ${
            leftElement ? "pl-[118px]" : ""
          } ${rightElement ? "pr-11" : ""}`}
          aria-required={required}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}
