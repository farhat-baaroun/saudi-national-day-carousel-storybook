import { useEffect, useRef } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { JSDELIVR_UMD, UNPKG_UMD, loadUmdScript } from "./umd";

type StoryArgs = {
  bundle: string;
  width: number;
  height: number;
  dir: "rtl" | "ltr";
  initialIndex: number;
  durationMs: number;
  typewriterMsPerChar: number;
  autoplay: boolean;
  autoplayMs: number;
};

function UmdHost({
  bundle,
  width,
  height,
  dir,
  initialIndex,
  durationMs,
  typewriterMsPerChar,
  autoplay,
  autoplayMs,
}: StoryArgs) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) {
      return;
    }

    let mounted = true;
    let handle: { unmount: () => void } | undefined;

    loadUmdScript(bundle)
      .then((api) => {
        if (!mounted || !hostRef.current) {
          return;
        }
        handle = api.mount(hostRef.current, {
          initialIndex,
          durationMs,
          typewriterMsPerChar,
          autoplayMs: autoplay ? autoplayMs : false,
        });
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      mounted = false;
      handle?.unmount();
      if (el) {
        el.replaceChildren();
      }
    };
  }, [autoplay, autoplayMs, bundle, durationMs, initialIndex, typewriterMsPerChar]);

  return (
    <div dir={dir} style={{ width, height, maxWidth: "100%", resize: "both", overflow: "auto" }}>
      <div ref={hostRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

const meta = {
  title: "Carousel/UMD",
  component: UmdHost,
  args: {
    bundle: JSDELIVR_UMD,
    width: 1440,
    height: 491,
    dir: "rtl",
    initialIndex: 5,
    durationMs: 700,
    typewriterMsPerChar: 70,
    autoplay: true,
    autoplayMs: 6000,
  },
  argTypes: {
    bundle: {
      name: "UMD source",
      control: "select",
      options: [JSDELIVR_UMD, UNPKG_UMD],
      table: { category: "Bundle" },
    },
    width: { control: { type: "range", min: 320, max: 1600, step: 10 }, table: { category: "Fit" } },
    height: { control: { type: "range", min: 280, max: 900, step: 10 }, table: { category: "Fit" } },
    dir: { control: "inline-radio", options: ["rtl", "ltr"], table: { category: "Fit" } },
    initialIndex: {
      control: { type: "range", min: 0, max: 5, step: 1 },
      table: { category: "Carousel" },
    },
    durationMs: { control: { type: "range", min: 0, max: 1600, step: 50 }, table: { category: "Animation" } },
    typewriterMsPerChar: {
      control: { type: "range", min: 0, max: 200, step: 10 },
      table: { category: "Animation" },
    },
    autoplay: { control: "boolean", table: { category: "Animation" } },
    autoplayMs: {
      control: { type: "range", min: 2000, max: 12000, step: 500 },
      if: { arg: "autoplay" },
      table: { category: "Animation" },
    },
  },
} satisfies Meta<typeof UmdHost>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FitLab: Story = {};
export const Wide: Story = { args: { width: 1440, height: 491 } };
export const Mid: Story = { args: { width: 900, height: 380, autoplay: false } };
export const Narrow: Story = { args: { width: 390, height: 760, autoplay: false } };
export const LTR: Story = { args: { width: 900, height: 380, dir: "ltr", autoplay: false } };
export const FromJsDelivr: Story = {
  name: "From jsDelivr",
  args: { bundle: JSDELIVR_UMD, autoplay: false },
};
export const FromUnpkg: Story = {
  name: "From unpkg",
  args: { bundle: UNPKG_UMD, autoplay: false },
};
