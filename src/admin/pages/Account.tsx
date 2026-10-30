import { useState, type FormEvent } from "react";
import { Button, Card, Field, Input, PageHeader } from "../components/ui";
import { useAuth, useToast } from "../context";
import { errorMessage } from "../errors";

const MIN_LENGTH = 8;

export default function Account() {
  const { email, changePassword } = useAuth();
  const toast = useToast();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [repeat, setRepeat] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (next.length < MIN_LENGTH) return setError("پسورد جدید باید حداقل ۸ کاراکتر باشد.");
    if (next !== repeat) return setError("پسورد جدید و تکرار آن یکسان نیستند.");
    setError("");
    setSaving(true);
    try {
      await changePassword(current, next);
      setCurrent("");
      setNext("");
      setRepeat("");
      toast("پسورد تغییر کرد.");
    } catch (err) {
      setError(err instanceof Error && err.message === "WRONG_CURRENT_PASSWORD" ? "پسورد فعلی اشتباه است." : errorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader title="حساب کاربری" description={email ? `یوزرنیم: ${email.replace("@rchshop.local", "")}` : undefined} />
      <div className="max-w-md">
        <Card title="تغییر پسورد">
          <form onSubmit={submit} className="space-y-4">
            <Field label="پسورد فعلی"><Input type="password" dir="ltr" autoComplete="current-password" required value={current} onChange={(e) => setCurrent(e.target.value)} /></Field>
            <Field label="پسورد جدید" hint="حداقل ۸ کاراکتر"><Input type="password" dir="ltr" autoComplete="new-password" required value={next} onChange={(e) => setNext(e.target.value)} /></Field>
            <Field label="تکرار پسورد جدید"><Input type="password" dir="ltr" autoComplete="new-password" required value={repeat} onChange={(e) => setRepeat(e.target.value)} /></Field>
            {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
            <Button type="submit" variant="primary" loading={saving}>تغییر پسورد</Button>
          </form>
        </Card>
      </div>
    </>
  );
}
