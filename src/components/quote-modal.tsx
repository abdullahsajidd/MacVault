"use client";

import { useCallback, useEffect, useId, useRef, useState, type RefObject } from "react";
import { FileText, Send, X } from "lucide-react";
import { useCatalog } from "@/components/catalog-provider";
import { Cta } from "@/components/cta";
import { createWhatsappHref, phoneDisplay } from "@/data/contact";

function QuoteTag({ children }: { children: string }) {
  return (
    <span className="tag-pill inline-flex min-h-9 w-fit max-w-full items-center justify-start gap-3 rounded-full border border-[#0a84ff26] bg-white/90 px-3.5 text-[13px] font-semibold tracking-[0.12em] text-[#0057d8] uppercase shadow-[0_10px_30px_rgba(5,20,44,0.05)] max-[425px]:text-[11px] max-[425px]:tracking-[0.1em]">
      <span className="tag-dot size-2 shrink-0 rounded-full bg-[#0a84ff]" />
      {children}
    </span>
  );
}

function QuoteModal({
  onClose,
  triggerRef,
}: {
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}) {
  const { categories } = useCatalog();
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closingRef = useRef(false);
  const [sent, setSent] = useState(false);
  const [closing, setClosing] = useState(false);

  const fieldValue = (formData: FormData, field: string) =>
    formData.get(field)?.toString().trim() || "Not shared";

  const requestClose = useCallback(() => {
    if (closingRef.current) {
      return;
    }

    closingRef.current = true;
    setClosing(true);
    closeTimerRef.current = setTimeout(() => {
      dialogRef.current?.close();
      onClose();
      requestAnimationFrame(() => triggerRef.current?.focus());
    }, 300);
  }, [onClose, triggerRef]);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (!dialog.open) {
      dialog.showModal();
    }

    const handleCancel = (event: Event) => {
      event.preventDefault();
      requestClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.addEventListener("cancel", handleCancel);

    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      document.body.style.overflow = previousOverflow;

      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, [requestClose]);

  return (
    <dialog
      ref={dialogRef}
      className={`quote-dialog fixed inset-0 z-[70] h-dvh max-h-none w-screen max-w-none border-0 bg-transparent p-0 text-[#102a43] ${
        closing ? "is-closing" : ""
      }`}
      aria-labelledby={titleId}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          requestClose();
        }
      }}
    >
      <div className="quote-dialog-inner grid min-h-full place-items-center px-5 py-8">
        <div className="relative max-h-[calc(100dvh-32px)] w-full max-w-[680px] overflow-y-auto rounded-[18px] bg-white text-[#102a43] shadow-[0_34px_90px_rgba(5,20,44,0.24)]">
          <div className="bg-[#f4f9ff] px-6 pt-5 pb-5 max-sm:px-5">
            <div className="flex items-start justify-between gap-4">
              <QuoteTag>Ask for a price</QuoteTag>
              <Cta asButton type="button" icon={X} variant="secondary" onClick={requestClose}>
                Close
              </Cta>
            </div>
            <h2
              id={titleId}
              className="mt-3 max-w-[560px] text-[clamp(30px,5vw,48px)] leading-none font-semibold tracking-normal"
            >
              Tell us which product you are considering.
            </h2>
            <p className="mt-3 max-w-[560px] text-[15px] leading-[1.5] text-[#667085]">
              Share the product, budget, preferred condition, and timing. We will prepare a
              WhatsApp message so you can ask about today&apos;s price and the exact unit.
            </p>
          </div>

          <form
            className="grid gap-3 p-5 max-sm:p-5"
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const message = [
                "Hi MacVault, I want to ask for today’s price and product details.",
                `Name: ${fieldValue(formData, "name")}`,
                `Phone: ${fieldValue(formData, "phone")}`,
                `Product: ${fieldValue(formData, "product")}`,
                `Budget: ${fieldValue(formData, "budget")}`,
                `Notes: ${fieldValue(formData, "notes")}`,
              ].join("\n");

              window.open(createWhatsappHref(message), "_blank", "noopener,noreferrer");
              setSent(true);
            }}
          >
            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <label className="grid gap-2 text-sm font-semibold text-[#102a43]">
                Name
                <input className="form-field" name="name" placeholder="Your name" type="text" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-[#102a43]">
                Phone
                <input className="form-field" name="phone" placeholder={phoneDisplay} type="tel" />
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <label className="grid gap-2 text-sm font-semibold text-[#102a43]">
                Product
                <select className="form-field" name="product" defaultValue="">
                  <option value="" disabled>
                    Select category
                  </option>
                  {categories.map((category) => (
                    <option value={category.label} key={category._id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-semibold text-[#102a43]">
                Budget
                <input className="form-field" name="budget" placeholder="Your range" type="text" />
              </label>
            </div>

            <label className="grid gap-2 text-sm font-semibold text-[#102a43]">
              Notes
              <textarea
                className="form-field min-h-[92px] resize-none py-3"
                name="notes"
                placeholder="Model, storage, colour, PTA status, condition, warranty, pickup or delivery..."
              />
            </label>

            <div className="flex items-center justify-between gap-4 pt-1 max-sm:flex-col max-sm:items-stretch">
              <p className="text-sm leading-[1.5] text-[#667085]" aria-live="polite">
                {sent
                  ? "WhatsApp opened with your request. Review the message, then send it to MacVault."
                  : `This form does not take payment or place an order. Messages open to ${phoneDisplay}.`}
              </p>
              <Cta asButton type="submit" icon={Send}>
                Send on WhatsApp
              </Cta>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export function QuoteButton() {
  const [modalVersion, setModalVersion] = useState<number | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Cta
        asButton
        ref={buttonRef}
        className="max-[1120px]:hidden"
        type="button"
        icon={FileText}
        variant="secondary"
        onClick={() => setModalVersion((current) => (current ?? 0) + 1)}
      >
        Ask for a price
      </Cta>
      {modalVersion !== null ? (
        <QuoteModal
          key={modalVersion}
          onClose={() => setModalVersion(null)}
          triggerRef={buttonRef}
        />
      ) : null}
    </>
  );
}
