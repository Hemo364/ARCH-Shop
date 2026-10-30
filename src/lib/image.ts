const MAX_WIDTH = 1600;
const QUALITY = 0.82;

export const MAX_SOURCE_BYTES = 20 * 1024 * 1024;

// Phone photos are often several MB, so every upload is shrunk in the browser first.
export async function compressImage(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_WIDTH / bitmap.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Image conversion failed"))),
      "image/webp",
      QUALITY,
    );
  });
}
