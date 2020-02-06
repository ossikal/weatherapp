import React from 'react';
import './App.css';
import Header from "./components/Header";
import Content from "./components/Content";

function App() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="App">
        <Content />
      </div>
    </div>
  );
}

export default App;
