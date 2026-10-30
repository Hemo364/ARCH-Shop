import { useState } from "react";
import type { Stat } from "../../data/types";
import { FEATURE_ICONS } from "../../lib/featureIcons";
import ImageUploader from "../components/ImageUploader";
import SectionForm from "../components/SectionForm";
import { Field, Input, ListEditor, PageHeader, Select, Textarea } from "../components/ui";
import { useSection } from "../useSection";

function StatsEditor({ stats, onChange }: { stats: Stat[]; onChange: (stats: Stat[]) => void }) {
  return (
    <ListEditor
      items={stats}
      onChange={onChange}
      newItem={() => ({ v: "", l: "" })}
      addLabel="افزودن آمار"
      renderItem={(s, update) => (
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="عدد"><Input value={s.v} onChange={(e) => update({ ...s, v: e.target.value })} /></Field>
          <Field label="عنوان"><Input value={s.l} onChange={(e) => update({ ...s, l: e.target.value })} /></Field>
        </div>
      )}
    />
  );
}

function HeroForm() {
  const section = useSection("hero", "image");
  return (
    <SectionForm section={section} title="بخش اول صفحه" description="اولین چیزی که بازدیدکننده می‌بیند.">
      {(v) => (
        <>
          <div className="max-w-lg"><Field label="عکس پس‌زمینه"><ImageUploader value={v.image} onChange={(image) => section.patch({ image })} /></Field></div>
          <Field label="توضیح عکس"><Input value={v.imageAlt} onChange={(e) => section.patch({ imageAlt: e.target.value })} /></Field>
          <Field label="برچسب بالای عنوان"><Input value={v.pill} onChange={(e) => section.patch({ pill: e.target.value })} /></Field>
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="عنوان"><Input value={v.titleMain} onChange={(e) => section.patch({ titleMain: e.target.value })} /></Field>
            <Field label="بخش رنگی عنوان"><Input value={v.titleAccent} onChange={(e) => section.patch({ titleAccent: e.target.value })} /></Field>
            <Field label="زیرعنوان"><Input value={v.subtitle} onChange={(e) => section.patch({ subtitle: e.target.value })} /></Field>
          </div>
          <Field label="توضیحات"><Textarea value={v.description} onChange={(e) => section.patch({ description: e.target.value })} /></Field>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="متن دکمه‌ی اصلی"><Input value={v.primaryCta} onChange={(e) => section.patch({ primaryCta: e.target.value })} /></Field>
            <Field label="متن دکمه‌ی دوم"><Input value={v.secondaryCta} onChange={(e) => section.patch({ secondaryCta: e.target.value })} /></Field>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold">آمار پایین صفحه</h3>
            <StatsEditor stats={v.stats} onChange={(stats) => section.patch({ stats })} />
          </div>
        </>
      )}
    </SectionForm>
  );
}

function FeaturesForm() {
  const section = useSection("features");
  return (
    <SectionForm section={section} title="ویژگی‌ها" description="کارت‌های زیر بخش اول صفحه.">
      {(v) => (
        <ListEditor
          items={v.items}
          onChange={(items) => section.patch({ items })}
          newItem={() => ({ icon: "star", title: "", desc: "" })}
          addLabel="افزودن ویژگی"
          renderItem={(item, update) => (
            <div className="grid gap-3 md:grid-cols-[160px_1fr]">
              <Field label="آیکن">
                <Select value={item.icon} onChange={(e) => update({ ...item, icon: e.target.value })}>
                  {Object.entries(FEATURE_ICONS).map(([name, { label }]) => <option key={name} value={name}>{label}</option>)}
                </Select>
              </Field>
              <Field label="عنوان"><Input value={item.title} onChange={(e) => update({ ...item, title: e.target.value })} /></Field>
              <div className="md:col-span-2">
                <Field label="توضیح"><Textarea rows={2} value={item.desc} onChange={(e) => update({ ...item, desc: e.target.value })} /></Field>
              </div>
            </div>
          )}
        />
      )}
    </SectionForm>
  );
}

function CatalogForm() {
  const section = useSection("catalog");
  return (
    <SectionForm section={section} title="متن‌های بخش محصولات">
      {(v) => (
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="برچسب بالای عنوان"><Input value={v.eyebrow} onChange={(e) => section.patch({ eyebrow: e.target.value })} /></Field>
          <Field label="عنوان"><Input value={v.title} onChange={(e) => section.patch({ title: e.target.value })} /></Field>
          <Field label="متن برچسب محصول جدید"><Input value={v.newLabel} onChange={(e) => section.patch({ newLabel: e.target.value })} /></Field>
          <Field label="شرایط زیر مبلغ قسط" hint="روی کارت همه‌ی محصولات نمایش داده می‌شود."><Input value={v.depositNote} onChange={(e) => section.patch({ depositNote: e.target.value })} /></Field>
          <Field label="متن دکمه‌ی خرید"><Input value={v.buyLabel} onChange={(e) => section.patch({ buyLabel: e.target.value })} /></Field>
          <Field label="متن دکمه‌ی مشاوره"><Input value={v.consultLabel} onChange={(e) => section.patch({ consultLabel: e.target.value })} /></Field>
        </div>
      )}
    </SectionForm>
  );
}

function InstallmentForm() {
  const section = useSection("installment");
  return (
    <SectionForm section={section} title="شرایط فروش اقساطی">
      {(v) => (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="برچسب بالای عنوان"><Input value={v.eyebrow} onChange={(e) => section.patch({ eyebrow: e.target.value })} /></Field>
            <Field label="عنوان"><Input value={v.title} onChange={(e) => section.patch({ title: e.target.value })} /></Field>
          </div>
          <Field label="توضیحات"><Textarea value={v.intro} onChange={(e) => section.patch({ intro: e.target.value })} /></Field>
          <div>
            <h3 className="mb-3 text-sm font-bold">مراحل خرید</h3>
            <ListEditor
              items={v.steps}
              onChange={(steps) => section.patch({ steps })}
              newItem={() => ({ title: "", desc: "" })}
              addLabel="افزودن مرحله"
              renderItem={(s, update) => (
                <div className="space-y-3">
                  <Field label="عنوان"><Input value={s.title} onChange={(e) => update({ ...s, title: e.target.value })} /></Field>
                  <Field label="توضیح"><Textarea rows={2} value={s.desc} onChange={(e) => update({ ...s, desc: e.target.value })} /></Field>
                </div>
              )}
            />
          </div>
          <Field label="عنوان لیست مدارک"><Input value={v.docsTitle} onChange={(e) => section.patch({ docsTitle: e.target.value })} /></Field>
          <div>
            <h3 className="mb-3 text-sm font-bold">مدارک لازم</h3>
            <ListEditor
              items={v.docs}
              onChange={(docs) => section.patch({ docs })}
              newItem={() => ""}
              addLabel="افزودن مدرک"
              renderItem={(doc, update) => <Input aria-label="مدرک" value={doc} onChange={(e) => update(e.target.value)} />}
            />
          </div>
          <Field label="متن دکمه"><Input value={v.cta} onChange={(e) => section.patch({ cta: e.target.value })} /></Field>
        </>
      )}
    </SectionForm>
  );
}

function AboutForm() {
  const section = useSection("about", "image");
  return (
    <SectionForm section={section} title="درباره ما">
      {(v) => (
        <>
          <div className="max-w-xs"><Field label="عکس"><ImageUploader aspectClass="aspect-[4/5]" value={v.image} onChange={(image) => section.patch({ image })} /></Field></div>
          <Field label="توضیح عکس"><Input value={v.imageAlt} onChange={(e) => section.patch({ imageAlt: e.target.value })} /></Field>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="عدد روی عکس"><Input value={v.badgeValue} onChange={(e) => section.patch({ badgeValue: e.target.value })} /></Field>
            <Field label="متن روی عکس"><Input value={v.badgeLabel} onChange={(e) => section.patch({ badgeLabel: e.target.value })} /></Field>
          </div>
          <Field label="برچسب بالای عنوان"><Input value={v.eyebrow} onChange={(e) => section.patch({ eyebrow: e.target.value })} /></Field>
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="خط اول عنوان"><Input value={v.titleLine1} onChange={(e) => section.patch({ titleLine1: e.target.value })} /></Field>
            <Field label="خط رنگی عنوان"><Input value={v.titleAccent} onChange={(e) => section.patch({ titleAccent: e.target.value })} /></Field>
            <Field label="خط سوم عنوان"><Input value={v.titleLine3} onChange={(e) => section.patch({ titleLine3: e.target.value })} /></Field>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold">پاراگراف‌ها</h3>
            <ListEditor
              items={v.paragraphs}
              onChange={(paragraphs) => section.patch({ paragraphs })}
              newItem={() => ""}
              addLabel="افزودن پاراگراف"
              renderItem={(text, update) => <Textarea aria-label="پاراگراف" rows={4} value={text} onChange={(e) => update(e.target.value)} />}
            />
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold">آمار</h3>
            <StatsEditor stats={v.stats} onChange={(stats) => section.patch({ stats })} />
          </div>
        </>
      )}
    </SectionForm>
  );
}

const TABS = [
  { id: "hero", label: "بخش اول", form: HeroForm },
  { id: "features", label: "ویژگی‌ها", form: FeaturesForm },
  { id: "catalog", label: "متن محصولات", form: CatalogForm },
  { id: "installment", label: "اقساط", form: InstallmentForm },
  { id: "about", label: "درباره ما", form: AboutForm },
];

export default function ContentPage() {
  const [active, setActive] = useState(TABS[0].id);
  const ActiveForm = TABS.find((t) => t.id === active)!.form;

  return (
    <>
      <PageHeader title="محتوای سایت" description="هر بخش را جدا ذخیره کنید. قبل از رفتن به تب دیگر، ذخیره را بزنید." />
      <div className="mb-5 flex gap-1 overflow-x-auto rounded-lg border border-border bg-card p-1" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === t.id}
            onClick={() => setActive(t.id)}
            className={`shrink-0 rounded-md px-4 py-2 text-sm font-semibold transition cursor-pointer ${active === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <ActiveForm key={active} />
    </>
  );
}
