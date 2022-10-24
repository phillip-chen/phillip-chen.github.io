/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'title': ['DM Serif Display', 'ui-serif', 'Georgia'],
        'body-text': ['Raleway', 'ui-sans-serif', 'system-ui']
      },
      screens: {
        'laptop-md': '1390px',
        'laptop-lg': '2200px'
      },
      spacing: {
        '0.5':'0.5px',
        '1.5%' : '1.5%',
        '2%' : '2%',
        '4%' : '4%',
        '4.5%' : '4.5%',
        '5%' : '5%',
        '6%' : '6%',
        '8%' : '8%',
        '10%' : '10%',
        '12%' : '12%',
        '15%' : '15%',
        '18%' : '18%',
        '20%' : '20%',
        '25%' : '25%',
        '30%' : '30%',
        '35%' : '35%',
        '40%' : '40%',
        '49%' : '49%',
        '50%' : '50%',
        '60%' : '60%',
        '70%' : '70%',
        '80%' : '80%',
        '85%' : '85%',
        '90%' : '90%',
        '95%' : '95%'
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'light-primary': '#1C2131',
      'light-secondary': '#118ab2',
      'light-tertiary': '#f5f5f5',
      'light-tertiary-elevation': '#ededed',
      'dark-primary': '#f5f5f5',
      'dark-secondary': '#63D0EA',
      'dark-tertiary': '#1C2131',
      'dark-tertiary-elevation': '#030407'
    }
  },
  plugins: [],
}
