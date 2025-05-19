import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProverb, updateProverb } from "../api";

const EditProverb = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProverb(id).then((res) => setForm(res.data));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(form).some((v) => !v))
      return alert("Please fill all fields");
    updateProverb(id, form).then(() => navigate(`/proverbs/${id}`));
  };

  if (!form) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {["textDari", "textPashto", "translationEn", "meaning", "category"].map(
        (field) => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field}
            className="w-full border p-2 rounded"
          />
        )
      )}
      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Update Proverb
      </button>
    </form>
  );
};

export default EditProverb;
