import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Root, CustomTablePagination } from "../style/styles";
import { Context } from "../context/Context";

function Reviews(props) {
  const { setApplicationStatus } = useContext(Context);
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - reviews.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const lordReviews = async (text) => {
    const graphqlApi = "http://localhost:3000/review/review";
    // const graphqlApi = "http://localhost:3005/graphql";

    const grapqlQuery = `query{
      getReviews(text:"${text}"){
        name
        email
        body
      }
    }`;
    const fetchData = await axios.post(graphqlApi, {
      query: grapqlQuery,
    });
    if (fetchData.data.data) setReviews(fetchData.data.data.getReviews);
  };

  useEffect(() => {
    lordReviews("");
  }, []);

  return (
    <div>
      <Container fixed>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setApplicationStatus(0);
          }}
        >
          Back
        </Button>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Search Reviews"
            variant="outlined"
            size="small"
            style={{ margin: "10px 10px 10px 0px" }}
            onChange={(e) => {
              lordReviews(e.target.value);
            }}
          />
        </Box>

        <Root sx={{ maxWidth: "100%" }}>
          <table aria-label="custom pagination table">
            <thead>
              <tr>
                <th>User</th>
                <th>User Email</th>
                <th>Review</th>
              </tr>
            </thead>
            <tbody>
              {(rowsPerPage > 0
                ? reviews.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : reviews
              ).map((row) => (
                <tr key={row.name}>
                  <td style={{ width: "10%" }} align="right">
                    {row.name}
                  </td>
                  <td style={{ width: "20%" }} align="right">
                    {row.email}
                  </td>
                  <td style={{ width: "80%" }} align="right">
                    {row.body}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <CustomTablePagination
                  rowsPerPageOptions={[5]}
                  colSpan={3}
                  count={reviews.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  componentsProps={{
                    select: {
                      "aria-label": "rows per page",
                    },
                    actions: {
                      showFirstButton: true,
                      showLastButton: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                />
              </tr>
            </tfoot>
          </table>
        </Root>
      </Container>
    </div>
  );
}

export default Reviews;
