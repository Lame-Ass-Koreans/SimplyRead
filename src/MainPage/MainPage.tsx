import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'uikit/dist/css/uikit.css';
import "./navStyle.css"
import { HamburgerMenu } from '../Navigation/hamburgerMenu';
import { RightSideNavFixed } from '../Navigation/rightSideNav';
import { StickyNav } from '../Navigation/stickyNav';
import { Nav } from "react-bootstrap";
import { rightSideMenuHook } from './NavFunc'
import axios from 'axios'

export const MainPage = () => {
    const IS_LAST_SMALLER_THEN_PREV = true;
    const elIDs : Array<string> = []

    const [mode, setMode] = useState("");
    const [currentText, setCurrentText] = useState("");

    useEffect(() => {
        rightSideMenuHook(IS_LAST_SMALLER_THEN_PREV, elIDs, 80)
    })

    const hamburgerLinks : Array<JSX.Element>= [
        <li className="uk-nav-divider"></li>,
    ]

    const rightSideSubLinks = {
    }

    const stickyLinks : JSX.Element[] = [      
        <li><a style={{fontWeight: "bold", fontSize:"32px"}}>Magic Simplify</a></li>,
        <li><a>Home</a></li>,
        <li><a>Profile</a></li>,
        <li><a>Login</a></li>
    ];

    const callReplaceBadWords = async (s : string) => {
        const resp = await axios.get(`http://localhost:8000/badwords`,{
            params: {
                target_string: s, 
            },
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
        });
        setCurrentText(resp.data.data)
    }

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
                        setCurrentText("")
                    }}>
                        Go Back
                    </button>
                </div>
            }
            {mode === "WRITE" && 
                <form>
                    <textarea value={currentText} onChange={(e) => {setCurrentText(e.target.value)}} className="uk-textarea" placeholder="Type your content here"></textarea>
                </form>
            }
            {mode === "URL" && 
                <form>
                     <div className="uk-margin">
                        <input className="uk-input" type="text" placeholder="Type your url here"/>
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
            {currentText !== "" && 
                <div style={{margin:"auto"}}>
                    <button onClick={() => {
                        callReplaceBadWords(currentText)
                    
                    }}>
                        Magify it!
                    </button>
                </div>
            }
            

        </div>
    )
}