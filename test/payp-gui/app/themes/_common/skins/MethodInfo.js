// ===============================================
// Contains common methods for all default styling
// ===============================================

import {css} from 'styled-components';
import mediaQuery from '../../_common/utils/mediaQuery';

export const Container = {
    getDefaultStyle: () => css`
        
    `
};

export const Title = {
    getDefaultStyle: (theme) => css`
        ${theme.typography.getFont({
            category: 'header',
            type: 'h3'
        })}
        margin-bottom: ${theme.layout.common.$spacingTight};
    `
};

export const Logo = {
    getDefaultStyle: (theme) => css`
        padding: ${theme.layout.common.$spacingMedium} 0;
    `
};

export const InfoContainer = {
    getDefaultStyle: (theme) => css`
        .Form-label {
            margin: 0 5px 0 0;
        }
        
        margin-top: 2px;
        display: flex;
		justify-content: flex-start;
		overflow: hidden;
		
		${mediaQuery(theme, 'maxWidthMobile', `
            flex-direction: column;
        `)};
    `
};

export const InfoColumn = {
    getDefaultStyle: (theme) => css`
        display: inline-block;
		padding: 0 ${theme.layout.common.$spacingWide};
		
        &:first-child {
			padding-left: 0;
			border-left: none;
		}
		> div {
			&:not(.Form-label) {
				white-space: nowrap;
			}
		}
		
		${mediaQuery(theme, 'maxWidthMobile', `
            padding: 0;
			margin-top: ${theme.layout.common.$spacingTight};
			> div {
				display: inline;
				&:not(.Form-label) {
					float: right;
				}
			}
        `)};
    `
};

export const InfoSeparator = {
    getDefaultStyle: (theme) => css`
        display: inline-block;
        border-left-width: ${theme.layout.border.size};
        border-left-style: ${theme.layout.border.style};
        
        ${mediaQuery(theme, 'maxWidthMobile', `
            border-left: none;
        `)};
    `
};
