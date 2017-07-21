// ===============================================
// Contains common methods for all default styling
// ===============================================

import {css} from 'styled-components';
import mediaQuery from '../../_common/utils/mediaQuery';

export const Container = {
    getDefaultStyle: (theme) => css`
        display: flex;
        justify-content: space-between;
        margin: ${theme.layout.common.$spacingWide} 0;
        button {
            > span {
                white-space: nowrap;
            }
            flex-grow: 1;
            padding: 0 ${theme.layout.common.$spacingTight};
        }
        & > button:first-child {
            margin-right: ${theme.layout.common.$spacingWide};
        }
        & > button:last-child {
            margin-left: ${theme.layout.common.$spacingWide};
        }
        
        ${mediaQuery(theme, 'maxWidthMobile', `
            flex-direction: column;
            button {
                margin-bottom: 8px;
            }
            & > button:first-child {
                margin-right: 0;
            }
            & > button:last-child {
                margin-left: 0;
            }
        `)}
    `
};
