import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProverb } from "../api";

const AddProverb = () => {
  const [form, setForm] = useState({
    textDari: "",
    textPashto: "",
    translationEn: "",
    meaning: "",
    category: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(form).some((v) => !v))
      return alert("Please fill all fields");
    createProverb(form).then(() => navigate("/"));
  };

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
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Proverb
      </button>
    </form>
  );
};

export default AddProverb;
