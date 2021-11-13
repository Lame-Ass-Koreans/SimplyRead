import React from "react"
import 'uikit/dist/css/uikit.css';
import UIkit from "uikit"
//@ts-ignore
import Icons from 'uikit/dist/js/uikit-icons'
import { useEffect} from 'react';
import {RightSideNav} from './rightSideNav'
//@ts-ignore
UIkit.use(Icons)

const THRESHOLD = 1670
interface HamburgerMenuProps  {
    title : string
    subtitle ?: string
    openClosedCallBack ?: (state : boolean) => any
    links : JSX.Element[]
}


export const HamburgerMenu = (props : HamburgerMenuProps) => {
    useEffect(() => {
        UIkit.offcanvas('#offcanvas-usage').show()
        //@ts-ignore
        UIkit.util.on('#offcanvas-usage', 'beforehide', function(e) {e.preventDefault();}); // this prevents closing
        updateWindowDimensions()
        window.addEventListener('resize', function(e) {updateWindowDimensions(e)})
    },[])

    const updateWindowDimensions = (e ?: any) => {
        let width = window.innerWidth
        
        const el = document.getElementById('canvas-container')
        if (width > THRESHOLD) {
            console.log('bigger')
            if (el) el.style['display'] = 'block'
        }
        else {
            console.log('smaller')
            if (el) el.style['display'] = 'none'
        }
    }
    
    return (
        <div id='canvas-container' className="uk-container">
            <div id="offcanvas-usage" uk-offcanvas="mode: none; esc-close: false; bg-close: false; data-autohide:false; overlay:false" onClick={() => {
                }}>
                <div className="uk-offcanvas-bar" >
                    {/*
                    <span style={{cursor : "pointer"}} onClick={() => {
                        UIkit.offcanvas('#offcanvas-usage').hide(); props.openClosedCallBack && props.openClosedCallBack(false)
                        }} className="data-uk-icon" uk-icon="icon:home">Close</span>
                    */}
                    <h2 className="uk-text-primary">{props.title}</h2>
                    {props.subtitle && <h3 className="uk-text-secondary">{props.subtitle}</h3>}
                    <RightSideNav links={props.links}></RightSideNav>
                </div>
            </div>
        </div>
        
    )
}
