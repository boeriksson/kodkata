import {css} from 'styled-components';
import * as commonShortButtons from '../../_common/skins/ShortButtons';

export const Container = ({theme}) => css`
    ${commonShortButtons.Container.getDefaultStyle(theme)}
    
    margin: ${theme.layout.common.$spacingTight} 0;
    & > button:first-child {
        margin-right: ${theme.layout.common.$spacingTight};
    }
    & > button:last-child {
        margin-left: ${theme.layout.common.$spacingTight};
    }
`;
