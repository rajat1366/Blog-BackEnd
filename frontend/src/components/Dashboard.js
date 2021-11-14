import React from "react";
import { NavBarAuth } from "./NavBarAuth";
import { ArticleAuth } from "./ArticleAuth";

export const Dashboard = () => {
  return (
    <div>
      <NavBarAuth />
      <ArticleAuth />
    </div>
  );
};
