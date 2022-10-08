import React,{useContext} from 'react';
import {Button, StyleSheet, Text, View} from "react-native";
import { Context } from '../context/Context'
function Result(props) {

    const {
        setApplicationState,
        preassessmentValue,
        decision,
        amount,
    } = useContext(Context);
    let states = true
    return (
        <>
            <View style={styles.container}>
                <Text style={{fontWeight:'bold', fontSize:30}}>Application Approval States</Text>

                <View style={styles.space} />

                {decision?
                    (<Text style={{ fontSize:20}}>Your ${amount} Loan Amount is approved</Text>):
                    (<Text style={{ fontSize:20}}>Your ${amount} Loan Amount is Not approved</Text>)
                }
                <View style={styles.space} />

                <Text style={{fontWeight:'bold',  fontSize:15}}>Your Pre Assessment
                    Value is {preassessmentValue}
                </Text>
                <Button
                    title="Home"
                    onPress={()=> setApplicationState(0)}
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
    space: {
        width: 50, // or whatever size you need
        height: 20,
    },
})
export default Result;