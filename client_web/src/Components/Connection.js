import {
    Facebook,
    CheckCircle,
    Cancel,
    Euro,
    Newspaper,
} from '@mui/icons-material';
import React, {
    useState,
    useEffect
} from "react";
import './css/Connection.css'
import Discord from '../images/discord.png';
import Royale from '../images/Clash_Royale.png';
import Clan from '../images/Clash_Of_Clan.png';
import Axios from "axios";

function Connection(props) {
    const [isDiscordConnected, setDiscordConnected] = useState(false)
    const [isFacebookConnected, setFacebookConnected] = useState(false)
    const [isClashRoyaleConnected, setClashRoyaleConnected] = useState(false)
    const [isClashOfClansConnected, setClashOfClansConnected] = useState(false)
    const [isCoinCapConnected, setCoinCapConnected] = useState(false)
    const [isNewsConnected, setNewsConnected] = useState(false)
    const FACEBOOK_CLIENT_ID = "605620607162370"
    const FACEBOOK_CLIENT_SECRET = "d3aafed36c60a59ebf506d543245e337"

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
                if (res.data.data.subscribedToDiscord === true)
                    setDiscordConnected(true);
                if (res.data.data.subscribedToFacebook === true)
                    setFacebookConnected(true);
                if (res.data.data.subscribedToClashRoyale === true)
                    setClashRoyaleConnected(true);
                if (res.data.data.subscribedToClashOfClans === true)
                    setClashOfClansConnected(true);
                if (res.data.data.subscribedToNews === true)
                    setNewsConnected(true);
                if (res.data.data.subscribedToCoinCap === true)
                    setCoinCapConnected(true);
            });
        });
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:8080/api/user",
        }).then((res) => {
            const username = res.data.username
            window.onload = () => {
                const fragment = new URLSearchParams(window.location.hash.slice(1));
                const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];
                if (!accessToken) {
                    return null;
                }
                Axios({
                    method: "PUT",
                    data: {
                        username: username,
                        tokenType: tokenType,
                        accessToken: accessToken,
                    },
                    withCredentials: true,
                    url: "http://localhost:8080/services/subscribedToDiscord",
                }).then((res) => {
                    console.log("DISCORD --> " + res);
                    setDiscordConnected(true);
                })
            };
        })
    }, [])

    const subFacebook = async () => {
        Axios({
            method: "GET",
            url: `https://graph.facebook.com/oauth/access_token?client_id=${FACEBOOK_CLIENT_ID}&client_secret=${FACEBOOK_CLIENT_SECRET}&grant_type=client_credentials`,
        }).then((res) => {
            const [accessToken, tokenType] = [res.data.access_token, res.data.token_type];
            Axios({
                method: "GET",
                withCredentials: true,
                url: "http://localhost:8080/api/user",
            }).then((res) => {
                const username = res.data.username
                if (!accessToken) {
                    return null;
                }
                Axios({
                    method: "PUT",
                    data: {
                        username: username,
                        tokenType: tokenType,
                        accessToken: accessToken,
                    },
                    withCredentials: true,
                    url: "http://localhost:8080/services/subscribedToFacebook",
                }).then((res) => {

                    setFacebookConnected(true);
                })
            })
        });
    }

    const subClashRoyale = () => {
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
                },
                withCredentials: true,
                url: "http://localhost:8080/services/subscribedToClashRoyale",
            }).then((res) => {
                setClashRoyaleConnected(true);
            })
        })
    }

    const subClashOfClans = () => {
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
                },
                withCredentials: true,
                url: "http://localhost:8080/services/subscribedToClashOfClans",
            }).then((res) => {
                setClashOfClansConnected(true);
            })
        })
    }

    const subNews = () => {
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
                },
                withCredentials: true,
                url: "http://localhost:8080/services/subscribedToNews",
            }).then((res) => {
                setNewsConnected(true);
            })
        })
    }

    const subCoinCap = () => {
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
                },
                withCredentials: true,
                url: "http://localhost:8080/services/subscribedToCoinCap",
            }).then((res) => {
                setCoinCapConnected(true);
            })
        })
    }

    const subDiscord = () => {
        window.location = "https://discord.com/api/oauth2/authorize?client_id=945707862024396840&redirect_uri=http%3A%2F%2Flocalhost%3A8081%2FServicesPage&response_type=token&scope=identify%20rpc.notifications.read%20messages.read%20guilds%20guilds.join"
    }

    return (
        <div className='Logo_wrapper'>
            <div className='container_wrapper'>
                <div className="logo_container" onClick={subNews}>
                    <Newspaper  style={{ color: '#fff', height: "110px", width: "110px", marginLeft: "25px" }} />
                    <div className='ischeck'>
                        {isNewsConnected ? <CheckCircle style={{ color: '#fff', height: "30px", width: "30px" }} /> :
                            <Cancel style={{ color: '#fff', height: "30px", width: "30px" }} />}
                    </div>
                </div>
                <div className="logo_container" onClick={subClashOfClans}>
                    <div className='disc'>
                        <img src={Clan} alt="Discord" width="110" height="110"  marginLeft="auto" marginRight="auto"/>
                    </div>
                        <div className='ischeck'>
                        {isClashOfClansConnected ? <CheckCircle style={{ color: '#fff', height: "30px", width: "30px" }} /> :
                            <Cancel style={{ color: '#fff', height: "30px", width: "30px" }} />}
                    </div>
                </div>
                <div className="logo_container" onClick={subFacebook}>
                    <Facebook style={{ color: '#fff', height: "110px", width: "110px", marginLeft: "25px" }} />
                    <div className='ischeck'>
                        {isFacebookConnected ? <CheckCircle style={{ color: '#fff', height: "30px", width: "30px" }} /> :
                            <Cancel style={{ color: '#fff', height: "30px", width: "30px" }} />}
                    </div>
                </div>
                <div className="logo_container" onClick={subClashRoyale}>
                    <div className='disc'>
                        <img src={Royale} alt="Discord" width="110" height="110"  marginLeft="auto" marginRight="auto"/>
                    </div>
                    <div className='ischeck'>
                        {isClashRoyaleConnected ? <CheckCircle style={{ color: '#fff', height: "30px", width: "30px" }} /> :
                            <Cancel style={{ color: '#fff', height: "30px", width: "30px" }} />}
                    </div>
                </div>
                <div className="logo_container" onClick={subDiscord}>
                    <div className='disc'>
                        <img src={Discord} alt="Discord" width="110" height="110"  marginLeft="auto" marginRight="auto"/>
                    </div>
                    <div className='ischeck'>
                        {isDiscordConnected ? <CheckCircle style={{ color: '#fff', height: "30px", width: "30px" }} /> :
                            <Cancel style={{ color: '#fff', height: "30px", width: "30px" }} />}
                    </div>
                </div>
                <div className="logo_container" onClick={subCoinCap}>
                    <Euro style={{ color: '#fff', height: "110px", width: "110px", marginLeft: "25px" }}/>
                    <div className='ischeck'>
                        {isCoinCapConnected ? <CheckCircle style={{ color: '#fff', height: "30px", width: "30px" }} /> :
                            <Cancel style={{ color: '#fff', height: "30px", width: "30px" }} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Connection;
