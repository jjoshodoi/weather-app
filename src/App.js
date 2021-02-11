import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import SearchBar from "./components/search";

function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  return (
    <div className="App">
      <SearchBar API_KEY={API_KEY} />
      
    </div>
  );
}

export default App;
