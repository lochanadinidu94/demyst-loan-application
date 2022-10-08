import React from 'react';
import {Image, StatusBar, StyleSheet, View} from "react-native";

function Loading(props) {
    return (
        <>
            <View style={styles.img}>
                <Image
                    source={require('../../assets/Loading.gif')}
                    style={{width: 100, height:100 }}
                />
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    img:{
        flex:1,
        alignContent:'center',
        alignItems:'center',
        margin:25,
        backfaceVisibility:'hidden'
    }
});

export default Loading;