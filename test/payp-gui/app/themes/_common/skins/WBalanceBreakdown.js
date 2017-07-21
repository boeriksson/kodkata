// ===============================================
// Contains common methods for all default styling
// ===============================================

import {css} from 'styled-components';

export const Container = {
    getDefaultStyle: (theme) => css`
        td.headerCell {
            padding-bottom: ${theme.layout.common.$spacingTight};
        }

        td.valueCell {
            text-align: right;
        }
    `
};
