import {useState} from 'react'

function useApi() {
    const [listeners, setListeners] = useState([])
    const addListener = (listener) => setListeners([...listeners, listener])
    const api = {
        v1: {
            showInformation: (payload) => console.log('ShellAPI showInformation call payload: ', payload),
            showError: (payload) => console.log('ShellAPI showError call payload: ', payload),
            postTo: (type, payload) => {
                //console.log('postTo type: %o, payload: %o', type, payload)
                const event = new CustomEvent(type, {detail: payload})
                window.dispatchEvent(event)
            },
            listenTo: (type, callback) => {
                window.addEventListener(type, callback)
                addListener({type, event: callback})
            }
        }
    }

    const cleanup = () => {
        listeners.forEach((listener) => {
            window.removeEventListener(listener.type, listener.event)
        })
    }

    return {api, cleanup}
}

export default useApi

