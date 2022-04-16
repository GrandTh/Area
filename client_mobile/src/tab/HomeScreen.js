import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, ScrollView, StyleSheet, StatusBar, RefreshControl, TouchableOpacity, Image } from 'react-native';
import { IMAGE } from '../constants/images'
import axios from "axios";
import { adresseIPConst } from "../constants/config";
import Sheet from './allArea'

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const HomeScreen = ({ navigation, route }) => {
    const [areas, setareas] = useState([])
    const [refreshing, setRefreshing] = React.useState(false);

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
                setareas(res.data.data.areas);
            });
        });
    }, [refreshing])

    const display = () => {
        if (areas) {
            return (
                areas.map((element, index) => {
                    return (
                        <Sheet input={element} />
                    )
                })
            )
        } else
            return null;
    }


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#E3DCD2' }}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Image style={{ width: 30, height: 30, marginLeft: 350, marginTop: 10}}
                        source={IMAGE.ICON_LOGOUT}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <View style={{ marginTop: 30 }}>
                    {display(areas)}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
    },
    text: {
        fontSize: 42,
    },
});


export default HomeScreen;
