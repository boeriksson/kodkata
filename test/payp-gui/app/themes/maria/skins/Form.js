import {css} from 'styled-components';
import * as commonForm from '../../_common/skins/Form';

export default ({theme, disabled}) => css`
	${commonForm.getDefaultStyle(disabled)}
	
	.submitFormButton {
        margin-top: ${theme.layout.common.$spacingMedium};
    }
`;
