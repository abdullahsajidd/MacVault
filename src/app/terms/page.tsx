import { PolicyPage } from "@/components/policy-page";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({ title: "Terms of Use", description: "Terms for using the MacVault website and requesting product information.", path: "/terms" });
export default function TermsPage() { return <PolicyPage title="Terms of Use" intro="These terms apply when you use the MacVault website or contact us about a listed product." sections={[
  { title: "Listings and availability", paragraphs: ["Website listings are invitations to inquire, not guaranteed offers. Stock, condition, colour, included accessories and pricing can change. A purchase is confirmed only after MacVault verifies the exact unit and agrees the final details with you."] },
  { title: "Product information", paragraphs: ["We aim to describe each unit accurately. Product photos may be representative unless identified as photos of the exact unit. Ask for current unit details before paying or travelling."] },
  { title: "Payments and reservations", paragraphs: ["Payment, deposit and reservation terms are confirmed for each order. Do not send money to an account or number that has not been confirmed through MacVault's published contact details."] },
  { title: "Website use", paragraphs: ["You may use this website for lawful personal shopping and inquiry. Website content, branding and presentation may not be copied or misrepresented as another business."] },
]} />; }
