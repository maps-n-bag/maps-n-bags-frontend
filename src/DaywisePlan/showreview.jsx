import React, { useEffect, useState } from "react";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const ShowReview = ({ place_id }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}public/place/review?place_id=${place_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      })
      .then((resp) => setReviews(resp.data))
      .catch(console.error);
  }, [place_id]);

  if (!reviews.length) {
    return (
      <div className="text-center py-8 text-on-surface-variant text-sm italic">
        No reviews yet.
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Reviews</p>
      {reviews.map((review, idx) => (
        <div key={idx} className="rounded-xl bg-surface-container border border-outline/10 p-4">
          <p className="text-sm font-bold text-on-surface mb-2">
            💬 <span className="text-primary">{review.username}</span>
          </p>
          {review.images?.length > 0 && (
            <div className="flex gap-2 mb-3 flex-wrap">
              {review.images.map((img, i) => (
                <div key={i} className="w-20 h-20 rounded-lg overflow-hidden bg-surface">
                  <img src={img} alt="review" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
          <p className="text-sm text-on-surface-variant">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ShowReview;
