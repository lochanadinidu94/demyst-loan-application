import React, {useState} from 'react'
import {View} from 'react-native';

import Appbar from './src/components/Appbar'
import Home from './src/components/Home'
import Form from './src/components/Form'
import Reviews from './src/components/Reviews'
import BalanceSheet from './src/components/BalanceSheet'
import Result from './src/components/Result'

import { Context } from './src/context/Context';

export default function App() {

  const [applicationState, setApplicationState] = useState(0);
  const [applicationId, setApplicationId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [sheet, setSheet] = useState([]);
  const [amount, setAmount] = useState(0);
  const [preassessmentValue, setPreassessmentValue] = useState(0);
  const [decision, setDecision] = useState(false);
  const [loading, setLoading] = useState(false);

    return (
    <>
          <Context.Provider
            value={{
                applicationId,
                setApplicationId,
                setApplicationState,
                userId,
                setUserId,
                sheet,
                setSheet,
                amount,
                setAmount,
                preassessmentValue,
                setPreassessmentValue,
                decision,
                setDecision,
                loading,
                setLoading
            }}
          >
              <Appbar/>
              <View >
                { applicationState == 0 && <Home/>}
                { applicationState == 1 && <Form/>}
                { applicationState == 2 && <BalanceSheet/>}
                { applicationState == 3 && <Result/>}
                { applicationState == 4 && <Reviews/>}
              </View>
          </Context.Provider>
    </>
  );
}

