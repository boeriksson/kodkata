import {css} from 'styled-components';
import * as commonFundsProtection from '../../_common/skins/FundsProtection';

export const Container = ({theme}) => css`
    ${commonFundsProtection.Container.getDefaultStyle(theme)}
    
    color: ${theme.color.$main6};
`;
