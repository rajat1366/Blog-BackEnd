import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Typography from "@material-ui/core/Typography";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Card, Container, Button } from "react-bootstrap";

import { AppBar, Toolbar } from "@material-ui/core";

import { ViewNot } from "../ViewNot";
import EditComment from "../comments/EditComment";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

export const Article = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const history = useNavigate();
  const [articles, setArticle] = useState([]);
  const [search, setSearch] = useState("");
  const params = {
    page: 0,
    size: 5,
    searchData: [search],
  };
  const onChangeSearchData = (e) => {
    const searchData = e.target.value;

    setSearch(searchData);
  };
  const retrieveStartups = () => {
    params.searchData = search;
    console.log(params);
    Axios.get("/api/article/", { params })
      .then((response) => {
        const { content, totalPages } = response.data;
        console.log("in here");

        console.log(content);
        setArticle(content);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    Axios({
      method: "get",
      url: "/api/article/?page=0&size=10",
    }).then(
      (response) => {
        console.log(response.data);
        setArticle(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, articles.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <br></br>
      <div className="row">
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search Article"
            value={search}
            onChange={onChangeSearchData}
          />
        </div>
        <div className="col-sm-4">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={retrieveStartups}
          >
            Search
          </button>
        </div>
      </div>
      {user ? (
        <Link to={"/addArticle/"}>
          <br></br>
          <Button>Add Article</Button>
        </Link>
      ) : (
        ""
      )}

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage > 0
              ? articles.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : articles
            ).map((article) => (
              <div
                key={article.id}
                style={{ display: "flex", flexDirection: "row", margin: "2em" }}
              >
                <Card border="primary" style={{ width: "100%" }}>
                  <Card.Header>{article.title}</Card.Header>
                  <Card.Body>
                    {/*<Card.Title>Primary Card Title</Card.Title>*/}
                    <Card.Text>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: article.description.slice(0, 1000),
                        }}
                      />
                      {/*{article.description.slice(0,250)}*/}
                    </Card.Text>
                    <Link to={"/article/" + article.id}>
                      <Button>Read More</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>

              // <TableRow height="200px">
              //   <TableCell
              //     padding="5px"
              //     component="th"
              //     scope="row"
              //     style={{ fontSize: 20 }}
              //   >
              //     {article.description}
              //     <br></br>
              //     <br></br>
              //     <Link to={"/ViewNot/" + article.id}>
              //       <Button>Read More</Button>
              //     </Link>
              //   </TableCell>
              // </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={articles.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};
