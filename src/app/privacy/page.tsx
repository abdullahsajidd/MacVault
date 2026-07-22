import { PolicyPage } from "@/components/policy-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Read how MacVault handles information shared through WhatsApp, phone, email, and website forms.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <PolicyPage
      title="Privacy Policy"
      intro="This policy explains what information MacVault receives when you browse the site or contact us about a product, and how that information is used."
      sections={[
        {
          title: "Information you may share",
          paragraphs: [
            "When you contact us by WhatsApp, phone, email, or a website form, we may receive your name, phone number, email, city, budget, timing, and the product details in your message.",
          ],
        },
        {
          title: "Why we use it",
          paragraphs: [
            "We use the information to answer product questions, prepare a price response, arrange pickup or delivery, provide support, and keep necessary business records. MacVault does not sell your personal information.",
          ],
        },
        {
          title: "Other services involved",
          paragraphs: [
            "WhatsApp, phone, email, website hosting, optional analytics, and delivery providers may process information under their own policies. Optional analytics and technical inquiry details, including your IP address and browser information, are used only after you choose Accept analytics & details in the consent banner. The site stores that choice locally in your browser. Never send a password, one-time code, or unnecessary payment information through chat.",
          ],
        },
        {
          title: "Your choices",
          paragraphs: [
            "You may ask MacVault to correct or delete contact information where applicable. Inquiry and transaction records are kept only as long as reasonably needed for support, legal duties, and business records.",
          ],
        },
      ]}
    />
  );
}
