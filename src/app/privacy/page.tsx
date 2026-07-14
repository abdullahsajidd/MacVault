import { PolicyPage } from "@/components/policy-page";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({ title: "Privacy Policy", description: "How MacVault handles information shared through its website and contact channels.", path: "/privacy" });
export default function PrivacyPage() { return <PolicyPage title="Privacy Policy" intro="This policy explains the limited information MacVault receives when you browse the website or contact us about a product." sections={[
  { title: "Information you share", paragraphs: ["When you contact us by WhatsApp, phone, email or a website form, we may receive your name, contact details, city and the product information included in your message."] },
  { title: "How we use it", paragraphs: ["We use this information to answer stock questions, prepare a quote, arrange pickup or delivery, provide order support and keep appropriate business records. We do not sell your personal information."] },
  { title: "Third-party services", paragraphs: ["WhatsApp, phone, email, hosting and delivery providers process information under their own policies. Avoid sending passwords, one-time codes or unnecessary payment information through chat."] },
  { title: "Retention and choices", paragraphs: ["We keep inquiry and transaction information only as long as reasonably needed for support, legal or record-keeping purposes. You may ask us to correct or delete contact information where applicable."] },
]} />; }
