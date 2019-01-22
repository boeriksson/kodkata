import React, {Component} from 'react'

import Mashup from './Mashup'

const getButtonLabel = toggle => toggle ? 'Close mashup' : 'Activate mashup'

class MashupHost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toggle: false,
            buttonLabel: 'Activate mashup'
        }
    }

    toggleMashup = () => {
        this.setState({ toggle: !this.state.toggle, buttonLabel: getButtonLabel(this.state.toggle) })
    }

    render () {
        const { toggle, buttonLabel } = this.state
        const mashup = toggle ? <Mashup/> : null
        return (
            <div>
                <h1>A lazy mashup...</h1>
                <button onClick={this.toggleMashup}>{ buttonLabel }</button>
                { mashup }
            </div>
        )
    }
}

export default MashupHost
