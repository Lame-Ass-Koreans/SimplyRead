import React from "react"
import 'uikit/dist/css/uikit.css';
import UIkit from "uikit"


interface StickyNavProps  {
    links : JSX.Element[]
    toggleRSM : boolean
    openClosedCallBack ?: (state : boolean) => any
}

export const StickyNav = (props : StickyNavProps) => {
    return (
        <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky;">
            <nav className="uk-navbar-container" data-uk-navbar>

                    <div className="uk-navbar-left">
                
                        <ul className="uk-navbar-nav">
                            
                            <li>
                                {props.toggleRSM ?
                                <a href="#" onClick={() => {
                                    UIkit.offcanvas('#offcanvas-usage').show()
                                    props.openClosedCallBack && props.openClosedCallBack(true)
                                }} data-uk-navbar-toggle-icon></a> :
                                <a></a>
                                }
                            </li>
                            
                            {props.links}
                        </ul>
                
                    </div>
                
                </nav>
            </div>
    )
}