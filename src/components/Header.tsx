import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import userImg from '../assets/arthur.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface HeaderProps {
    title: string;
    subtitle?: string;
}

export function Header({ title, subtitle = '' }: HeaderProps){
    const [userName,setUserName] = useState<string>();
    const [subtitleComponent,setSubtitleComponent] = useState<string>();

    useEffect(() => {
        async function loadStorageUserName(){
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setSubtitleComponent(user || '');
        }

        if(subtitle == '')
            loadStorageUserName();
        else
            setSubtitleComponent(subtitle);
    },[]);

    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>{title}</Text>
                <Text style={styles.userName}>{subtitleComponent}</Text>
            </View>

            <Image source={userImg} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight()
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    }
});