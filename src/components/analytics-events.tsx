"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

const CONSENT_STORAGE_KEY = "macvault-privacy-consent";

function accessibleLabel(element: Element) {
  return (
    element.getAttribute("aria-label") ??
    element.querySelector(".sr-only")?.textContent ??
    element.textContent ??
    "Unlabelled action"
  )
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

export function AnalyticsEvents() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (window.localStorage.getItem(CONSENT_STORAGE_KEY) !== "accepted") return;

      const target = event.target instanceof Element ? event.target.closest("a, button, summary") : null;

      if (!target) {
        return;
      }

      const href = target instanceof HTMLAnchorElement ? target.href : "";
      const properties = {
        label: accessibleLabel(target),
        path: window.location.pathname,
      };

      if (href.includes("wa.me/")) {
        track("whatsapp_click", properties);
      } else if (href.startsWith("tel:")) {
        track("phone_click", properties);
      } else if (href.startsWith("mailto:")) {
        track("email_click", properties);
      } else if (target.classList.contains("faq-trigger")) {
        track("faq_toggle", {
          ...properties,
          expanded: target instanceof HTMLElement && target.parentElement instanceof HTMLDetailsElement
            ? !target.parentElement.open
            : target.getAttribute("aria-expanded") === "false",
        });
      } else if (target.getAttribute("aria-controls") === "product-grid") {
        track("catalog_filter", properties);
      } else if (/\/products\/[^/?#]+/.test(href)) {
        track("product_view", properties);
      }
    };

    const handleChange = (event: Event) => {
      if (window.localStorage.getItem(CONSENT_STORAGE_KEY) !== "accepted") return;

      const target = event.target;

      if (target instanceof HTMLInputElement && target.type === "search") {
        track("catalog_search", {
          path: window.location.pathname,
          queryLength: target.value.trim().length,
          hasQuery: target.value.trim().length > 0,
        });
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("change", handleChange);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("change", handleChange);
    };
  }, []);

  return null;
}
