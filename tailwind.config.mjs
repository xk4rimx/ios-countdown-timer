import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    ],
    theme: {
        extend: {
            fontFamily: {
                "sf-pro-display": [
                    "SF Pro Display",
                    "sans-serif",
                ],
            },
        },
        screens: {
            xl: { max: "1279px" },
            lg: { max: "1023px" },
            md: { max: "767px" },
            sm: { max: "639px" },
        },
    },
    plugins: [daisyui],
    daisyui: {
        base: false,
    },
};
