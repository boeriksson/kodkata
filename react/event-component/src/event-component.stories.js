import React, {useRef, useEffect} from 'react'
import useApi from './shellAPI'

export const EventComp = () => {
    const compRef1 = useRef()
    const compRef2 = useRef()

    const api1 = useApi()
    const props1 = {
        api: api1.api
    }
    const api2 = useApi()
    const props2 = {
        api: api2.api
    }
    useEffect(() => {
        if (compRef1.current) {
            compRef1.current.props = props1
        }
        if (compRef2.current) {
            compRef2.current.props = props2
        }
        import('./index.js')
    })
    useEffect(() => {
        return () => {
            api1.cleanup()
            api2.cleanup()
        }
    })
    return (
        <div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <span>first component:</span>
                <event-component {...props1} ref={compRef1}/>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <span>second component:</span>
                <event-component {...props2} ref={compRef2}/>
            </div>
        </div>
    )

}

export default {
    component: EventComp,
    title: 'Event Component'
}
