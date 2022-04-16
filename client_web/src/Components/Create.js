import './css/Create.css'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Axios from "axios";
import {
    useState,
    useEffect
} from "react";
import { useAlert } from 'react-alert'

const actionOptions = [];
const reactionOptions = [];
const actionsClash = ["new friend in the clan", "a friend left the clan"];
const actionsCoinCap = ["bitcoin is over", "ethereum is over", "tezos is over", "vechain is over"];
const actionsNews = ["new article", "new blog", "new report"];
const reactionsDiscord = ["send a discord message to news", "send a discord message to clash-of-clan", "send a discord message to clash-royale", "send a discord message to coincap"];
const reactionsFacebook = ["send a facebook message "];
const reactionsMail = ["Send mail"];

function Create() {
    const [service_action, setService_action] = useState("");
    const [action, setAction] = useState("");
    const [service_reaction, setservice_reaction] = useState("");
    const [reaction, setReaction] = useState("");
    const alert = useAlert()

    const addAREA = async () => {
        var input = service_action === "News" ? "" : document.getElementById("myInput").value;
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:8080/api/user",
        }).then((res) => {
            const username = res.data.username
            Axios({
                method: "PUT",
                data: {
                    username: username,
                    service_action: service_action,
                    action: action,
                    input: input,
                    service_reaction: service_reaction,
                    reaction: reaction,
                },
                withCredentials: true,
                url: "http://localhost:8080/services/addAREA",
            }).then((res) => {
                console.log(res);
            })
        })
    };

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
                reactionOptions.push('Mail');
                if (res.data.data.subscribedToDiscord === true)
                    reactionOptions.push('Discord');
                    if (res.data.data.subscribedToFacebook === true)
                    reactionOptions.push('Facebook');
                    if (res.data.data.subscribedToClashRoyale === true)
                    actionOptions.push('ClashRoyale');
                if (res.data.data.subscribedToClashOfClans === true)
                    actionOptions.push('ClashOfClans');
                if (res.data.data.subscribedToNews === true)
                    actionOptions.push('News');
                if (res.data.data.subscribedToCoinCap === true)
                    actionOptions.push('CoinCap');
            });
        });
    }, [])

    return (
        <div className="Create_Wrapper">
            <div className="actions_wrapper">
                <div className="title_action">
                    <text className="title_txt_action">IF This</text>
                </div>
                <div className="actions_list">
                    <div className="action">
                        <text className="title_txt_action">Services</text>
                        <Dropdown options={actionOptions} onChange={(e)=>setService_action(e.value)} placeholder="Select a service"/>;
                    </div>
                    <div className="action">
                        <text className="title_txt_action">Actions</text>
                        <Dropdown options={
                            (service_action === "ClashRoyale" || service_action === "ClashOfClans") ? actionsClash :
                            service_action === "CoinCap" ? actionsCoinCap :
                            service_action === "News" ? actionsNews :
                            []
                        } onChange={(e) => setAction(e.value)} placeholder="Select an action"/>;
                        {
                            service_action === "CoinCap" || (service_action === "ClashRoyale" || service_action === "ClashOfClans") ?
                            <div className='input_wrapper'><input id="myInput" placeholder="......................................."/></div> :
                            null
                        }
                    </div>
                </div>
                <div className="subtitle_action">
                    <text className="title_txt_action">THEN That</text>
                </div>
                <div className="actions_list">
                <div className="action1">
                    <text className="title_txt_action">Services</text>
                    <Dropdown options={reactionOptions} onChange={(e) => setservice_reaction(e.value)} placeholder="Select a service"/>;
                </div>
                <div className="action2">
                    <text className="title_txt_action">Reactions</text>
                    <Dropdown options={
                        service_reaction === "Discord" ? reactionsDiscord :
                        service_reaction === "Facebook" ? reactionsFacebook :
                        service_reaction === "Mail" ? reactionsMail :
                        []
                    } onChange={(e) => setReaction(e.value)} placeholder="Select a reaction"/>;
                </div>
                </div>
                <div className="title_action">
                    <div className="button_validate" id="animeMe" onClick={ () => {addAREA(); alert.show('AREA successfully added')}}>
                            <text className="title_txt_Validate">Validate</text>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Create;