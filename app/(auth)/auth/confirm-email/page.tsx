"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, Suspense } from "react";
import AuthInput from "@/components/auth/AuthInput";
import { sendVerificationOtp, verifyUserOtp } from "@/lib/api/auth";
import type { ApiError } from "@/lib/api/axiosClient";

function ConfirmEmailContent() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [email, setEmail] = useState("");
	const [step, setStep] = useState<"email" | "otp">("email");
	const [otp, setOtp] = useState<string[]>(Array.from({ length: 6 }, () => ""));
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [autoSend, setAutoSend] = useState(false);
	const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
	const autoSendRef = useRef(false);

	useEffect(() => {
		const queryEmail = searchParams.get("email");
		if (queryEmail) {
			setEmail(queryEmail);
			setAutoSend(true);
		}
	}, [searchParams]);

	useEffect(() => {
		if (!autoSend || !email || autoSendRef.current) return;
		autoSendRef.current = true;

		const send = async () => {
			setError(null);
			setLoading(true);
			try {
				await sendVerificationOtp({ channel: "email", email });
				setStep("otp");
			} catch (err) {
				const apiError = err as ApiError;
				setError(apiError.message || "Unable to send verification code.");
				setStep("email");
				autoSendRef.current = false;
			} finally {
				setLoading(false);
			}
		};

		void send();
	}, [autoSend, email]);

	const emailReady = email.trim().length > 0;
	const otpReady = otp.every((digit) => digit.length === 1);

	const handleOtpChange = (index: number, value: string) => {
		if (!/^[0-9]?$/.test(value)) {
			return;
		}
		const updated = [...otp];
		updated[index] = value;
		setOtp(updated);

		if (value && inputRefs.current[index + 1]) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handleOtpKeyDown = (
		index: number,
		event: React.KeyboardEvent<HTMLInputElement>,
	) => {
		if (
			event.key === "Backspace" &&
			!otp[index] &&
			inputRefs.current[index - 1]
		) {
			inputRefs.current[index - 1]?.focus();
		}
	};

	const handleOtpPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
		const pasted = event.clipboardData.getData("text").replace(/\D/g, "");
		if (!pasted) return;
		const next = Array.from({ length: 6 }, (_, idx) => pasted[idx] ?? "");
		setOtp(next);
		let lastFilled = -1;
		next.forEach((digit, idx) => {
			if (digit) lastFilled = idx;
		});
		const focusIndex = lastFilled === -1 ? 0 : Math.min(lastFilled + 1, 5);
		inputRefs.current[focusIndex]?.focus();
	};

	const handleSendOtp = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!emailReady || loading) return;
		setError(null);
		setLoading(true);
		try {
			await sendVerificationOtp({ channel: "email", email });
			setStep("otp");
		} catch (err) {
			const apiError = err as ApiError;
			setError(apiError.message || "Unable to send verification code.");
		} finally {
			setLoading(false);
		}
	};

	const handleVerifyOtp = async () => {
		if (!otpReady || loading) return;
		setError(null);
		setLoading(true);
		try {
			await verifyUserOtp({
				otp: otp.join(""),
				type: "email",
				email,
			});
			router.push("/app/dashboard");
		} catch (err) {
			const apiError = err as ApiError;
			setError(apiError.message || "Invalid verification code.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="auth-enter space-y-6">
			{step === "email" ? (
				<>
					<div className="space-y-2 text-center lg:text-left">
						<h1 className="text-3xl font-semibold text-white lg:text-4xl">
							<span className="font-[var(--font-display)]">
								Confirm Your Email Address
							</span>
						</h1>
						<p className="text-sm text-[#9aa4b2]">
							Keep your account safe by verifying your email.
						</p>
					</div>

					<form className="space-y-4" onSubmit={handleSendOtp}>
						<AuthInput
							label="Email Address"
							name="confirm-email"
							type="email"
							placeholder="Enter email address"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							required
							autoComplete="email"
						/>

						<div className="flex justify-end">
							<Link
								href="#"
								className="text-xs text-[#4aa1ff] transition hover:text-[#7bb8ff]"
							>
								Use phone number to verify instead
							</Link>
						</div>

						{error && <p className="text-xs text-[#ff6b6b]">{error}</p>}

						<button
							type="submit"
							disabled={!emailReady || loading}
							className={`h-11 w-full rounded-lg text-sm font-semibold transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2d8cff] ${
								emailReady && !loading
									? "bg-[#2d8cff] text-white hover:brightness-110"
									: "bg-[#2a2f36] text-[#8b94a6]"
							}`}
						>
							{loading ? "Sending..." : "Continue"}
						</button>
					</form>
				</>
			) : (
				<>
					<div className="space-y-2 text-center">
						<h1 className="text-3xl font-semibold text-white lg:text-4xl">
							<span className="font-[var(--font-display)]">Enter OTP</span>
						</h1>
						<p className="text-sm text-[#9aa4b2]">
							Please enter the 6-digit code sent to your email address:{" "}
							<span className="text-[#d5dbea]">{email}</span>
						</p>
						<p className="text-xs text-[#9aa4b2]">3:00 Minutes Remaining</p>
					</div>

					<div className="space-y-5">
						<div className="flex justify-center gap-2">
							{otp.map((digit, index) => (
								<input
									key={`otp-${index}`}
									ref={(el) => {
										inputRefs.current[index] = el;
									}}
									type="text"
									inputMode="numeric"
									autoComplete="one-time-code"
									maxLength={1}
									value={digit}
									onChange={(event) =>
										handleOtpChange(index, event.target.value)
									}
									onKeyDown={(event) => handleOtpKeyDown(index, event)}
									onPaste={handleOtpPaste}
									className="h-12 w-12 rounded-lg border border-[#262c35] bg-[#11161c] text-center text-base font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition focus-visible:border-[#2d8cff] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2d8cff] focus-visible:shadow-[0_0_0_4px_rgba(45,140,255,0.16)]"
									aria-label={`OTP digit ${index + 1}`}
								/>
							))}
						</div>

						<div className="flex justify-center gap-2 text-xs text-[#9aa4b2]">
							<span>Didn&apos;t receive the code?</span>
							<Link
								href="#"
								className="text-[#4aa1ff] transition hover:text-[#7bb8ff]"
							>
								Click to resend
							</Link>
						</div>

						{error && (
							<p className="text-center text-xs text-[#ff6b6b]">{error}</p>
						)}

						<button
							type="button"
							disabled={!otpReady || loading}
							onClick={handleVerifyOtp}
							className={`h-11 w-full rounded-lg text-sm font-semibold transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2d8cff] ${
								otpReady && !loading
									? "bg-[#2d8cff] text-white hover:brightness-110"
									: "bg-[#2a2f36] text-[#8b94a6]"
							}`}
						>
							{loading ? "Verifying..." : "Continue"}
						</button>
					</div>
				</>
			)}
		</div>
	);
}

export default function ConfirmEmailPage() {
	return (
		<Suspense
			fallback={
				<div className="auth-enter space-y-6">
					<div className="space-y-2 text-center lg:text-left">
						<h1 className="text-3xl font-semibold text-white lg:text-4xl">
							<span className="font-[var(--font-display)]">
								Confirm Your Email Address
							</span>
						</h1>
						<p className="text-sm text-[#9aa4b2]">Loading...</p>
					</div>
				</div>
			}
		>
			<ConfirmEmailContent />
		</Suspense>
	);
}
