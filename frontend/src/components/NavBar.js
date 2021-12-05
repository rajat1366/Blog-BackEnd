import React, { useState, useEffect } from "react";
import { Dropdown, Navbar } from "react-bootstrap";
import { Container, Nav } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import home from "../images/home-bg.jpg";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

export const NavBar = () => {
  const [search, setSearch] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const params = {
    page: 0,
    size: 5,
    searchData: [search],
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem("user");
    setCurrentUser(undefined);
    return <Navigate to="/" />;
  };
  const handleSubmit = () => {
    console.log(search);
    axios.get("/api/article/", params).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  };
  return (
    <>
      <Navbar bg="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/" style={{ color: "white" }}>
            Why should You Read
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                id="search"
                className="me-2"
                onChange={(e) => {
                  setSearch({ ...search, search: e.target.value });
                }}
                aria-label="Search"
              />
              <Button variant="outline-success" onClick={handleSubmit}>
                Search
              </Button>
            </Form>

            {currentUser ? (
              <div>
                <Dropdown style={{ marginLeft: "10px" }}>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <PersonOutlineIcon style={{ color: "white" }} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                    <Dropdown.Item onClick={logOut}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            ) : (
              <div>
                <Link to="/login">
                  <Button variant="outline-success" style={{ margin: "5px" }}>
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="outline-success" style={{ margin: "5px" }}>
                    Signup
                  </Button>
                </Link>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
