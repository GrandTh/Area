import React, {
    useState,
    useEffect
} from "react";
import './css/Sheet.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
    Facebook,
    Euro,
    Newspaper,
    Email,
    Close,
} from '@mui/icons-material';
import Discord from '../images/discord.png';
import Royale from '../images/Clash_Royale.png';
import Clan from '../images/Clash_Of_Clan.png';
import Axios from "axios";

function Sheet(props) {
    const [service_action, setservice_action] = useState("");
    const [action, setaction] = useState("");
    const [service_reaction, setservice_reaction] = useState("");
    const [reaction, setreaction] = useState("");
    const [input, setinput] = useState("");

    const deleteAREA = () => {
        console.log("delete --> " + service_action);
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:8080/api/user",
        }).then((res) => {
            const _username = res.data.username;
            Axios({
                method: "DELETE",
                data: {
                    username: _username,
                    service_action: service_action,
                    action: action,
                    input: input,
                    reaction: reaction,
                    service_reaction: service_reaction,
                },
                withCredentials: true,
                url: "http://localhost:8080/services/deleteAREA",
            }).then((res) => {
                console.log(res);
                window.location.reload();
            })
        });
    }

    useEffect(() => {
        if (props.input) {
            setservice_action(props.input.service_action);
            setaction(props.input.action);
            setservice_reaction(props.input.service_reaction);
            setreaction(props.input.reaction);
            setinput(props.input.input);
        }
    }, [props.input])

    return (
        <div className="SheetWrapper">
            <div className="Sheet">
                <div className="if_sheet">
                    <text className="Black_txt">If</text>
                </div>
                <div className="logo_sheet">
                    <text className="White_txt">{service_action === "CoinCap" ?  <Euro style={{ color: '#fff', height: "40px", width: "40px"}}/> :
                        service_action === "Facebook" ? <Facebook style={{ color: '#fff', height: "40px", width: "40px"}}/> :
                            service_action === "ClashRoyale" ? <img alt="img" src={Royale} style={{ color: '#fff', height: "50px", width: "50px"}}/> :
                                service_action === "ClashOfClans" ? <img alt="img" src={Clan} style={{ color: '#fff', height: "100px", width: "100px"}}/> :
                                    service_action === "Discord" ? <img alt="img" src={Discord} style={{ color: '#fff', height: "100px", width: "100px"}}/> :
                                        service_action === "News" ? <Newspaper style={{ color: '#fff', height: "40px", width: "40px"}}/> : null}</text>
                </div>
                <div className="Action_sheet">
                    <text className="Black_txt">{action + " " + input}</text>
                </div>
                <div className="if_sheet">
                    <text className="Black_txt">Then</text>
                </div>
                <div className="logo_sheet">
                    <text className="White_txt">{service_reaction === "CoinCap" ?  <Euro style={{ color: '#fff', height: "40px", width: "40px"}}/> :
                        service_reaction === "Facebook" ? <Facebook style={{ color: '#fff', height: "40px", width: "40px"}}/> :
                            service_reaction === "ClashRoyale" ? <img alt="img" src={Royale} style={{ color: '#fff', height: "100px", width: "100px"}}/> :
                                service_reaction === "ClashOfClans" ? <img alt="img" src={Clan} style={{ color: '#fff', height: "100px", width: "100px"}}/> :
                                    service_reaction === "Discord" ? <img alt="img" src={Discord} style={{ color: '#fff', height: "30px", width: "30px"}}/> :
                                        service_reaction === "News" ? <Newspaper style={{ color: '#fff', height: "40px", width: "40px"}}/> :
                                            service_reaction === "Mail" ? <Email style={{ color: '#fff', height: "40px", width: "40px"}}/> : null}</text>
                </div>
                <div className="Action_sheet">
                    <text className="Black_txt">{reaction}</text>
                </div>
                <div className="delete_sheet" >
                    <Close style={{ color: '#fff'}} onClick={() => deleteAREA()}/>
                </div>
            </div>
        </div>
    );
}

export default Sheet;
