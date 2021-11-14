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
                    <div>
                        <div>
                            <input value={userName} onChange={(e) => {setUserName(e.target.value);setBadLogin(false)}} style={{backgroundColor:"lightgrey"}}className="uk-input" type="text" placeholder="Username"/>
                        </div>
                        <div>
                            <input value={password} onChange={(e) => {setPassword(e.target.value);setBadLogin(false)}} style={{backgroundColor:"lightgrey"}}className="uk-input" type="password" placeholder="Password"/>
                        </div>
                        <button className="uk-button uk-button-secondary uk-button-large" onClick={() => {
                            callLogin()
                        }}>
                            Login
                        </button>
                        {badLogin && <p style={{color: "red"}}>
                            Login Failed!
                        </p>}

                        
                    </div>
                </div>
            }     
            <div className="main">
                <div className="leftPanel">
                    <img src="defaultPerson.png"></img>
                    <div>
                        <h1>
                            {displayName}
                        </h1>
                        {targetJson  ? 
                            <div>
                                <h2>
                                    {targetJson.email}
                                </h2>
                                <h2>
                                    {targetJson.phone}
                                </h2>
                                <h2>
                                    {targetJson.gender}
                                </h2>
                                <h2>
                                    {targetJson.age}
                                </h2>
                                <h2>
                                    {targetJson.ethnicity}
                                </h2>
                            </div>
                        : <h2>Please log in first!</h2>}

                    </div>
                </div>
                <div className="indicatorPanel">
                    
                </div>
                <div className="rightPanel">
                    <Chart
                        width={'100%'}
                        height={'400px'}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                          ['x', ''],
                          [0, 0],
                          [1, 10],
                          [2, 23],
                          [3, 17],
                          [4, 18],
                          [5, 9],
                          [6, 11],
                          [7, 27],
                          [8, 33],
                          [9, 40],
                          [10, 32],
                          [11, 35],
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
                    <img style={{height:"auto", width:"100%"}} src={"wordcloud1.png"}>
                    </img>
                </div>
            </div>        
        </div>
    )
}