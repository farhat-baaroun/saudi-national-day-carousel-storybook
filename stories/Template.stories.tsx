import type { Meta, StoryObj } from "@storybook/react-vite";
import { PortalPage } from "./template/PortalPage";

const meta = {
  title: "Carousel/Portal template",
  component: PortalPage,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "white" },
    docs: {
      description: {
        component:
          "Independent home-page chrome inspired by DevDhaif/dev-dga-templates. The hero is this carousel. The Locale toolbar and the in-page language button both remount the UMD with `locale`.",
      },
    },
  },
  args: {
    option: "option2",
    locale: "ar",
  },
  argTypes: {
    option: {
      control: "inline-radio",
      options: ["option1", "option2", "option3", "option4"],
    },
    locale: { table: { disable: true } },
  },
  render: (args, { globals }) => (
    <PortalPage {...args} locale={globals.locale === "en" ? "en" : "ar"} />
  ),
} satisfies Meta<typeof PortalPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HomeOption1: Story = {
  name: "Home — figures",
  args: { option: "option1" },
};

export const HomeOption2: Story = {
  name: "Home — photo deck",
  args: { option: "option2" },
};

export const HomeOption3: Story = {
  name: "Home — pattern slides",
  args: { option: "option3" },
};

export const HomeOption4: Story = {
  name: "Home — pattern deck",
  args: { option: "option4" },
};
