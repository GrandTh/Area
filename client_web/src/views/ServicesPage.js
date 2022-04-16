import React from "react";
import TopBar from "../Components/TopBar"
import '../css/AddConnection.css'
import Connection from '../Components/Connection'
import BTN_ACCOUNT from "../Components/Btn_Acc";

function AddConnection() {
    return (
        <div className="back">
            <div className="Side">
                <TopBar/>
            </div>
            <div className="Logo">
                <Connection/>
            </div>
            <BTN_ACCOUNT/>
        </div>
    );
}

export default AddConnection;
