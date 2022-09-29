import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

import { Context } from "../context/Context";
import Button from "@mui/material/Button";

function Result(props) {
  const { setApplicationStatus, preassessmentValue, decision } =
    useContext(Context);

  const faceStyle = {
    width: "5rem",
    height: "5rem",
    marginInline: "auto",
  };

  return (
    <>
      <div id="ApplicationResult">
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
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              width: "auto",
              marginInline: "auto",
              textAlign: "center",
            }}
          >
            Business Loan Application
          </Typography>
          {decision ? (
            <InsertEmoticonIcon sx={faceStyle} color="success" />
          ) : (
            <SentimentVeryDissatisfiedIcon sx={faceStyle} color="disabled" />
          )}
          <Typography
            variant="h4"
            gutterBottom
            sx={{ width: "auto", marginInline: "auto" }}
          >
            Your application has been{" "}
            <b>{decision ? "approved" : "rejected"}</b> And Your Pre Assessment
            Value is <b>{preassessmentValue}</b>
          </Typography>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              setApplicationStatus(0);
            }}
          >
            Home
          </Button>
        </Box>
      </div>
    </>
  );
}

export default Result;
