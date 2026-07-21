"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);
  const navigationActiveRef = useRef(false);
  const completionFrameRef = useRef(0);
  const pathname = usePathname();
  const search = useSearchParams().toString();

  useEffect(() => {
    let animationFrame = 0;

    const updateProgress = () => {
      animationFrame = 0;

      const element = progressRef.current;
      if (!element || navigationActiveRef.current) {
        return;
      }

      const scrollableHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      const progress = Math.min(Math.max(window.scrollY / scrollableHeight, 0), 1);
      const visible = window.scrollY > 0;

      element.style.setProperty("--scroll-progress", progress.toString());
      element.dataset.visible = visible ? "true" : "false";
    };

    const requestUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateProgress);
      }
    };

    const startNavigation = (event: MouseEvent) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }

      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) {
        return;
      }

      const destination = new URL(link.href, window.location.href);
      const current = new URL(window.location.href);
      const isSameDocumentHash =
        destination.pathname === current.pathname &&
        destination.search === current.search &&
        destination.hash !== current.hash;

      if (
        destination.origin !== current.origin ||
        destination.href === current.href ||
        isSameDocumentHash
      ) {
        return;
      }

      const element = progressRef.current;
      if (!element) return;

      navigationActiveRef.current = true;
      element.dataset.loading = "true";
      element.dataset.visible = "true";
      element.style.setProperty("--scroll-progress", "1");
    };

    updateProgress();
    document.addEventListener("click", startNavigation, true);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      document.removeEventListener("click", startNavigation, true);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    if (!navigationActiveRef.current) return;

    const element = progressRef.current;
    if (!element) return;

    element.style.setProperty("--scroll-progress", "1");
    element.dataset.visible = "true";
    delete element.dataset.loading;

    completionFrameRef.current = window.requestAnimationFrame(() => {
      element.style.setProperty("--scroll-progress", "0");
      element.dataset.visible = "false";
      navigationActiveRef.current = false;
    });

    return () => window.cancelAnimationFrame(completionFrameRef.current);
  }, [pathname, search]);

  return <div className="scroll-progress" ref={progressRef} aria-hidden="true" />;
}
