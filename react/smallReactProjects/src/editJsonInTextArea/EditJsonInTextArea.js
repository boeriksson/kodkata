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

const isValidJson = (str) => {
    try {
        JSON.parse(str)
    } catch (e) {
        return false
    }
    return true
}

const formatJson = (str) => {
    let result
    try {
        result = JSON.stringify(JSON.parse(str), undefined, 2)
    } catch (e) {
        result = str
    }
    return result
}

/*
const isValidJson = (str) => /^[\],:{}\s]*$/.test(str.toString().replace(/\\["\\\/bfnrtu]/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))
*/

class EditJsonInTextArea extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jsonToEdit: defalutJson
        }
        this.updateJson = this.updateJson.bind(this)
        this.handleGo = this.handleGo.bind(this)
        this.injectJson = this.injectJson.bind(this)
    }
    updateJson(e) {
        this.setState({ jsonToEdit: e.target.value })
    }
    handleGo() {
        console.log('Go: ', this.state.jsonToEdit)
    }
    injectJson() {
        this.setState({ jsonToEdit: '{ name: "completly diffrent json..." }'})
    }

    render() {
        const formattedJson = formatJson(this.state.jsonToEdit)
        const isValid = isValidJson(this.state.jsonToEdit)
        const malformedJSON = isValid ? 'none' : 'block'
        return (
            <div className="container">
                <h1>EditJsonInTextArea</h1>
                <div><button onClick={this.injectJson}>Inject Json</button></div>
                <div style={{ color: 'red', display: malformedJSON }}>Malformed JSON...</div>
                <textarea style={{ margin: '15px 0' }} rows="20" cols="60" value={formattedJson} onChange={this.updateJson}/>
                <div>
                    <button disabled={!isValid} onClick={this.handleGo}>Go</button>
                </div>
            </div>
        )
    }
}

export default EditJsonInTextArea;
