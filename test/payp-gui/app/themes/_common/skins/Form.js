// ===============================================
// Contains common methods for all default styling
// ===============================================

import {css} from 'styled-components';

/* eslint-disable quotes */
export const getDefaultStyle = (disabled) => css`
    ${
    disabled ? `
        pointer-events: none;
        opacity: .4;
    ` : ``}
    
    .submitFormButton {
        margin-top: 24px; // $spacing-wider - 8px
    }
`;
