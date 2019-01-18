import React, {Component} from 'react'

class Mashup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: <div>Content beeing loaded here...</div>
        }
    }

    componentDidMount() {
        fetch('mashupModule.js')
        .then((resp) => {
            console.log('resp: ', resp);
        })
        .catch((e) => {
            console.log('e: ', e);
        })
    }

    render() {
        return (
            <div>
                <h2>Mashup component</h2>
                { this.state.content }
            </div>
        )
    }
}

export default Mashup
