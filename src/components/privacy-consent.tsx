"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";

const CONSENT_STORAGE_KEY = "macvault-privacy-consent";
const googleTagManagerId = "GTM-PD3VKNCB";

type ConsentChoice = "accepted" | "rejected";

function loadOptionalAnalytics() {
  if (document.querySelector(`script[data-macvault-gtm="${googleTagManagerId}"]`)) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${googleTagManagerId}`;
  script.dataset.macvaultGtm = googleTagManagerId;
  document.head.appendChild(script);
}

export function PrivacyConsent() {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);

  useEffect(() => {
    const savedChoice = window.localStorage.getItem(CONSENT_STORAGE_KEY) as ConsentChoice | null;
    queueMicrotask(() =>
      setChoice(savedChoice === "accepted" || savedChoice === "rejected" ? savedChoice : null),
    );

    if (savedChoice === "accepted") loadOptionalAnalytics();

    function showConsentChoices() {
      setChoice(null);
    }

    window.addEventListener("macvault:request-technical-consent", showConsentChoices);
    return () =>
      window.removeEventListener("macvault:request-technical-consent", showConsentChoices);
  }, []);

  function saveChoice(nextChoice: ConsentChoice) {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, nextChoice);
    setChoice(nextChoice);

    if (nextChoice === "accepted") loadOptionalAnalytics();

    window.dispatchEvent(
      new CustomEvent("macvault:consent-choice", { detail: { choice: nextChoice } }),
    );
  }

  return (
    <>
      {choice === "accepted" ? <Analytics /> : null}
      {choice === null ? (
        <aside
          className="fixed inset-x-4 bottom-4 z-[90] mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl border border-[#102a431f] bg-white p-5 shadow-[0_18px_60px_rgba(5,20,44,0.18)] sm:flex-row sm:items-center sm:justify-between sm:gap-8"
          aria-label="Privacy choices"
        >
          <p className="text-sm leading-6 text-[#475467]">
            We use essential storage to remember your privacy choice. If you accept, optional analytics and technical details such as IP and browser information may be added to your product inquiry. Read our{" "}
            <Link className="font-semibold text-[#0057d8] underline underline-offset-2" href="/privacy">
              privacy policy
            </Link>
            .
          </p>
          <div className="flex shrink-0 flex-wrap gap-2">
            <button
              className="rounded-full border border-[#102a431f] px-4 py-2 text-sm font-semibold text-[#102a43] transition-colors hover:border-[#0a84ff66] hover:text-[#0057d8]"
              type="button"
              onClick={() => saveChoice("rejected")}
            >
              Only necessary
            </button>
            <button
              className="rounded-full bg-[#0a84ff] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0057d8]"
              type="button"
              onClick={() => saveChoice("accepted")}
            >
              Accept analytics & details
            </button>
          </div>
        </aside>
      ) : null}
    </>
  );
}

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}
