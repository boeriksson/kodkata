import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Tabs from './Tabs'

const tabbar = [
    {
        key: 'SPORTS',
        label: 'Sports',
        selected: false
    },
    {
        key: 'HORSE_RACING',
        label: 'Horse Racing',
        selected: true
    },
    {
        key: 'BINGO',
        label: 'Bingo',
        selected: false
    }
]

class ReactTestApp extends Component {
    constructor (props) {
        super(props)
        this.state = {
            tabs: tabbar
        }
    }

    clickSelect = (cTab) => {
        this.setState({
            tabs: this.state.tabs.map((tab) => {
                return {
                    ...tab,
                    selected: cTab.key === tab.key
                }
            })
        })
    }

    render() {
        return (
            <Tabs tabs={this.state.tabs} clickSelect={this.clickSelect}/>
        )
    }
}

function start() {
    ReactDOM.render(
        <ReactTestApp/>,
        document.getElementById("app")
    )
}

window.onload = start
