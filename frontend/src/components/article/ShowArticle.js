import React, { useState, useEffect  } from "react";
import {useParams} from "react-router-dom";
import Axios from "axios";
import {Card, CardSubtitle, Button} from "reactstrap";
import {Comments} from "../comments/Comments";
import {Comment} from "semantic-ui-react";


const ShowArticle = props => {

    const { id } = useParams();
    const initialAritcleState = {
        id: null,
        title: "",
        description: "",
        dateTime:""
    };

    const [article, setArticle] = useState([initialAritcleState]);
    useEffect(()=> {
        getArticle(id);
        getArticleComments(id);
    },[]);
    const getArticle = id => {
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
    const getArticleComments = id => {
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
    }


    return(
        <div  style={{ margin:'2em'}}>
            <Comment.Group className={"container"}>
                <div  style={{ width: '100%' }}>
                    <div className="row">
                        <div >
                            <h3> {article.title} </h3>
                            {/*<div>Launch year - {article.launchDate.substring(0,4)} </div>*/}
                            <br></br>
                        </div>
                        <div className="col-sm">

                        </div>
                    </div>


                    <p> {article.description}</p>
                </div>
                <div>
                    <Comments article_id={id} />
                </div>
            </Comment.Group>
        </div>
    );
}

export default ShowArticle;