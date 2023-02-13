/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
		extend: {
      colors:{
        cicoloLightBlue: '#3a9278',
        cicoloDarkBlue: '#184e68',
        wcagDarkGreen: '#94bfa2',
        wcagLightGreen: '#e7f4e4',
        wcagDarkRed: '#981b1e',
        wcagLightRed: '#cd2026',
        wcagDarkYellow: '#fad980',
        wcagLightYellow: '#fff1d2',
        wcagDarkBlue: '#8ba6ca',
        wcagLightBlue: '#e1f3f8',
      },
    },
    },
    plugins: [],
}