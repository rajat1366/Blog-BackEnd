import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { Signup } from "./components/Signup";
import { ViewNot } from "./components/ViewNot";
import { ViewAuth } from "./components/ViewAuth";
import {NavBar} from "./components/NavBar";
import ShowArticle from "./components/article/ShowArticle";
import AddArticle from "./components/article/AddArticle";
import 'semantic-ui-css/semantic.min.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/article/:id" element={<ShowArticle />} />
            <Route path="/addArticle/" element={<AddArticle />} />
            {/*<Route path="/dashboard" element={<Dashboard />} />*/}

            {/*<Route path="/ViewNot/:id" element={<ViewNot />} />*/}
            {/*<Route path="/ViewAuth/:id" element={<ViewAuth />} />*/}
          </Routes>
        </div>
      </Router>
    );

  }
}

export default App;
