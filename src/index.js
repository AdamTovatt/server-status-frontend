import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./Components/Pages/StartPage";
import BetapetStartPage from "./Components/Pages/BetapetStartPage";
import ChatPage from "./Components/Pages/ChatPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<StartPage />}></Route>
      <Route path="/betapet" element={<BetapetStartPage />}></Route>
      <Route path="/chat" element={<ChatPage />}></Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
