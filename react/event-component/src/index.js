import React from 'react'
import ReactDOM from 'react-dom'
import EventComp from './EventComponent'
import retargetEvents from 'react-shadow-dom-retarget-events'

class EventComponent extends HTMLElement {
    static TAG_NAME = 'event-component'
    shadowRoot
    renderTo
    isMounted
    removeListeners

    constructor() {
        super()
        this.shadowRoot = this.attachShadow({mode: 'open'})
        this.renderTo = null
        this.isMounted = false
    }

    static get observedAttributes() {
        return []
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render()
    }

    connectedCallback() {
        this.mount()
        this.render()
    }

    disconnectedCallback() {
        this.unmount()
    }

    mount() {
        if (!this.isMounted) {
            this.renderTo = document.createElement('div')
            this.shadowRoot.appendChild(this.renderTo)
            this.removeListeners = retargetEvents(this.shadowRoot)
            this.isMounted = true
        }
    }

    unmount() {
        ReactDOM.unmountComponentAtNode(this.renderTo)
        this.shadowRoot.removeChild(this.renderTo)
        this.renderTo = null
        this.removeListeners()
        this.isMounted = false
    }

    render() {
        if (this.isMounted) {
            console.log('index render this.props: ', this.props)
            ReactDOM.render(
                <EventComp {...this.props}/>, this.renderTo)
        }
    }
}

if (!customElements.get(EventComponent.TAG_NAME)) {
    customElements.define(EventComponent.TAG_NAME, EventComponent)
}