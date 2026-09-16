export type CarouselOption = "option1" | "option2" | "option3" | "option4";

export type UmdApi = {
  mount: (
    target: string | Element,
    config?: Record<string, unknown> | ((defaults: unknown) => unknown),
  ) => { unmount: () => void };
  unmount: (target: string | Element) => void;
};

const PACKAGE = "saudi-national-day-carousel@1.2.0";
const UMD_FILE = "dist/saudi-national-day-carousel.umd.js";

export const JSDELIVR_UMD = `https://cdn.jsdelivr.net/npm/${PACKAGE}/${UMD_FILE}`;
export const UNPKG_UMD = `https://unpkg.com/${PACKAGE}/${UMD_FILE}`;

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
    script.crossOrigin = "anonymous";
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
