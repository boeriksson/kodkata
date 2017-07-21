import {css} from 'styled-components';
import * as commonReceipt from '../../_common/skins/Receipt';

export const Row = ({theme, isOnTotalRow}) => css`
    ${commonReceipt.Row.getDefaultStyle(theme, isOnTotalRow)}
     
    border-top-color: ${theme.color.$lightPurple};
`;

export const Header = ({theme}) => css`
    ${commonReceipt.Header.getDefaultStyle(theme)}
     
    color: ${theme.color.$mediumPurple}; 
    border-top-color: ${theme.color.$mediumPurple};
`;

export const Value = ({theme}) => css`
    ${commonReceipt.Value.getDefaultStyle(theme)}
    
    color: ${theme.color.$main6};
`;

export const Success = ({theme}) => css`
    ${commonReceipt.Success.getDefaultStyle(theme)}

    div > h4 {
        color: white;
    }
    div > p {
        color: ${theme.color.$main6};
    }
`;

export const Title = ({theme}) => css`
    ${commonReceipt.Title.getDefaultStyle(theme)}
    
    color: ${theme.color.$main11};
`;
