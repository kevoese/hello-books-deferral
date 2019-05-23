const {
    colors,
    boxShadow,
    borderRadius,
    margin
} = require('tailwindcss/defaultTheme');

module.exports = {
    theme: {
        fontFamily: {
            raleway: ['Raleway'],
            robotoMono: ['Roboto Mono']
        },
        extend: {
            colors: {
                gray: {
                    ...colors.gray,
                    '250': '#F1F1F1',
                    '550': 'rgba(36, 36, 36, 0.7)'
                },
                blue: {
                    ...colors.blue,
                    '550': '#51bcf3'
                }
            },
            margin: {
                '-18': '-4.5rem'
            }
        },
        boxShadow: {
            custom: '0px 0px 25px rgba(0, 0, 0, 0.15)'
        },
        borderRadius: {
            '10': '10px',
            '54': '1.5rem',
            full: '9999px'
        },
        maxWidth: {
            custom: '40rem'
        }
    },
    variants: {},
    plugins: []
};
