import React from 'react';
import ReactDOM from 'react-dom';
import BaseContainer from './BaseContainer.jsx';

const ReactTestApp = () => (
    <BaseContainer />
);

function start() {
    ReactDOM.render(
        <ReactTestApp/>,
        document.getElementById("app")
    );
}

window.onload = start;
