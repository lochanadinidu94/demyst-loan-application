import React from 'react';
import './style/App.css';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {default as BankIcon} from '@mui/icons-material/AccountBalanceRounded';
import Box from "@mui/material/Box";

import axios from 'axios';
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {default as HappyFace} from '@mui/icons-material/SentimentSatisfiedAltRounded';
import {default as SadFace} from '@mui/icons-material/SentimentDissatisfiedRounded';



function App() {


    const [applicationStatus, setApplicationStatus] = React.useState(0);
    const [applicationId, setApplicationId] = React.useState(0);

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [mobile, setMobile] = React.useState('');
    const [software, setSoftware] = React.useState('');
    const [amount, setAmount] = React.useState('');

    const [userId, setUserId] = React.useState(0);
    const [sheet, setSheet] = React.useState([]);

    const [preassessmentValue, setPreassessmentValue] = React.useState(0);
    const [decision, setDecision] = React.useState(false);


    const fetchApplicationId = async () => {
        return axios({
            method: 'post',
            url: 'http://localhost:3000/application/create-new',
            data: {},
            headers: {"Access-Control-Allow-Origin": "*"}
        });
    }

    const startNewApplication = async () => {
        try {
            const applicationRes = await fetchApplicationId();
            setApplicationId(applicationRes.data);
            setApplicationStatus(1);
        } catch (e) {
            console.error(e)
        }
        console.log('App id:', applicationId)
    }

    const selectSoftware = (event) => {
        setSoftware(event.target.value)
    };

    const formSubmit = async () => {
        axios({
            method: 'post',
            url: 'http://localhost:3000/application/balance-sheet',
            data: {
                id: applicationId,
                userName: name,
                userEmail: email,
                userMobile: mobile,
                softwareType: software,
                loneAmount: amount,
                userId: userId
            },
            headers: {"Access-Control-Allow-Origin": "*"}
        })
            .then((response) => {

                setUserId(response.data.profile.userId)
                setSheet(response.data.sheet)

                setApplicationStatus(2);

            })
            .catch((err) => {
                console.log(err);
            });
    }

    const loanRequest = async () => {
        if (sheet != null | undefined) {

            let totProfit = 0
            sheet.forEach(element => {
                totProfit += element.profitOrLoss;
            });

            let avgAssetsValue = 0;
            sheet.forEach(element => {
                avgAssetsValue += element.assetsValue;
            });
            avgAssetsValue = avgAssetsValue / 12

            return axios({
                method: 'post',
                url: 'http://localhost:3000/application/lone-request',
                data: {
                    loneAmount: amount,
                    totProfit: totProfit,
                    avgAssetsValue: avgAssetsValue
                },
                headers: {"Access-Control-Allow-Origin": "*"}
            })
                .then((response) => {
                    setPreassessmentValue(response.data.preassessmentValue);
                    setDecision(response.data.decision);
                    console.log(response)
                    console.log(decision)
                    if (preassessmentValue > 0) {

                    }
                    setApplicationStatus(3);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    const faceStyle = {
        width: '10rem',
        height: '10rem',
        marginInline: 'auto',
    };


    return (
        <>

            {
                applicationStatus == 0 &&
                <div id="startApplication">
                    <Box sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        paddingBlock: '20px'
                    }}
                    >
                        <BankIcon sx={{
                            width: '10rem',
                            height: '10rem',
                            marginInline: 'auto',
                        }}/>

                        <Typography
                            sx={{width: 'auto', marginInline: 'auto', textAlign: 'center'}}
                            variant="h2"
                            gutterBottom
                        >
                            Business Loan Application
                        </Typography>

                        <Button
                            variant="contained"
                            onClick={startNewApplication}
                            sx={{width: 'auto', marginInline: 'auto', marginBlockEnd: '40px',}}
                        >
                            Click to start the application
                        </Button>

                    </Box>
                </div>

            }

            {
                applicationStatus == 1 &&
                <div id="startForm">
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            paddingBlock: '20px',
                            '& > *': {marginInline: 'auto'},
                            '& > .MuiTypography-h3': {textAlign: 'center'},
                            '& .MuiTextField-root': {marginInline: 'auto', marginBlock: 1, width: '30ch'}
                        }}
                        component="form"
                        noValidate
                        autoComplete="off"
                    >
                        <Typography variant="h3" gutterBottom>
                            Please fill the required fields to request a loan application
                        </Typography>

                        <FormGroup sx={{
                            width: '100%',
                            height: '100%',
                        }}
                        >
                            <TextField
                                margin="normal"
                                required
                                id="outlined-name"
                                label="Name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                id="outlined-email"
                                label="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                id="outlined-year-established"
                                inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                                label="Mobile"
                                value={mobile}
                                onChange={e => setMobile(e.target.value)}
                            />

                            <FormControl className="MuiTextField-root">
                                <InputLabel id="demo-simple-select-label">Software</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Software"
                                    onChange={selectSoftware}
                                >
                                    <MenuItem value={'Xero'}>Xero</MenuItem>
                                    <MenuItem value={'MYOB'}>MYOB</MenuItem>

                                </Select>
                            </FormControl>

                            <TextField
                                margin="normal"
                                required
                                id="outlined-requested-amount"
                                inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                                label="Requested Amount"
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                            />
                            <Box
                                sx={{
                                    width: '50%',
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    paddingBlock: '40px',
                                    marginInline: 'auto',
                                }}
                            >
                                <Button variant="contained" onClick={formSubmit}>
                                    Get Balance Sheet
                                </Button>
                            </Box>
                        </FormGroup>
                    </Box>
                </div>
            }

            {
                applicationStatus == 2 &&
                <div id="BalanceSheet" >

                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            paddingBlock: '20px',
                            '& > *': {marginInline: 'auto'},
                        }}
                    >
                        <Typography variant="h3" gutterBottom>
                            Balance Sheet
                        </Typography>

                        <div style={{height: 500, width: '100%'}}>


                            <table style={{border: '1px solid'}}>
                                <tr>
                                    <th>Year</th>
                                    <th>Month</th>
                                    <th>Profit Or Loss</th>
                                    <th>Asset Value</th>
                                </tr>
                                {
                                    sheet.map(dataRow => {
                                        return (
                                            <tr>
                                                <td>{dataRow.year}</td>
                                                <td>{dataRow.month}</td>
                                                <td>{dataRow.profitOrLoss}</td>
                                                <td>{dataRow.assetsValue}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </table>
                        </div>


                        <Button variant="contained" onClick={loanRequest}>
                            Click to request loan
                        </Button>
                    </Box>

                </div>

            }

            {
                applicationStatus ==  3 &&
                <div id="ApplicationResult">
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            paddingBlock: '20px',
                            '& > *': {marginInline: 'auto'},
                        }}
                    >
                        <Typography
                            variant="h2"
                            gutterBottom
                            sx={{width: 'auto', marginInline: 'auto', textAlign: 'center'}}
                        >
                            Business Loan Application
                        </Typography>
                        {
                            decision ? <HappyFace sx={faceStyle}/> : <SadFace sx={faceStyle}/>
                        }
                        <Typography
                            variant="h4"
                            gutterBottom
                            sx={{width: 'auto', marginInline: 'auto'}}
                        >
                            Your application has been <b>{decision ? 'approved' : 'rejected'}</b> And Your Pre Assessment
                            Value is <b>{preassessmentValue}</b>
                        </Typography>


                    </Box>
                </div>

            }


        </>
    );


}

export default App;
