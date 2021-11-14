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
import Highlighter from "react-highlight-words";

export const MainPage = () => {    
    const [mode, setMode] = useState("");
    const [currentText, setCurrentText] = useState("");
    const [newText, setNewText] = useState("");
    
    const [showLogin, setShowLogin] = useState(false)
    const [displayName, setDisplayName] = useState("")

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const [badLogin, setBadLogin] = useState(false)

    const [userDisplay, setUserDisplay] = useState("")
    const [userScore, setUserScore] = useState("")

    const [replacementDictionary, setReplacementDictionary] = useState({})
    const [called, setCalled] = useState(false);

    useEffect(() => {
        const ud = localStorage.getItem('userDisplay');
        if (ud) {
            setDisplayName(ud)
        }
        const us = localStorage.getItem('userScore');
        if (us) {
            setUserScore(us)
        }
    })

    const getHighlightedText = () : JSX.Element => {
        const matchTargets = Object.keys(objectFlip(replacementDictionary))
        console.log(newText)
        const lines = newText.split(/\r?\n/)
         
        return <div>
                {lines.map((l : string) => <><Highlighter
                    highlightClassName="YourHighlightClass"
                    searchWords={matchTargets}
                    autoEscape={true}
                    textToHighlight={l}
                /><div>&nbsp;</div></>
                ) }
            </div>
        
    }

    const objectFlip = (obj: any) => {
        const ret : any = {};
        Object.keys(obj).forEach(key => {
            ret[obj[key]] = key;
        });
        return ret;
      }
      

    const stickyLinks : JSX.Element[] = [      
        <li className="DD"><a style={{fontFamily: "Stencil Std", fontWeight: "bold", fontSize:"32px"}}>Simply Read</a></li>,
        //<li><img src="logo.png" height = "70px" width = "200px" alt="me"/></li>,
        <li><a href={'/'}>Home</a></li>,
        <li><a href={'/profile'}>Profile</a></li>,
        
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
        setCalled(true)
        callReplaceToEasyWords(resp.data.data)
        setNewText(resp.data.data)
    }

    const callReplaceToEasyWords = async (s : string) => {
        const resp = await axios.get(`http://localhost:8000/simplify`,{
            params: {
                target_string: s, 
            },
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
        });
        setNewText(resp.data.data)
        setReplacementDictionary(resp.data.dict)
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
        localStorage.setItem('userPreset', resp.data.preset.toString());
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
            {showLogin && 
                <div>
                    <div className="login0">
                        <div className="login1">
                            <input value={userName} onChange={(e) => {setUserName(e.target.value);setBadLogin(false)}} type="text" placeholder="Username"/>
                        </div>
                        <div className="login2">
                            <input value={password} onChange={(e) => {setPassword(e.target.value);setBadLogin(false)}} type="password" placeholder="Password"/>
                        </div>
                        <div className="login3">
                        <button onClick={() => {
                            callLogin()
                        }}>
                            Login
                        </button>
                        </div>
                        {badLogin && <p style={{color: "red", textAlign:'center'}}>
                            Login Failed!
                        </p>}
                    </div>
                </div>
            }
            <div>
                {mode === "" && <div style={{display: "flex", marginTop:"100px"}}>
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
                        <button
                        onClick={() => {
                            setMode("")
                            setCurrentText("")
                            setNewText("")
                            setCalled(false)
                        }}>
                            Go Back
                        </button>
                    </div>
                }
                {mode === "WRITE" && 
                    <form>
                        <div>
                        <textarea value={currentText} onChange={(e) => {setCurrentText(e.target.value)}} placeholder="Type your content here"></textarea>
                        </div>
                    </form>
                }
                {mode === "URL" && 
                    <form>
                        <div className="inp1">
                            <input type="text" placeholder="Type your url here"/>
                        </div>
                    </form>
                }
                {mode === "UPLOAD" && 
                    <form>
                        <div className="inp2" style={{textAlign:'center'}}>
                            <span uk-icon="icon: cloud-upload"></span>
                            <span>Attach binaries by dropping them here or selecting one</span>
                            <div style={{color:"black"}} uk-form-custom>
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

                {called && 
                <div style={{width:"80%", marginLeft:"auto", minHeight:"200px", marginRight:"auto", padding:"5px", outline:"solid", outlineWidth:"2px"}}>
                    {getHighlightedText()}
                </div>
                }

            </div>
            
        </div>
    )
}