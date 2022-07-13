import React from "react";
import "./App.css";
import "antd/dist/antd.min.css";

import InputForm from "./components/InputForm";

function App() {
  return (
    <div className="App">
      <div className="login-page">
        <div className="login-box">
          <InputForm />
        </div>
      </div>
    </div>
  );
}

export default App;
