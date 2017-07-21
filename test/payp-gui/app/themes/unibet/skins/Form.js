import {css} from 'styled-components';
import * as commonForm from '../../_common/skins/Form';

export default ({disabled}) => css`
	${commonForm.getDefaultStyle(disabled)}
`;
