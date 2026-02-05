"use client";

import Link from "next/link";
import { useState } from "react";
import AuthInput from "@/components/auth/AuthInput";
import PasswordInput from "@/components/auth/PasswordInput";
import OrDivider from "@/components/auth/OrDivider";
import GoogleButton from "@/components/auth/GoogleButton";

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [updates, setUpdates] = useState(false);
  const [terms, setTerms] = useState(false);

  const isActive =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    username.trim().length > 0 &&
    email.trim().length > 0 &&
    password.trim().length > 0 &&
    terms;

  return (
    <div className="auth-enter space-y-4">
      <div className="space-y-1 text-center">
        <h1 className="text-3xl font-semibold text-white lg:text-4xl">
          <span className="font-[var(--font-display)]">Sign Up</span>
        </h1>
        <p className="text-sm text-[#9aa4b2]">
          Please provide your credentials to get started.
        </p>
      </div>

      <div className="space-y-2">
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
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <div className="flex items-center gap-2 rounded-md border border-[#262c35] bg-[#11161c] px-2 py-1 text-xs text-[#d7dfea]">
                <span
                  className="h-4 w-6 overflow-hidden rounded-sm border border-white/20"
                  aria-hidden="true"
                >
                  <span className="block h-full w-full bg-[linear-gradient(180deg,#b22234_0%,#b22234_14%,#ffffff_14%,#ffffff_28%,#b22234_28%,#b22234_42%,#ffffff_42%,#ffffff_56%,#b22234_56%,#b22234_70%,#ffffff_70%,#ffffff_84%,#b22234_84%,#b22234_100%)]">
                    <span className="block h-full w-2.5 bg-[#3c3b6e]" />
                  </span>
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
                <span className="text-[#9aa4b2]">+1</span>
              </div>
            </div>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1(123)456-7890"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="h-11 w-full rounded-lg border border-[#262c35] bg-[#11161c] px-4 pl-[118px] text-sm text-[#eef2ff] placeholder:text-[#6c7483] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition focus-visible:border-[#2d8cff] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2d8cff] focus-visible:shadow-[0_0_0_4px_rgba(45,140,255,0.16)]"
            />
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

        <button
          type="button"
          disabled={!isActive}
          className={`h-11 w-full rounded-lg text-sm font-semibold transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2d8cff] ${
            isActive
              ? "bg-[#2d8cff] text-white hover:brightness-110"
              : "bg-[#2a2f36] text-[#8b94a6]"
          }`}
        >
          Continue
        </button>
      </div>

      <OrDivider />

      <GoogleButton label="Sign Up With Google" />

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
