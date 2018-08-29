import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import theme from './unibet'

const tabStyles = (props) => theme.skins.Tabs.Container(props);
const StyledTabs = styled.div`${tabStyles}`

class Tabs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false
        }
    }
    render() {
        const {tabs, clickSelect} = this.props
        const clickTab = (tab) => {
            if (tabs.find((t) => !!t.selected ).key === tab.key) {
                this.setState({ expanded: !this.state.expanded })
            } else {
                this.setState({ expanded: false })
            }
            clickSelect(tab)
        }
        const renderedTabs = tabs.map((tab, ix) =>
            <li
                key={ix}
                className={tab.selected ? 'selected' : ''}
                onClick={() => clickTab(tab)}
            ><a>{tab.label}</a></li>)
        return (
            <StyledTabs expanded={this.state.expanded} tabs={tabs}>
                <ul>
                    {renderedTabs}
                </ul>
            </StyledTabs>
        )
    }
}

Tabs.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        selected: PropTypes.bool
    })).isRequired,
    clickSelect: PropTypes.func.isRequired
}

export default Tabs
