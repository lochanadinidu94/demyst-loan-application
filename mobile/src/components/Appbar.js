import React, { useContext } from 'react';
import { Appbar } from 'react-native-paper';
import { Context } from '../context/Context'

function AppBar (props) {

    const {setApplicationState} = useContext(Context);
    return(
    <Appbar.Header>
        <Appbar.BackAction onPress={() => {setApplicationState(0)}} />
        <Appbar.Content title="Dymest Loan App" />
    </Appbar.Header>
    )
}

export default AppBar;