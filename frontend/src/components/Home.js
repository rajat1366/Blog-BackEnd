import React from "react";
import { NavBar } from "./NavBar";
import { Article } from "./article/Article";
import home from "../images/home-bg.jpg";

export const Home = () => {
  return (

      <div className="container">
          <div margin="100px">
              <img src={home} height="600px" width="100%" />
          </div>
        <Article/>
    </div>
  );
};
