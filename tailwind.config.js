/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/*.{html,js}',
  ],
  theme: {
    fontFamily: {
	    'navbar': ['"EB Garamond"', '"Outfit"', '"Roboto"', '"Lato"', '"Inter"']   	
    },

    extend: {
      rotate: {
        '180': '180deg', 
      },
    },

    variants: {
      extend: {
        rotate: ['responsive', 'hover', 'focus', 'group-hover'], 
      },
    },

    extend: {
      colors: {
        'backgroundColor': '#f8f8f8',
        'bgBlue': '#4567B7',
        'btnBlue': '#4567B7',
        'linkIconBlue': '#4567B7',
        'carouselBlue': '#4567B7',
        'contactUsBlue': '#5A8ACC',
        'linkBlue': '#D1D8E8',
        'deepBlue': '#3f5ca0',
        'lightBlue': '#5a8acc',
        'mainGreen': '#8BC34A',
        'addLocationGreen': '#8bc34a',
        'faqGray': '#dadada',
        'helpTextGray': '#e6e6e6',
        'buttonDeepBlack': '#263238',
        'footerBlack': '#1e1e1e'
      }
    },
  },
  plugins: [
    // function({addUtilities}) {
    //   const newUtilities= {
    //     ".no-scrollbar::-webkit-scrollbar": {
    //       display: 'none',
    //     },
    //     "no-scrollbar": {
    //       '-ms-overflow-style': 'none',
    //       'scrollbar-width': 'none',
    //     },
    //   };

    //   addUtilities(newUtilities);
    // },
  ],
};

