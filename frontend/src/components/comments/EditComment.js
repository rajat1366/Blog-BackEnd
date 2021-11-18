import React, { Fragment, useEffect, useState } from "react";
import "../../css/popup.css";
import axios from "axios";

import {
  Button,
  Card,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

const EditComment = ({
  comment_id,
  trigger,
  setTrigger,
  updateCommentList,
}) => {
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [comment, setComment] = useState({});

  const getComment = () => {
    let params = {};
    const user = JSON.parse(localStorage.getItem("user"));
    params["comment_id"] = comment_id;
    console.log(params);
    axios({
      method: "get",
      url: "/api/comment/FromId" + params.comment_id,

    })
      .then((response) => {
        setComment(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    if (trigger === true) {
      getComment();
    }
  }, [trigger]);
  const handleForm = (e) => {
    setMessage("");
    setSuccessful(false);

    axios
      .put("/api/update/", comment, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("key")}`,
        },
      })
      .then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          updateCommentList();
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
  return trigger ? (
    <div className={"popup"}>
      <div className={"popup-inner"}>
        <Card className="card-style">
          <div className={"container col-md-12"}>
            <button
              onClick={() => {
                setTrigger(false);
                setMessage("");
                setSuccessful(false);
              }}
              className={"close-btn"}
              aria-label="Close"
            >
              {" "}
              <span aria-hidden="true">&times;</span>
            </button>
            <Fragment>
              <h3 className={"text-center my-3"}> Edit you Comment</h3>
              {comment.id && (
                <Form onSubmit={handleForm}>
                  {!successful && (
                    <div>
                      <FormGroup>
                        <Label for={"description"}>Review Description</Label>
                        <Input
                          type={"textarea"}
                          id={"description"}
                          placeholder={"Enter the review description"}
                          style={{ height: 75 }}
                          value={comment.description}
                          required
                          onChange={(e) => {
                            setComment({
                              ...comment,
                              description: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>

                      <Container className={"text-center"}>
                        <Button type="submit" color={"success"}>
                          Edit Comment
                        </Button>
                      </Container>
                    </div>
                  )}
                  {message && (
                    <div className="form-group">
                      <div
                        className={
                          successful
                            ? "alert alert-success"
                            : "alert alert-danger"
                        }
                        role="alert"
                      >
                        {message}
                      </div>
                    </div>
                  )}
                </Form>
              )}
            </Fragment>
          </div>
        </Card>
      </div>
    </div>
  ) : (
    ""
  );
};
export default EditComment;
