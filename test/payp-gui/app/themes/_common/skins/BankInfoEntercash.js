// ===============================================
// Contains common methods for all default styling
// ===============================================

import {css} from 'styled-components';
import mediaQuery from '../../_common/utils/mediaQuery';

export const Container = {
    getDefaultStyle: () => css`
        .form-label-top {
            margin-top: 0;
        }
    `
};

export const FlexContainer = {
    getDefaultStyle: (theme) => css`
        display: flex;
        overflow: hidden;
        margin-bottom: ${theme.layout.common.$spacingWide};
        
        ${mediaQuery(theme, 'maxWidthMobile', `
            flex-direction: column;
        `)}
    `
};

export const Clearing = {
    getDefaultStyle: (theme) => css`
        flex-basis: 90px;
        margin-right: ${theme.layout.common.$spacingWide};
        margin-bottom: 0;
        max-width: 115px;
        align-self: baseline;
        input {
            max-width: 83px;
        }
                
        ${mediaQuery(theme, 'maxWidthMobile', `
            flex-basis: auto;
            margin-right: 0;
            max-width: inherit;

            input {
                max-width: inherit;
            }
        `)}
    `
};

export const Account = {
    getDefaultStyle: () => css`
        flex: 1;
        margin-bottom: 0;
        align-self: baseline;
    `
};
