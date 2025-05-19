import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProverbDetail from "./pages/ProverbDetail";
import AddProverb from "./pages/AddProverb";
import EditProverb from "./pages/EditProverb";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4 max-w-4xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proverbs/:id" element={<ProverbDetail />} />
          <Route path="/add" element={<AddProverb />} />
          <Route path="/edit/:id" element={<EditProverb />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
