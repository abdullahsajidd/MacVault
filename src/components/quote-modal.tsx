"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { FileText, Send, X } from "lucide-react";

function QuoteTag({ children }: { children: string }) {
  return (
    <span className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#0a84ff26] bg-white/90 px-3.5 text-[13px] font-semibold tracking-[0.12em] text-[#0057d8] uppercase shadow-[0_10px_30px_rgba(5,20,44,0.05)] max-[425px]:text-[11px] max-[425px]:tracking-[0.1em]">
      <span className="size-2 rounded-full bg-[#0a84ff]" />
      {children}
    </span>
  );
}

function QuoteModal({ onClose }: { onClose: () => void }) {
  const titleId = useId();
  const [sent, setSent] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const closeModal = useCallback(() => {
    document.body.style.overflow = "";
    setIsVisible(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    const handleClosePointer = (event: MouseEvent | PointerEvent) => {
      const target = event.target;

      if (target instanceof Element && target.closest("[data-quote-close]")) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClosePointer, true);
    document.addEventListener("pointerdown", handleClosePointer, true);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClosePointer, true);
      document.removeEventListener("pointerdown", handleClosePointer, true);
      document.body.style.overflow = "";
    };
  }, [closeModal]);

  if (!isVisible) {
    return null;
  }

  return (
    <dialog
      open
      className="fixed inset-0 z-[70] h-dvh max-h-none w-screen max-w-none border-0 bg-transparent p-0 text-[#102a43] backdrop:bg-[#07111f]/45 backdrop:backdrop-blur-sm"
      data-quote-modal-root
      aria-modal="true"
      aria-labelledby={titleId}
      onClose={closeModal}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          closeModal();
        }
      }}
    >
      <div className="grid min-h-full place-items-center px-5 py-8">
      <div
        className="relative max-h-[calc(100dvh-32px)] w-full max-w-[680px] overflow-y-auto rounded-[18px] bg-white text-[#102a43] shadow-[0_34px_90px_rgba(5,20,44,0.22)]"
        data-quote-card
      >
        <div className="bg-[#f4f9ff] px-6 pt-5 pb-5 max-sm:px-5">
          <div className="flex items-start justify-between gap-4">
            <QuoteTag>REQUEST A QUOTE</QuoteTag>
            <form
              method="dialog"
            >
              <button
                className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-3.5 text-sm font-semibold text-[#0057d8] shadow-[0_10px_24px_rgba(5,20,44,0.08)] transition hover:-translate-y-0.5 hover:bg-[#0a84ff] hover:text-white"
                type="submit"
                aria-label="Close quote modal"
                data-quote-close
              >
                <X className="size-4" strokeWidth={2} />
                Close
              </button>
            </form>
          </div>
          <h2 id={titleId} className="mt-3 max-w-[520px] text-[clamp(30px,5vw,48px)] leading-none font-semibold tracking-normal">
            Tell us what you want to reserve.
          </h2>
          <p className="mt-3 max-w-[560px] text-[15px] leading-[1.5] text-[#667085]">
            Share the device, budget, and timing. MacVault can reply with current stock, condition,
            PTA/warranty notes, and pickup or delivery options.
          </p>
        </div>

        <form
          className="grid gap-3 p-5 max-sm:p-5"
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
        >
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <label className="grid gap-2 text-sm font-semibold text-[#102a43]">
              Name
              <input
                className="min-h-12 rounded-[10px] border border-[#102a4318] bg-[#f7fbff] px-4 text-sm font-medium text-[#102a43] outline-none transition focus:border-[#0a84ff] focus:bg-white focus:ring-4 focus:ring-[#0a84ff16]"
                name="name"
                placeholder="Your name"
                type="text"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-[#102a43]">
              Phone
              <input
                className="min-h-12 rounded-[10px] border border-[#102a4318] bg-[#f7fbff] px-4 text-sm font-medium text-[#102a43] outline-none transition focus:border-[#0a84ff] focus:bg-white focus:ring-4 focus:ring-[#0a84ff16]"
                name="phone"
                placeholder="WhatsApp number"
                type="tel"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <label className="grid gap-2 text-sm font-semibold text-[#102a43]">
              Product
              <select
                className="min-h-12 rounded-[10px] border border-[#102a4318] bg-[#f7fbff] px-4 text-sm font-medium text-[#102a43] outline-none transition focus:border-[#0a84ff] focus:bg-white focus:ring-4 focus:ring-[#0a84ff16]"
                name="product"
                defaultValue=""
              >
                <option value="" disabled>
                  Select category
                </option>
                <option>iPhone</option>
                <option>MacBook</option>
                <option>iPad</option>
                <option>Apple Watch</option>
                <option>AirPods</option>
                <option>PS5</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold text-[#102a43]">
              Budget
              <input
                className="min-h-12 rounded-[10px] border border-[#102a4318] bg-[#f7fbff] px-4 text-sm font-medium text-[#102a43] outline-none transition focus:border-[#0a84ff] focus:bg-white focus:ring-4 focus:ring-[#0a84ff16]"
                name="budget"
                placeholder="Your range"
                type="text"
              />
            </label>
          </div>

          <label className="grid gap-2 text-sm font-semibold text-[#102a43]">
            Notes
            <textarea
              className="min-h-[78px] resize-none rounded-[10px] border border-[#102a4318] bg-[#f7fbff] px-4 py-3 text-sm font-medium text-[#102a43] outline-none transition focus:border-[#0a84ff] focus:bg-white focus:ring-4 focus:ring-[#0a84ff16]"
              name="notes"
              placeholder="Storage, color, PTA status, condition, pickup timing..."
            />
          </label>

          <div className="flex items-center justify-between gap-4 pt-1 max-sm:flex-col max-sm:items-stretch">
            <p className="text-sm leading-[1.5] text-[#667085]" aria-live="polite">
              {sent
                ? "Quote request noted. Use WhatsApp for the fastest stock confirmation."
                : "No payment or account needed."}
            </p>
            <button
              className="premium-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#0a84ff] bg-[#0a84ff] px-5 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(10,132,255,0.22)] transition hover:-translate-y-0.5 hover:bg-[#0057d8]"
              type="submit"
            >
              <Send className="size-4" strokeWidth={2} />
              Send request
            </button>
          </div>
        </form>
      </div>
      </div>
    </dialog>
  );
}

export function QuoteButton() {
  const [modalVersion, setModalVersion] = useState<number | null>(null);
  const closeQuote = () => {
    setModalVersion(null);
  };

  return (
    <>
      <button
        className="premium-button inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#0a84ff30] bg-white/90 px-4 text-sm font-semibold text-[#0057d8] transition-[transform,box-shadow,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-[#0a84ff] hover:bg-[#f4f9ff] hover:shadow-[0_14px_34px_rgba(5,20,44,0.07)] max-[1120px]:hidden"
        type="button"
        onClick={() => setModalVersion((current) => (current ?? 0) + 1)}
      >
        <FileText className="size-4" strokeWidth={2} />
        Request a quote
      </button>
      {modalVersion !== null ? <QuoteModal key={modalVersion} onClose={closeQuote} /> : null}
    </>
  );
}
