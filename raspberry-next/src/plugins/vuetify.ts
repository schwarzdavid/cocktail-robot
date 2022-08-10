// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Vuetify
import {createVuetify} from 'vuetify';

export const vuetify = createVuetify({
    theme: {
        defaultTheme: 'dark',
        themes: {
            dark: {
                colors: {
                    primary: '#78e000',
                    secondary: '#00e7e6',
                    accent: '#EB2F76',
                    warning: '#ff9e00',
                    error: '#d51414',
                    background: '#36323f',
                    surface: '#454549'
                }
            }
        }
    }
});
