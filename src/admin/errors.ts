interface ErrorLike {
  code?: string;
  message?: string;
}

export function errorMessage(err: unknown): string {
  const { code, message = "" } = (err ?? {}) as ErrorLike;
  if (code === "23505") return "این نام قبلاً ثبت شده است.";
  if (code === "23503") return "این دسته هنوز محصول دارد و نمی‌توان آن را حذف کرد.";
  if (code === "42501") return "اجازه‌ی این کار را ندارید. دوباره وارد شوید.";
  if (/invalid login credentials/i.test(message)) return "یوزرنیم یا پسورد اشتباه است.";
  if (/failed to fetch|networkerror|load failed/i.test(message)) return "اتصال به سرور برقرار نشد. اینترنت را بررسی کنید و دوباره تلاش کنید.";
  if (/exceeded the maximum allowed size/i.test(message)) return "حجم عکس بیشتر از حد مجاز است.";
  if (/rate limit|too many/i.test(message)) return "تعداد تلاش‌ها زیاد بوده است. کمی بعد دوباره امتحان کنید.";
  return "مشکلی پیش آمد. دوباره تلاش کنید.";
}
