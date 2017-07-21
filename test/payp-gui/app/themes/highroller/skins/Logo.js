import {css} from 'styled-components';
import * as commonLogo from '../../_common/skins/Logo';

export const Container = ({theme}) => css`
    ${commonLogo.Container.getDefaultStyle(theme)}
    
    img {
        background-color: white;
		padding: 4px;
		border-radius: ${theme.layout.border.radius};
		display: inline-block;
    }
`;

export const Sprite = ({theme}) => css`
    ${commonLogo.Sprite.getDefaultStyle(theme)}        
`;
