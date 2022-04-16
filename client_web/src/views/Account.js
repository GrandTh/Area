import React from "react";
import TopBar from "../Components/TopBar"
import '../css/Account.css'
import ACCOUNT_COMP from '../Components/Account_comp'

function Account() {
    return (
        <div className="back">
            <div className="Side">
                <TopBar/>
            </div>
            <ACCOUNT_COMP/>
        </div>
    );
}

export default Account;
