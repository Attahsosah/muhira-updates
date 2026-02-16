"use client";

import { useState, useEffect, useRef } from "react";

const NewsletterModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem("newsletterModalShown");
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setShowModal(true);
        sessionStorage.setItem("newsletterModalShown", "true");
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  const handleSubmit = async () => {
    if (!email) return;

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => setShowModal(false), 2000);
      } else {
        console.error("Failed to subscribe:", res.statusText);
      }
    } catch (error) {
      console.error("Error submitting newsletter:", error);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 opacity-100 transition-opacity">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative animate-fade-in-down"
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={() => setShowModal(false)}
        >
          ✕
        </button>

        {!submitted ? (
          <>
            <h2 className="text-2xl font-semibold mb-1">Subscribe to our Newsletter</h2>
            <p className="text-sm text-gray-500 mb-4">
              Get updates straight to your inbox.
            </p>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-green-600 font-semibold text-lg">Thanks for subscribing!</h3>
            {/* The apostrophe below is now escaped to fix the build error */}
            <p className="text-sm text-gray-500">You&apos;re now on our list. 🎉</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterModal;