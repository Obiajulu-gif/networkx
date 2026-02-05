"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthInput from "@/components/auth/AuthInput";
import PasswordInput from "@/components/auth/PasswordInput";
import OrDivider from "@/components/auth/OrDivider";
import GoogleButton from "@/components/auth/GoogleButton";
import { login, googleSignIn } from "@/lib/api/auth";
import type { ApiError } from "@/lib/api/axiosClient";
import { setSession } from "@/lib/auth/session";
import { requestGoogleCredential } from "@/lib/auth/google";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isActive = email.trim().length > 0 && password.trim().length > 0;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isActive || loading) return;
    setError(null);
    setLoading(true);
    try {
      const data = await login({ login: email, password });
      if (data?.token) {
        setSession({ token: data.token, user: data.user });
      }
      router.push("/app/dashboard");
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
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
        "Google sign in failed.";
      setError(message);
    } finally {
      setGoogleLoading(false);
    }
  };

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

      <form className="space-y-4" onSubmit={handleSubmit}>
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
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <OrDivider />

      <GoogleButton
        label="Sign In With Google"
        loading={googleLoading}
        onClick={handleGoogleSignIn}
      />

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
