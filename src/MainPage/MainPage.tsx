import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'uikit/dist/css/uikit.css';
import "./navStyle.css"
import { HamburgerMenu } from '../Navigation/hamburgerMenu';
import { RightSideNavFixed } from '../Navigation/rightSideNav';
import { StickyNav } from '../Navigation/stickyNav';
import { Nav } from "react-bootstrap";
import { rightSideMenuHook } from './NavFunc'
import './MainPage.css'


export const MainPage = () => {
    const IS_LAST_SMALLER_THEN_PREV = true;
    const elIDs : Array<string> = []

    const [mode, setMode] = useState("");

    useEffect(() => {
        rightSideMenuHook(IS_LAST_SMALLER_THEN_PREV, elIDs, 80)
    })

    const hamburgerLinks : Array<JSX.Element>= [
        <li className="uk-nav-divider"></li>,
    ]

    const rightSideSubLinks = {
    }

    const stickyLinks : JSX.Element[] = [      
        <li><a style={{fontFamily: "Stencil Std", fontWeight: "bold", fontSize:"32px"}}>Simply Read</a></li>,
        //<li><img src="logo.png" height = "70px" width = "200px" alt="me"/></li>,
        <li><a>Home</a></li>,
        <li><a>Profile</a></li>,
        <li><a>Login</a></li>
    ];

    return (
        <div>
            <div>
                <StickyNav toggleRSM={false} links={stickyLinks}/>
            </div>
            {mode === "" && <div style={{display: "flex"}}>
                <div style={{margin:"auto"}}>
                    <button onClick={() => {
                        setMode("WRITE")
                    }}>
                        Paste/Write
                    </button>
                </div>
                <div style={{margin:"auto"}}>
                    <button onClick={() => {
                        setMode("URL")
                    }}>
                        Import from URL
                    </button>
                </div>
                <div style={{margin:"auto"}}>
                    <button onClick={() => {
                        setMode("UPLOAD")
                    }}>
                        Upload a file
                    </button>
                </div>
            </div>}
            {mode !== "" && 
                <div style={{margin:"auto"}}>
                    <button onClick={() => {
                        setMode("")
                    }}>
                        Go Back
                    </button>
                </div>
            }
            {mode === "WRITE" && 
                <form>
                    <textarea placeholder="Type your content here"></textarea>
                </form>
            }
            {mode === "URL" && 
                <form>
                     <div className="uk-margin">
                        <input type="text" placeholder="Type your url here"/>
                    </div>
                </form>
            }
            {mode === "UPLOAD" && 
                <form>
                    <div className="js-upload uk-placeholder uk-text-center">
                        <span uk-icon="icon: cloud-upload"></span>
                        <span className="uk-text-middle">Attach binaries by dropping them here or selecting one</span>
                        <div uk-form-custom>
                            <input type="file" multiple/>
                        </div>
                    </div>
                </form>
            }
            

        </div>
    )
}