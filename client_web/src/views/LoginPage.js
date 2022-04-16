import React, { useState } from "react";
import {Grid, TextField, Button} from '@material-ui/core';
import image from '../images/or.png'
import '../css/Login.css'
import Axios from "axios";
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const GOOGLE_CLIENT_ID = "775234102006-65gsc9tjb1t2m9683s5q2ca5ils1201a.apps.googleusercontent.com"
const FACEBOOK_CLIENT_ID = "605620607162370"

function Login() {

    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [data, setData] = useState("");

    const login = (loginUsername, loginPassword) => {
        if (loginUsername !== "" && loginPassword !== "") {
            Axios({
                method: "POST",
                data: {
                    username: loginUsername,
                    password: loginPassword,
                },
                withCredentials: true,
                url: "http://localhost:8080/api/login",
            }).then((res) => {
                if (res.data === "Successfully Authenticated") {
                    Axios({
                        method: "POST",
                        data: {
                            username: loginUsername,
                            subscribedToWeather: false,
                            subscribedToMusic: false,
                            subscribedToIntra: false,
                            widgets: [],
                        },
                        url: "http://localhost:8080/services/newTable",
                    }).then((res) => {
                        console.log(res);
                    })
                    window.location.pathname = "/Area"
                }
                else {
                    console.log("Can not connect")
                    setData("Please, fill all fields!")
                }
            });
        }
        else
            setData("Please, fill all fileds!")
    };

    const register = (registerEmail, registerUsername, registerPassword, registerPicture) => {
        Axios({
            method: "POST",
            data: {
                username: registerUsername,
                email: registerEmail,
                password: registerPassword,
                picture: registerPicture,
            },
            withCredentials: true,
            url: "http://localhost:8080/api/register",
        }).then((res) => {
            console.log(res);
            login(registerUsername, registerPassword);
        });
    };

    const onLoginSuccess = (res) => {
        console.log('Login Success:', res.profileObj);
        register(res.profileObj.email, res.profileObj.name, res.profileObj.googleId, res.profileObj.imageUrl);
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    const responseFacebook = (response) => {
        console.log('Login Success:', response);
        register(response.email, response.name, response.id, response.picture.data.url);
    }

    const componentClicked = () => {
        console.log("facebook clicked");
    }

    const paperStyle = {padding: 20, backgroundColor: '#E3DCD2', height: '80vh', width: '60vh', margin: "20px auto", outline: 'none', borderBottom: "none"}

    const loginButton = {backgroundColor: '#013328', color: 'white', width: '60vh', marginTop: '10px', height: '60px'}

    const inputStyle = {color: 'white', width: '59vh', backgroundColor: 'white', borderRadius: '5px', marginTop: '20px'}

    return (
        <div className="back_login">
            <Grid align='center'>
                <Grid align='center' style={paperStyle}>
                    <div className="Title">
                        <text className="title_t">Welcome to</text>
                    </div>
                    <div className="Title_w">
                        <text className='title_w'>AREA</text>
                    </div>
                    <div className='Buttons'>
                        <GoogleLogin
                            clientId={GOOGLE_CLIENT_ID}
                            buttonText="Sign in with Google"
                            onSuccess={onLoginSuccess}
                            onFailure={onLoginFailure}
                            cookiePolicy={'single_host_origin'}
                            className="ButtonGoogle"
                            />
                        <div className="box_fb">
                            <FacebookLogin
                                appId={FACEBOOK_CLIENT_ID}
                                buttonText="Sign in with facebook"
                                fields="name,email,picture"
                                onClick={componentClicked}
                                callback={responseFacebook}
                                className="Buttonfacebook"
                            />
                        </div>
                    </div>
                    <img className="or" src={image} alt="sdfff"/>
                    <TextField label=' Username' placeholder='' onChange={(e) => setLoginUsername(e.target.value)} style={inputStyle}/>
                    <TextField label=' Password' placeholder='' type='password' onChange={(e) => setLoginPassword(e.target.value)} style={inputStyle}/>
                    <Button onClick={() => login(loginUsername, loginPassword)} style={loginButton}>Login</Button>
                    <p className='account' onClick={() => window.location.pathname = 'Register'}>Don't have an account? Register</p>
                    {data ? <h1 className='errorMessage'>{data}</h1> : null}
                </Grid>
            </Grid>
        </div>
    );
}

export default Login;
