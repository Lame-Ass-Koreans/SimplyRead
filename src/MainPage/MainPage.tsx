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
import './MainPage.css'


export const MainPage = () => {
    const IS_LAST_SMALLER_THEN_PREV = true;
    const elIDs : Array<string> = []

    const [mode, setMode] = useState("");
    const [currentText, setCurrentText] = useState("");
    
    const [showLogin, setShowLogin] = useState(false)
    const [displayName, setDisplayName] = useState("")

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const [badLogin, setBadLogin] = useState(false)

    const [userDisplay, setUserDisplay] = useState("")
    const [userScore, setUserScore] = useState("")

    useEffect(() => {
        rightSideMenuHook(IS_LAST_SMALLER_THEN_PREV, elIDs, 80)
        const ud = localStorage.getItem('userDisplay');
        if (ud) {
            setDisplayName(ud)
        }
        const us = localStorage.getItem('userScore');
        if (us) {
            setUserScore(us)
        }

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

    if (displayName === "") {
        stickyLinks.push(<li><a onClick={() => {setShowLogin(!showLogin)}}>Login</a></li>) 
    }
    else {
        stickyLinks.push(<li><a>Hello {displayName}!</a></li>) 
        stickyLinks.push(<li><a>Your Score: {userScore}</a></li>) 
        stickyLinks.push(<li><a onClick={() => {signOut()}}>Sign Out</a></li>)

    }

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

    const signOut = () => {
        localStorage.clear()
        setUserScore("")
        setDisplayName("")
    }

    const callLogin = async () => {
        const resp : any = await axios.get(`http://localhost:8000/login`,{
            params: {
                username : userName,
                password: password
            },
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
        }).catch(e => {
            setBadLogin(true)
        })
        if (!resp) {
            return
        }
        localStorage.setItem('userDisplay', resp.data.displayname);
        localStorage.setItem('userScore', resp.data.score.toString());
        setDisplayName(resp.data.displayname)
        setUserScore(resp.data.score)
        setShowLogin(false)
        setUserName("")
        setPassword("")
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