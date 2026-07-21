"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { containerClass } from "@/components/layout-classes";
import { AnimatedText, SectionHead } from "@/components/site-primitives";
import { faqItems } from "@/data/faqs";

export function HomeFaq() {
  const [openItems, setOpenItems] = useState(() => new Set([0]));

  const toggleItem = (index: number) => {
    setOpenItems((current) => {
      const next = new Set(current);

      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }

      return next;
    });
  };

  return (
    <section id="faq" className={`${containerClass} py-[60px]`}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
      <SectionHead
        kicker="Buyer FAQ"
        title="Read this before you pay."
        accent="pay"
        text="Straight answers about inspection, PTA status, warranty, pickup, and delivery."
      />
      <div className="faq-list mx-auto max-w-[1100px]">
        {faqItems.map((item, index) => {
          const isOpen = openItems.has(index);
          const answerId = `faq-answer-${index}`;

          return (
            <div className={`faq-accordion ${isOpen ? "is-open" : ""}`} key={item.question}>
              <button
                className="faq-trigger"
                type="button"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => toggleItem(index)}
              >
                <span className="faq-number">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <AnimatedText>{item.question.split(" ")[0]}</AnimatedText>
                  {` ${item.question.split(" ").slice(1).join(" ")}`}
                </span>
                <span className="faq-toggle" aria-hidden="true">
                  <ChevronDown />
                </span>
              </button>
              <div
                className="faq-answer"
                id={answerId}
                aria-hidden={!isOpen}
              >
                <div>
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
