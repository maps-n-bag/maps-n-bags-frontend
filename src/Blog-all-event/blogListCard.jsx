import React from "react";
import { Link } from "react-router-dom";
import * as dateformat from "../formatDate";

const baseURL = import.meta.env.VITE_BASE_URL;

const BloglistCard = ({ item }) => {
  const startDate = dateformat.formatDate(item.start_date);
  const endDate = dateformat.formatDate(item.end_date);

  return (
    <div className="flex gap-5 p-4 bg-surface-container-low rounded-xl hover:bg-surface-container transition-colors duration-200 group">
      {/* Thumbnail */}
      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <Link to={`/Blog/${item.id}`} className="no-underline">
            <h4 className="font-headline text-lg leading-snug text-on-surface hover:text-primary transition-colors line-clamp-1">
              {item.title}
            </h4>
          </Link>
          <p className="text-xs text-on-surface-variant mt-0.5 italic line-clamp-2">{item.description}</p>
        </div>
        <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
          <span className="text-[10px] text-on-surface-variant">
            {startDate} — {endDate}
          </span>
          <div className="flex gap-2">
            <a
              href={`/FullTour/${item.id}`}
              className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-outline/30 text-on-surface-variant hover:border-primary hover:text-primary transition-colors no-underline"
            >
              Plan
            </a>
            <a
              href={`/ShareBlog/${item.id}/false`}
              className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-primary text-on-primary hover:bg-primary-dim transition-colors no-underline"
            >
              Blog
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloglistCard;
