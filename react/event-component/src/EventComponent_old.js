import React, {useState, useEffect, useRef} from 'react'

const style = {
    border: '1px solid black',
    margin: '10px',
    padding: '10px'
}

export default (props) => {
    const [bgColor, setBgColor] = useState('white')
    const inputRef = useRef()
    const {api: {v1: {postTo, listenTo, stopListenTo}}} = props;
    //const handleClick = (e) => postTo('kadaffi', {color: inputRef.current.value})
    const handleClick = (e) => window.dispatchEvent(new CustomEvent('saddam', {detail: {color: inputRef.current.value}}))

    const handleEvent = (e) => {
        setBgColor(e.detail.color)
    }
    useEffect(() => {
        listenTo('kadaffi', handleEvent)
        return () => stopListenTo('kadaffi', handleEvent)
    }, [])

    useEffect(() => {
        window.addEventListener('saddam', handleEvent)
        return () => window.removeEventListener('saddam', handleEvent)
    }, [])

    const realStyle = {...style, backgroundColor: bgColor}
    return (
        <div style={{...realStyle}}><button onClick={handleClick} style={{marginRight: '10px'}}>Update color</button><input type="text" ref={inputRef} defaultValue={bgColor}/></div>
    )
}