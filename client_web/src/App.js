import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from "./views/LoginPage";
import Register from "./views/RegisterPage";
import AreaPage from "./views/Area";
import Account from "./views/Account";
import CreateAction from "./views/CreateAction";
import ServicesPage from "./views/ServicesPage";
import NotFoundPage from "./views/NotFoundPage";
import APK from "./views/dlAPK";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Login/>} />
                <Route exact path="/Area" element={<AreaPage/>} />
                <Route exact path="/Create_action" element={<CreateAction/>} />
                <Route exact path="/ServicesPage" element={<ServicesPage/>} />
                <Route exact path="/Account" element={<Account/>} />
                <Route exact path="/Register" element={<Register/>} />
                <Route exact path="/client.apk" element={<APK/>} />
                <Route exact path="*" element={<NotFoundPage/>} />
            </Routes>
        </Router>
    );
}

export default App;
