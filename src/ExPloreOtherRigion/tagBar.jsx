import React from "react";

const TagBar = ({ tags, setTags, regions, setRegions }) => {
  const toggleRegion = (id) => {
    setRegions((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isShow: !r.isShow } : r))
    );
  };

  const toggleTag = (id) => {
    setTags((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isShow: !t.isShow } : t))
    );
  };

  return (
    <div className="space-y-5">
      {regions && (
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-3">Regions</p>
          <div className="space-y-1.5">
            {regions.map((region) => (
              <label
                key={region.id}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <div
                  onClick={() => toggleRegion(region.id)}
                  className={`w-8 h-4 rounded-full transition-colors flex-shrink-0 cursor-pointer ${
                    region.isShow ? "bg-primary" : "bg-outline/30"
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-full bg-white shadow transition-transform mt-0.25 ${
                      region.isShow ? "translate-x-[18px]" : "translate-x-0.5"
                    }`}
                    style={{ marginTop: "1px" }}
                  />
                </div>
                <span className="text-xs text-on-surface group-hover:text-primary transition-colors">
                  {region.name}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-3">Tags</p>
        <div className="space-y-1.5">
          {tags.map((tag) => (
            <label
              key={tag.id}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div
                onClick={() => toggleTag(tag.id)}
                className={`w-8 h-4 rounded-full transition-colors flex-shrink-0 cursor-pointer ${
                  tag.isShow ? "bg-primary" : "bg-outline/30"
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full bg-white shadow transition-transform ${
                    tag.isShow ? "translate-x-[18px]" : "translate-x-0.5"
                  }`}
                  style={{ marginTop: "1px" }}
                />
              </div>
              <span className="text-xs text-on-surface group-hover:text-primary transition-colors">
                {tag.name}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagBar;
