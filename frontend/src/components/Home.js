import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import { Context } from "../context/Context";

function Home(props) {
  const { setApplicationId, setApplicationStatus } = useContext(Context);

  const fetchApplicationId = async () => {
    return axios({
      method: "post",
      url: "http://localhost:3000/application/create-new",
      data: {},
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  };

  const startNewApplication = async () => {
    try {
      const applicationRes = await fetchApplicationId();
      setApplicationId(applicationRes.data);
      setApplicationStatus(1);
    } catch (e) {
      console.error(e);
    }
  };

  const openReviews = () => {
    setApplicationStatus(4);
  };

  return (
    <>
      <div id="startApplication">
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingBlock: "20px",
            borderTop: 1,
          }}
        >
          <Button
            variant="contained"
            onClick={startNewApplication}
            sx={{
              width: "200px",
              marginInline: "auto",
              marginBlockEnd: "10px",
            }}
          >
            Start new application
          </Button>

          <Button
            variant="contained"
            onClick={openReviews}
            size="medium"
            sx={{
              width: "200px",
              marginInline: "auto",
              marginBlockEnd: "10px",
            }}
          >
            Check the reviews
          </Button>
        </Box>
      </div>
    </>
  );
}

export default Home;
