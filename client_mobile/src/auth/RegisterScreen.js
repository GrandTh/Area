import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { IMAGE } from '../constants/images'
import axios from "axios";
import { adresseIPConst } from "../constants/config";

const RegisterScreen = ({navigation}) => {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [data, setData] = useState("");

    const login = (loginUsername, loginPassword) => {
        if (loginUsername !== "" && loginPassword !== "") {
            axios({
                method: "POST",
                data: {
                    username: loginUsername,
                    password: loginPassword,
                },
                url: "http://" + adresseIPConst.adresseIP + ":8080/api/login",
            }).then((res) => {
                if (res.data === "Successfully Authenticated") {
                    axios({

                        method: "POST",
                        data: {
                            username: loginUsername,
                        },
                        url: "http://" + adresseIPConst.adresseIP + ":8080/services/newTable",
                    }).then((res) => {
                        console.log(res.data);
                    })
                    navigation.navigate('Home', { AddressIp: adresseIPConst.adresseIP });
                }
                else {
                    setData("Please, fill all fields!")
                }
            }).catch(function (error) {
                if (error.message === "Network Error")
                    setData("Address IP is not correct");
                console.log('There has been a problem with your fetch operation: ' + error.message);
                throw error;
            });
        }
        else
            setData("Please, fill all fileds!")
    };

    const register = () => {
        if (registerEmail !== "" && registerUsername !== "" && registerPassword !== "" && adresseIPConst.adresseIP !== "") {
            axios({
                method: "POST",
                data: {
                    username: registerUsername,
                    email: registerEmail,
                    password: registerPassword,
                },
                withCredentials: true,
                url: "http://" + adresseIPConst.adresseIP + ":8080/api/register",
            }).then((res) => {
                console.log("TEST --> " + res.data);
                if (res.data === "User Created")
                    login(registerUsername, registerPassword);
                else
                    setData("User already exist!");
            }).catch(function(error) {
                if (error.message === "Network Error")
                    setData("Address IP is not correct");
                console.log('There has been a problem with your fetch operation: ' + error.message);
                  throw error;
            });
        }
        else
            setData("Please, fill all fields!");
    };

    return (
        <View style={styles.container}>
            <Image style={styles.Logo} source={IMAGE.IMAGE_SIGNUP} />
            <Text>Sign up with your email address</Text>
            <TextInput
                placeholder="Enter your email"
                style={styles.input}
                onChangeText={(e) => setRegisterEmail(e)}
            />
            <TextInput
                placeholder="Enter your password"
                style={styles.input}
                secureTextEntry={true}
                onChangeText={(e) => setRegisterPassword(e)}
            />
            <TextInput
                placeholder="Enter a profile name"
                style={styles.input}
                onChangeText={(e) => setRegisterUsername(e)}
            />
            <TouchableOpacity style={styles.loginBtn} onPress={register}>
                <Text style={styles.textButton}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.noAccount}>Have an account ? Log in</Text>
            </TouchableOpacity>
            {data ? <Text style={styles.errorMessage}>{data}</Text> : null}
        </View>
    );
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E3DCD2",
        alignItems: "center",
    },

    noAccount: {
        marginTop: 20,
        color: "#013328",
    },

    Logo: {
        top: "10%",
        marginBottom: 120,
        width: 160,
        height: 47,
    },

    textButton: {
        color: "#FFFFFF"
    },

    input: {
        height: 45,
        width: 300,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 6,
        padding: 10,
        backgroundColor: "#FFFFFF"
    },

    loginBtn: {
        marginTop: 25,
        width: 300,
        borderRadius: 6,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#013328"
    },
    errorMessage: {
        color: "#FF0000",
        fontSize: 14,
    },
});