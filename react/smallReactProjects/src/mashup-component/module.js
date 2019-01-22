import React, {Component} from 'react';
import ReactDOM from 'react-dom';


const StartView = () => (
    <div>
        <h1>Mashup module - This script is served separately</h1>

    </div>
)

class TheRootContext extends Component {
    constructor(props) {
        super(props)
        console.log('mashupModule constructor running');
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
    console.log('mashupModule.start runing');
    ReactDOM.render(
        <TheRootContext/>,
        document.getElementById('mashupModule')
    );
}

console.log('in mashup module.. ')

start()
