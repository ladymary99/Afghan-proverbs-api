
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./pages/Home";
import AddProverb from "./pages/AddProverb";
import EditProverb from "./pages/EditProverb";
import ProverbDetail from "./pages/ProverbDetail";
import "./style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/add" element={<AddProverb />} />
      <Route path="/edit/:id" element={<EditProverb />} />
      <Route path="/proverb/:id" element={<ProverbDetail />} />
    </Routes>
  </Router>
);
