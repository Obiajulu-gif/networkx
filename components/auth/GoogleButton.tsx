type GoogleButtonProps = {
  label: string;
  disabled?: boolean;
};

function GoogleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M23.49 12.27c0-.82-.07-1.6-.2-2.36H12v4.47h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.55-5.17 3.55-8.73Z"
        fill="#4285F4"
      />
      <path
        d="M12 24c3.24 0 5.96-1.08 7.95-2.92l-3.88-3c-1.08.73-2.47 1.17-4.07 1.17-3.13 0-5.79-2.11-6.74-4.95H1.25v3.12A12 12 0 0 0 12 24Z"
        fill="#34A853"
      />
      <path
        d="M5.26 14.3a7.2 7.2 0 0 1-.38-2.3c0-.8.13-1.58.38-2.3V6.58H1.25A12 12 0 0 0 0 12c0 1.94.47 3.78 1.25 5.42l4.01-3.12Z"
        fill="#FBBC05"
      />
      <path
        d="M12 4.75c1.76 0 3.34.6 4.58 1.78l3.43-3.43C17.95 1.16 15.24 0 12 0A12 12 0 0 0 1.25 6.58l4.01 3.12C6.21 6.86 8.87 4.75 12 4.75Z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function GoogleButton({ label, disabled }: GoogleButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className="flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-[#2a2f36] bg-[#151a21] text-sm font-medium text-[#d5dbea] transition hover:border-[#3a404a] hover:bg-[#1a2029] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
    >
      <GoogleIcon />
      <span>{label}</span>
    </button>
  );
}
