import React from "react";
import { Navbar } from "react-bootstrap";
import { Container, Nav } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import home from "../images/home-bg.jpg";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";

export const NavBarAuth = () => {
  const navigate = useNavigate();

  const handler = (e) => {
    axios({
      method: "post",
      url: "/api/auth/logout",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("key")}`,
      },
    }).then(
      (response) => {
        console.log(response);
        navigate("/");
      },
      (error) => {
        console.log(error);
      }
    );
    e.preventDefault();
  };
  return (
    <>
      <Navbar bg="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#" style={{ color: "white" }}>
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
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            <Dropdown style={{ marginLeft: "10px" }}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <Link to="/profile" style={{ marginLeft: "10px" }}>
                  <PersonOutlineIcon style={{ color: "white" }} />
                </Link>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                <Dropdown.Item onClick={handler}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div margin="100px">
        <img src={home} height="600px" width="100%" />
      </div>
    </>
  );
};
