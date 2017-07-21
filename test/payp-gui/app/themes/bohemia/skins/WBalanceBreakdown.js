import {css} from 'styled-components';
import * as commonWBalanceBreakdown from '../../_common/skins/WBalanceBreakdown';

export const Container = ({theme}) => css`
    ${commonWBalanceBreakdown.Container.getDefaultStyle(theme)}
     
    td.headerCell {
        color: ${theme.color.$main5};
    }
    
    td.valueCell {
        color: ${theme.color.$main3};
    }
`;
