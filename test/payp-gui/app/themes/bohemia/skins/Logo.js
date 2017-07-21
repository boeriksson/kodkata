import {css} from 'styled-components';
import * as commonLogo from '../../_common/skins/Logo';

export const Container = ({theme}) => css`
    ${commonLogo.Container.getDefaultStyle(theme)}        
`;

export const Sprite = ({theme}) => css`
    ${commonLogo.Sprite.getDefaultStyle(theme)}        
`;
