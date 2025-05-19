import React, { useEffect, useState } from "react";
import { getProverbs } from "../api";
import ProverbCard from "../components/ProverbCard";

const Home = () => {
  const [proverbs, setProverbs] = useState([]);

  useEffect(() => {
    getProverbs()
      .then((res) => setProverbs(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Proverbs</h1>
      {proverbs.map((p) => (
        <ProverbCard key={p.id} proverb={p} />
      ))}
    </div>
  );
};

export default Home;
