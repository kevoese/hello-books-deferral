const {
    colors,
    boxShadow,
    borderRadius,
    margin,
    maxWidth
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
                    '50': '#FDFDFD',
                    '250': '#F1F1F1',
                    '550': 'rgba(36, 36, 36, 0.7)'
                },
                blue: {
                    ...colors.blue,
                    '550': '#51bcf3',
                    '450': '#009DEE',
                    '1100': '#51bcf3'
                }
            },
            margin: {
                ...margin,
                '-18': '-4.5rem'
            }
        },
        boxShadow: {
            ...boxShadow,
            custom: '0px 0px 25px rgba(0, 0, 0, 0.15)'
        },
        borderRadius: {
            ...borderRadius,
            '10': '10px',
            '54': '1.5rem',
            full: '9999px'
        },
        maxWidth: {
            ...maxWidth,
            custom: '40rem'
        }
    },
    variants: {},
    plugins: []
};
