// ===============================================
// Contains common methods for all default styling
// ===============================================

import {css} from 'styled-components';

export const Container = {
    getDefaultStyle: (theme) => css`
        .readMoreContent {
            white-space:pre-wrap;
        }
        
        .confirm {
            margin-top: ${theme.layout.common.$spacingMedium};
            .checkbox {
                float: left;
                margin-right: ${theme.layout.common.$spacingMedium};
            } 
        }
    `
};
