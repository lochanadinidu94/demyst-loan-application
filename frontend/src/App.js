import React, { useState } from "react";
import "./style/App.css";

import Header from "./components/Header";
import Home from "./components/Home";
import Form from "./components/Form";
import BalanceSheet from "./components/BalanceSheet";
import Result from "./components/Result";
import Reviews from "./components/Reviews";
import { Context } from "./context/Context";

function App() {
  const [applicationStatus, setApplicationStatus] = useState(0);
  const [applicationId, setApplicationId] = useState(0);
  const [amount, setAmount] = useState("");
  const [userId, setUserId] = useState(0);
  const [sheet, setSheet] = useState([]);
  const [preassessmentValue, setPreassessmentValue] = useState(0);
  const [decision, setDecision] = useState(false);

  return (
    <>
      <Context.Provider
        value={{
          applicationId,
          setApplicationId,
          setApplicationStatus,
          amount,
          setAmount,
          userId,
          setUserId,
          sheet,
          setSheet,
          preassessmentValue,
          setPreassessmentValue,
          decision,
          setDecision,
        }}
      >
        <Header />
        {applicationStatus == 0 && <Home />}
        {applicationStatus == 1 && <Form />}
        {applicationStatus == 2 && <BalanceSheet />}
        {applicationStatus == 3 && <Result />}
        {applicationStatus == 4 && <Reviews />}
      </Context.Provider>
    </>
  );
}

export default App;
