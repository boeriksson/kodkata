import {css} from 'styled-components';
import * as commonBankInfo from '../../_common/skins/BankInfoEntercash';

export const Container = ({theme}) => css`
    ${commonBankInfo.Container.getDefaultStyle(theme)}
    
    .form-label-top {
        margin-top: ${theme.layout.common.$spacingMedium};
    }
`;

export const FlexContainer = ({theme}) => css`
    ${commonBankInfo.FlexContainer.getDefaultStyle(theme)}
`;

export const Clearing = ({theme}) => css`
    ${commonBankInfo.Clearing.getDefaultStyle(theme)}
`;

export const Account = ({theme}) => css`
    ${commonBankInfo.Account.getDefaultStyle(theme)}
`;
