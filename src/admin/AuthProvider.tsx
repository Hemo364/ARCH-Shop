import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { db } from "../lib/supabase";
import { toLatinDigits } from "../lib/format";
import { AuthContext, type AuthState, type AuthStatus } from "./context";

// Supabase Auth identifies users by email, while the client only ever sees a username.
function toEmail(username: string) {
  const clean = toLatinDigits(username.trim().toLowerCase());
  return clean.includes("@") ? clean : `${clean}@rchshop.local`;
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [check, setCheck] = useState<{ userId: string; status: AuthStatus } | null>(null);
  const userId = user?.id;

  useEffect(() => {
    const auth = db().auth;
    auth.getSession().then(
      ({ data }) => setUser(data.session?.user ?? null),
      () => setUser(null),
    );
    const { data } = auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    db()
      .from("admins")
      .select("user_id")
      .eq("user_id", userId)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        setCheck({ userId, status: error ? "error" : data ? "admin" : "forbidden" });
      });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const status: AuthStatus =
    user === undefined ? "loading" : user === null ? "anonymous" : check?.userId === user.id ? check.status : "loading";
  const email = user?.email ?? null;

  const value = useMemo<AuthState>(
    () => ({
      status,
      email,
      async signIn(username, password) {
        const { error } = await db().auth.signInWithPassword({ email: toEmail(username), password });
        if (error) throw error;
      },
      async signOut() {
        await db().auth.signOut();
      },
      async changePassword(currentPassword, newPassword) {
        if (!email) throw new Error("Not signed in");
        const { error: verifyError } = await db().auth.signInWithPassword({ email, password: currentPassword });
        if (verifyError) throw new Error("WRONG_CURRENT_PASSWORD");
        const { error } = await db().auth.updateUser({ password: newPassword });
        if (error) throw error;
      },
    }),
    [status, email],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
