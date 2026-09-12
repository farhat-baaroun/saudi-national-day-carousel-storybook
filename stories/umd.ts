export type UmdApi = {
  mount: (
    target: string | Element,
    options?: {
      initialIndex?: number;
      durationMs?: number;
      typewriterMsPerChar?: number;
      autoplayMs?: number | false;
    },
  ) => { unmount: () => void };
  unmount: (target: string | Element) => void;
};

export const LOCAL_UMD = "/umd/saudi-national-day-carousel.umd.js";
export const JSDELIVR_UMD =
  "https://cdn.jsdelivr.net/npm/saudi-national-day-carousel/dist/saudi-national-day-carousel.umd.js";
export const UNPKG_UMD =
  "https://unpkg.com/saudi-national-day-carousel/dist/saudi-national-day-carousel.umd.js";

export function getUmd(): UmdApi {
  const api = (window as unknown as { SaudiNationalDayCarousel?: UmdApi }).SaudiNationalDayCarousel;
  if (!api?.mount) {
    throw new Error("SaudiNationalDayCarousel UMD is not loaded");
  }
  return api;
}

export function loadUmdScript(src: string): Promise<UmdApi> {
  const existing = document.querySelector<HTMLScriptElement>(`script[data-snd-umd="${src}"]`);
  if (existing && (window as unknown as { SaudiNationalDayCarousel?: UmdApi }).SaudiNationalDayCarousel) {
    return Promise.resolve(getUmd());
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.sndUmd = src;
    script.onload = () => {
      try {
        resolve(getUmd());
      } catch (error) {
        reject(error);
      }
    };
    script.onerror = () => reject(new Error(`Failed to load UMD from ${src}`));
    document.head.appendChild(script);
  });
}
