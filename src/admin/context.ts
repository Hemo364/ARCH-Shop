import { createContext, useContext } from "react";

export type AuthStatus = "loading" | "anonymous" | "admin" | "forbidden" | "error";

export interface AuthState {
  status: AuthStatus;
  email: string | null;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthState | null>(null);

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
}

export type ToastType = "success" | "error";

export const ToastContext = createContext<(message: string, type?: ToastType) => void>(() => {});

export function useToast() {
  return useContext(ToastContext);
}
