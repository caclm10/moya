import defaultTheme from 'tailwindcss/defaultTheme';
// import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.{ts,tsx}',
    ],

    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px"
            }
        },

        extend: {
            colors: {
                primary: {
                    DEFAULT: "hsl(var(--primary) / <alpha-value>)",
                    hover: "hsl(var(--primary-hover) / <alpha-value>)",
                    ghost: "hsl(var(--primary-ghost) / <alpha-value>)",
                    contrast: "hsl(var(--primary-contrast) / <alpha-value>)",
                }
            },

            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [],
};
