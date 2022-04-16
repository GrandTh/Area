import React, { useState } from "react";
import image from '../images/photo.png'
import './css/TopBar.css'
import Axios from "axios";
import Download from '@mui/icons-material/Download';

function TopBar() {

    const [userInfo, setUserInfo] = useState(null);

    if (userInfo == null) {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:8080/api/user",
        }).then((res) => {
            const username = res.data.username
            console.log("user infoooo  " + username);
            if (username === "username")
                {window.location.pathname = "/"}
            Axios({
                method: "POST",
                data: {
                    username: username,
                },
                withCredentials: true,
                url: "http://localhost:8080/api/userInfo",
            }).then((res) => {
                setUserInfo(res.data.data)
            });
        });
    };

    return (
        <div className="bg_top">
            <div className="buttons_Wrapper">
                <div className="btn_dl_top" onClick={() => window.location.pathname = 'client.apk'}>
                    <Download style={{ color: '#fff', height: "30px", width: "30px" }}/>
                </div>
                <div className="buttons_on_top">
                    <div className="ButtonTop" onClick={() => window.location.pathname = 'Area'}>
                        <text className="txt_top">My AREA</text>
                    </div>
                    <div className="ButtonTop" onClick={() => {window.location.pathname = "ServicesPage"}}>
                        <text className="txt_top">Services</text>
                    </div>
                    <div className="ButtonTop" onClick={() => window.location.pathname = 'Create_action'}>
                        <text className="txt_top">Create AREA</text>
                    </div>
                    <div className="ButtonTopAccount" onClick={() => {window.location.pathname = "Account"}}>
                        <img className="photo_sidebar" src={userInfo ? userInfo.picture ? userInfo.picture : image : image} alt="profil"/>
                        <text className="txt_top">Account</text>
                    </div>
                    <div className="ButtonLeave" onClick={() => {window.location.pathname = "/"}}>
                        <text className="txt_top">{userInfo ? "Logout" : "Login"}</text>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopBar;
