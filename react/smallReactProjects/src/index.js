import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import SpinnerPage from './spinner/SpinnerPage.jsx'
import EditJsonInTextArea from './editJsonInTextArea/EditJsonInTextArea'
import MashupHost from './mashup-component/MashupHost'

const StartView = ({ loadComponent }) => (
    <div>
        <h1>React components:</h1>
        <ul>
            <li>
                <a href="#" onClick={ e => loadComponent(<EditJsonInTextArea/>) }>Edit Json in textarea</a>
            </li>
            <li>
                <a href="#" onClick={ e => loadComponent(<SpinnerPage/>) }>Spinner page</a>
            </li>
            <li>
                <a href="#" onClick={ e => loadComponent(<MashupHost/>) }>Mashup page</a>
            </li>
        </ul>
    </div>
)

class TheRootContext extends Component {
    constructor(props) {
        super(props)
        this.state = { view: <StartView loadComponent={this.loadComponent}/> }
        this.loadComponent = this.loadComponent.bind(this)
    }

    loadComponent = (component) => {
        this.setState({ view: component })
    }

    render() {
        return this.state.view;
    }
}

function start() {
    ReactDOM.render(
        <TheRootContext/>,
        document.getElementById("app")
    );
}

window.onload = start;
