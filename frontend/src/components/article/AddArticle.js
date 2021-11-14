import React, {Fragment, useEffect,useState,useRef} from "react";
import JoditEditor from "jodit-react";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";

import {TextField} from "@material-ui/core";



const AddArticle=()=>{
    const editor = useRef(null)
    const [content, setContent] = useState('')

    const config = {
        readonly: false
    }

    return(
        <div className={"container"}>
                <h1> HELLO </h1>
            <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => {}}
            />
        </div>
    );
}
export default AddArticle;