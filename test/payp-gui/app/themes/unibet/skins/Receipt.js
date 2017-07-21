import {css} from 'styled-components';
import * as commonReceipt from '../../_common/skins/Receipt';

export const Row = ({theme, isOnTotalRow}) => css`
    ${commonReceipt.Row.getDefaultStyle(theme, isOnTotalRow)}
     
    border-top-color: ${theme.color.$main9};
`;

export const Header = ({theme}) => css`
    ${commonReceipt.Header.getDefaultStyle(theme)}
     
    border-top-color: ${theme.color.$main5};
`;

export const Value = ({theme}) => css`
    ${commonReceipt.Value.getDefaultStyle(theme)}
     
    border-top-color: ${theme.color.$main3};
`;

export const Success = ({theme}) => css`
    ${commonReceipt.Success.getDefaultStyle(theme)}
    
    div:first-child {
        color: ${theme.color.$brand1};
    }
    .description {
        color: ${theme.color.$main6};
    }
`;

export const Title = ({theme}) => css`
    ${commonReceipt.Title.getDefaultStyle(theme)}
`;
