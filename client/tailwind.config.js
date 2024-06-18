/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'xssm':'330px',
        'ssm':'500px',
        'sm1':'600px'
      }
    },
  },
  plugins: [],
}

