"use client";

import { useEffect } from "react";

export function RevealController() {
  useEffect(() => {
    document.documentElement.classList.add("is-ready");

    const targets = document.querySelectorAll(".reveal, .showcase, .timeline");

    const markIfVisible = (target: Element) => {
      const rect = target.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      if (rect.top < viewportHeight * 0.92 && rect.bottom > 0) {
        target.classList.add("in-view");
        return true;
      }

      return false;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    targets.forEach((target) => {
      if (!markIfVisible(target)) {
        observer.observe(target);
      }
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
