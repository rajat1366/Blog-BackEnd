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
import { NavBarAuth } from "./NavBarAuth";

export const ViewAuth = () => {
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
      <NavBarAuth />
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
