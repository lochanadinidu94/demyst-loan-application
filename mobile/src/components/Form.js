import React,{ useContext, useState} from 'react';
import axios from "axios";
import { StyleSheet, Text, View,Button,TextInput } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'

import { Context } from '../context/Context'
import Loading from "./Loading";
function Form(props) {
    const {
        setApplicationState,
        applicationId,
        setAmount,
        userId,
        setUserId,
        setSheet,
        loading,
        setLoading
    } = useContext(Context);

    let name = ''
    let email = ''
    let mobile = ''
    let software = ''
    let amount = 0

    const data = ["Xero", "MYOB"]
    const formSubmit = async () => {
            setLoading(true)
            saveFormData().then((response) => {
                setUserId(response.data.profile.id);
                setSheet(response.data.sheet);
                setAmount(amount)
                setApplicationState(2);
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const saveFormData = async () => {
        return (
            axios({
                method: "post",
                url: "http://192.168.1.9:3000/application/balance-sheet",
                data: {
                    id: applicationId,
                    userName: name,
                    userEmail: email,
                    userMobile: mobile,
                    softwareType: software,
                    loneAmount: amount,
                    userId: userId,
                },
                headers: { "Access-Control-Allow-Origin": "*" },
            })
        )
    }
    return (
        <>
            {loading? <Loading/> : <></>}
            <View style={styles.container}>
                <Text style={{fontWeight:'bold', fontSize:30}}>Apply New Request</Text>
                <TextInput
                    title="Name"
                    style={styles.input}
                    placeholder="Name"
                    onChangeText={text => {
                        name = text
                    }}
                />
                <TextInput
                    title="Email"
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={text => {
                        email = text
                    }}
                />
                <TextInput
                    title="Mobile"
                    keyboardType = 'numeric'
                    style={styles.input}
                    placeholder="Mobile"
                    onChangeText={text => {
                        mobile = text
                    }}
                />
                <View style={styles.space} />
                <SelectDropdown
                    data={data}
                    style={styles.dropdown}
                    onSelect={(selectedItem, index) => {
                        software = selectedItem
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        return item
                    }}
                />
                <TextInput
                    title="Amount"
                    keyboardType = 'numeric'
                    style={styles.input}
                    placeholder="Amount"
                    onChangeText={text => {
                        amount = text
                    }}
                />
                <View style={styles.space} />
                <Button
                    title="Request Balance Sheet"
                    onPress={formSubmit}
                />
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        marginTop: 15,
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'grey',
        padding: 10,
        fontSize: 20,
        width:200
    },
    dropdown: {
        marginTop: 15,
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'grey',
        padding: 10,
        fontSize: 20,
        width:200
    },
    space: {
        width: 20, // or whatever size you need
        height: 20,
    },
});

export default Form;