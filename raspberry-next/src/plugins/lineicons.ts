import type {IconSet, IconAliases, IconProps} from 'vuetify'
import {h} from 'vue';

export const aliases: IconAliases = {
    complete: 'checkmark',
    cancel: 'cross-circle',
    close: 'close',
    delete: 'cross-circle',
    clear: 'cross-circle',
    success: 'checkmark-circle',
    info: 'information',
    warning: 'triangle-3',
    error: 'triangle-3',
    prev: 'chevron-left',
    next: 'chevron-right',
    checkboxOn: 'round-box-check',
    checkboxOff: 'round-box-cross',
    checkboxIndeterminate: 'round-box-minus',
    delimiter: 'circle',
    sort: 'arrow-up',
    expand: 'chevron-down',
    menu: 'menu-alt-3',
    subgroup: 'chevron-down',
    dropdown: 'more',
    radioOn: 'check-circle',
    radioOff: 'circle',
    edit: 'pencil',
    ratingEmpty: 'star-empty',
    ratingFull: 'star',
    ratingHalf: 'star-half',
    loading: 'reload',
    first: 'angle-double-left',
    last: 'angle-double-right',
    unfold: 'arrows-shrink-v',
    file: 'empty-file',
    plus: 'plus',
    minus: 'minus'
}

export const lineicons: IconSet = {
    component: (props: IconProps) => h(props.tag || 'span', {
        class: `lnil lnil-${props.icon.toString().trim()}`
    })
}
