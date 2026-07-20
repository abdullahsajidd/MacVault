"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  ChevronDown,
  Mail,
  MapPin,
  MessageCircle,
  PackageSearch,
  PhoneCall,
  Send,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { Cta } from "@/components/cta";
import { useCatalog } from "@/components/catalog-provider";
import { containerClass } from "@/components/layout-classes";
import { RevealController } from "@/components/reveal-controller";
import { Footer, Header } from "@/components/site";
import { AnimatedText, SectionHead, Tag } from "@/components/site-primitives";
import {
  createWhatsappHref,
  emailAddress,
  emailHref,
  phoneDisplay,
  phoneHref,
  whatsappStockHref,
} from "@/data/contact";

const responseNotes = [
  {
    title: "We check the product",
    text: "We check whether the model and variant you asked for are still available.",
    icon: PackageSearch,
  },
  {
    title: "We answer the missing facts",
    text: "You can ask for the current price, exact photos, condition, PTA status, battery or cycle details, warranty, and included items.",
    icon: ShieldCheck,
  },
  {
    title: "You choose the next step",
    text: "If the product suits you, agree on inspection, pickup or delivery, payment, and any hold terms in writing.",
    icon: BadgeCheck,
  },
];

function fieldValue(formData: FormData, field: string) {
  return formData.get(field)?.toString().trim() || "Not shared";
}

export function ContactPageShell() {
  const { categories } = useCatalog();
  const productOptions = categories.map((category) => category.label);
  const [selectedMethod, setSelectedMethod] = useState("whatsapp");
  const [submitted, setSubmitted] = useState(false);
  const contactMethods = useMemo(
    () => [
      {
        id: "whatsapp",
        label: "WhatsApp",
        value: phoneDisplay,
        href: whatsappStockHref,
        text: "Best for asking about a product, sharing photos, and keeping the agreed details in writing.",
        icon: MessageCircle,
      },
      {
        id: "call",
        label: "Call",
        value: phoneDisplay,
        href: phoneHref,
        text: "Useful for a quick question about inspection, pickup, delivery, or timing.",
        icon: PhoneCall,
      },
      {
        id: "email",
        label: "Email",
        value: emailAddress,
        href: emailHref,
        text: "Useful for detailed requirements, business purchases, or a written follow-up.",
        icon: Mail,
      },
    ],
    [],
  );
  const selectedContact = contactMethods.find((method) => method.id === selectedMethod) ?? contactMethods[0];
  const SelectedIcon = selectedContact.icon;

  return (
    <div className="overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f4f9ff_58%,#ffffff_100%)] text-[#050b14]">
      <RevealController />
      <Header />

      <main className="pt-[50px]">
        <section className={`${containerClass} pt-32 pb-20 text-center max-sm:pt-[106px]`}>
          <div className="reveal">
            <Tag>Contact MacVault</Tag>
            <h1 className="page-title mx-auto mt-5 max-w-[1280px]">
              Ask about the <AnimatedText>product</AnimatedText> before you travel or pay.
            </h1>
            <p className="mx-auto mt-6 max-w-[760px] text-[20px] leading-[1.58] text-[#667085] max-[768px]:text-[18px] max-[425px]:text-[16px]">
              Send the product name and the facts you need. Confirm today&apos;s price, exact
              condition, current photos, warranty, included items, and inspection or delivery options.
            </p>
            <div className="mt-[30px] flex flex-wrap justify-center gap-3">
              <Cta href={whatsappStockHref} icon={MessageCircle}>
                WhatsApp MacVault
              </Cta>
              <Cta href={phoneHref} icon={PhoneCall} variant="secondary">
                Call now
              </Cta>
              <Cta href={emailHref} icon={Mail} variant="secondary">
                Email us
              </Cta>
            </div>
          </div>
        </section>

        <section className="border-y border-[#050b141f] bg-white py-[60px]">
          <div className={`${containerClass} grid grid-cols-[0.78fr_1.22fr] gap-[56px] max-[1024px]:grid-cols-1`}>
            <div className="reveal">
              <Tag>Direct contact</Tag>
              <h2 className="section-title mt-2">
                Choose <AnimatedText>WhatsApp</AnimatedText>, phone, or email.
              </h2>
              <p className="mt-[18px] max-w-[620px] text-[17px] leading-[1.56] text-[#667085]">
                Include the full product name, preferred condition, budget, and city. This gives us
                enough information to answer without asking the same basic questions again.
              </p>
            </div>

            <div className="reveal grid gap-4">
              <div className="grid grid-cols-3 gap-2 rounded-[8px] border border-[#102a4314] bg-[#f8fbff] p-2 max-[640px]:grid-cols-1">
                {contactMethods.map((method) => {
                  const Icon = method.icon;

                  return (
                    <button
                      className={`min-h-14 rounded-[8px] px-4 text-sm font-bold transition-colors ${
                        selectedMethod === method.id
                          ? "bg-[#0a84ff] text-white shadow-[0_14px_34px_rgba(10,132,255,0.22)]"
                          : "bg-white text-[#667085] hover:text-[#0057d8]"
                      }`}
                      type="button"
                      aria-pressed={selectedMethod === method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      key={method.id}
                    >
                      <span className="inline-flex items-center gap-2">
                        <Icon className="size-4" />
                        {method.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="rounded-[8px] border border-[#102a4314] bg-white p-8 shadow-[0_20px_60px_rgba(5,20,44,0.06)] max-[425px]:p-6">
                <div className="flex items-start justify-between gap-5 max-[640px]:flex-col">
                  <div>
                    <span className="text-xs font-bold tracking-[0.12em] text-[#0057d8] uppercase">
                      {selectedContact.label}
                    </span>
                    <p className="mt-3 break-words text-[36px] leading-tight font-semibold max-[425px]:text-[28px]">
                      {selectedContact.value}
                    </p>
                    <p className="mt-3 max-w-[640px] text-[16px] leading-[1.6] text-[#667085]">
                      {selectedContact.text}
                    </p>
                  </div>
                  <span className="grid size-14 shrink-0 place-items-center rounded-full bg-[#eef7ff] text-[#0a84ff]">
                    <SelectedIcon className="size-7" />
                  </span>
                </div>
                <div className="mt-7 flex justify-center">
                  <Cta href={selectedContact.href} icon={SelectedIcon}>
                    {`Open ${selectedContact.label}`}
                  </Cta>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${containerClass} py-[60px]`}>
          <SectionHead
            kicker="Your question"
            title="Tell us what you want to buy."
            accent="buy"
            text="This form prepares a WhatsApp message. It does not create an account, take payment, or place an order."
          />

          <div className="grid grid-cols-[1.15fr_0.85fr] gap-5 max-[1024px]:grid-cols-1">
            <form
              className="reveal grid gap-4 rounded-[8px] border border-[#102a4314] bg-white p-6 shadow-[0_20px_60px_rgba(5,20,44,0.06)] max-[425px]:p-5"
              onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const message = [
                  "Hi MacVault, I want to ask about a product.",
                  `Name: ${fieldValue(formData, "name")}`,
                  `Phone: ${fieldValue(formData, "phone")}`,
                  `Product: ${fieldValue(formData, "product")}`,
                  `Budget: ${fieldValue(formData, "budget")}`,
                  `Timing: ${fieldValue(formData, "timing")}`,
                  `Notes: ${fieldValue(formData, "notes")}`,
                ].join("\n");

                window.open(createWhatsappHref(message), "_blank", "noopener,noreferrer");
                setSubmitted(true);
              }}
            >
              <div className="grid grid-cols-2 gap-4 max-[640px]:grid-cols-1">
                <label className="grid gap-2 text-sm font-semibold text-[#102a43]">
                  Name
                  <input className="form-field" name="name" placeholder="Your name" type="text" />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-[#102a43]">
                  Phone
                  <input
                    className="form-field"
                    name="phone"
                    placeholder={phoneDisplay}
                    type="tel"
                  />
                </label>
              </div>

              <div className="grid grid-cols-3 gap-4 max-[940px]:grid-cols-1">
                <label className="grid gap-2 text-sm font-semibold text-[#102a43]">
                  Product
                  <span className="relative block">
                    <select className="form-field form-select" name="product" defaultValue="">
                      <option value="" disabled>Select category</option>
                      {productOptions.map((option) => <option key={option}>{option}</option>)}
                    </select>
                    <ChevronDown className="form-select-icon" aria-hidden="true" />
                  </span>
                </label>
                <label className="grid gap-2 text-sm font-semibold text-[#102a43]">
                  Budget
                  <input className="form-field" name="budget" placeholder="Your range" type="text" />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-[#102a43]">
                  Timing
                  <span className="relative block">
                    <select className="form-field form-select" name="timing" defaultValue="Today">
                      <option>Today</option>
                      <option>This week</option>
                      <option>Just comparing</option>
                    </select>
                    <ChevronDown className="form-select-icon" aria-hidden="true" />
                  </span>
                </label>
              </div>

              <label className="grid gap-2 text-sm font-semibold text-[#102a43]">
                Notes
                <textarea
                  className="form-field min-h-[116px] resize-none py-3"
                  name="notes"
                  placeholder="Model, storage, colour, PTA status, condition, warranty, pickup or delivery..."
                />
              </label>

              <div className="flex flex-col items-center justify-center gap-4 pt-1 text-center">
                <p className="text-sm leading-[1.5] text-[#667085]" aria-live="polite">
                  {submitted
                    ? "WhatsApp opened with your request. Review the message, then send it to MacVault."
                    : `Messages go to ${phoneDisplay}.`}
                </p>
                <Cta asButton type="submit" icon={Send}>
                  Send on WhatsApp
                </Cta>
              </div>
            </form>

            <div className="reveal grid gap-4">
              <article className="rounded-[8px] border border-[#102a4314] bg-white p-6 shadow-[0_18px_50px_rgba(5,20,44,0.055)]">
                <MapPin className="size-6 text-[#0a84ff]" />
                <h3 className="mt-5 text-2xl font-semibold"><AnimatedText>Lahore</AnimatedText> pickup</h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-[#667085]">
                  If pickup is available for the product, agree on the location and time before
                  travelling. Ask whether inspection is available before payment.
                </p>
              </article>
              <article className="rounded-[8px] border border-[#102a4314] bg-white p-6 shadow-[0_18px_50px_rgba(5,20,44,0.055)]">
                <Clock3 className="size-6 text-[#0a84ff]" />
                <h3 className="mt-5 text-2xl font-semibold"><AnimatedText>What</AnimatedText> to include</h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-[#667085]">
                  Send the product name, storage or variant, preferred condition, budget, city,
                  and when you plan to buy.
                </p>
              </article>
              <article className="rounded-[8px] border border-[#102a4314] bg-white p-6 shadow-[0_18px_50px_rgba(5,20,44,0.055)]">
                <Smartphone className="size-6 text-[#0a84ff]" />
                <h3 className="mt-5 text-2xl font-semibold"><AnimatedText>Contact</AnimatedText> details</h3>
                <div className="mt-4 grid gap-2 text-[15px] font-semibold text-[#102a43]">
                  <a className="break-words transition-colors hover:text-[#0057d8]" href={phoneHref}>
                    {phoneDisplay}
                  </a>
                  <a className="break-words transition-colors hover:text-[#0057d8]" href={emailHref}>
                    {emailAddress}
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-[#f4f9ff] py-[60px]">
          <div className={containerClass}>
            <SectionHead
              kicker="What happens next"
              title="Three steps after you message."
              accent="steps"
              text="We identify the product, answer the unit-specific questions, and explain the available next step."
            />
            <div className="grid grid-cols-3 gap-4 max-[940px]:grid-cols-1">
              {responseNotes.map((item, index) => {
                const Icon = item.icon;

                return (
                  <article
                    className="process-card reveal min-h-[220px]"
                    style={{ transitionDelay: `${index * 60}ms` }}
                    key={item.title}
                  >
                    <div className="inline-flex size-[42px] items-center justify-center rounded-full border border-[#0a84ff42] bg-white text-[#0a84ff]">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mt-5 mb-2 text-2xl font-semibold">
                      <AnimatedText>{item.title.split(" ")[0]}</AnimatedText>{item.title.includes(" ") ? ` ${item.title.split(" ").slice(1).join(" ")}` : ""}
                    </h3>
                    <p className="text-[15px] leading-normal text-[#667085]">{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white py-[60px] text-center">
          <div className={`reveal ${containerClass}`}>
            <Tag>Compare first</Tag>
            <h2 className="section-title mx-auto mt-2 max-w-[820px]">
              Compare the <AnimatedText>products</AnimatedText> first.
            </h2>
            <div className="mt-[30px] flex flex-wrap justify-center gap-3">
              <Cta href="/products#inventory" icon={PackageSearch}>
                Browse products
              </Cta>
              <Cta href="/why-us" icon={ArrowRight} variant="secondary">
                How buying works
              </Cta>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
