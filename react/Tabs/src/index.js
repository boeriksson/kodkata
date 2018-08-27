import React from 'react'
import ReactDOM from 'react-dom'
import Tabs from './Tabs'

const tabbar = [
    {
        key: 'SPORTS',
        label: 'Sports',
        selected: true
    },
    {
        key: 'HORSE_RACING',
        label: 'Horse Racing',
        selected: false
    },
    {
        key: 'BINGO',
        label: 'Bingo',
        selected: false
    }
]

const clickSelect = () => {}

const ReactTestApp = () => (
    <Tabs tabs={tabbar} clickSelect={clickSelect}/>
)

function start() {
    ReactDOM.render(
        <ReactTestApp/>,
        document.getElementById("app")
    )
}

window.onload = start
