import React, {
    useState,
    useEffect
} from "react";
import '../css/Area.css'
import TopBar from '../Components/TopBar'
import Sheet from '../Components/Sheet'
import Axios from "axios";
import BTN_ACCOUNT from "../Components/Btn_Acc";

function DashboardPage() {
    const [areas, setareas] = useState("")

    useEffect(() => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:8080/api/user",
        }).then((res) => {
            const username = res.data.username
            Axios({
                method: "POST",
                data: {
                    username: username,
                },
                withCredentials: true,
                url: "http://localhost:8080/services/servicesInfo",
            }).then((res) => {
                setareas(res.data.data.areas);
                console.log(res.data.data.areas);
            });
        });
    }, [])

    const display = () => {
        if (areas) {
            return (
                areas.map((element, index) =>  {return (
                    <Sheet input={element}/>
                )})
            )
        } else
            return null;
    }

    return (
        <div className="back">
            <div className="Side">
                <TopBar/>
            </div>
            <div className="Sheet_manage">
                {display(areas)}
            </div>
            <BTN_ACCOUNT/>
        </div>
    );
}

export default DashboardPage;
