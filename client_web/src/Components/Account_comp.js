import React, { useState } from "react";
import './css/Account_comp.css'
import image from '../images/photo.png'
import Axios from "axios";


function Account_compo() {

    const [userInfo, setUserInfo] = useState(null);

    if (userInfo == null) {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:8080/api/user",
        }).then((res) => {
            const username = res.data.username
            console.log("user infoooo  " + username);
            if (username === "username") { window.location.pathname = "/" }
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
    }

        return (
            <div className="Account_Wrapper">
                <div className="info_cont">
                    <div className="photo_cont">
                        <div className="photo_couv">
                            <img className="photo" src={userInfo ? userInfo.picture ? userInfo.picture : image : image} alt="profil" />
                        </div>
                    </div>
                    <div className="UserName_cont">
                        {userInfo ? <text className="txt_account">{userInfo.username}</text> : <text className="txt_account">username</text>}
                    </div>
                    <div className="Mail_cont">
                        {userInfo ? <text className="txt_account">{userInfo.email}</text> : <text className="txt_account">email</text> }
                    </div>
                </div>
            </div>
        );
}

export default Account_compo;
