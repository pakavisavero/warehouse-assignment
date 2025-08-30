/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            screens: {
                xs: '360px',
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                xlg: '1536px',
            },
            width: {
                xs: '20rem',
                sm: '24rem',
                md: '28rem',
                lg: '32rem',
                xl: '36rem',
                xlg: '42rem',
            },
            maxWidth: {
                xs: '20rem',
                sm: '24rem',
                md: '28rem',
                lg: '32rem',
                xl: '36rem',
                xlg: '42rem',
            },
            minWidth: {
                xs: '20rem',
                sm: '24rem',
                md: '28rem',
                lg: '32rem',
                xl: '36rem',
                xlg: '42rem',
            },
        },
    },
    plugins: [],
};

export default config;
