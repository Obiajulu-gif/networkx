"use client";

import Link from "next/link";
import { useState } from "react";
import AuthInput from "@/components/auth/AuthInput";
import PasswordInput from "@/components/auth/PasswordInput";
import OrDivider from "@/components/auth/OrDivider";
import GoogleButton from "@/components/auth/GoogleButton";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isActive = email.trim().length > 0 && password.trim().length > 0;

  return (
    <div className="auth-enter space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold text-white lg:text-4xl">
          <span className="font-[var(--font-display)]">Sign In</span>
        </h1>
        <p className="text-sm text-[#9aa4b2]">
          Enter your credentials to access your account.
        </p>
      </div>

      <div className="space-y-4">
        <AuthInput
          label="Email Address/Username"
          name="email"
          placeholder="Enter email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          autoComplete="username"
        />

        <PasswordInput
          label="Password"
          name="password"
          placeholder="Enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          autoComplete="current-password"
        />

        <div className="flex justify-end">
          <Link
            href="#"
            className="text-xs text-[#4aa1ff] transition hover:text-[#7bb8ff]"
          >
            Forgot Password?
          </Link>
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
          Sign In
        </button>
      </div>

      <OrDivider />

      <GoogleButton label="Sign In With Google" />

      <p className="text-center text-xs text-[#8f98a8]">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/sign-up"
          className="text-[#4aa1ff] transition hover:text-[#7bb8ff]"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
