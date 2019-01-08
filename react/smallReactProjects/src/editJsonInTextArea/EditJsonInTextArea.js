import React, {Component} from 'react'

const defalutJson =
    JSON.stringify(
        {
            config: {
                brand: 'mariacasino',
                depositSummary: true,
                locale: 'sv_SE',
                currency: 'SEK',
                games: {
                    filter: {
                        products: [
                            'CASINO',
                            'BINGO',
                            'POKER',
                            'LOTTERY',
                            'SPORTS'
                        ]
                    }
                }
            }
        }
    )

const isValidJson = (str) => /^[\],:{}\s]*$/.test(str.toString().replace(/\\["\\\/bfnrtu]/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))

class EditJsonInTextArea extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jsonToEdit: defalutJson
        }
        console.log("running constructor")
        this.updateJson = this.updateJson.bind(this)
        this.handleGo = this.handleGo.bind(this)
    }
    updateJson(e) {
        this.setState({ jsonToEdit: e.target.value })
        console.log('updateJson: ', e.target.value);
    }
    handleGo() {
        console.log('Go: ', this.state.jsonToEdit)
    }

    render() {
        console.log('jsonToEdit: ', this.state.jsonToEdit)
        const isValid = isValidJson(this.state.jsonToEdit)
        const formattedJson = isValid
            ? JSON.stringify(JSON.parse(this.state.jsonToEdit), undefined, 2)
            : this.state.jsonToEdit
        const malformedJSON = isValid ? 'none' : 'block'
        return (
            <div className="container">
                <h1>EditJsonInTextArea</h1>
                <div style={{ color: 'red', display: malformedJSON }}>Malformed JSON...</div>
                <textarea style={{ margin: '15px 0' }} rows="20" cols="60" defaultValue={formattedJson} onChange={this.updateJson}/>
                <div>
                    <button disabled={!isValid} onClick={this.handleGo}>Go</button>
                </div>
            </div>
        )
    }
}

export default EditJsonInTextArea;
