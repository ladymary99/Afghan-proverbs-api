
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [proverbs, setProverbs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/proverbs")
      .then(res => setProverbs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/add">Add Proverb</Link>
      </nav>
      <h1>Afghan Proverbs</h1>
      {proverbs.map(proverb => (
        <div key={proverb.id} className="card">
          <h2>{proverb.translationEn}</h2>
          <p><strong>Dari:</strong> {proverb.textDari}</p>
          <p><strong>Pashto:</strong> {proverb.textPashto}</p>
          <p><strong>Category:</strong> {proverb.category}</p>
          <Link to={`/proverb/${proverb.id}`}><button>View</button></Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
