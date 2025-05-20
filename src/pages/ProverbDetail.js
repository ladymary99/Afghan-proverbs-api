import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Edit,
  Trash,
  ArrowLeft,
  Languages,
  Book,
  HeartHandshake,
} from "lucide-react";
import Alert from "../components/Alert";
import { getProverbById, deleteProverb } from "../services/api";
import "../styles/ProverbDetail.css";

const ProverbDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [proverb, setProverb] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProverb();
  }, [id]);

  const fetchProverb = async () => {
    try {
      setLoading(true);
      const data = await getProverbById(id);
      setProverb(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching proverb:", err);
      setError("Failed to load proverb details. Please try again.");
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this proverb?")) {
      try {
        await deleteProverb(id);
        navigate("/", { state: { message: "Proverb deleted successfully!" } });
      } catch (err) {
        console.error("Error deleting proverb:", err);
        setError("Failed to delete proverb. Please try again.");
      }
    }
  };

  if (loading) {
    return <div className="container loading">Loading proverb details...</div>;
  }

  if (error) {
    return (
      <div className="container" style={{ marginTop: "2rem" }}>
        <Alert type="error" message={error} />
        <Link to="/" className="back-button">
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    );
  }

  if (!proverb) {
    return (
      <div className="container" style={{ marginTop: "2rem" }}>
        <Alert type="error" message="Proverb not found." />
        <Link to="/" className="back-button">
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <Link to="/" className="back-button">
        <ArrowLeft size={18} />
        Back to All Proverbs
      </Link>

      <div className="proverb-detail">
        <div className="proverb-detail-header">
          <h2>Proverb Details</h2>
          <span className="proverb-detail-badge">{proverb.category}</span>

          <div className="proverb-detail-actions">
            <Link
              to={`/edit/${proverb.id}`}
              className="detail-action-btn edit"
              title="Edit proverb"
            >
              <Edit size={20} />
            </Link>
            <button
              onClick={handleDelete}
              className="detail-action-btn delete"
              title="Delete proverb"
            >
              <Trash size={20} />
            </button>
          </div>
        </div>

        <div className="proverb-detail-body">
          <div className="proverb-detail-section">
            <h3>Languages</h3>
            <div className="proverb-detail-languages">
              <div className="language-card">
                <h4>
                  <Languages size={20} />
                  Dari
                </h4>
                <p className="dari-text" lang="prs">
                  {proverb.textDari}
                </p>
              </div>

              <div className="language-card">
                <h4>
                  <Languages size={20} />
                  Pashto
                </h4>
                <p className="pashto-text" lang="ps">
                  {proverb.textPashto}
                </p>
              </div>

              <div className="language-card">
                <h4>
                  <Book size={20} />
                  English Translation
                </h4>
                <p className="english-text">{proverb.translationEn}</p>
              </div>
            </div>
          </div>

          <div className="proverb-detail-section">
            <h3>Meaning</h3>
            <div className="language-card">
              <h4>
                <HeartHandshake size={20} />
                Cultural Context & Meaning
              </h4>
              <p className="meaning-text">{proverb.meaning}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProverbDetail;
