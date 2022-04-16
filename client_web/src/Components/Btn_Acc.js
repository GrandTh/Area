import './css/Btn_Acc.css'
import React, { useState } from "react";
import image from '../images/photo.png'
import Axios from "axios";

function Btn_Account() {

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
                setUserInfo(res.data.data);
            });
        });
    }

    return (
        <div className="Btn_Dsiplay">
            <img className="Btn" src={userInfo ? userInfo.picture ? userInfo.picture : image : image}
                alt="profil" onClick={() => { window.location.pathname = "Account" }} />
        </div>
    );
}

export default Btn_Account;
