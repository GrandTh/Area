import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native';


import { IMAGE } from './constants/images'

const CustomHeader = ({title}) => {
    return (
        <View style={{ flexDirection: 'row', height: 80, backgroundColor: '#013328' }}>
            <View style={{ flex: 1 }}></View>
            <View style={{ flex: 1.5, justifyContent: 'center', marginTop: 30 }}>
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 20 }}>{title}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', marginTop: 30 }}>
            </View>
        </View>
    )
}

export default CustomHeader;