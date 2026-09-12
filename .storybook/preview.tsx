import type { Preview } from "@storybook/react-vite";

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "sand",
      values: [
        { name: "sand", value: "#f4efe6" },
        { name: "night", value: "#1a1208" },
        { name: "white", value: "#ffffff" },
      ],
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
