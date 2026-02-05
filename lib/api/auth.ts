import api from "@/lib/api/axiosClient";

export type RegisterPayload = {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  username: string;
  password: string;
  subscribed_sms_campaigns?: boolean;
  subscribed_email_campaigns?: boolean;
};

export type LoginPayload = {
  login: string;
  password: string;
};

export type VerificationChannel = "email" | "phone";

export type SendOtpPayload = {
  channel: VerificationChannel;
  email?: string;
  phone?: string;
};

export type VerifyOtpPayload = {
  otp: string;
  type: VerificationChannel;
  email?: string;
  phone?: string;
};

export type GoogleSignInPayload = {
  credentials: string;
  isForeverFree?: boolean;
};

export async function register(payload: RegisterPayload, isForeverFree = true) {
  const response = await api.post(
    `/register?is_forever_free=${isForeverFree ? "true" : "false"}`,
    payload,
    {
      headers: {
        Timezone: "UTC",
      },
    }
  );
  return response.data;
}

export async function login(payload: LoginPayload) {
  const response = await api.post("/login", payload);
  return response.data;
}

export async function sendVerificationOtp(payload: SendOtpPayload) {
  const { channel, ...data } = payload;
  const response = await api.post(`/verify-user/channel/${channel}`, data);
  return response.data;
}

export async function verifyUserOtp(payload: VerifyOtpPayload) {
  const response = await api.post("/verify-user", payload);
  return response.data;
}

export async function googleSignIn(payload: GoogleSignInPayload) {
  const isForeverFree = payload.isForeverFree ?? false;
  const response = await api.post(
    `/google/signin?is_forever_free=${isForeverFree ? "true" : "false"}`,
    { credentials: payload.credentials }
  );
  return response.data;
}
