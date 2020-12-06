import Vue from 'vue';
import Vuetify from 'vuetify';
import colors from 'vuetify/lib/util/colors';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(Vuetify);

export const vuetify = new Vuetify({
    theme: {
        themes: {
            light: {
                background: colors.grey.lighten2
            }
        }
    },
    icons: {
        iconfont: 'md'
    }
});
