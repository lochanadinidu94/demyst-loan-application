import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { Context } from "../context/Context";
import axios from "axios";

function Form(props) {
  const {
    applicationId,
    setApplicationStatus,
    amount,
    setAmount,
    userId,
    setUserId,
    setSheet,
  } = useContext(Context);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [software, setSoftware] = React.useState("");

  const selectSoftware = (event) => {
    setSoftware(event.target.value);
  };

  const formSubmit = async () => {
    axios({
      method: "post",
      url: "http://localhost:3000/application/balance-sheet",
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
      .then((response) => {
        setUserId(response.data.profile.id);
        setSheet(response.data.sheet);
        setApplicationStatus(2);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div id="startForm">
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingBlock: "20px",
            "& > *": { marginInline: "auto" },
            "& > .MuiTypography-h3": { textAlign: "center" },
            "& .MuiTextField-root": {
              marginInline: "auto",
              marginBlock: 1,
              width: "30ch",
            },
          }}
          component="form"
          noValidate
          autoComplete="off"
        >
          <Typography variant="h3" gutterBottom>
            Please fill the required fields to request a loan application,
            Application id: {applicationId}
          </Typography>

          <FormGroup
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <TextField
              margin="normal"
              required
              id="outlined-name"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              id="outlined-email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              id="outlined-year-established"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              label="Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />

            <FormControl className="MuiTextField-root">
              <InputLabel id="demo-simple-select-label">Software</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Software"
                onChange={selectSoftware}
              >
                <MenuItem value={"Xero"}>Xero</MenuItem>
                <MenuItem value={"MYOB"}>MYOB</MenuItem>
              </Select>
            </FormControl>

            <TextField
              margin="normal"
              required
              id="outlined-requested-amount"
              type="number"
              label="Requested Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Box
              sx={{
                width: "50%",
                display: "flex",
                justifyContent: "space-around",
                paddingBlock: "40px",
                marginInline: "auto",
              }}
            >
              <Button variant="contained" onClick={formSubmit}>
                Get Balance Sheet
              </Button>
            </Box>
          </FormGroup>
        </Box>
      </div>
    </>
  );
}

export default Form;
