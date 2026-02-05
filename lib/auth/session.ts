const TOKEN_KEY = "networkx_token";
const USER_KEY = "networkx_user";

type SessionPayload = {
  token: string;
  user: unknown;
};

export function setSession(payload: SessionPayload) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEY, payload.token);
  window.localStorage.setItem(USER_KEY, JSON.stringify(payload.user));
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
}
