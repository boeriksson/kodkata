import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const tabStyles = (props) => props.theme.skins.Tabs.Container(props);
const StyledTabs = styled.div`${tabStyles}`;

const Tabs = ({ tabs, clickSelect }) => {
    const renderedTabs = tabs.map((tab, ix) =>
        <li
            key={ix}
            className={ tab.selected ?  'selected' : ''}
            onClick={ () => clickSelect(tab) }
        ><a>{tab.label}</a></li>);
    return (
        <StyledTabs>
            <ul>
                { renderedTabs }
            </ul>
        </StyledTabs>
    );
};

Tabs.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        selected: PropTypes.bool
    })).isRequired,
    clickSelect: PropTypes.func.isRequired
};

export default Tabs;