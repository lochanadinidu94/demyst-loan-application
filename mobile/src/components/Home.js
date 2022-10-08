import React, { useContext } from 'react';
import { StyleSheet, Text, View,Button, TextInput } from 'react-native';
import axios from "axios";
import { Context } from '../context/Context'
import Loading from "./Loading";

function Home(props) {
    const {
        setApplicationState,
        setApplicationId,
        loading,
        setLoading
    } = useContext(Context);

    const startNewApplication = async () => {
        try {
            setLoading(true)
            const applicationRes = await fetchApplicationId();
            setApplicationId(applicationRes.data);
            setApplicationState(1);
            setLoading(false)
        } catch (e) {
            console.error(e);
        }
    };
    const fetchApplicationId = async () => {
        return axios({
            method: "post",
            url: "http://192.168.1.9:3000/application/create-new",
            data: {},
            headers: { "Access-Control-Allow-Origin": "*" },
        });
    };
    return (
        <>
            {loading? <Loading/> : <></>}
            <View style={styles.container}>

                <View style={styles.space} />

                <Button
                    title="Start new application"
                    style={styles.button}
                    onPress={startNewApplication}

                />

                <View style={styles.space} />

                <Button
                    title="Check the reviews"
                    style={styles.button}
                    onPress={() => setApplicationState(4)}
                    onPress={() => setApplicationState(4)}
                    onPress={() => setApplicationState(4)}
                />
            </View>
        </>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginBottom: 20,
        padding: 30
    },
    space: {
        width: 20, // or whatever size you need
        height: 20,
    },
})


export default Home;