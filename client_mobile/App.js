import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { IMAGE } from './src/constants/images'
import { Image, StyleSheet } from "react-native";

import LoginScreen from './src/auth/LoginScreen';
import RegisterScreen from './src/auth/RegisterScreen';
import HomeScreen from './src/tab/HomeScreen';
import ServicesScreen from './src/tab/ServicesScreen';
import CreateArea from './src/tab/CreateArea';

const navOptionHandler = () => ({
    headerShown: false,
})

const Tab = createMaterialBottomTabNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName='Area'
            barStyle={{ backgroundColor: '#013328' }}
        >
            <Tab.Screen name="Services"
                component={ServicesScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: () => (
                        <Image style={styles.Icon} source={IMAGE.ICON_SERVICES} />
                    ),
                }}
            />
            <Tab.Screen name="Area"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: () => (
                        <Image style={styles.Icon} source={IMAGE.ICON_HOME} />
                    ),
                }}
            />
            <Tab.Screen name="Create AREA"
                component={CreateArea}
                options={{
                    headerShown: false,
                    tabBarIcon: () => (
                        <Image style={styles.Icon} source={IMAGE.ICON_CREATE} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    Icon: {
        width: 24,
        height: 24
    },
});

const StackApp = createStackNavigator();

export default function App({ navigation }) {
    return (
        <NavigationContainer>
            <StackApp.Navigator initialRouteName="Login" options={navOptionHandler}>
                <StackApp.Screen name="Home" component={TabNavigator} options={navOptionHandler} />
                <StackApp.Screen name="Login" component={LoginScreen} options={navOptionHandler} />
                <StackApp.Screen name="Register" component={RegisterScreen} options={navOptionHandler} />
            </StackApp.Navigator>
        </NavigationContainer>
    );
}
