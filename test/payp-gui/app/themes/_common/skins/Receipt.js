// ===============================================
// Contains common methods for all default styling
// ===============================================

import {css} from 'styled-components';

export const Row = {
    getDefaultStyle: (theme, isOnTotalRow) => css`
        float: left;
        width: 100%;
        margin-top: ${theme.layout.common.$spacingMedium};
		border-top-width: ${theme.layout.border.size};
        border-top-style: ${theme.layout.border.style};
        padding-top: ${theme.layout.common.$spacingMedium};
        ${isOnTotalRow ? 'font-weight: bold;' : ''}
        &:first-child {
            margin-top: 0;
            border-top: 0;
            padding-top: 0;
        }
    `
};

export const Header = {
    getDefaultStyle: () => css`
        display: inline-block;
    `
};

export const Value = {
    getDefaultStyle: () => css`
        display: inline-block;
        text-align: right;
        float: right;
    `
};

export const Success = {
    getDefaultStyle: (theme) => css`
        margin-top: ${theme.layout.common.$spacingWide};
        
        & > div:first-child {
            display: inline;
            font-size: 34px;
            float: left;
            margin-top: ${theme.layout.common.$spacingXtight}
        }
        & > div:nth-child(2) {
            display: inline-block;
            margin-left: ${theme.layout.common.$spacingWide};
        }
        & > div > p {
            margin-top: ${theme.layout.common.$spacingTight};
            &::first-letter {
                text-transform: capitalize;
            }
        }
    `
};

export const Title = {
    getDefaultStyle: () => css` 
    `
};
