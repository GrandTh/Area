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
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager } from "react-native-fbsdk-next";
import { adresseIPConst } from "../constants/config";

const LoginScreen = ({ navigation }) => {
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
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

    const register = (registerEmail, registerUsername, registerPassword) => {
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
            if (res.data === "User Created")
                navigation.navigate('Home', {AddressIp: adresseIPConst.adresseIP});
            else
                setData("User already exist!");
            login(registerUsername, registerPassword);
        }).catch(function(error) {
            if (error.message === "Network Error")
                setData("Address IP is not correct");
            console.log('There has been a problem with your fetch operation: ' + error.message);
            throw error;
        });
    };

    getInfoFromToken = token => {
        const PROFILE_REQUEST_PARAMS = {
            fields: {
                string: 'id, name',
            },
        };
        const profileRequest = new GraphRequest(
            '/me',
            { token, parameters: PROFILE_REQUEST_PARAMS },
            (error, result) => {
                if (error) {
                    console.log('login info has error: ' + error);
                } else {
                    register("exemple@ex.com", result.name, result.id);
                }
            },
        );
        new GraphRequestManager().addRequest(profileRequest).start();
    };

    return (
            <View style={styles.container}>
                <Image style={styles.Logo} source={IMAGE.IMAGE_TITRE} />
                <LoginButton
                    onLoginFinished={(error, result) => {
                        if (error) {
                            console.log('login has error: ' + result.error);
                        } else if (result.isCancelled) {
                            console.log('login is cancelled.');
                        } else {
                            AccessToken.getCurrentAccessToken().then(data => {
                                const accessToken = data.accessToken.toString();
                                getInfoFromToken(accessToken);
                            });
                        }
                    }}
                />
                <TouchableOpacity>
                    <Image style={styles.button} source={IMAGE.BUTTON_GG} />
                </TouchableOpacity>
                <Image style={styles.or} source={IMAGE.IMAGE_OR} />
                <TextInput
                    placeholder="Username"
                    style={styles.input}
                    onChangeText={(e) => setLoginUsername(e)}
                />
                <TextInput
                    placeholder="Password"
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={(e) => setLoginPassword(e)}
                />
                <TouchableOpacity style={styles.loginBtn} onPress={() => login(loginUsername, loginPassword)}>
                    <Text style={styles.textButton}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.noAccount}>Don't have an account ? Register</Text>
                </TouchableOpacity>
                {data ? <Text style={styles.errorMessage}>{data}</Text> : null}
            </View>
    );
}

export default LoginScreen;

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

    textInput: {
        marginLeft: -150,
    },

    Logo: {
        top: "10%",
        marginBottom: 100,
        width: 150,
        height: 60,
    },

    button: {
        marginTop: 10,
        width: 300,
        height: 50,
    },

    or: {
        marginTop: 20,
        marginBottom: 20,
        width: 300,
        height: 15,
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
        backgroundColor: "#013328",
    },

    errorMessage: {
        color: "#FF0000",
        fontSize: 14,
    },
});
