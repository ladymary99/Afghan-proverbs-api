import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Save, X, ArrowLeft } from "lucide-react";
import Alert from "../components/Alert";
import { getProverbById, updateProverb } from "../services/api";
import "../styles/ProverbForm.css";

const EditProverb = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    textDari: "",
    textPashto: "",
    translationEn: "",
    meaning: "",
    category: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProverb();
  }, [id]);

  const fetchProverb = async () => {
    try {
      setLoading(true);
      const data = await getProverbById(id);
      setFormData({
        textDari: data.textDari || "",
        textPashto: data.textPashto || "",
        translationEn: data.translationEn || "",
        meaning: data.meaning || "",
        category: data.category || "",
      });
      setLoading(false);
    } catch (err) {
      console.error("Error fetching proverb:", err);
      setError("Failed to load proverb details. Please try again.");
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.textDari.trim()) newErrors.textDari = "Dari text is required";
    if (!formData.textPashto.trim())
      newErrors.textPashto = "Pashto text is required";
    if (!formData.translationEn.trim())
      newErrors.translationEn = "English translation is required";
    if (!formData.meaning.trim()) newErrors.meaning = "Meaning is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setSubmitting(true);
      await updateProverb(id, formData);
      navigate(`/proverbs/${id}`, {
        state: { message: "Proverb updated successfully!" },
      });
    } catch (err) {
      console.error("Error updating proverb:", err);
      setError("Failed to update proverb. Please try again.");
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="container loading">Loading proverb details...</div>;
  }

  return (
    <div className="container">
      <Link to={`/proverbs/${id}`} className="back-button">
        <ArrowLeft size={18} />
        Back to Proverb Details
      </Link>

      <div className="proverb-form-container">
        <div className="proverb-form-header">
          <h2>Edit Proverb</h2>
          <p className="proverb-form-subtitle">
            Update the information for this proverb
          </p>
        </div>

        {error && (
          <Alert type="error" message={error} onClose={() => setError(null)} />
        )}

        <form onSubmit={handleSubmit} className="proverb-form">
          <div className="form-section">
            <h3 className="form-section-title">Original Languages</h3>

            <div className="form-group">
              <label htmlFor="textDari">Dari Text</label>
              <textarea
                id="textDari"
                name="textDari"
                className="form-input-rtl"
                value={formData.textDari}
                onChange={handleChange}
                dir="rtl"
                lang="prs"
                placeholder="Enter the proverb in Dari..."
              />
              {errors.textDari && (
                <p className="error-text">{errors.textDari}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="textPashto">Pashto Text</label>
              <textarea
                id="textPashto"
                name="textPashto"
                className="form-input-rtl"
                value={formData.textPashto}
                onChange={handleChange}
                dir="rtl"
                lang="ps"
                placeholder="Enter the proverb in Pashto..."
              />
              {errors.textPashto && (
                <p className="error-text">{errors.textPashto}</p>
              )}
            </div>
          </div>

          <div className="form-section">
            <h3 className="form-section-title">Translation & Meaning</h3>

            <div className="form-group">
              <label htmlFor="translationEn">English Translation</label>
              <textarea
                id="translationEn"
                name="translationEn"
                value={formData.translationEn}
                onChange={handleChange}
                placeholder="Enter the English translation..."
              />
              {errors.translationEn && (
                <p className="error-text">{errors.translationEn}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="meaning">Meaning & Context</label>
              <textarea
                id="meaning"
                name="meaning"
                value={formData.meaning}
                onChange={handleChange}
                placeholder="Explain the meaning and cultural context..."
              />
              {errors.meaning && <p className="error-text">{errors.meaning}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="E.g., wisdom, friendship, hardship..."
              />
              {errors.category && (
                <p className="error-text">{errors.category}</p>
              )}
            </div>
          </div>

          <div className="form-actions">
            <Link to={`/proverbs/${id}`} className="btn cancel-btn">
              <X size={18} />
              Cancel
            </Link>
            <button
              type="submit"
              className="btn save-btn"
              disabled={submitting}
            >
              <Save size={18} />
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProverb;
