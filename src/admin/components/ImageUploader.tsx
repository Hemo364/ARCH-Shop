import { useRef, useState } from "react";
import { FiImage, FiUpload } from "react-icons/fi";
import { uploadImage } from "../../lib/api";
import { compressImage, MAX_SOURCE_BYTES } from "../../lib/image";
import { useToast } from "../context";
import { errorMessage } from "../errors";
import { Button } from "./ui";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  error?: string;
  aspectClass?: string;
}

export default function ImageUploader({ value, onChange, error, aspectClass = "aspect-video" }: ImageUploaderProps) {
  const input = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const toast = useToast();

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast("فقط فایل عکس قابل آپلود است.", "error");
      return;
    }
    if (file.size > MAX_SOURCE_BYTES) {
      toast("حجم عکس نباید بیشتر از ۲۰ مگابایت باشد.", "error");
      return;
    }
    setUploading(true);
    try {
      let compressed: Blob;
      try {
        compressed = await compressImage(file);
      } catch {
        toast("این فرمت عکس پشتیبانی نمی‌شود. لطفاً از JPG یا PNG استفاده کنید.", "error");
        return;
      }
      onChange(await uploadImage(compressed));
    } catch (err) {
      toast(errorMessage(err), "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className={`${aspectClass} mb-3 flex items-center justify-center overflow-hidden rounded-md border ${error ? "border-red-500" : "border-border"} bg-secondary`}>
        {value ? (
          <img src={value} alt="پیش‌نمایش" className="size-full object-cover" />
        ) : (
          <FiImage className="text-4xl text-muted-foreground" />
        )}
      </div>
      <input
        ref={input}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) void handleFile(file);
        }}
      />
      <Button loading={uploading} onClick={() => input.current?.click()}>
        {!uploading && <FiUpload />}
        {uploading ? "در حال آپلود…" : value ? "تغییر عکس" : "انتخاب عکس"}
      </Button>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
