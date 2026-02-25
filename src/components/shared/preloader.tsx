"use client";

import { useEffect, useState } from "react";

export function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`preloader ${!loading ? "hidden" : ""}`}>
      <div className="text-center">
        <div className="chain-link mb-4">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p className="text-sm text-zinc-400 mt-4">Loading...</p>
      </div>
    </div>
  );
}
