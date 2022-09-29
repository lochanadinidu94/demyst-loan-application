import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Context } from "../context/Context";
import axios from "axios";
import { Root } from "../style/styles";

function BalanceSheet(props) {
  const {
    applicationId,
    setApplicationStatus,
    amount,
    userId,
    sheet,
    setPreassessmentValue,
    setDecision,
  } = useContext(Context);

  const loanRequest = async () => {
    if ((sheet != null) | undefined) {
      let totProfit = 0;
      sheet.forEach((element) => {
        totProfit += element.profitOrLoss;
      });

      let avgAssetsValue = 0;
      sheet.forEach((element) => {
        avgAssetsValue += element.assetsValue;
      });
      avgAssetsValue = avgAssetsValue / 12;

      return axios({
        method: "post",
        url: "http://localhost:3000/application/lone-request",
        data: {
          loneAmount: amount,
          totProfit: totProfit,
          avgAssetsValue: avgAssetsValue,
        },
        headers: { "Access-Control-Allow-Origin": "*" },
      })
        .then((response) => {
          setPreassessmentValue(response.data.preassessmentValue);
          setDecision(response.data.decision);

          setApplicationStatus(3);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div id="BalanceSheet">
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingBlock: "20px",
            "& > *": { marginInline: "auto" },
          }}
        >
          <Typography variant="h3" gutterBottom>
            Balance Sheet
          </Typography>
          Application Id: {applicationId}
          <br />
          User Id: {userId}
          <br />
          Amount Request: {amount}
          <Root sx={{ maxWidth: "100%" }}>
            <table
              style={{ border: "1px solid" }}
              aria-label="custom pagination table"
            >
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Month</th>
                  <th>Profit Or Loss</th>
                  <th>Asset Value</th>
                </tr>
              </thead>
              <tbody>
                {sheet.map((dataRow) => {
                  return (
                    <tr>
                      <td>{dataRow.year}</td>
                      <td>{dataRow.month}</td>
                      <td>{dataRow.profitOrLoss}</td>
                      <td>{dataRow.assetsValue}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Root>
          <Button variant="contained" onClick={loanRequest}>
            Click to request loan
          </Button>
        </Box>
      </div>
    </>
  );
}

export default BalanceSheet;
