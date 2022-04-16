import React from "react";
import TopBar from "../Components/TopBar"
import '../css/dlAPK.css'
import APK from '../Components/dlAPK_comp'
import BTN_ACCOUNT from "../Components/Btn_Acc";

function Account() {
    return (
        <div className="back">
            <div className="Side">
                <TopBar/>
            </div>
            <APK/>
            <BTN_ACCOUNT/>
        </div>
    );
}

export default Account;
