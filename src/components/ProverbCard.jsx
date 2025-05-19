import React from "react";
import { Link } from "react-router-dom";

const ProverbCard = ({ proverb }) => (
  <div className="bg-white p-4 rounded shadow mb-4">
    <h3 className="text-lg font-bold mb-2">{proverb.translationEn}</h3>
    <p className="text-right font-serif text-xl">{proverb.textDari}</p>
    <p className="text-left font-serif text-xl">{proverb.textPashto}</p>
    <span className="text-sm text-gray-600 italic">
      Category: {proverb.category}
    </span>
    <Link
      to={`/proverbs/${proverb.id}`}
      className="block mt-2 text-blue-600 hover:underline"
    >
      View Details
    </Link>
  </div>
);

export default ProverbCard;
