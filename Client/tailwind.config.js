import typography from "@tailwindcss/typography"
/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                'gold': '#ffd700'
            },
            height: {
                '128':'32rem',
                '120':'28rem',
                '100':'26rem'
            }
        },
    },
    plugins: [
        typography
    ],
}

