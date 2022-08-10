// Styles
import 'vuetify/styles';

// Vuetify
import {createVuetify} from 'vuetify';
import {aliases, lineicons} from '@/plugins/lineicons';

export const vuetify = createVuetify({
    icons: {
        defaultSet: 'lineicons',
        aliases,
        sets: {
            lineicons
        }
    },
    theme: {
        defaultTheme: 'dark',
        themes: {
            dark: {
                colors: {
                    primary: '#EB2F76',
                    secondary: '#00e7e6',
                    warning: '#ff9e00',
                    error: '#d51414',
                    background: '#36323f',
                    surface: '#454549'
                }
            }
        }
    }
});
