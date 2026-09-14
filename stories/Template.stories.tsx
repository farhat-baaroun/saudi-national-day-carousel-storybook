import type { Meta, StoryObj } from "@storybook/react-vite";
import { PortalPage } from "./template/PortalPage";

const meta = {
  title: "Carousel/Portal template",
  component: PortalPage,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "white" },
  },
  args: {
    option: "option2",
  },
  argTypes: {
    option: {
      control: "inline-radio",
      options: ["option1", "option2", "option3", "option4"],
    },
  },
} satisfies Meta<typeof PortalPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HomeOption1: Story = {
  name: "Home — option 1",
  args: { option: "option1" },
};

export const HomeOption2: Story = {
  name: "Home — option 2",
  args: { option: "option2" },
};

export const HomeOption3: Story = {
  name: "Home — option 3",
  args: { option: "option3" },
};

export const HomeOption4: Story = {
  name: "Home — option 4",
  args: { option: "option4" },
};
