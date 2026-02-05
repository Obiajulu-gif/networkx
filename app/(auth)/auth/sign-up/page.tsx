"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AuthInput from "@/components/auth/AuthInput";
import PasswordInput from "@/components/auth/PasswordInput";
import OrDivider from "@/components/auth/OrDivider";
import GoogleButton from "@/components/auth/GoogleButton";
import { googleSignIn, register } from "@/lib/api/auth";
import type { ApiError } from "@/lib/api/axiosClient";
import { setSession } from "@/lib/auth/session";
import { requestGoogleCredential } from "@/lib/auth/google";

type CountryOption = {
  code: string;
  label: string;
  flag: string;
};

const countryOptions: CountryOption[] = [
  { code: "+1", label: "United States", flag: "🇺🇸" },
  { code: "+44", label: "United Kingdom", flag: "🇬🇧" },
  { code: "+234", label: "Nigeria", flag: "🇳🇬" },
  { code: "+233", label: "Ghana", flag: "🇬🇭" },
  { code: "+27", label: "South Africa", flag: "🇿🇦" },
  { code: "+254", label: "Kenya", flag: "🇰🇪" },
  { code: "+91", label: "India", flag: "🇮🇳" },
  { code: "+61", label: "Australia", flag: "🇦🇺" },
  { code: "+49", label: "Germany", flag: "🇩🇪" },
  { code: "+33", label: "France", flag: "🇫🇷" },
];

export default function SignUpPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState(countryOptions[0].code);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [updates, setUpdates] = useState(false);
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countryOpen, setCountryOpen] = useState(false);
  const countryRef = useRef<HTMLDivElement | null>(null);

  const selectedCountry =
    countryOptions.find((option) => option.code === countryCode) ||
    countryOptions[0];

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!countryRef.current) return;
      if (!countryRef.current.contains(event.target as Node)) {
        setCountryOpen(false);
      }
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCountryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const isActive =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    username.trim().length > 0 &&
    email.trim().length > 0 &&
    password.trim().length > 0 &&
    terms;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isActive || loading) return;
    setError(null);
    setLoading(true);
    try {
      const normalizedPhone = phoneNumber.trim().replace(/^\+/, "");
      const fullPhone = normalizedPhone
        ? `${countryCode}${normalizedPhone}`
        : undefined;

      await register(
        {
          first_name: firstName,
          last_name: lastName,
          email,
          username,
          password,
          phone: fullPhone,
          subscribed_email_campaigns: updates,
          subscribed_sms_campaigns: updates,
        },
        true
      );
      router.push(`/auth/confirm-email?email=${encodeURIComponent(email)}`);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "Unable to create account.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    if (googleLoading) return;
    setError(null);
    setGoogleLoading(true);
    try {
      const credentials = await requestGoogleCredential();
      const data = await googleSignIn({ credentials, isForeverFree: false });
      if (data?.token) {
        setSession({ token: data.token, user: data.user });
      }
      router.push("/app/dashboard");
    } catch (err) {
      const apiError = err as ApiError;
      const message =
        apiError?.message ||
        (err instanceof Error ? err.message : null) ||
        "Google sign up failed.";
      setError(message);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="auth-enter space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold text-white lg:text-4xl">
          <span className="font-[var(--font-display)]">Sign Up</span>
        </h1>
        <p className="text-sm text-[#9aa4b2]">
          Please provide your credentials to get started.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <AuthInput
            label="First Name"
            name="first-name"
            placeholder="Enter first name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
            autoComplete="given-name"
          />
          <AuthInput
            label="Last Name"
            name="last-name"
            placeholder="Enter last name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            required
            autoComplete="family-name"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <AuthInput
            label="Username"
            name="username"
            placeholder="Enter username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
            autoComplete="username"
          />
          <AuthInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="text-xs font-medium text-[#9aa4b2]"
          >
            Phone Number
          </label>
          <div className="flex h-11 items-center rounded-lg border border-[#262c35] bg-[#11161c] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
            <div
              ref={countryRef}
              className="relative flex h-full items-center border-r border-[#262c35] px-3"
            >
              <button
                type="button"
                onClick={() => setCountryOpen((prev) => !prev)}
                className="flex items-center gap-2 text-xs text-[#d7dfea]"
                aria-haspopup="listbox"
                aria-expanded={countryOpen}
              >
                <span className="text-base" aria-hidden="true">
                  {selectedCountry.flag}
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="text-[#9aa4b2]"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {countryOpen && (
                <div
                  role="listbox"
                  className="absolute left-0 top-full z-20 mt-2 w-52 overflow-hidden rounded-lg border border-[#2a2f36] bg-[#151a21] shadow-[0_12px_30px_rgba(0,0,0,0.5)]"
                >
                  {countryOptions.map((option) => (
                    <button
                      key={option.code}
                      type="button"
                      onClick={() => {
                        setCountryCode(option.code);
                        setCountryOpen(false);
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-[#d7dfea] transition hover:bg-[#1f2530]"
                      role="option"
                      aria-selected={option.code === countryCode}
                    >
                      <span className="text-sm" aria-hidden="true">
                        {option.flag}
                      </span>
                      <span className="text-[#9aa4b2]">{option.code}</span>
                      <span className="truncate">{option.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex h-full flex-1 items-center px-3">
              <span className="text-sm text-[#9aa4b2]">{countryCode}</span>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="1234567890"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                className="ml-2 h-full w-full bg-transparent text-sm text-[#eef2ff] placeholder:text-[#6c7483] focus:outline-none"
              />
            </div>
          </div>
        </div>

        <PasswordInput
          label="Password"
          name="password"
          placeholder="Enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          autoComplete="new-password"
        />

        <div className="space-y-3">
          <label className="flex items-start gap-3 text-xs text-[#9aa4b2]">
            <input
              type="checkbox"
              checked={updates}
              onChange={(event) => setUpdates(event.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border border-[#2a2f36] bg-[#11161c] text-[#2d8cff] accent-[#2d8cff] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2d8cff]"
            />
            <span>
              I agree to receive important updates, offers, and promotions from
              NetworkX.ai
            </span>
          </label>
          <label className="flex items-start gap-3 text-xs text-[#9aa4b2]">
            <input
              type="checkbox"
              checked={terms}
              onChange={(event) => setTerms(event.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border border-[#2a2f36] bg-[#11161c] text-[#2d8cff] accent-[#2d8cff] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2d8cff]"
              required
            />
            <span>
              I have read and agreed to the terms of the{" "}
              <Link
                href="#"
                className="text-[#4aa1ff] hover:text-[#7bb8ff]"
              >
                policy pages
              </Link>
              . <span className="text-[#2d8cff]">*</span>
            </span>
          </label>
        </div>

        {error && <p className="text-xs text-[#ff6b6b]">{error}</p>}

        <button
          type="submit"
          disabled={!isActive || loading}
          className={`h-11 w-full rounded-lg text-sm font-semibold transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2d8cff] ${
            isActive && !loading
              ? "bg-[#2d8cff] text-white hover:brightness-110"
              : "bg-[#2a2f36] text-[#8b94a6]"
          }`}
        >
          {loading ? "Creating..." : "Continue"}
        </button>
      </form>

      <OrDivider />

      <GoogleButton
        label="Sign Up With Google"
        loading={googleLoading}
        onClick={handleGoogleSignUp}
      />

      <p className="text-center text-xs text-[#8f98a8]">
        Already have an account?{" "}
        <Link
          href="/auth/sign-in"
          className="text-[#4aa1ff] transition hover:text-[#7bb8ff]"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
