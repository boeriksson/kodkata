import merge from 'lodash/merge';

export default (theme, outerTheme) => merge(outerTheme, theme);
