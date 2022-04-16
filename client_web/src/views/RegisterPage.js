import React, { useState } from "react";
import { Grid, TextField, Button } from '@material-ui/core';
import '../css/Register.css'
import Axios from "axios"

function Register() {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [data, setData] = useState("");

    const register = () => {
        if (registerEmail !== "" && registerUsername !== "" && registerPassword !== "") {
            Axios({
                method: "POST",
                data: {
                    username: registerUsername,
                    email: registerEmail,
                    password: registerPassword,
                    addressIp: ""
                },
                withCredentials: true,
                url: "http://localhost:8080/api/register",
            }).then((res) => {
                console.log(res);
                if (res.data === "User Created")
                    window.location.pathname = "/";
                else
                    setData("User already exist!");
            });
        }
        else
            setData("Please, fill all fields!");
    };

    const paperStyle = { padding: 20, backgroundColor: '#E3DCD2', height: '80vh', width: '60vh', margin: "20px auto", outline: 'none', borderBottom: "none" }

    const loginButton = { backgroundColor: '#013328', color: 'white', width: '59vh', marginTop: '30px', height: '60px' }

    const inputStyle = { color: 'white', width: '59vh', backgroundColor: 'white', borderRadius: '5px', }

    return (
        <div className="back_register">
            <Grid>
                <Grid align='center' style={paperStyle}>
                    <h1 className='title'>SIGN UP</h1>
                    <p className='account'>Sign up with your email adress</p>
                    <h4 className='question'>What's your email?</h4>
                    <TextField label='Mail' placeholder='Enter your email.' onChange={(e) => setRegisterEmail(e.target.value)} style={inputStyle} />
                    <h4 className='question'>Create your password</h4>
                    <TextField label='Password' placeholder='Enter password.' type='password' onChange={(e) => setRegisterPassword(e.target.value)} style={inputStyle} />
                    <h4 className='question'>How should be call you?</h4>
                    <TextField label='Username' placeholder='Enter your username.' onChange={(e) => setRegisterUsername(e.target.value)} style={inputStyle} />
                    <Button onClick={register} style={loginButton}>Register</Button>
                    <p className='account' onClick={() => window.location.pathname = '/'}>Have an account? Log in</p>
                    {data ? <h1 className='errorMessage'>{data}</h1> : null}
                </Grid>
            </Grid>
        </div>
    );
}

export default Register;
