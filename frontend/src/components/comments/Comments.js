import React, { useEffect, useState } from "react";
import { Button, Comment, Form, Header, Message } from "semantic-ui-react";

import axios from "axios";
import EditComment from "./EditComment";

export const Comments = (rating_id) => {
  const user = localStorage.getItem("key");
  console.log(user);
  const initialCommentState = {
    article_id: rating_id.rating_id,
    description: "",
  };
  const [showComments, SetShowComments] = useState([]);

  const [comment, setComment] = useState(initialCommentState);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [showUpdateCommentForm, SetShowUpdateCommentForm] = useState(false);
  const [selectedComment, setSelectedComment] = useState([]);

  const userIcons = [
    "https://react.semantic-ui.com/images/avatar/small/matt.jpg",
    "https://react.semantic-ui.com/images/avatar/small/elliot.jpg",
    "https://react.semantic-ui.com/images/avatar/small/jenny.jpg",
    "https://react.semantic-ui.com/images/avatar/small/joe.jpg",
  ];
  const retrieveComments = () => {
    let params = {};
    params["rating_id"] = rating_id.rating_id;
    console.log(params);
    axios({
      method: "get",
      url: "/api/comment/" + params.rating_id,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("key")}`,
      },
    })
      .then((response) => {
        SetShowComments(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    retrieveComments();
  }, []);
  const handleForm = (e) => {
    setMessage("");
    setSuccessful(false);
    console.log(comment);

    axios({
      method: "post",
      url: "/api/comment/add",
      data: comment,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("key")}`,
      },
    }).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
        Array.from(document.querySelectorAll("textarea")).forEach(
          (input) => (input.value = "")
        );
        retrieveComments();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );

    e.preventDefault();
  };
  const handleEditButtonEvent = (event) => {
    console.log(event.target.value);
    setSelectedComment(event.target.value);
    SetShowUpdateCommentForm(true);
  };
  return (
    <div>
      <Comment.Group className={"container"}>
        <Header as="h3" dividing>
          Comments
        </Header>
        {showComments &&
          showComments.map((item) => (
            <Comment key={item.articleId}>
              <Comment.Avatar src={userIcons[item.articleId % 4]} />
              <Comment.Content>
                <Comment.Author as="a">{item.userName}</Comment.Author>
                <Comment.Text>{item.description}</Comment.Text>
                <Comment.Actions>
                  {/*<Comment.Action>Reply</Comment.Action>*/}
                  {user != undefined && user.id === item.userId ? (
                    <Comment.Action>
                      <Button
                        size="small"
                        value={item.id}
                        onClick={handleEditButtonEvent}
                      >
                        Edit
                      </Button>
                    </Comment.Action>
                  ) : (
                    ""
                  )}
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          ))}

        {message &&
          (successful ? (
            <Message positive>
              <Message.Header>{message}</Message.Header>
            </Message>
          ) : (
            <Message negative>
              <Message.Header>{message}</Message.Header>
            </Message>
          ))}
        {user != null ? (
          <Form onSubmit={handleForm} reply>
            <Form.TextArea
              id={"description"}
              placeholder={"Enter the comment"}
              required
              style={{ height: "auto" }}
              rows={3}
              onChange={(e) => {
                setComment({ ...comment, description: e.target.value });
              }}
            />

            <Button
              type="submit"
              content="Add Comment"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        ) : (
          "Please login to write a comment"
        )}
      </Comment.Group>
      <div>
        {user ? (
          <div>
            <EditComment
              trigger={showUpdateCommentForm}
              comment_id={selectedComment}
              setTrigger={SetShowUpdateCommentForm}
              updateCommentList={retrieveComments}
            ></EditComment>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
