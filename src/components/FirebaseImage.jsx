"use client";

import React, { useState, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firestore";

export default function FirebaseImage({ src, path, fallback = null, onError, ...props }) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [failed, setFailed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // CRITICAL: Reset state when props change
  // Without this, if you edit an image, the component might still
  // be showing the "failed" state from the previous image.
  useEffect(() => {
    setCurrentSrc(src);
    setFailed(false);
    setRefreshing(false);
  }, [src, path]);

  const handleError = async (e) => {
    // Prevent infinite loops if the refresh also fails
    if (refreshing || failed) return;

    if (path) {
      setRefreshing(true);
      try {
        const storageRef = ref(storage, path);
        const freshUrl = await getDownloadURL(storageRef);
        setCurrentSrc(freshUrl);
      } catch (err) {
        console.error("FirebaseImage recovery failed:", err);
        setFailed(true);
      } finally {
        setRefreshing(false);
      }
    } else {
      setFailed(true);
    }

    onError?.(e);
  };

  if (failed || (!currentSrc && !path)) return fallback;

  return (
    <img 
      src={currentSrc} 
      onError={handleError} 
      {...props} 
      alt={props.alt || "Muhira Updates Item"} 
    />
  );
}