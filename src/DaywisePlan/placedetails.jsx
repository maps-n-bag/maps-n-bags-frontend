import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import axios from "axios";
import { supabase } from "../Supabase/supabase";
import SideBar from "../App drawer/sideBar";
import ShowReview from "./showreview";
import { useThemeContext } from "../ThemeContext";
import { PLACE_PLACEHOLDER } from "../utils/placeholders";

const baseURL = import.meta.env.VITE_BASE_URL;

const PlaceDetails = () => {
  const { place_id } = useParams();
  const { theme, toggleThemeMode } = useThemeContext();
  const { handleSubmit } = useForm();

  const [place, setPlace] = useState(null);
  const [newReview, setNewReview] = useState({ comment: "", images: [] });
  const [addReview, setAddReview] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [uploading, setUploading] = useState(false);

  const directory = `review-images/place-${place_id}/`;

  useEffect(() => {
    axios
      .get(`${baseURL}public/place?id=${place_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      })
      .then((resp) => setPlace(resp.data))
      .catch(console.error);
  }, [place_id]);

  const handleImageChange = async (e) => {
    const image = e.target.files[0];
    if (!image) return;
    setUploading(true);
    const filePath = `${directory}${v4()}`;
    const { error } = await supabase.storage
      .from("images")
      .upload(filePath, image, { contentType: image.type });
    if (error) { console.error(error); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("images").getPublicUrl(filePath);
    setNewReview((prev) => ({ ...prev, images: [publicUrl] }));
    setUploading(false);
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    const payload = {
      ...newReview,
      user_id: localStorage.getItem("userId"),
    };
    axios
      .post(`${baseURL}public/place/review?place_id=${place_id}`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      })
      .then(() => {
        setAddReview(false);
        window.location.reload();
      })
      .catch(console.error);
  };

  return (
    <div className="min-h-screen bg-surface dark:bg-[#100e07] text-on-surface dark:text-[#fff9eb]">
      <SideBar theme={theme} toggleTheme={toggleThemeMode} />

      <main className="pt-24 pb-20 px-6 md:px-12 max-w-5xl mx-auto">
        {!place ? (
          <div className="flex items-center justify-center py-32 text-on-surface-variant text-sm italic">
            Loading place details…
          </div>
        ) : (
          <>
            {/* Hero */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="rounded-2xl overflow-hidden bg-surface-container aspect-[4/3]">
                <img
                  src={place.images || PLACE_PLACEHOLDER}
                  alt={place.title}
                  onError={(e) => { e.target.src = PLACE_PLACEHOLDER; }}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">
                  Place Details
                </p>
                <h1
                  className="text-4xl md:text-5xl font-light tracking-tight leading-none mb-4"
                  style={{ fontFamily: "'Newsreader', serif" }}
                >
                  {place.title}
                </h1>

                <div className="space-y-2 text-sm text-on-surface-variant mb-6">
                  {place.description && (
                    <p className="text-on-surface leading-relaxed">{place.description}</p>
                  )}
                  {place.address && <p>📍 {place.address}</p>}
                  {place.region_name && <p>🗺️ {place.region_name}</p>}
                  {place.contact && <p>📞 {place.contact}</p>}
                  {place.website && (
                    <a
                      href={place.website}
                      target="_blank"
                      rel="noreferrer"
                      className="block text-primary hover:underline"
                    >
                      🌐 {place.website}
                    </a>
                  )}
                  <p>⭐ {place.rating}/5.0 · {place.rating_count} votes</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setShowReviews(!showReviews)}
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-4 py-2 border border-outline/30 rounded-full hover:border-primary hover:text-primary transition-colors"
                  >
                    {showReviews ? "Hide Reviews" : "Show Reviews"}
                  </button>
                  <button
                    onClick={() => setAddReview(!addReview)}
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-primary text-on-primary rounded-full hover:opacity-90 transition-colors"
                  >
                    {addReview ? "Cancel" : "Write a Review"}
                  </button>
                </div>
              </div>
            </div>

            {/* Add Review Form */}
            {addReview && (
              <div className="mb-8 rounded-2xl bg-surface-container border border-outline/10 p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-4">Your Review</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <textarea
                    className="w-full bg-surface border border-outline/30 rounded-xl px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary resize-none mb-4"
                    rows={3}
                    placeholder="Share your experience…"
                    value={newReview.comment}
                    onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
                  />
                  <div className="flex items-center gap-3 flex-wrap">
                    <label className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-4 py-2 border border-outline/30 rounded-full hover:border-primary hover:text-primary transition-colors cursor-pointer">
                      {uploading ? "Uploading…" : "📷 Upload Photo"}
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                    {newReview.images[0] && (
                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-outline/20">
                        <img src={newReview.images[0]} className="w-full h-full object-cover" alt="preview" />
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={uploading}
                      className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-5 py-2 bg-primary text-on-primary rounded-full hover:opacity-90 transition-colors disabled:opacity-50"
                    >
                      Save Review
                    </button>
                  </div>
                </form>
              </div>
            )}

            {showReviews && <ShowReview place_id={place_id} />}
          </>
        )}
      </main>
    </div>
  );
};

export default PlaceDetails;
