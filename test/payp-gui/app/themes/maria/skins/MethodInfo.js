import {css} from 'styled-components';
import * as commonMethodInfo from '../../_common/skins/MethodInfo';

export const Container = ({theme}) => css`
    ${commonMethodInfo.Container.getDefaultStyle(theme)}
    overflow: auto;
`;

export const Title = ({theme}) => css`
    ${commonMethodInfo.Title.getDefaultStyle(theme)}
    color: ${theme.color.$main11};
    overflow: hidden;
`;

export const Logo = ({theme}) => css`
    ${commonMethodInfo.Logo.getDefaultStyle(theme)}
`;

export const InfoContainer = ({theme}) => css`
    ${commonMethodInfo.InfoContainer.getDefaultStyle(theme)}
    
    .Form-label {
        ${theme.typography.getFont({
            category: 'general',
            type: 'body'
        })}
        color: ${theme.color.$brightBlue};
        font-weight: bold;
    }
    
    &.collapsable-enter {
        opacity: 0.01;
        height: 0px;
        overflow: hidden;
        transition: all .2s ease-in;
    }

    &.collapsable-enter.collapsable-enter-active {
        opacity: 1;
        height: 60px;
    }

    &.collapsable-leave {
        opacity: 1;
        height: 60px;
        overflow: hidden;
        transition: all .2s ease-in;
    }

    &.collapsable-leave.collapsable-leave-active {
        opacity: 0.01;
        height: 0px;
    }
`;

export const InfoColumn = ({theme}) => css`
    ${commonMethodInfo.InfoColumn.getDefaultStyle(theme)}
    color: ${theme.color.$main6};
`;

export const InfoSeparator = ({theme}) => css`
    ${commonMethodInfo.InfoSeparator.getDefaultStyle(theme)}
    border-left-color: ${theme.color.$mediumPurple};
`;
