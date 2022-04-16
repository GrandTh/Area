import React, { useState } from 'react'
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, RefreshControl, ScrollView } from 'react-native';
import axios from "axios";
import { Picker } from '@react-native-picker/picker';
import { adresseIPConst } from "../constants/config";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const CreateArea = ({ navigation }) => {
    const [data, setData] = useState("");
    const [validdata, setvaliddata] = useState("");
    const [action, setaction] = useState([]);
    const [reaction, setReaction] = useState([]);
    const [SelectedService, setSelectedService] = useState("");
    const [SelectedReaction, setSelectedReaction] = useState("");
    const [SelectedServiceReaction, setSelectedServiceReaction] = useState("");
    const [SelectedAction, setSelectedAction] = useState("");
    const [InputValue, setInputValue] = useState("");
    const [refreshing, setRefreshing] = React.useState(false);

    const addAREA = async () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://" + adresseIPConst.adresseIP + ":8080/api/user",
        }).then((res) => {
            const username = res.data.username
            axios({
                method: "PUT",
                data: {
                    username: username,
                    service_action: SelectedService,
                    action: SelectedAction,
                    input: InputValue,
                    service_reaction: SelectedServiceReaction,
                    reaction: SelectedReaction,
                },
                withCredentials: true,
                url: "http://" + adresseIPConst.adresseIP + ":8080/services/addAREA",
            }).then((res) => {
                setvaliddata("AREA successfully added");
                setSelectedService("");
                setSelectedReaction("");
                setSelectedServiceReaction("");
                setSelectedAction("");
                console.log(res);
            })
        })
    };

    const CheckValueActions = (itemValue) => {
        const dropvalue = itemValue;

        axios({
            method: "GET",
            withCredentials: true,
            url: "http://" + adresseIPConst.adresseIP + ":8080/api/user",
        }).then((res) => {
            const username = res.data.username
            axios({
                method: "POST",
                data: {
                    username: username,
                },
                withCredentials: true,
                url: "http://" + adresseIPConst.adresseIP + ":8080/services/servicesInfo",
            }).then((res) => {
                console.log(dropvalue);
                console.log(res.data.data.subscribedToWeather);
                if (dropvalue === "Weather" && res.data.data.subscribedToWeather === false)
                    setData("You must be registered for the Weather service")
                else if (dropvalue === "Weather" && res.data.data.subscribedToWeather === true)
                    setaction(["Temperature is over", "Temperature is under"])
                if (dropvalue === "ClashRoyale" && res.data.data.subscribedToClashRoyale === false)
                    setData("You must be registered for the ClashRoyale service")
                else if (dropvalue === "ClashRoyale" && res.data.data.subscribedToClashRoyale === true)
                    setaction(["new friend in the clan", "a friend left the clan"])
                if (dropvalue === "ClashOfClans" && res.data.data.subscribedToClashOfClans === false)
                    setData("You must be registered for the ClashOfClans service")
                else if (dropvalue === "ClashOfClans" && res.data.data.subscribedToClashOfClans === true)
                    setaction(["new friend in the clan", "a friend left the clan"])
                if (dropvalue === "News" && res.data.data.subscribedToNews === false)
                    setData("You must be registered for the News service")
                else if (dropvalue === "News" && res.data.data.subscribedToNews === true)
                    setaction(["new article", "new blog", "new report"])
                if (dropvalue === "CoinCap" && res.data.data.subscribedToCoinCap === false)
                    setData("You must be registered for the CoinCap service")
                else if (dropvalue === "CoinCap" && res.data.data.subscribedToCoinCap === true)
                    setaction(["bitcoin is over", "ethereum is over", "tezos is over", "vechain is over"])

            });
        });
    }

    const CheckValueReactions = (itemValue) => {
        const dropvalue = itemValue;

        axios({
            method: "GET",
            withCredentials: true,
            url: "http://" + adresseIPConst.adresseIP + ":8080/api/user",
        }).then((res) => {
            const username = res.data.username
            axios({
                method: "POST",
                data: {
                    username: username,
                },
                withCredentials: true,
                url: "http://" + adresseIPConst.adresseIP + ":8080/services/servicesInfo",
            }).then((res) => {
                if (dropvalue === "Facebook" && res.data.data.subscribedToFacebook === false) {
                    setData("You must be registered for the Facebook service")
                }
                else if (dropvalue === "Facebook" && res.data.data.subscribedToFacebook === true) {
                    setReaction(["send a facebook message "])
                }
                if (dropvalue === "Email") {
                    setReaction(["Send mail"])
                }
                if (dropvalue === "Discord") {
                    setReaction(["send a discord message to news", "send a discord message to clash-of-clan", "send a discord message to clash-royale", "send a discord message to coincap", "send a discord message to weather"])
                }
            });
        });
    }

    const renderActions = () => {

        return action.map((s, i) => {
            return <Picker.Item key={i} value={s} label={s} />
        })
    }

    const renderReactions = () => {

        return reaction.map((s, i) => {
            return <Picker.Item key={i} value={s} label={s} />
        })
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#E3DCD2', alignItems: 'center' }}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <View style={styles.container}>
                        <Text style={styles.text}>
                            IF This
                        </Text>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, marginBottom: 10 }}>Service: </Text>
                            <Picker
                                selectedValue={SelectedService}
                                style={{ height: 25, width: 240, backgroundColor: '#FFFFFF', marginBottom: 10 }}
                                onValueChange={(itemValue) => {
                                    CheckValueActions(itemValue);
                                    setSelectedService(itemValue)
                                }}
                            >
                                <Picker.Item label="" value="" />
                                <Picker.Item label="Weather" value="Weather" />
                                <Picker.Item label="CoinCap" value="CoinCap" />
                                <Picker.Item label="News" value="News" />
                                <Picker.Item label="ClashRoyale" value="ClashRoyale" />
                                <Picker.Item label="ClashOfClans" value="ClashOfClans" />
                            </Picker>
                            <Text style={{ fontSize: 14, marginBottom: 10 }}>Action: </Text>
                            <Picker
                                selectedValue={SelectedAction}
                                style={{ height: 25, width: 240, backgroundColor: '#FFFFFF' }}
                                onValueChange={(itemValue, itemIndex) => {
                                    setSelectedAction(itemValue);
                                }}
                            >
                                <Picker.Item label="" value="" />
                                {renderActions()}
                            </Picker>
                        </View>
                    </View>
                    {SelectedService === "Weather" || SelectedService === "CoinCap" || SelectedService === "ClashRoyale" || SelectedService === "ClashOfClans" ?
                        <TextInput
                            style={styles.input}
                            onChangeText={setInputValue}
                            placeholder=".............................................................."
                            keyboardType="numeric"
                        /> : null}
                    <View style={styles.container}>
                        <Text style={styles.text}>
                            THEN That
                        </Text>
                        <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, marginBottom: 10 }}>Service: </Text>
                            <Picker
                                selectedValue={SelectedServiceReaction}
                                style={{ height: 25, width: 240, backgroundColor: '#FFFFFF', marginBottom: 10 }}
                                onValueChange={(itemValue, itemIndex) => {
                                    setSelectedServiceReaction(itemValue)
                                    CheckValueReactions(itemValue);
                                }}
                            >
                                <Picker.Item label="" value="" />
                                <Picker.Item label="Facebook" value="Facebook" />
                                <Picker.Item label="Email" value="Email" />
                                <Picker.Item label="Discord" value="Discord" />

                            </Picker>
                            <Text style={{ fontSize: 14, marginBottom: 10 }}>Reaction: </Text>
                            <Picker
                                selectedValue={SelectedReaction}
                                style={{ height: 25, width: 240, backgroundColor: '#FFFFFF' }}
                                onValueChange={(itemValue, itemIndex) => setSelectedReaction(itemValue)}
                            >
                                <Picker.Item label="" value="" />
                                {renderReactions()}
                            </Picker>
                        </View>
                    </View>
                    {data ? <Text style={styles.errorMessage}>{data}</Text> : null}
                    {validdata ? <Text style={styles.validMessage}>{validdata}</Text> : null}
                </View>
                <TouchableOpacity style={{ width: 150, height: 45, backgroundColor: '#013328', marginTop: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 25, marginLeft: 45 }} onPress={() => addAREA()}>
                    <Text style={{ color: 'white' }}>Add AREA</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        marginBottom: 10,
        marginTop: 10,
        fontSize: 26,
        fontWeight: 'bold'
    },
    errorMessage: {
        color: "#FF0000",
        fontSize: 14,
    },
    validMessage: {
        color: "#008000",
        fontSize: 14,
    },
    input: {
        height: 40,
        width: 240,
        margin: 12,
        borderWidth: 1,
        padding: 10,

        borderRadius: 5
    },
});

export default CreateArea;