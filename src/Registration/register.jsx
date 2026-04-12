import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export default function Register() {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    const values = getValues();
    axios
      .post(`${baseURL}user`, values)
      .then((response) => {
        if (response.status == "201") navigate("/Login");
      })
      .catch((error) => {
        if (error.response?.status === 409) {
          setAlertMessage(error.response.data);
        }
      });
  };

  const onError = (errs) => {
    if (errs.password) setAlertMessage(errs.password.message);
  };

  const fields = [
    { name: "username", label: "Username", type: "text", placeholder: "Choose a username" },
    { name: "first_name", label: "First Name", type: "text", placeholder: "Your first name" },
    { name: "last_name", label: "Last Name", type: "text", placeholder: "Your last name" },
    { name: "email", label: "Email", type: "email", placeholder: "your@email.com" },
  ];

  return (
    <div className="min-h-screen bg-surface dark:bg-[#100e07] flex">
      {/* ── Left: Form Panel ── */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 overflow-y-auto">
        {/* Brand */}
        <Link
          to="/"
          className="text-2xl font-headline italic text-on-surface dark:text-[#fff9eb] mb-12 block hover:text-primary transition-colors w-fit"
          style={{ fontFamily: "'Newsreader', serif" }}
        >
          Maps 'n Bags
        </Link>

        <div className="max-w-md w-full">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4 block">
            Join the community
          </span>
          <h1
            className="text-4xl lg:text-5xl text-on-surface dark:text-[#fff9eb] mb-2 leading-tight"
            style={{ fontFamily: "'Newsreader', serif" }}
          >
            Start your <span className="italic text-primary">travel chronicle</span>
          </h1>
          <p className="text-on-surface-variant dark:text-[#fff9eb]/50 text-sm mb-8 mt-3">
            Free forever. Plan, share, and explore with fellow travellers.
          </p>

          {/* Error alert */}
          {alertMessage && (
            <div className="flex items-center gap-3 bg-error/10 border border-error/30 text-error rounded-lg px-4 py-3 mb-6 text-sm">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {alertMessage}
              <button onClick={() => setAlertMessage("")} className="ml-auto material-symbols-outlined text-[16px] opacity-60 hover:opacity-100">close</button>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
            {/* Standard fields */}
            {fields.map(({ name, label, type, placeholder }) => (
              <div key={name} className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-[#fff9eb]/50">
                  {label}
                </label>
                <input
                  {...register(name)}
                  type={type}
                  placeholder={placeholder}
                  required
                  className="bg-surface-container dark:bg-[#1a1710] border border-[#807b68]/20 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-3 text-on-surface dark:text-[#fff9eb] placeholder:text-on-surface-variant/50 dark:placeholder:text-[#fff9eb]/30 outline-none transition-all text-sm"
                />
              </div>
            ))}

            {/* Password with validation */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-[#fff9eb]/50">
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Password must be at least 8 characters" },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+/,
                    message: "Must have uppercase, lowercase & number",
                  },
                })}
                type="password"
                placeholder="Min 8 chars, upper + lower + number"
                className="bg-surface-container dark:bg-[#1a1710] border border-[#807b68]/20 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-3 text-on-surface dark:text-[#fff9eb] placeholder:text-on-surface-variant/50 dark:placeholder:text-[#fff9eb]/30 outline-none transition-all text-sm"
              />
              {errors.password && (
                <span className="text-xs text-error mt-0.5">{errors.password.message}</span>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-primary hover:bg-primary-dim text-on-primary font-bold rounded-xl shadow-lg shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 transition-all mt-2"
            >
              Create Account
            </button>
          </form>

          <p className="mt-8 text-sm text-on-surface-variant dark:text-[#fff9eb]/50 text-center">
            Already have an account?{" "}
            <Link to="/Login" className="text-primary font-semibold hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>

      {/* ── Right: Visual Panel (desktop only) ── */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden bg-surface-container dark:bg-[#1a1710]">
        <div className="absolute inset-0 opacity-30 dark:opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #807b68 1px, transparent 0)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-24 right-20 w-56 h-72 bg-tertiary/5 rounded-xl rotate-3" />
        <div className="absolute bottom-16 left-16 w-40 h-52 bg-primary/5 rounded-xl -rotate-6" />
        <div className="relative z-10 flex flex-col justify-center items-start p-16">
          <span className="material-symbols-outlined text-tertiary text-5xl mb-8">map</span>
          <h2
            className="text-5xl text-on-surface dark:text-[#fff9eb] leading-tight mb-6"
            style={{ fontFamily: "'Newsreader', serif" }}
          >
            Every great trip<br />
            <span className="italic text-primary">starts with a plan.</span>
          </h2>
          <p className="text-on-surface-variant dark:text-[#fff9eb]/50 text-sm leading-relaxed max-w-xs">
            Build detailed day-by-day itineraries, browse what others are exploring, and copy plans that inspire you.
          </p>
          <div className="mt-12 space-y-4">
            {[
              { icon: "edit_calendar", text: "Day-by-day itinerary planning" },
              { icon: "content_copy", text: "Copy & customise community plans" },
              { icon: "group", text: "Share with travel companions" },
            ].map(({ icon, text }) => (
              <div key={icon} className="flex items-center gap-3 text-sm text-on-surface-variant dark:text-[#fff9eb]/50">
                <span className="material-symbols-outlined text-primary text-[18px]">{icon}</span>
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
