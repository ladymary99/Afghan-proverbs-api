import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RefreshCw, Search, Filter, X, Plus, Sparkles } from "lucide-react";
import ProverbCard from "../components/ProverbCard";
import Alert from "../components/Alert";
import {
  getAllProverbs,
  deleteProverb,
  getRandomProverb,
} from "../services/api";
import "../styles/Home.css";

const Home = () => {
  const [proverbs, setProverbs] = useState([]);
  const [filteredProverbs, setFilteredProverbs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [categories, setCategories] = useState([]);
  const [randomProverb, setRandomProverb] = useState(null);
  const [randomLoading, setRandomLoading] = useState(false);

  useEffect(() => {
    fetchProverbs();
    fetchRandomProverb();
  }, []);

  const fetchProverbs = async () => {
    try {
      setLoading(true);
      const data = await getAllProverbs();
      setProverbs(data);
      setFilteredProverbs(data);

      // Extract unique categories
      const uniqueCategories = [
        ...new Set(data.map((proverb) => proverb.category)),
      ];
      setCategories(uniqueCategories);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching proverbs:", err);
      setError("Failed to load proverbs. Please try again later.");
      setLoading(false);
    }
  };

  const fetchRandomProverb = async () => {
    try {
      setRandomLoading(true);
      const data = await getRandomProverb();
      setRandomProverb(data);
      setRandomLoading(false);
    } catch (err) {
      console.error("Error fetching random proverb:", err);
      setRandomLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProverb(id);
      setProverbs(proverbs.filter((proverb) => proverb.id !== id));
      setFilteredProverbs(
        filteredProverbs.filter((proverb) => proverb.id !== id)
      );
      setError({
        type: "success",
        message: "Proverb deleted successfully!",
      });
      setTimeout(() => setError(null), 3000);
    } catch (err) {
      console.error("Error deleting proverb:", err);
      setError({
        type: "error",
        message: "Failed to delete proverb. Please try again.",
      });
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterProverbs(value, categoryFilter);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategoryFilter(value);
    filterProverbs(searchTerm, value);
  };

  const filterProverbs = (search, category) => {
    let filtered = proverbs;

    if (category) {
      filtered = filtered.filter((proverb) => proverb.category === category);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (proverb) =>
          proverb.textDari.toLowerCase().includes(searchLower) ||
          proverb.textPashto.toLowerCase().includes(searchLower) ||
          proverb.translationEn.toLowerCase().includes(searchLower) ||
          proverb.meaning?.toLowerCase().includes(searchLower)
      );
    }

    setFilteredProverbs(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("");
    setFilteredProverbs(proverbs);
  };

  return (
    <div className="home-container container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Afghan Proverbs & Sayings</h1>
          <p className="hero-subtitle">
            Discover the wisdom and cultural richness of Afghanistan through its
            proverbs and sayings.
          </p>
          <Link to="/add" className="hero-btn">
            Add New Proverb
            <Plus size={18} />
          </Link>
        </div>
      </div>

      {/* Alert Messages */}
      {error && (
        <Alert
          type={error.type || "error"}
          message={error.message}
          onClose={() => setError(null)}
        />
      )}

      {/* Random Proverb Section */}
      <div className="random-proverb">
        <div className="random-proverb-header">
          <h3>
            <Sparkles size={20} />
            Proverb of the Day
          </h3>
          <button
            className="refresh-btn"
            onClick={fetchRandomProverb}
            disabled={randomLoading}
          >
            <RefreshCw size={16} className={randomLoading ? "spin" : ""} />
            Refresh
          </button>
        </div>

        {randomLoading ? (
          <div className="loading">Loading random proverb...</div>
        ) : randomProverb ? (
          <div>
            <p className="dari-text" dir="rtl" lang="prs">
              {randomProverb.textDari}
            </p>
            <p className="english-text" style={{ marginTop: "0.75rem" }}>
              {randomProverb.translationEn}
            </p>
            <Link
              to={`/proverbs/${randomProverb.id}`}
              style={{ marginTop: "0.75rem", display: "inline-block" }}
            >
              View Details
            </Link>
          </div>
        ) : (
          <p>No random proverb available.</p>
        )}
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="filters-header">
          <h3>
            <Filter size={18} />
            Filter Proverbs
          </h3>
          {(searchTerm || categoryFilter) && (
            <button className="clear-filters" onClick={clearFilters}>
              <X size={16} />
              Clear Filters
            </button>
          )}
        </div>

        <div className="filters-content">
          <div className="filter-group search-input">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search in any language..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="filter-group category-filter">
            <select
              value={categoryFilter}
              onChange={handleCategoryChange}
              aria-label="Filter by category"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Proverbs Grid */}
      {loading ? (
        <div className="loading">Loading proverbs...</div>
      ) : filteredProverbs.length > 0 ? (
        <div className="proverbs-grid">
          {filteredProverbs.map((proverb) => (
            <ProverbCard
              key={proverb.id}
              proverb={proverb}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <h3>No proverbs found</h3>
          <p>Try clearing filters or add a new proverb.</p>
          <Link
            to="/add"
            className="btn btn-primary"
            style={{ marginTop: "1rem" }}
          >
            Add New Proverb
          </Link>
        </div>
      )}

      {/* Floating Add Button */}
      <Link to="/add" className="add-new-btn">
        <Plus size={24} />
      </Link>
    </div>
  );
};

export default Home;
