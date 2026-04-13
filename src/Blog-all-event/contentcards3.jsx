import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { v4 } from "uuid";
import { supabase } from "../Supabase/supabase";
import PlaceCard from "./placecard4";
import * as timeformat from "../formatTime";

const baseURL = import.meta.env.VITE_BASE_URL;

const ContentCards = (props) => {
  const eventID = props.item.event.id;
  const planId = props.item.event.plan_id;
  const directory = `blog-images/plan-${planId}/event-${eventID}/`;

  const [inputError, setInputError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [itemBasic, setItemBasic] = useState({});
  const { handleSubmit } = useForm();

  useEffect(() => {
    axios
      .get(`${baseURL}event/detail?event_id=${eventID}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      })
      .then((resp) => setItemBasic(resp.data))
      .catch(console.error);
  }, [isEditing]);

  const handleImageChange = async (e) => {
    const image = e.target.files[0];
    if (!image || !image.type.startsWith("image/")) return;
    const idx = parseInt(e.target.dataset.id);
    const filePath = `${directory}${v4()}`;
    const { error } = await supabase.storage
      .from("images")
      .upload(filePath, image, { contentType: image.type });
    if (error) { console.error(error); return; }
    const { data: { publicUrl } } = supabase.storage.from("images").getPublicUrl(filePath);
    setItemBasic((prev) => {
      const imgs = [...prev.images];
      imgs[idx] = publicUrl;
      return { ...prev, images: imgs };
    });
  };

  const handleRemoveImage = async (imageUrl, idx) => {
    // Extract path from public URL
    try {
      const url = new URL(imageUrl);
      const parts = url.pathname.split("/object/public/images/");
      if (parts[1]) {
        await supabase.storage.from("images").remove([parts[1]]);
      }
    } catch (e) { console.error(e); }
    setItemBasic((prev) => {
      const imgs = prev.images.filter((_, i) => i !== idx);
      return { ...prev, images: imgs };
    });
  };

  const handleAddImage = () => {
    setItemBasic((prev) => ({ ...prev, images: [...(prev.images || []), null] }));
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    const payload = { ...itemBasic, checked: true };
    if (data.note) payload.note = data.note;
    if (data.generated_details) payload.generated_details = data.generated_details;
    if (data.expenditure) payload.expenditure = parseFloat(data.expenditure);
    payload.images = (payload.images || []).filter(Boolean);
    axios
      .put(`${baseURL}event/detail?event_id=${eventID}`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      })
      .then(() => setIsEditing(false))
      .catch(console.error);
  };

  if (!itemBasic.images) return null;

  const card = props.item;

  return (
    <div className="rounded-2xl bg-surface-container border border-outline/10 overflow-hidden mb-4">
      {/* Event header */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-outline/10">
        <span className="material-symbols-outlined text-primary text-[18px]">schedule</span>
        <span className="text-xs font-mono text-on-surface-variant">
          {timeformat.formatTime(card.event.start_time)} – {timeformat.formatTime(card.event.end_time)}
        </span>
        <div className="flex-1">
          <PlaceCard item={card.event.place_id} activity={card.event.activity} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block mb-1">
                  How was your day?
                </label>
                <input
                  type="text"
                  defaultValue={itemBasic.note}
                  onChange={(e) => (itemBasic.note = e.target.value)}
                  className="w-full bg-surface border border-outline/30 rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-primary"
                  placeholder="Write a note…"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block mb-1">
                  Details
                </label>
                <input
                  type="text"
                  defaultValue={itemBasic.generated_details}
                  onChange={(e) => (itemBasic.generated_details = e.target.value)}
                  className="w-full bg-surface border border-outline/30 rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-primary"
                  placeholder="Additional details…"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block mb-1">
                  Total Cost
                </label>
                <input
                  type="text"
                  defaultValue={itemBasic.expenditure}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    if (!isNaN(v)) { itemBasic.expenditure = v; setInputError(false); }
                    else setInputError(true);
                  }}
                  className="w-full bg-surface border border-outline/30 rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-primary"
                  placeholder="0.00"
                />
                {inputError && <p className="text-xs text-error mt-1">Please enter a valid number</p>}
              </div>

              {/* Images */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block mb-2">
                  Photos
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {itemBasic.images.map((img, idx) => (
                    <div key={idx} className="relative">
                      {img ? (
                        <div className="group relative w-20 h-20 rounded-lg overflow-hidden">
                          <img src={img} alt="" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(img, idx)}
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <label className="w-20 h-20 rounded-lg border-2 border-dashed border-outline/40 flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                          <span className="material-symbols-outlined text-on-surface-variant text-[20px]">add_photo_alternate</span>
                          <input type="file" accept="image/*" data-id={idx} className="hidden" onChange={handleImageChange} />
                        </label>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="w-20 h-20 rounded-lg border border-outline/30 flex items-center justify-center hover:border-primary hover:text-primary transition-colors text-on-surface-variant"
                  >
                    <span className="material-symbols-outlined text-[20px]">add</span>
                  </button>
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  onClick={() => { itemBasic.checked = true; }}
                  className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-primary text-on-primary rounded-full hover:opacity-90 transition-colors"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 border border-outline/30 rounded-full hover:border-primary hover:text-primary transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div>
            {itemBasic.checked ? (
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-on-surface">
                  <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>
                  <span className="font-semibold">Visited</span>
                </div>
                {itemBasic.note && (
                  <p className="text-sm text-on-surface">📝 <b>Note:</b> {itemBasic.note}</p>
                )}
                {itemBasic.generated_details && (
                  <p className="text-sm text-on-surface-variant">{itemBasic.generated_details}</p>
                )}
                {itemBasic.expenditure > 0 && (
                  <p className="text-sm text-on-surface">💸 Total Cost: <b>{itemBasic.expenditure}</b></p>
                )}
              </div>
            ) : (
              <p className="text-sm text-on-surface-variant italic mb-4">Not visited yet.</p>
            )}

            {itemBasic.images?.some(Boolean) && (
              <div className="flex gap-2 flex-wrap mb-4">
                {itemBasic.images.filter(Boolean).map((img, idx) => (
                  <div key={idx} className="w-20 h-20 rounded-lg overflow-hidden">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setIsEditing(true)}
              className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 border border-outline/30 rounded-full hover:border-primary hover:text-primary transition-colors"
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentCards;
