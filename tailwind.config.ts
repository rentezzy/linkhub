import type { Config } from "tailwindcss";

const config: Config = {
  // content: [],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // purge: [
  //   "./src/pages/**/*.{js,ts,jsx,tsx}",
  //   "./src/components/**/*.{js,ts,jsx,tsx}",
  // ],
  // corePlugins: { preflight: false },
  theme: {
    colors: {
      primary: "var(--primary-color)",
      secondary: "var(--secondary-color)",
    },
  },
  plugins: [],
};
export default config;
