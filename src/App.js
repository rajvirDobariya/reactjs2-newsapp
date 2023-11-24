import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default class App extends Component {
  pageSize=30;
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <Routes>
          <Route exact key='general-route' path="/" element={<News key='general-route' pageSize={this.pageSize} country="in" category="general"/>}></Route>
          <Route exact key='general-route' path="/general" element={<News key='general-route' pageSize={this.pageSize} country="in" category="general"/>}></Route>
          <Route exact key='business-route' path="/business" element={<News key='business-route' pageSize={this.pageSize} country="in" category="business"/>}></Route>          
          <Route exact key='entertainment-route' path="/entertainment" element={<News key='entertainment-route' pageSize={this.pageSize} country="in" category="entertainment"/>}></Route>
          <Route exact key='generalhealth-route' path="/generalhealth" element={<News key='generalhealth-route' pageSize={this.pageSize} country="in" category="generalhealth"/>}></Route>
          <Route exact key='science-route' path="/science" element={<News key='science-route' pageSize={this.pageSize} country="in" category="science"/>}></Route>
          <Route exact key='sports-route' path="/sports" element={<News key='sports-route' pageSize={this.pageSize} country="in" category="sports"/>}></Route>
          <Route exact key='technology-route' path="/technology" element={<News key='technology-route' pageSize={this.pageSize} country="in" category="technology"/>}></Route>

          </Routes>
        </Router>
      </>
    );
  }
}
