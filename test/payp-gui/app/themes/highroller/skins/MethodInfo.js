import {css} from 'styled-components';
import * as commonMethodInfo from '../../_common/skins/MethodInfo';

export const Container = ({theme}) => css`
      ${commonMethodInfo.Container.getDefaultStyle(theme)}
`;

export const Title = ({theme}) => css`
      ${commonMethodInfo.Title.getDefaultStyle(theme)}
`;

export const Logo = ({theme}) => css`
      ${commonMethodInfo.Logo.getDefaultStyle(theme)}
`;

export const InfoContainer = ({theme}) => css`
      ${commonMethodInfo.InfoContainer.getDefaultStyle(theme)}
`;

export const InfoColumn = ({theme}) => css`
      ${commonMethodInfo.InfoColumn.getDefaultStyle(theme)}
`;

export const InfoSeparator = ({theme}) => css`
      ${commonMethodInfo.InfoSeparator.getDefaultStyle(theme)}
      border-left-color: ${theme.color.$main7};
`;
