import React,{useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, Button, TextInput, StatusBar} from 'react-native';
import { DataTable } from 'react-native-paper';
import axios from "axios";
import { Context } from '../context/Context'
import Loading from "./Loading";


function Reviews(props) {
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const {
        loading,
        setLoading
    } = useContext(Context);

    let pageCount = 500

    const loadReviews = async (text) => {
      const graphqlApi = "http://192.168.1.9:3000/review/review";

      const grapqlQuery = `query{
          getReviews(text:"${text}"){
            id
            name
            email
            body
          }
        }`;
     setLoading(true)
     const fetchData = await axios.post(graphqlApi, {
        query: grapqlQuery,
     });
     if (fetchData.data.data) {
         setReviews(fetchData.data.data.getReviews)
         setLoading(false)
     };
    };

    useEffect(() => {
        loadReviews("");
    }, []);

    return (
        <>
            {loading? <Loading/> : <></>}
            <View >
                <Text style={{fontWeight:'bold', fontSize:30}}>All Reviews</Text>
                <TextInput
                    title="Name"
                    style={styles.input}
                    placeholder="Search Reviews"
                    onChangeText={text => {
                        loadReviews(text)
                    }}
                />
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>User</DataTable.Title>
                        <DataTable.Title >Email</DataTable.Title>
                        <DataTable.Title >Review</DataTable.Title>
                    </DataTable.Header>

                    {(itemsPerPage > 0
                            ? reviews.slice(
                                page * itemsPerPage,
                                page * itemsPerPage + itemsPerPage
                            )
                            : reviews
                    ).map((row) => {
                            return (
                                <DataTable.Row key={row.id}>
                                    <DataTable.Cell>{row.name}</DataTable.Cell>
                                    <DataTable.Cell>{row.email}</DataTable.Cell>
                                    <DataTable.Cell>{row.body}</DataTable.Cell>
                                </DataTable.Row>
                            )
                        }
                    )}
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
})

export default Reviews;