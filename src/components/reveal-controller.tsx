"use client";

import { useEffect } from "react";

export function RevealController() {
  useEffect(() => {
    document.documentElement.classList.add("is-ready");

    const targets = document.querySelectorAll(".site-header, .reveal, .showcase");
    const scrollToHashTarget = () => {
      const id = window.location.hash.slice(1);

      if (!id) {
        return;
      }

      const target = document.getElementById(id);
      const header = document.querySelector("header");

      if (!target) {
        return;
      }

      const headerBottom = header?.getBoundingClientRect().bottom ?? 0;
      const offset = Math.ceil(headerBottom + 28);
      const targetTop = target.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: Math.max(targetTop - offset, 0),
        behavior: "auto",
      });
    };

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

    const hashTimeouts = [80, 260, 600].map((delay) =>
      window.setTimeout(scrollToHashTarget, delay),
    );

    window.addEventListener("hashchange", scrollToHashTarget);

    return () => {
      observer.disconnect();
      hashTimeouts.forEach((timeout) => window.clearTimeout(timeout));
      window.removeEventListener("hashchange", scrollToHashTarget);
    };
  }, []);

  return null;
}
