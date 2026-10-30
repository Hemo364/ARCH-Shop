import { useCallback, useEffect, useState } from "react";
import type { ContentKey, SiteContent } from "../data/types";
import { fetchContent, removeImageIfUnused, saveContent } from "../lib/api";
import { useToast } from "./context";
import { errorMessage } from "./errors";
import { useUnsavedWarning } from "./useUnsavedWarning";

export interface Section<K extends ContentKey> {
  value: SiteContent[K] | null;
  error: string | null;
  saving: boolean;
  dirty: boolean;
  patch: (changes: Partial<SiteContent[K]>) => void;
  save: () => Promise<void>;
  reload: () => void;
}

export function useSection<K extends ContentKey>(key: K, imageField?: keyof SiteContent[K]): Section<K> {
  const [saved, setSaved] = useState<SiteContent[K] | null>(null);
  const [value, setValue] = useState<SiteContent[K] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const toast = useToast();

  useEffect(() => {
    let cancelled = false;
    fetchContent().then(
      (content) => {
        if (cancelled) return;
        setSaved(content[key]);
        setValue(content[key]);
        setError(null);
      },
      (err) => {
        if (!cancelled) setError(errorMessage(err));
      },
    );
    return () => {
      cancelled = true;
    };
  }, [key, attempt]);

  const dirty = JSON.stringify(saved) !== JSON.stringify(value);
  useUnsavedWarning(dirty);

  const patch = useCallback((changes: Partial<SiteContent[K]>) => {
    setValue((v) => (v ? { ...v, ...changes } : v));
  }, []);

  const save = async () => {
    if (!value || !saved) return;
    setSaving(true);
    try {
      await saveContent(key, value);
      if (imageField && saved[imageField] !== value[imageField]) {
        await removeImageIfUnused(String(saved[imageField]));
      }
      setSaved(value);
      toast("تغییرات ذخیره شد.");
    } catch (err) {
      toast(errorMessage(err), "error");
    } finally {
      setSaving(false);
    }
  };

  return { value, error, saving, dirty, patch, save, reload: () => setAttempt((a) => a + 1) };
}
