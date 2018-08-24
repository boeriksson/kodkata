import {css} from 'styled-components';
import * as Tabs from '../../_common/skins/Tabs';

/* eslint-disable quotes */
export const Container = ({ theme }) => {
    return css`${Tabs.Container.getDefaultStyle(theme)}`;
};
/* eslint-enable quotes */
