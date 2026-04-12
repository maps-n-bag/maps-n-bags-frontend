import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export default function LoginPage() {
  const navigate = useNavigate();
  const [loginFailed, setLoginFailed] = useState(false);
  const { handleSubmit, register, getValues } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    const values = getValues();
    axios
      .post(`${baseURL}user/login`, values)
      .then((response) => {
        localStorage.setItem("accessToken", response.data.token);
        localStorage.setItem("userId", response.data.user_id);
        navigate(`/Profile/${response.data.user_id}`);
      })
      .catch((error) => {
        if (error.response?.status == "401") setLoginFailed(true);
      });
  };
  const onError = (errors, e) => console.log(errors, e);

  return (
    <div className="min-h-screen bg-surface dark:bg-[#100e07] flex">
      {/* ── Left: Form Panel ── */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16">
        {/* Brand */}
        <Link
          to="/"
          className="text-2xl font-headline italic text-on-surface dark:text-[#fff9eb] mb-16 block hover:text-primary transition-colors w-fit"
          style={{ fontFamily: "'Newsreader', serif" }}
        >
          Maps 'n Bags
        </Link>

        <div className="max-w-md w-full">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4 block">
            Welcome back
          </span>
          <h1
            className="text-4xl lg:text-5xl text-on-surface dark:text-[#fff9eb] mb-2 leading-tight"
            style={{ fontFamily: "'Newsreader', serif" }}
          >
            Sign in to your <span className="italic text-primary">chronicle</span>
          </h1>
          <p className="text-on-surface-variant dark:text-[#fff9eb]/50 text-sm mb-10 mt-3">
            Continue planning your next adventure.
          </p>

          {/* Error alert */}
          {loginFailed && (
            <div className="flex items-center gap-3 bg-error/10 border border-error/30 text-error rounded-lg px-4 py-3 mb-6 text-sm">
              <span className="material-symbols-outlined text-[18px]">error</span>
              Incorrect username or password
              <button onClick={() => setLoginFailed(false)} className="ml-auto material-symbols-outlined text-[16px] opacity-60 hover:opacity-100">close</button>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-5">
            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-[#fff9eb]/50">
                Username
              </label>
              <input
                {...register("username")}
                type="text"
                placeholder="Enter username"
                required
                className="bg-surface-container dark:bg-[#1a1710] border border-[#807b68]/20 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-3 text-on-surface dark:text-[#fff9eb] placeholder:text-on-surface-variant/50 dark:placeholder:text-[#fff9eb]/30 outline-none transition-all text-sm"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-[#fff9eb]/50">
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                placeholder="Enter password"
                required
                className="bg-surface-container dark:bg-[#1a1710] border border-[#807b68]/20 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-3 text-on-surface dark:text-[#fff9eb] placeholder:text-on-surface-variant/50 dark:placeholder:text-[#fff9eb]/30 outline-none transition-all text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-primary hover:bg-primary-dim text-on-primary font-bold rounded-xl shadow-lg shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 transition-all mt-2"
            >
              Log in to your account
            </button>
          </form>

          <p className="mt-8 text-sm text-on-surface-variant dark:text-[#fff9eb]/50 text-center">
            Don't have an account?{" "}
            <Link to="/Register" className="text-primary font-semibold hover:underline">
              Create one here
            </Link>
          </p>
        </div>
      </div>

      {/* ── Right: Visual Panel (desktop only) ── */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden bg-surface-container-low dark:bg-[#1a1710]">
        {/* Dot grid texture */}
        <div className="absolute inset-0 opacity-30 dark:opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #807b68 1px, transparent 0)", backgroundSize: "28px 28px" }} />
        {/* Decorative shapes */}
        <div className="absolute top-16 right-16 w-48 h-64 bg-primary/5 rounded-xl rotate-6" />
        <div className="absolute bottom-24 left-12 w-32 h-44 bg-secondary/5 rounded-xl -rotate-3" />
        {/* Center content */}
        <div className="relative z-10 flex flex-col justify-center items-start p-16">
          <span className="material-symbols-outlined text-primary text-5xl mb-8">travel_explore</span>
          <h2
            className="text-5xl text-on-surface dark:text-[#fff9eb] leading-tight mb-6"
            style={{ fontFamily: "'Newsreader', serif" }}
          >
            Your journeys,<br />
            <span className="italic text-primary">beautifully planned.</span>
          </h2>
          <p className="text-on-surface-variant dark:text-[#fff9eb]/50 text-sm leading-relaxed max-w-xs">
            Day-by-day itineraries, shared experiences, and a community of fellow explorers — all in one place.
          </p>
          {/* Stats row */}
          <div className="flex gap-8 mt-12">
            {[["Plans", "crafted"], ["Regions", "explored"], ["Days", "planned"]].map(([n, l]) => (
              <div key={n}>
                <div className="text-2xl font-bold text-primary" style={{ fontFamily: "'Newsreader', serif" }}>{n}</div>
                <div className="text-xs text-on-surface-variant dark:text-[#fff9eb]/40 uppercase tracking-widest mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
