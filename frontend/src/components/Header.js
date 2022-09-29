import React from "react";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function Hedder(props) {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingBlock: "20px",
        }}
      >
        <AccountBalanceIcon
          sx={{
            width: "5rem",
            height: "5rem",
            marginInline: "auto",
          }}
          color="primary"
        />
        <Typography
          sx={{ width: "auto", marginInline: "auto", textAlign: "center" }}
          variant="h5"
          gutterBottom
        >
          Business Loan Application
        </Typography>
      </Box>
    </>
  );
}

export default Hedder;
