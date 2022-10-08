import React,{useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View,Button,SafeAreaView,ScrollView,StatusBar } from 'react-native';
import {DataTable} from "react-native-paper";
import { Context } from '../context/Context'
import axios from "axios";
import Loading from "./Loading";

function BalanceSheet(props) {
    const {
        setApplicationState,
        applicationId,
        userId,
        amount,
        sheet,
        setPreassessmentValue,
        setDecision,
        loading,
        setLoading
    } = useContext(Context);

    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    let pageCount = sheet.length % 10
    let totProfit = 0;
    let avgAssetsValue = 0;

    const loanRequest = async () => {
        if ((sheet != null) | undefined) {

            sheet.forEach((element) => {
                totProfit += element.profitOrLoss;
            });


            sheet.forEach((element) => {
                avgAssetsValue += element.assetsValue;
            });
            avgAssetsValue = avgAssetsValue / 12;
            setLoading(true)
            return(

                fetchData().then((response) => {
                    setPreassessmentValue(response.data.preassessmentValue);
                    setDecision(response.data.decision);
                    setApplicationState(3);
                    setLoading(false)
                })
                .catch((err) => {
                   console.log(err);
                })
            )
        }
    };

    const fetchData = async () =>{
        return(
            axios({
                method: "post",
                url: "http://192.168.1.9:3000/application/lone-request",
                data: {
                    loneAmount: amount,
                    totProfit: totProfit,
                    avgAssetsValue: avgAssetsValue,
                },
                headers: { "Access-Control-Allow-Origin": "*" },
            })
        )

    }

    return (
        <>
        {loading? <Loading/> : <></>}
        <View style={styles.container}>
            <Text style={{fontWeight:'bold', fontSize:30}}>Balance Sheet</Text>
            <Text style={{fontWeight:'bold', fontSize:15}}>Application ID: {applicationId}</Text>
            <Text style={{fontWeight:'bold', fontSize:15}}>User Id: {userId}</Text>
            <Text style={{fontWeight:'bold', fontSize:15}}>Amount: {amount}</Text>

            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Year</DataTable.Title>
                    <DataTable.Title>Month</DataTable.Title>
                    <DataTable.Title>ProfitORLost</DataTable.Title>
                    <DataTable.Title>Asset Value</DataTable.Title>
                </DataTable.Header>

                {(itemsPerPage > 0
                        ? sheet.slice(
                            page * itemsPerPage,
                            page * itemsPerPage + itemsPerPage
                        )
                        : sheet
                ).map((dataRow) => {
                    return (
                        <DataTable.Row key={dataRow.year}>
                            <DataTable.Cell>{dataRow.year}</DataTable.Cell>
                            <DataTable.Cell>{dataRow.month}</DataTable.Cell>
                            <DataTable.Cell>{dataRow.profitOrLoss}</DataTable.Cell>
                            <DataTable.Cell>{dataRow.assetsValue}</DataTable.Cell>
                        </DataTable.Row>
                    );
                })}

                <DataTable.Pagination
                    page={page}
                    numberOfPages={pageCount}
                    onPageChange={(page) => setPage(page)}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    showFastPagination
                    optionsLabel={'Rows per page'}
                />
            </DataTable>
            <Button
                title="Click to Loan Request"
                onPress={loanRequest}
            />
        </View>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: StatusBar.currentHeight,
    },

})
export default BalanceSheet;