import { containerClass } from "@/components/layout-classes";
import { Footer, Header } from "@/components/site";
import { AnimatedText, Tag } from "@/components/site-primitives";
import { emailAddress, emailHref, phoneDisplay, whatsappStockHref } from "@/data/contact";

export type PolicySection = { title: string; paragraphs: string[] };

export function PolicyPage({ title, intro, sections }: { title: string; intro: string; sections: PolicySection[] }) {
  return (
    <div className="bg-white text-[#102a43]">
      <Header />
      <main id="main-content" className={`${containerClass} pt-[154px] pb-[60px] max-[768px]:pt-[126px]`}>
        <div className="mx-auto max-w-[900px]">
          <Tag>Buyer info</Tag>
          <h1 className="page-title mt-6">
            <AnimatedText>{title.split(" ")[0]}</AnimatedText>{title.includes(" ") ? ` ${title.split(" ").slice(1).join(" ")}` : ""}
          </h1>
          <p className="mt-6 max-w-[760px] text-[19px] leading-[1.65] text-[#667085]">{intro}</p>
          <p className="mt-4 text-sm font-semibold text-[#0057d8]">Last updated: 15 July 2026</p>
          <div className="mt-12 divide-y divide-[#102a4314] border-y border-[#102a4314]">
            {sections.map((section) => (
              <section className="py-8" key={section.title}>
                <h2 className="text-[28px] font-semibold tracking-normal">
                  <AnimatedText>{section.title.split(" ")[0]}</AnimatedText>{section.title.includes(" ") ? ` ${section.title.split(" ").slice(1).join(" ")}` : ""}
                </h2>
                {section.paragraphs.map((paragraph) => <p className="mt-4 text-[16px] leading-[1.75] text-[#667085]" key={paragraph}>{paragraph}</p>)}
              </section>
            ))}
          </div>
          <div className="mt-10 rounded-[18px] bg-[#f4f9ff] p-7 text-[15px] leading-[1.7] text-[#475467]">
            If a product page and the written order details do not match, stop before payment and ask MacVault. Contact us on <a className="font-semibold text-[#0057d8]" href={whatsappStockHref}>WhatsApp at {phoneDisplay}</a> or email <a className="font-semibold text-[#0057d8]" href={emailHref}>{emailAddress}</a>.
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
