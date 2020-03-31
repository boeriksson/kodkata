import React, {useState, useRef} from 'react'

const style = {
    border: '1px solid black',
    margin: '10px',
    padding: '10px'
}

export default (props) => {
    const [bgColor, setBgColor] = useState('white')
    const inputRef = useRef()
    const realStyle = {...style, backgroundColor: bgColor}
    const {api: {v1: {postTo, listenTo}}} = props;

    const handleClick = (e) => postTo('kadaffi', {color: inputRef.current.value})

    const handleEvent = (e) => setBgColor(e.detail.color)

    listenTo('kadaffi', handleEvent)

    return (
        <div style={{...realStyle}}><button onClick={handleClick} style={{marginRight: '10px'}}>Update color</button><input type="text" ref={inputRef} defaultValue={bgColor}/></div>
    )
}