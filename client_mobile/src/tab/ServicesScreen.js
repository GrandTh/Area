import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { IMAGE } from '../constants/images';
import { adresseIPConst } from '../constants/config';
import axios from "axios";

const ServicesScreen = (props) => {

        const [isFacebookConnected, setFacebookConnected] = useState(false)
        const [isClashRoyaleConnected, setClashRoyaleConnected] = useState(false)
        const [isClashOfClansConnected, setClashOfClansConnected] = useState(false)
        const [isCoinCapConnected, setCoinCapConnected] = useState(false)
        const [isNewsConnected, setNewsConnected] = useState(false)
        const [isWeatherConnected, setWeatherConnected] = useState(false)

        useEffect(() => {
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
                    if (res.data.data.subscribedToWeather === true)
                        setWeatherConnected(true);
                });
            });
        }, [])

        const subClashRoyale = () => {
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
                    },
                    withCredentials: true,
                    url: "http://" + adresseIPConst.adresseIP + ":8080/services/subscribedToClashRoyale",
                }).then((res) => {
                    console.log("RES --> " + JSON.stringify(res));
                    setClashRoyaleConnected(true);
                })
            })
        }

        const subClashOfClans = () => {
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
                    },
                    withCredentials: true,
                    url: "http://" + adresseIPConst.adresseIP + ":8080/services/subscribedToClashOfClans",
                }).then((res) => {
                    console.log("RES --> " + JSON.stringify(res));
                    setClashOfClansConnected(true);
                })
            })
        }

        const subNews = () => {
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
                    },
                    withCredentials: true,
                    url: "http://" + adresseIPConst.adresseIP + ":8080/services/subscribedToNews",
                }).then((res) => {
                    console.log("RES --> " + JSON.stringify(res));
                    setNewsConnected(true);
                })
            })
        }

        const subCoinCap = () => {
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
                    },
                    withCredentials: true,
                    url: "http://" + adresseIPConst.adresseIP + ":8080/services/subscribedToCoinCap",
                }).then((res) => {
                    console.log("RES --> " + JSON.stringify(res));
                    setCoinCapConnected(true);
                })
            })
        }

        const subWeather = () => {
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
                    },
                    withCredentials: true,
                    url: "http://" + adresseIPConst.adresseIP + ":8080/services/subscribedToWeather",
                }).then((res) => {
                    console.log("RES --> " + JSON.stringify(res));
                    setWeatherConnected(true);
                })
            })
        }

        return (

            <SafeAreaView style={{ flex: 1, backgroundColor: '#E3DCD2' }}>
                <ScrollView>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.item}>
                                <Image
                                    style={{ marginLeft: 130, width: 24, height: 24, marginBottom: 15 }}
                                    source={isFacebookConnected ? IMAGE.CHECKBOX_FILL : IMAGE.CHECKBOX_EMPTY}
                                />
                                <View style={styles.container_image}>
                                    <Image style={styles.title} source={IMAGE.ICON_FB} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.item} onPress={subClashOfClans}>
                                <Image
                                    style={{ marginLeft: 130, width: 24, height: 24, marginBottom: 15 }}
                                    source={isClashOfClansConnected ? IMAGE.CHECKBOX_FILL : IMAGE.CHECKBOX_EMPTY}
                                />
                                <View style={styles.container_image}>
                                    <Image style={styles.title} source={IMAGE.ICON_COC} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.item} onPress={subClashRoyale}>
                                <Image
                                    style={{ marginLeft: 130, width: 24, height: 24, marginBottom: 15 }}
                                    source={isClashRoyaleConnected ? IMAGE.CHECKBOX_FILL : IMAGE.CHECKBOX_EMPTY}
                                />
                                <View style={styles.container_image}>
                                    <Image style={styles.title} source={IMAGE.ICON_COR} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.item} onPress={subNews}>
                                <Image
                                    style={{ marginLeft: 130, width: 24, height: 24, marginBottom: 15 }}
                                    source={isNewsConnected ? IMAGE.CHECKBOX_FILL : IMAGE.CHECKBOX_EMPTY}
                                />
                                <View style={styles.container_image}>
                                    <Image style={styles.title} source={IMAGE.ICON_NEWS} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.item} onPress={subCoinCap}>
                                <Image
                                    style={{ marginLeft: 130, width: 24, height: 24, marginBottom: 15 }}
                                    source={isCoinCapConnected ? IMAGE.CHECKBOX_FILL : IMAGE.CHECKBOX_EMPTY}
                                />
                                <View style={styles.container_image}>
                                    <Image style={styles.title} source={IMAGE.ICON_COIN} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.item}  onPress={subWeather}>
                                <Image
                                    style={{ marginLeft: 120, width: 24, height: 24, marginBottom: 15 }}
                                    source={isWeatherConnected ? IMAGE.CHECKBOX_FILL : IMAGE.CHECKBOX_EMPTY}
                                />
                                <View style={styles.container_image}>
                                    <Image style={styles.title} source={IMAGE.ICON_WEATHER} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView >
        );
    }

    const styles = StyleSheet.create({
        item: {
            width: 170,
            height: 170,
            borderRadius: 10,
            backgroundColor: '#013328',
            margin: 10,
            padding: 10
        },
        title: {
            width: 80,
            height: 80,
        },
        container_image: {
            alignItems: 'center'
        }
    });

export default ServicesScreen;