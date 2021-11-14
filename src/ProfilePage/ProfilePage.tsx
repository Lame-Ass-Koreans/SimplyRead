import React, { useEffect, useState } from 'react';
import { StickyNav } from '../Navigation/stickyNav';
import axios from 'axios'
import './profile.css'
import aaron from './users/Aaron.json';
import johndoe from './users/Johndoe.json';
import taek from './users/Taek.json';
import zia from './users/Zia.json';
import Chart from "react-google-charts";

export const ProfilePage = () => {
    const [displayName, setDisplayName] = useState("")
    const [userScore, setUserScore] = useState("")
    const [preset, setPreset] = useState("-1")
    const [showLogin, setShowLogin] = useState(false)
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [badLogin, setBadLogin] = useState(false)


    const stickyLinks : JSX.Element[] = [      
        <li><a style={{fontFamily: "Stencil Std", fontWeight: "bold", fontSize:"32px"}}>Simply Read</a></li>,
        //<li><img src="logo.png" height = "70px" width = "200px" alt="me"/></li>,
        <li><a href={'/'}>Home</a></li>,
        <li><a href={'/profile'}>Profile</a></li>,
        
    ];

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

    const signOut = () => {
        localStorage.clear()
        setUserScore("")
        setDisplayName("")
        setPreset("")
    }

    if (displayName === "") {
        stickyLinks.push(<li><a onClick={() => {setShowLogin(!showLogin)}}>Login</a></li>) 
    }
    else {
        stickyLinks.push(<li><a>Hello {displayName}!</a></li>) 
        stickyLinks.push(<li><a>Your Score: {userScore}</a></li>) 
        stickyLinks.push(<li><a onClick={() => {signOut()}}>Sign Out</a></li>)

    }

    useEffect(() => {
        const ud = localStorage.getItem('userDisplay');
        if (ud) {
            setDisplayName(ud)
        }
        const us = localStorage.getItem('userScore');
        if (us) {
            setUserScore(us)
        }
        const up = localStorage.getItem('userPreset');
        if (up) {
            setPreset(up)
        }
    })

    const getJson = (preset: string) => {
        switch (preset) {
            case '0':
                return aaron
            case '1':
                return johndoe
            case '2':
                return taek
            case '3':
                return zia
            default:
                return null
        }
    }

    
    const targetJson : any = getJson(preset);
    return (
        <div style={{height:"100%"}}>
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
            <div className="main">
                <div className="leftPanel">
                    <img src="defaultPerson.png"></img>
                </div>
                <div className="indicatorPanel">
                        <div></div>
                        <h1 style={{lineHeight: "10px", fontFamily: "Arial Black", fontWeight: "bold", fontSize:"32px"}}>
                            {displayName}
                        </h1>
                        {targetJson  ? 
                            <div>
                                <h4>
                                    <div>Email: {targetJson.email}</div>
                                    <div>phone: {targetJson.phone} </div>
                                    <div>Gender: {targetJson.gender} </div>
                                    <div>Age: {targetJson.age} </div> 
                                    <div>Country: {targetJson.ethnicity} </div>
                                </h4>
                            </div>
                        : <h2>Please log in first!</h2>}
                </div>
                <div className="rightPanel">
                    {targetJson && targetJson.email === "adavoodi@ranchview.edu" && <div>
                        <Chart
                        width={'100%'}
                        height={'400px'}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                          ['x', ''],
                          [0, 14],
                          [1, 50],
                          [2, 230],
                          [3, 412],
                          [4, 780],
                          [5, 1290],
                          [6, 2300],
                          [7, 3322],
                          [8, 3430],
                          [9, 5012],
                          [10,6801],
                          [11, 7500],
                        ]}
                        options={{
                          hAxis: {
                            title: 'Months',
                          },
                          vAxis: {
                            title: 'Score',
                          },
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    >

                    </Chart>
                    <img style={{height:"auto", width:"70%"}} src={"wordcloud1.png"}>
                    </img>
                    </div>}
                </div>
            </div>        
        </div>
    )
}