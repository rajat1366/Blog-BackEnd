import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { Signup } from "./components/Signup";
import { ViewNot } from "./components/ViewNot";
import { ViewAuth } from "./components/ViewAuth";
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ViewNot/:id" element={<ViewNot />} />
            <Route path="/ViewAuth/:id" element={<ViewAuth />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
