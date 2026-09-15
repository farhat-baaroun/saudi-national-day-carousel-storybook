import type { Meta, StoryObj } from "@storybook/react-vite";
import { UmdHost } from "./UmdHost";
import { JSDELIVR_UMD, UNPKG_UMD } from "./umd";

const OPTION_DOCS = {
  option1:
    "No stagger. Mosaic, scatter, and field figures from `src/assets/option1`. Copy is unique to this option.",
  option2:
    "Default. Staggered photo deck plus arrows, using `src/assets/slides/*.png` and the six shared values (heritage → vision).",
  option3:
    "Same six values as option 2, shown as a single pattern slide with no stagger (`src/assets/slides_patterns/*.svg`).",
  option4:
    "Same pattern SVGs as option 3, in the staggered deck used by option 2.",
} as const;

const meta = {
  title: "Carousel/Options",
  component: UmdHost,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Two motion variants × three asset sets. The Locale toolbar sets `lang`/`dir` on the page wrapper and is also passed to `mount({ locale })` so copy remounts with the bundle.",
      },
    },
  },
  args: {
    bundle: JSDELIVR_UMD,
    option: "option2",
    locale: "ar",
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
    locale: { table: { disable: true } },
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
    sliceTo: { table: { disable: true } },
  },
  render: (args, { globals }) => (
    <UmdHost {...args} locale={globals.locale === "en" ? "en" : "ar"} />
  ),
} satisfies Meta<typeof UmdHost>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Option1: Story = {
  name: "Option 1 — Figures",
  args: { option: "option1" },
  parameters: { docs: { description: { story: OPTION_DOCS.option1 } } },
};

export const Option2: Story = {
  name: "Option 2 — Photo deck",
  args: { option: "option2", autoplay: true },
  parameters: { docs: { description: { story: OPTION_DOCS.option2 } } },
};

export const Option3: Story = {
  name: "Option 3 — Pattern slides",
  args: { option: "option3" },
  parameters: { docs: { description: { story: OPTION_DOCS.option3 } } },
};

export const Option4: Story = {
  name: "Option 4 — Pattern deck",
  args: { option: "option4", autoplay: true },
  parameters: { docs: { description: { story: OPTION_DOCS.option4 } } },
};

export const FitLab: Story = {
  name: "Fit lab",
  args: { option: "option2", width: 900, height: 380 },
  parameters: {
    docs: {
      description: {
        story: "Resize the host with the Fit controls. The carousel uses container queries, not the viewport.",
      },
    },
  },
};

export const CompactPhotoDeck: Story = {
  name: "Compact — photo deck",
  args: { option: "option2", width: 390, height: 760 },
};

export const CompactPatternDeck: Story = {
  name: "Compact — pattern deck",
  args: { option: "option4", width: 390, height: 760 },
};

export const EnglishPhotoDeck: Story = {
  name: "English — photo deck",
  args: { option: "option2", autoplay: false },
  globals: { locale: "en" },
};

export const EnglishPatternSlides: Story = {
  name: "English — pattern slides",
  args: { option: "option3" },
  globals: { locale: "en" },
};

export const SliceWithFunctionMount: Story = {
  name: "Function mount — first three slides",
  args: { option: "option2", sliceTo: 3, autoplay: false },
  parameters: {
    docs: {
      description: {
        story:
          "Calls `mount(el, (defaults) => ({ ...defaults, option2: defaults.option2.slice(0, 3) }))` so hosts can trim or remap copy without listing every slide.",
      },
    },
  },
};

export const FromJsDelivr: Story = {
  name: "From jsDelivr",
  args: { bundle: JSDELIVR_UMD, option: "option1" },
};

export const FromUnpkg: Story = {
  name: "From unpkg",
  args: { bundle: UNPKG_UMD, option: "option1" },
};
