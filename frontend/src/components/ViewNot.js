import React from "react";
import { NavBar } from "./NavBar";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { Container, Nav } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import home from "../images/home-bg.jpg";
import { Link } from "react-router-dom";
import { Comments } from "./comments/Comments";

export const ViewNot = () => {
  const { id } = useParams();
  const [article, setArticle] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    Axios({
      method: "get",
      url: "/api/article/" + id,
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
  useEffect(() => {
    Axios({
      method: "get",
      url: "/api/comment/" + id,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("key")}`,
      },
    }).then(
      (response) => {
        console.log(response.data[0].description);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);
  return (
    <div>
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
      <br></br>
      <Card border="primary" style={{ width: "80rem" }}>
        <Card.Header>{article.title}</Card.Header>
        <Card.Body>
          <Card.Title>Description</Card.Title>
          <Card.Text>{article.description}</Card.Text>
        </Card.Body>
      </Card>
      <div>
        <Comments rating_id={id} />
      </div>
    </div>
  );
};
