import { ChevronDown } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { containerClass } from "@/components/layout-classes";
import { AnimatedText, SectionHead } from "@/components/site-primitives";
import { faqItems } from "@/data/faqs";

export function HomeFaq() {
  return (
    <section id="faq" className={`${containerClass} py-[60px]`}>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqItems.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }} />
      <SectionHead kicker="Buyer FAQ" title="Read this before you pay." accent="pay" text="Straight answers about inspection, PTA status, warranty, pickup, and delivery." />
      <div className="faq-list mx-auto max-w-[1100px]">
        {faqItems.map((item, index) => (
          <details className="faq-accordion" open={index === 0} key={item.question}>
            <summary className="faq-trigger"><span className="faq-number">{String(index + 1).padStart(2, "0")}</span><span><AnimatedText>{item.question.split(" ")[0]}</AnimatedText>{` ${item.question.split(" ").slice(1).join(" ")}`}</span><span className="faq-toggle" aria-hidden="true"><ChevronDown /></span></summary>
            <div className="faq-answer"><div><p>{item.answer}</p></div></div>
          </details>
        ))}
      </div>
    </section>
  );
}
