/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        breathing: {
          "0%, 60%, 100%": { transform: "scale(1)" },
          "25%": { transform: "scale(0.9)" },
        },
        preparing: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        breathe: "breathing 2s ease-out infinite normal",
        prepare: "preparing 2s ease-out infinite normal",
      },
    },
  },
  plugins: [],
};
