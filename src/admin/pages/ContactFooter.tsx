import { toLatinDigits } from "../../lib/format";
import SectionForm from "../components/SectionForm";
import { Field, Input, ListEditor, PageHeader, Textarea } from "../components/ui";
import { useSection } from "../useSection";

function ContactForm() {
  const section = useSection("contact");
  return (
    <SectionForm section={section} title="اطلاعات تماس" description="این اطلاعات در بخش تماس، فوتر و دکمه‌ی مشاوره‌ی بالای سایت استفاده می‌شوند.">
      {(v) => (
        <>
          <div>
            <h3 className="mb-1 text-sm font-bold">شماره‌های تماس</h3>
            <p className="mb-3 text-xs text-muted-foreground">شماره‌ی اول روی دکمه‌ی مشاوره و در فوتر نمایش داده می‌شود.</p>
            <ListEditor
              items={v.phones}
              onChange={(phones) => section.patch({ phones })}
              newItem={() => ""}
              addLabel="افزودن شماره"
              renderItem={(phone, update) => (
                <Input
                  aria-label="شماره تماس"
                  inputMode="tel"
                  dir="ltr"
                  placeholder="09123456789"
                  value={phone}
                  onChange={(e) => update(toLatinDigits(e.target.value).replace(/[^\d+]/g, ""))}
                />
              )}
            />
          </div>
          <Field label="آیدی اینستاگرام" hint="بدون @">
            <Input dir="ltr" value={v.instagram} onChange={(e) => section.patch({ instagram: e.target.value.trim().replace(/^@/, "") })} />
          </Field>
          <Field label="آدرس"><Textarea rows={2} value={v.address} onChange={(e) => section.patch({ address: e.target.value })} /></Field>
          <Field label="ساعت کاری"><Input value={v.workingHours} onChange={(e) => section.patch({ workingHours: e.target.value })} /></Field>
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="برچسب بالای عنوان"><Input value={v.eyebrow} onChange={(e) => section.patch({ eyebrow: e.target.value })} /></Field>
            <Field label="عنوان"><Input value={v.titleMain} onChange={(e) => section.patch({ titleMain: e.target.value })} /></Field>
            <Field label="بخش رنگی عنوان"><Input value={v.titleAccent} onChange={(e) => section.patch({ titleAccent: e.target.value })} /></Field>
          </div>
          <Field label="توضیحات"><Textarea value={v.intro} onChange={(e) => section.patch({ intro: e.target.value })} /></Field>
          <Field label="عنوان کادر ارتباط سریع"><Input value={v.quickTitle} onChange={(e) => section.patch({ quickTitle: e.target.value })} /></Field>
        </>
      )}
    </SectionForm>
  );
}

function FooterForm() {
  const section = useSection("footer");
  return (
    <SectionForm section={section} title="فوتر">
      {(v) => (
        <>
          <Field label="متن معرفی"><Textarea value={v.blurb} onChange={(e) => section.patch({ blurb: e.target.value })} /></Field>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="عنوان ستون لینک‌ها"><Input value={v.linksTitle} onChange={(e) => section.patch({ linksTitle: e.target.value })} /></Field>
            <Field label="عنوان ستون تماس"><Input value={v.contactTitle} onChange={(e) => section.patch({ contactTitle: e.target.value })} /></Field>
          </div>
          <Field label="متن کپی‌رایت"><Input value={v.copyright} onChange={(e) => section.patch({ copyright: e.target.value })} /></Field>
        </>
      )}
    </SectionForm>
  );
}

export default function ContactFooter() {
  return (
    <>
      <PageHeader title="تماس و فوتر" />
      <div className="max-w-3xl space-y-6">
        <ContactForm />
        <FooterForm />
      </div>
    </>
  );
}
