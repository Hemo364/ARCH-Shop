import { useState, type FormEvent } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context";
import { Button, Field, Input } from "../components/ui";
import { errorMessage } from "../errors";

export default function Login() {
  const { status, signIn } = useAuth();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (status === "admin" || status === "forbidden" || status === "error") {
    const from = (location.state as { from?: string } | null)?.from;
    return <Navigate to={from ?? "/admin"} replace />;
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(username, password);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 text-foreground">
      <form onSubmit={submit} className="w-full max-w-sm rounded-lg border border-border bg-card p-8">
        <h1 className="text-2xl font-black">ورود به پنل مدیریت</h1>
        <p className="mb-6 mt-1 text-sm text-primary">فروشگاه RCH</p>
        <div className="space-y-4">
          <Field label="یوزرنیم">
            <Input value={username} onChange={(e) => setUsername(e.target.value)} dir="ltr" autoComplete="username" autoCapitalize="none" required autoFocus />
          </Field>
          <Field label="پسورد">
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} dir="ltr" autoComplete="current-password" required />
          </Field>
        </div>
        {error && <p role="alert" className="mt-4 text-sm text-red-400">{error}</p>}
        <div className="mt-6 [&>button]:w-full">
          <Button type="submit" variant="primary" loading={loading}>ورود</Button>
        </div>
      </form>
    </div>
  );
}
