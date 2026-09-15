import { useEffect, useRef, useState } from "react";
import { loadUmdScript, type CarouselOption } from "./umd";

export type UmdHostProps = {
  bundle: string;
  option: CarouselOption;
  locale: "ar" | "en";
  width: number;
  height: number;
  initialIndex?: number;
  durationMs: number;
  typewriterMsPerChar: number;
  autoplay: boolean;
  autoplayMs: number;
  /** Slice the active option's default slides to three via the function-form mount API. */
  sliceTo?: number;
};

export function UmdHost({
  bundle,
  option,
  locale,
  width,
  height,
  initialIndex,
  durationMs,
  typewriterMsPerChar,
  autoplay,
  autoplayMs,
  sliceTo,
}: UmdHostProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) {
      return;
    }

    let mounted = true;
    let handle: { unmount: () => void } | undefined;
    setStatus("loading");
    setMessage(null);

    loadUmdScript(bundle)
      .then((api) => {
        if (!mounted || !hostRef.current) {
          return;
        }

        const base = {
          option,
          locale,
          durationMs,
          typewriterMsPerChar,
          autoplayMs: autoplay ? autoplayMs : false,
          ...(initialIndex !== undefined ? { initialIndex } : {}),
        };

        handle =
          sliceTo === undefined
            ? api.mount(hostRef.current, base)
            : api.mount(hostRef.current, (defaults) => {
                const record = defaults as Record<string, unknown>;
                const slides = record[option];
                return {
                  ...record,
                  ...base,
                  [option]: Array.isArray(slides) ? slides.slice(0, sliceTo) : slides,
                };
              });
        setStatus("ready");
      })
      .catch((error) => {
        if (!mounted) {
          return;
        }
        const text = error instanceof Error ? error.message : String(error);
        setStatus("error");
        setMessage(text);
        console.error(error);
      });

    return () => {
      mounted = false;
      handle?.unmount();
      el.replaceChildren();
    };
  }, [
    autoplay,
    autoplayMs,
    bundle,
    durationMs,
    initialIndex,
    locale,
    option,
    sliceTo,
    typewriterMsPerChar,
  ]);

  return (
    <div>
      {status === "loading" ? (
        <p style={{ margin: "0 0 8px", fontSize: 13, opacity: 0.7 }}>Loading published UMD…</p>
      ) : null}
      {status === "error" ? (
        <p role="alert" style={{ margin: "0 0 8px", fontSize: 13, color: "#8a1f11" }}>
          Could not load the carousel bundle. {message}
        </p>
      ) : null}
      <div style={{ width, height, maxWidth: "100%", resize: "both", overflow: "auto" }}>
        <div ref={hostRef} style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
}
