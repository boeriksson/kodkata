import React, {Component} from 'react'

class Mashup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: '<div>Content beeing loaded here...</div>'
        }
    }


    componentDidMount() {
        fetch('/dist/mashupModule.js')
        .then((response) => {
            return response.text()
        })
        .then((result) => {
            console.log('result: ', result)
            window.eval(result)
        })
        .catch((e) => {
            console.log('e: ', e)
        })
    }

    render() {
        return (
            <div>
                <h2>Mashup component</h2>
                <div id="mashupModule">Here be da new module.. </div>
            </div>
        )
    }
}

export default Mashup
