import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Card, CardSubtitle, Button } from "reactstrap";
import { Comments } from "../comments/Comments";
import { Comment } from "semantic-ui-react";
import { EditArticle } from "./EditArticle";

const ShowArticle = (props) => {
  const [showUpdateArticleForm, SetShowUpdateArticleForm] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleEditButtonEvent = (event) => {
    console.log(event.target.value);
    setSelectedArticle(event.target.value);
    SetShowUpdateArticleForm(true);
  };

  const { id } = useParams();
  const initialAritcleState = {
    id: null,
    title: "",
    description: "",
    dateTime: "",
  };

  const [article, setArticle] = useState([initialAritcleState]);
  useEffect(() => {
    getArticle();
    getArticleComments();
  }, []);
  const getArticle = () => {
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
  };
  const getArticleComments = () => {
    Axios({
      method: "get",
      url: "/api/comment/" + id,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("key")}`,
      },
    }).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <div style={{ margin: "2em" }}>
      <Comment.Group className={"container"}>
        <div style={{ width: "100%" }}>
          <div className="row">
            <div>
              <h3> {article.title} </h3>
              {/*<div>Launch year - {article.launchDate.substring(0,4)} </div>*/}
              <br></br>
            </div>
            <div className="col-sm"></div>
          </div>

          <div dangerouslySetInnerHTML={{ __html: article.description }} />
          {/*<p> {article.description}</p>*/}
        </div>
        {user != undefined && user.id === article.userId ? (
          <Button
            size="small"
            value={article.userId}
            onClick={handleEditButtonEvent}
          >
            Edit
          </Button>
        ) : (
          ""
        )}
        <div></div>
        <div>
          <Comments article_id={id} />
        </div>
      </Comment.Group>
      <div>
        {user ? (
          <div>
            <EditArticle
              trigger={showUpdateArticleForm}
              article_id={article.id}
              setTrigger={SetShowUpdateArticleForm}
              updateAricleList={getArticle}
            ></EditArticle>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ShowArticle;
