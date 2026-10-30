import ImageUploader from "../components/ImageUploader";
import SectionForm from "../components/SectionForm";
import { Field, Input, PageHeader, Textarea } from "../components/ui";
import { useSection } from "../useSection";

function BrandForm() {
  const section = useSection("brand", "logo");
  return (
    <SectionForm section={section} title="برند">
      {(v) => (
        <>
          <div className="max-w-40">
            <Field label="لوگو"><ImageUploader aspectClass="aspect-square" value={v.logo} onChange={(logo) => section.patch({ logo })} /></Field>
          </div>
          <Field label="توضیح لوگو"><Input value={v.logoAlt} onChange={(e) => section.patch({ logoAlt: e.target.value })} /></Field>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="نام در هدر"><Input value={v.storeName} onChange={(e) => section.patch({ storeName: e.target.value })} /></Field>
            <Field label="شعار زیر نام"><Input value={v.tagline} onChange={(e) => section.patch({ tagline: e.target.value })} /></Field>
            <Field label="نام کامل در فوتر"><Input value={v.fullName} onChange={(e) => section.patch({ fullName: e.target.value })} /></Field>
            <Field label="موقعیت در فوتر"><Input value={v.location} onChange={(e) => section.patch({ location: e.target.value })} /></Field>
            <Field label="متن دکمه‌ی بالای سایت"><Input value={v.ctaLabel} onChange={(e) => section.patch({ ctaLabel: e.target.value })} /></Field>
          </div>
        </>
      )}
    </SectionForm>
  );
}

function SeoForm() {
  const section = useSection("seo");
  return (
    <SectionForm section={section} title="سئو" description="عنوان و توضیحی که در تب مرورگر و نتایج جستجو استفاده می‌شوند.">
      {(v) => (
        <>
          <Field label="عنوان صفحه"><Input value={v.title} onChange={(e) => section.patch({ title: e.target.value })} /></Field>
          <Field label="توضیحات متا"><Textarea value={v.description} onChange={(e) => section.patch({ description: e.target.value })} /></Field>
        </>
      )}
    </SectionForm>
  );
}

export default function BrandSeo() {
  return (
    <>
      <PageHeader title="برند و سئو" />
      <div className="max-w-3xl space-y-6">
        <BrandForm />
        <SeoForm />
      </div>
    </>
  );
}
