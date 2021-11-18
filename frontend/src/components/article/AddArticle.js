import React, {Fragment, useEffect,useState,useRef} from "react";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import ReactQuill from 'react-quill';
import {TextField} from "@material-ui/core";
import {Link, Navigate} from "react-router-dom";
import 'react-quill/dist/quill.snow.css';
import axios from "axios";



const AddArticle=()=>{

    const user = JSON.parse(localStorage.getItem("user"));
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const initialArticleState = {
        title:"",
        description: "",
    };
    const[article,setArticle] = useState(initialArticleState);
    // const [content, setContent] = useState('');
    // const [title , setTitle] = useState('');

    function handleChange(value) {

        setArticle({...article,description:value});
    }

    const handleForm = (e) =>{
        console.log(article);


        setSuccessful(false);
        if(article.description === "<p><br></p>" || article.description == ""){
            setMessage("Fill all fields");
        } else {
            console.log(article);
            axios.post( "/api/article/add", article,
                {headers: {Authorization: 'Bearer ' + user.accessToken}}).then(
                            (response) => {
                                setMessage(response.data.message);
                                setSuccessful(true);
                                Array.from(document.querySelectorAll("input")).forEach(
                                    input => (input.value = "")
                                );
                                setArticle(initialArticleState);
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
        }


        e.preventDefault();
    };

    return(
        <div>
            {user ? (

                <div className={"container"}>
                    <h1> Add Article </h1>



                    <Form onSubmit={handleForm}>

                        <FormGroup>
                            <Label for={"name"}>Article Title</Label>
                            <Input type={"text"} placeholder={"Enter Here"}  id={"title"}
                                   required

                                   onChange={(e)=>{
                                       setArticle({...article,title:e.target.value});
                                   }}
                            />
                        </FormGroup>
                        <ReactQuill value={article.description}
                                    onChange={handleChange} />
                        <br/>
                        <Container className={"text-left"}>
                            <Button type="submit" color={"success"}>Add Article</Button>
                        </Container>

                    </Form>
                    {message && (
                        <div className="form-group">
                            <div
                                className={ successful ? "alert alert-success" : "alert alert-danger" }
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <Navigate to={"/"}></Navigate>
            )}
        </div>

    );
}
export default AddArticle;