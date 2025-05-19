import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getProverb, deleteProverb } from "../api";

const ProverbDetail = () => {
  const { id } = useParams();
  const [proverb, setProverb] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProverb(id)
      .then((res) => setProverb(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this proverb?")) {
      deleteProverb(id).then(() => navigate("/"));
    }
  };

  if (!proverb) return <p>Loading...</p>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">{proverb.translationEn}</h2>
      <p className="text-right font-serif text-xl">{proverb.textDari}</p>
      <p className="text-left font-serif text-xl">{proverb.textPashto}</p>
      <p className="mt-2">Meaning: {proverb.meaning}</p>
      <p>Category: {proverb.category}</p>
      <div className="mt-4 flex gap-4">
        <Link to={`/edit/${id}`} className="text-blue-600">
          Edit
        </Link>
        <button onClick={handleDelete} className="text-red-600">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProverbDetail;
