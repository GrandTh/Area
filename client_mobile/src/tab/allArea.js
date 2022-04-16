import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { IMAGE } from '../constants/images'
import axios from "axios";
import { adresseIPConst } from "../constants/config";

function Sheet(props) {
    const [service_action, setservice_action] = useState("");
    const [action, setaction] = useState("");
    const [service_reaction, setservice_reaction] = useState("");
    const [reaction, setreaction] = useState("");
    const [input, setinput] = useState("");

    const deleteAREA = () => {
        axios({
          method: "GET",
          withCredentials: true,
          url: "http://" + adresseIPConst.adresseIP + ":8080/api/user",
        }).then((res) => {
            const _username = res.data.username;
            axios({
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
                url: "http://" + adresseIPConst.adresseIP + ":8080/services/deleteAREA",
            }).then((res) => {
                console.log(res);
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
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#D3D0C4', height: 100, width: '99%', borderRadius: 20, margin: 10, flexDirection: 'row', alignItems: 'center', padding: 10, }}>
                <Text style={{ color: 'black', fontSize: 12, fontWeight: 'bold', marginRight: 5 }}>IF</Text>
                <View style={{ backgroundColor: '#000000', width: 30, height: 30, marginRight: 5, justifyContent: 'center', alignItems: "center", borderRadius: 10, paddingLeft: 5 }}>
                    <Image
                        style={{ width: 20, height: 20, marginRight: 5 }}
                        source={service_action === "CoinCap" ? IMAGE.ICON_COIN : service_action === "Facebook" ? IMAGE.ICON_FB : service_action === "ClashRoyale" ? IMAGE.ICON_COR :
                            service_action === "ClashOfClans" ? IMAGE.ICON_COC : service_action === "Weather" ? IMAGE.ICON_WEATHER : service_action === "News" ? IMAGE.ICON_NEWS : null}
                    />
                </View>
                <View style={{ backgroundColor: '#C4C4C4', width: 100, height: 50, marginRight: 5, borderRadius: 10, padding: 3, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{ color: 'black', fontSize: 12 }}>{action + " " + input}</Text>

                </View>
                <Text style={{ color: 'black', fontSize: 12, fontWeight: 'bold', marginRight: 15 }}>THEN</Text>
                <View style={{ backgroundColor: '#000000', width: 30, height: 30, marginRight: 5, justifyContent: 'center', alignItems: 'center', borderRadius: 10, paddingLeft: 5 }}>
                    <Image
                        style={{ width: 20, height: 20, marginRight: 5 }}
                        source={service_reaction === "CoinCap" ? IMAGE.ICON_COIN : service_reaction === "Facebook" ? IMAGE.ICON_FB : service_reaction === "ClashRoyale" ? IMAGE.ICON_COR :
                            service_reaction === "ClashOfClans" ? IMAGE.ICON_COC : service_reaction === "Weather" ? IMAGE.ICON_WEATHER : service_reaction === "News" ? IMAGE.ICON_NEWS : service_reaction === "Email" ? IMAGE.ICON_MAIL : service_reaction === "Discord" ? IMAGE.ICON_DISCORD : null}
                    />
                </View>
                <View style={{ backgroundColor: '#C4C4C4', width: 110, height: 75, marginRight: 5, borderRadius: 10, padding: 3, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{ color: 'black', fontSize: 12 }}>{reaction}</Text>
                </View>
                <TouchableOpacity onPress={deleteAREA}>
                    <Image
                        style={{ width: 22, height: 22}}
                        source={IMAGE.iCON_CROSS} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Sheet;