import { createWhatsappHref } from "@/data/contact";

type VisitorContext = {
  ip: string;
  userAgent: string;
};

type ConsentChoice = "accepted" | "rejected";

const CONSENT_STORAGE_KEY = "macvault-privacy-consent";

function requestTechnicalConsent() {
  const savedChoice = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  if (savedChoice === "accepted") return Promise.resolve<ConsentChoice>("accepted");

  return new Promise<ConsentChoice>((resolve) => {
    function handleChoice(event: Event) {
      resolve((event as CustomEvent<{ choice: ConsentChoice }>).detail.choice);
    }

    window.addEventListener("macvault:consent-choice", handleChoice, { once: true });
    window.dispatchEvent(new Event("macvault:request-technical-consent"));
  });
}

async function getTechnicalDetails() {
  const consent = await requestTechnicalConsent();
  if (consent !== "accepted") return "";

  try {
    const response = await fetch("/api/visitor-context", { cache: "no-store" });
    if (!response.ok) throw new Error("Visitor context request failed");

    const context = (await response.json()) as VisitorContext;
    return [
      "",
      "Visitor details (shared with consent):",
      `IP: ${context.ip}`,
      `Browser: ${navigator.userAgent || context.userAgent}`,
      `Language: ${navigator.language || "Not available"}`,
      `Platform: ${navigator.platform || "Not available"}`,
      `Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone || "Not available"}`,
      `Viewport: ${window.innerWidth}x${window.innerHeight}`,
    ].join("\n");
  } catch {
    return "\nVisitor details: Not available";
  }
}

export async function openConsentAwareWhatsapp(message: string) {
  const technicalDetails = await getTechnicalDetails();
  window.location.href = createWhatsappHref(`${message}${technicalDetails}`);
}

export function productInquiryMessage(productName: string, productUrl: string) {
  const resolvedUrl = new URL(productUrl, window.location.origin).toString();

  return `Hi MacVault, I want to confirm today’s price for ${productName}.\nProduct URL: ${resolvedUrl}\n\nPlease share the final price range, exact condition, current photos, warranty, and included items.`;
}
