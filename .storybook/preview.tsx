import type { Preview } from "@storybook/react-vite";
import { Analytics } from "@vercel/analytics/react";

const preview: Preview = {
  globalTypes: {
    locale: {
      description: "Page language. Stories set lang/dir on the wrapper and pass locale to mount().",
      toolbar: {
        title: "Locale",
        icon: "globe",
        items: [
          { value: "ar", title: "العربية", right: "RTL" },
          { value: "en", title: "English", right: "LTR" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    locale: "ar",
  },
  decorators: [
    (Story, context) => {
      const locale = context.globals.locale === "en" ? "en" : "ar";
      return (
        <div
          key={locale}
          lang={locale}
          dir={locale === "ar" ? "rtl" : "ltr"}
          style={{ width: "100%" }}
        >
          <Story />
          <Analytics />
        </div>
      );
    },
  ],
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
