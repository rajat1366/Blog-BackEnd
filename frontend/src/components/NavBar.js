import React from "react";
import { Navbar } from "react-bootstrap";
import { Container, Nav } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import home from "../images/home-bg.jpg";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
export const NavBar = () => {
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div margin="100px">
        <img src={home} height="600px" width="100%" />
      </div>
    </>
  );
};
