import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'uikit/dist/css/uikit.css';
import "./navStyle.css"
import { HamburgerMenu } from '../Navigation/hamburgerMenu';
import { RightSideNavFixed } from '../Navigation/rightSideNav';
import { StickyNav } from '../Navigation/stickyNav';
import { Nav } from "react-bootstrap";
import { rightSideMenuHook } from './NavFunc'


export const MainPage = () => {
    const IS_LAST_SMALLER_THEN_PREV = true;
    const elIDs : Array<string> = []

    useEffect(() => {
        rightSideMenuHook(IS_LAST_SMALLER_THEN_PREV, elIDs, 80)
    })

    const hamburgerLinks : Array<JSX.Element>= [
        <li className="uk-nav-divider"></li>,
    ]

    const rightSideSubLinks = {
    }

    const stickyLinks : JSX.Element[] = [      
        <li><a style={{fontWeight: "bold"}}>Magic Simplify</a></li>,
        <li><a>Home</a></li>,
        <li><a>Profile</a></li>,
        <li><a>Login</a></li>



    ];


    const names = {
  
    }

    return (
        <div>
            <div>
                <StickyNav toggleRSM={false} links={stickyLinks}/>
            </div>
            <div style={{margin: "auto"}}>
                <div>
                    <button>
                        Paste/Write
                    </button>
                </div>
                
                <button>
                    Import from URL
                </button>
                <button>
                    Upload a file
                </button>
            </div>
            
            
        
        </div>
    )
}