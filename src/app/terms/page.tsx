import { PolicyPage } from "@/components/policy-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Website and Purchase Terms",
  description: "Read the MacVault terms for product information, availability, payments, reservations, and website use.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <PolicyPage
      title="Website and Purchase Terms"
      intro="These terms explain how website product information, enquiries, reservations, and agreed purchases work with MacVault."
      sections={[
        {
          title: "Stock, price, and availability",
          paragraphs: [
            "A product page shows the information available when it was updated. Stock, price, condition, colour, and included items can change. A purchase moves forward only after MacVault and the buyer agree on the exact unit and final terms.",
          ],
        },
        {
          title: "Photos and product information",
          paragraphs: [
            "Ask for current photos or video when condition matters. Read the specifications carefully and confirm any unit-specific detail before travelling or paying.",
          ],
        },
        {
          title: "Payments and reservations",
          paragraphs: [
            "Get the payment amount, recipient details, product, condition, included items, warranty, and reservation terms in writing. Do not send money to a number or account that has not been confirmed through the contact details published on this website.",
          ],
        },
        {
          title: "Using this website",
          paragraphs: [
            "You may use the website for lawful product research and enquiries. Do not copy the MacVault name, branding, content, or product presentation in a way that misrepresents another business as MacVault.",
          ],
        },
      ]}
    />
  );
}
