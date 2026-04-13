import React from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";

import { supabase } from "../Supabase/supabase";

import * as dateformat from "../formatDate";

const PlanCard = ({ plan, togglePublic, deletePlan, editPlan }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [planDetails, setPlanDetails] = React.useState(plan);
  const [hovered, setHovered] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);

  const handlePlanImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;
    setUploading(true);
    const filePath = `plan-images/${v4()}`;
    const { error } = await supabase.storage
      .from("images")
      .upload(filePath, image, { contentType: image.type });
    if (error) {
      console.error(error);
      setUploading(false);
      return;
    }
    const { data: { publicUrl } } = supabase.storage.from("images").getPublicUrl(filePath);
    setPlanDetails((prev) => ({ ...prev, image: publicUrl }));
    setUploading(false);
  };

  const handleSave = () => {
    setIsEditing(false);
    editPlan(planDetails);
  };

  return (
    <div className="flex gap-5 p-4 bg-surface-container-low rounded-xl group hover:bg-surface-container transition-colors duration-200">
      {/* Thumbnail */}
      <div
        className="relative w-28 h-28 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={planDetails.image}
          alt={planDetails.title}
          className={`w-full h-full object-cover transition-all duration-300 ${hovered ? "opacity-40 scale-105" : ""}`}
        />
        {hovered && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
            <label className="cursor-pointer bg-primary text-on-primary text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded hover:bg-primary-dim transition-colors">
              {uploading ? "Uploading…" : "Change"}
              <input type="file" accept="image/*" className="hidden" onChange={handlePlanImageUpload} />
            </label>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex justify-between items-start gap-2">
            {isEditing ? (
              <input
                className="flex-1 bg-surface-container border border-outline/30 focus:border-primary rounded px-2 py-1 text-sm font-headline text-on-surface outline-none"
                value={planDetails.title}
                onChange={(e) => setPlanDetails((p) => ({ ...p, title: e.target.value }))}
                onBlur={handleSave}
                autoFocus
              />
            ) : (
              <Link to={`/FullTour/${planDetails.id}`} className="no-underline">
                <h4 className="font-headline text-lg leading-snug text-on-surface hover:text-primary transition-colors">
                  {planDetails.title}
                </h4>
              </Link>
            )}
            <button
              onClick={() => setIsEditing((v) => !v)}
              className="text-on-surface-variant hover:text-primary transition-colors flex-shrink-0"
              title="Edit plan"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isEditing ? "close" : "edit"}
              </span>
            </button>
          </div>

          {isEditing ? (
            <textarea
              className="mt-1 w-full bg-surface-container border border-outline/30 focus:border-primary rounded px-2 py-1 text-xs text-on-surface-variant outline-none resize-none"
              rows={2}
              value={planDetails.description}
              onChange={(e) => setPlanDetails((p) => ({ ...p, description: e.target.value }))}
              onBlur={handleSave}
            />
          ) : (
            <p className="text-xs text-on-surface-variant mt-0.5 line-clamp-2 italic">
              {planDetails.description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
          {/* Dates */}
          <span className="text-[10px] text-on-surface-variant">
            {dateformat.formatDate(planDetails.start_date)} — {dateformat.formatDate(planDetails.end_date)}
          </span>

          <div className="flex items-center gap-2">
            {/* Public toggle */}
            <button
              onClick={() => {
                setPlanDetails((p) => ({ ...p, public: !p.public }));
                togglePublic(planDetails.id);
              }}
              className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded border transition-colors ${
                planDetails.public
                  ? "border-tertiary text-tertiary bg-tertiary-container/30"
                  : "border-outline/40 text-on-surface-variant"
              }`}
            >
              {planDetails.public ? "Public" : "Private"}
            </button>

            {/* View Blog */}
            <a
              href={`/Blog/${planDetails.id}`}
              className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-primary text-on-primary hover:bg-primary-dim transition-colors no-underline"
            >
              Blog
            </a>

            {/* Delete */}
            <button
              onClick={() => deletePlan(planDetails.id)}
              className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-error/40 text-error hover:bg-error/10 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
