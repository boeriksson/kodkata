import React, {Component} from 'react';
import ReactDOM from 'react-dom';


const StartView = () => (
    <div>
        <h1>Mashup module</h1>

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
        document.getElementById('mashupModule')
    );
}

window.onload = start;
