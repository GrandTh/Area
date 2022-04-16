import React from "react";
import TopBar from "../Components/TopBar"
import Create from "../Components/Create"
import '../css/CreateAction.css'
import BTN_ACCOUNT from "../Components/Btn_Acc";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'


const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE
  }
  

function CreatePage() {
    return (
        <div className="back">
            <div className="Side">
                <TopBar/>
            </div>
            <AlertProvider template={AlertTemplate} {...options}>
                <Create />
            </AlertProvider>
            <BTN_ACCOUNT/>
        </div>
    );
}

export default CreatePage;
