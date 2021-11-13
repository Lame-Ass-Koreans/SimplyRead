import React, { useEffect, useState } from 'react';
import 'uikit/dist/css/uikit.css';

interface RightSideNavProps {
    links : JSX.Element[]
}

const THRESHOLD = 1500

export const RightSideNav = (props : RightSideNavProps) => {
    return (<div className="uk-container">
        <ul className="uk-nav uk-nav-default" style={{width : '200px'}}>
            {props.links}
        </ul>
    </div>)
}

export const RightSideNavFixed = (props : RightSideNavProps) => {
    const [screenWidth, setScreenWidth] = useState(0)
    useEffect(() => {
        updateWindowDimensions()
        window.addEventListener('resize', updateWindowDimensions)
    },[])

    const updateWindowDimensions = () => {
        setScreenWidth(window.innerWidth)
    }

    return (
            <div className="uk-container" style={{position : "fixed", right : "1%", top : "25%"}}>
                {screenWidth >= THRESHOLD && <RightSideNav links={props.links}/>}
            </div>
    )
}

