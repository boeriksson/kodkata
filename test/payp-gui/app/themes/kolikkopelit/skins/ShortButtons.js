import {css} from 'styled-components';
import * as commonShortButtons from '../../_common/skins/ShortButtons';

export const Container = ({theme}) => css`
    ${commonShortButtons.Container.getDefaultStyle(theme)}
    
    margin: ${theme.layout.common.$spacingWide} 0 ${theme.layout.common.$spacingTight} 0;
`;
