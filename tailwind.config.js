const {
    colors,
    boxShadow,
    borderRadius,
    margin,
    maxWidth,
    fontSize,
    inset
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
                    '10': 'rgba(250, 250, 250, 0.77)',
                    '20': 'rgba(255, 255, 255, 0.37)',
                    '30': 'rgba(0, 0, 0, 0.07)',
                    '40': '#FAFAFA',
                    '50': '#FDFDFD',
                    '250': '#F1F1F1',
                    '350': 'rgba(0, 0, 0, 0.4)',
                    '550': 'rgba(36, 36, 36, 0.7)',
                    '800': 'rgba(0, 0, 0, 0.82)',
                    '950': 'rgba(0, 0, 0, 0.07)',
                    '960': 'rgba(0, 0, 0, 0.82)',
                    '950': 'rgba(0, 0, 0, 0.82)'
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
                '-18': '-4.5rem',
                '18': '4.5rem'
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
            custom: '40rem',
            '450': '450px'
        },
        fontSize: {
            ...fontSize,
            xxs: '0.65rem'
        },
        inset: {
            ...inset,
            '1': '0.75rem',
            '4.5': '4.5rem'
        }
    },
    variants: {},
    plugins: []
};
