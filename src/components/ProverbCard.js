import React from "react";
import { Link } from "react-router-dom";
import { Edit, Trash, ExternalLink } from "lucide-react";
import "../styles/ProverbCard.css";

const ProverbCard = ({ proverb, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this proverb?")) {
      onDelete(proverb.id);
    }
  };

  return (
    <div className="proverb-card">
      <div className="proverb-card-header">
        <span className="proverb-card-category">{proverb.category}</span>
        <div className="proverb-card-actions">
          <Link
            to={`/edit/${proverb.id}`}
            className="action-btn edit"
            title="Edit proverb"
          >
            <Edit size={18} />
          </Link>
          <button
            onClick={handleDelete}
            className="action-btn delete"
            title="Delete proverb"
          >
            <Trash size={18} />
          </button>
        </div>
      </div>

      <div className="proverb-card-body">
        <p className="proverb-card-dari" dir="rtl" lang="prs">
          {proverb.textDari}
        </p>
        <p className="proverb-card-pashto" dir="rtl" lang="ps">
          {proverb.textPashto}
        </p>
        <p className="proverb-card-english">{proverb.translationEn}</p>
      </div>

      <div className="proverb-card-footer">
        <Link to={`/proverbs/${proverb.id}`} className="view-details-btn">
          <span>View Details</span>
          <ExternalLink size={16} />
        </Link>
      </div>
    </div>
  );
};

export default ProverbCard;
