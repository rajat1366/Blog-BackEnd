import React, { Fragment, useEffect, useState } from "react";
import "../../css/popup.css";
import axios from "axios";
import ReactQuill from "react-quill";

import {
  Button,
  Card,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export const EditArticle = ({
  article_id,
  trigger,
  setTrigger,
  updateAricleList,
}) => {
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [article, setArticle] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  function handleChange(value) {
    setArticle({ ...article, description: value });
  }

  const getArticle = () => {
    let params = {};

    params["article_id"] = article_id;
    console.log(params);
    axios({
      method: "get",
      url: "/api/article/" + params.article_id,
    })
      .then((response) => {
        setArticle(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    if (trigger === true) {
      getArticle();
    }
  }, [trigger]);
  const handleForm = (e) => {
    setMessage("");
    setSuccessful(false);
    axios
      .put("/api/article/update/" + article_id, article, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          updateAricleList();
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
              <h3 className={"text-center my-3"}> Edit your Article</h3>
              {article.id && (
                <Form onSubmit={handleForm}>
                  {!successful && (
                    <div>
                      <FormGroup>
                        <Label for={"description"}>Article Description</Label>
                        <ReactQuill
                          value={article.description}
                          required
                          onChange={handleChange}
                        />
                      </FormGroup>

                      <Container className={"text-center"}>
                        <Button type="submit" color={"success"}>
                          Edit Article
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
// export default EditArticle;
