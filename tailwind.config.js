import { colors } from 'tailwindcss/defaultTheme';

module.exports = {
    theme: {
        extend: {
            colors: {
                gray: {
                    ...colors.gray,
                    '200': '#f1f1f1'
                },
                primary: '#51BCF3'
            }
        },
        inset: {
            '1/3': '33.333%',
            '1/4': '25%',
            '1/5': '20%',
            '1/10': '10%',
            '3/10': '30%'
        }
    },
    variants: {},
    plugins: []
};
