import { useEffect, useRef } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { JSDELIVR_UMD, UNPKG_UMD, loadUmdScript, type CarouselOption } from "./umd";

type StoryArgs = {
  bundle: string;
  option: CarouselOption;
  width: number;
  height: number;
  initialIndex?: number;
  durationMs: number;
  typewriterMsPerChar: number;
  autoplay: boolean;
  autoplayMs: number;
};

function UmdHost({
  bundle,
  option,
  width,
  height,
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
          option,
          durationMs,
          typewriterMsPerChar,
          autoplayMs: autoplay ? autoplayMs : false,
          ...(initialIndex !== undefined ? { initialIndex } : {}),
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
  }, [autoplay, autoplayMs, bundle, durationMs, initialIndex, option, typewriterMsPerChar]);

  return (
    <div style={{ width, height, maxWidth: "100%", resize: "both", overflow: "auto" }}>
      <div ref={hostRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

const meta = {
  title: "Carousel/Options",
  component: UmdHost,
  args: {
    bundle: JSDELIVR_UMD,
    option: "option2",
    width: 1440,
    height: 491,
    durationMs: 700,
    typewriterMsPerChar: 70,
    autoplay: false,
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
    option: {
      name: "Figma option",
      control: "inline-radio",
      options: ["option1", "option2", "option3", "option4"],
      table: { category: "Carousel" },
    },
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

export const Option1: Story = {
  name: "Option 1 — Hero Section V2",
  args: { option: "option1" },
};

export const Option2: Story = {
  name: "Option 2 — Asset Deck",
  args: { option: "option2", autoplay: true },
};

export const Option3: Story = {
  name: "Option 3 — Framed Photo",
  args: { option: "option3" },
};

export const Option4: Story = {
  name: "Option 4 — Pattern Panel",
  args: { option: "option4" },
};

export const FitLab: Story = {
  args: { option: "option2", width: 900, height: 380 },
};

export const Compact: Story = {
  name: "Compact peek",
  args: { option: "option2", width: 390, height: 760 },
};

export const English: Story = {
  name: "English (inherited lang)",
  args: { option: "option2", autoplay: false },
  globals: { locale: "en" },
};

export const FromJsDelivr: Story = {
  name: "From jsDelivr",
  args: { bundle: JSDELIVR_UMD, option: "option1" },
};

export const FromUnpkg: Story = {
  name: "From unpkg",
  args: { bundle: UNPKG_UMD, option: "option1" },
};
