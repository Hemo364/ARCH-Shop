import type { ReactNode } from "react";
import type { ContentKey, SiteContent } from "../../data/types";
import type { Section } from "../useSection";
import { Button, Card, ErrorState, Skeleton } from "./ui";

interface SectionFormProps<K extends ContentKey> {
  section: Section<K>;
  title?: string;
  description?: string;
  children: (value: SiteContent[K]) => ReactNode;
}

export default function SectionForm<K extends ContentKey>({ section, title, description, children }: SectionFormProps<K>) {
  if (section.error) return <ErrorState message={section.error} onRetry={section.reload} />;
  if (!section.value) return <Skeleton className="h-96" />;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void section.save();
      }}
    >
      <Card title={title} description={description}>
        <div className="space-y-4">{children(section.value)}</div>
        <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
          <Button type="submit" variant="primary" loading={section.saving} disabled={!section.dirty}>
            ذخیره تغییرات
          </Button>
          {section.dirty && <span className="text-xs text-amber-400">تغییرات ذخیره نشده دارید</span>}
        </div>
      </Card>
    </form>
  );
}
