"use client";

import React, { useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firestore";

/**
 * FirebaseImage — drop-in <img> replacement for Firebase Storage images.
 *
 * Props:
 *   src      — the stored download URL (may contain an expired token)
 *   path     — the Firebase Storage path (e.g. "electronics/1234-image.jpg")
 *              When provided and src fails to load, a fresh URL is fetched
 *              automatically using this path.
 *   fallback — content to render when no image can be loaded at all
 *   All other props are forwarded to the <img> element.
 */
export default function FirebaseImage({ src, path, fallback = null, onError, ...props }) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [failed, setFailed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleError = async (e) => {
    if (refreshing || failed) return;

    // If we have the storage path, try to get a fresh download URL
    if (path) {
      setRefreshing(true);
      try {
        const freshUrl = await getDownloadURL(ref(storage, path));
        setCurrentSrc(freshUrl);
      } catch {
        setFailed(true);
      } finally {
        setRefreshing(false);
      }
    } else {
      setFailed(true);
    }

    onError?.(e);
  };

  if (failed || !currentSrc) return fallback;

  return <img src={currentSrc} onError={handleError} {...props} />;
}
