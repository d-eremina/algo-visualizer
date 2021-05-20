import './Styles/App.css';
import React, {Component} from "react";
import {BrowserRouter} from "react-router-dom";
import Main from "./Components/MainComponent";

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div className="col-12" style={{marginBottom: '10px'}}>
            <Main/>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
