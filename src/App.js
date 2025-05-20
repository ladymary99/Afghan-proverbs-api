import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProverbDetail from "./pages/ProverbDetail";
import AddProverb from "./pages/AddProverb";
import EditProverb from "./pages/EditProverb";
import "./styles/index.css";

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proverbs/:id" element={<ProverbDetail />} />
          <Route path="/add" element={<AddProverb />} />
          <Route path="/edit/:id" element={<EditProverb />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
