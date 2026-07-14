import { PolicyPage } from "@/components/policy-page";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({ title: "Returns and Refunds", description: "MacVault return and refund request guidance.", path: "/returns" });
export default function ReturnsPage() { return <PolicyPage title="Returns and Refunds" intro="Return eligibility depends on the product condition and the terms confirmed for the exact unit. Review those terms before completing your purchase." sections={[
  { title: "Before payment", paragraphs: ["Inspect or review the exact unit details, including condition, PTA status, battery or cycle information, accessories and warranty. Ask any questions before paying."] },
  { title: "Requesting a return", paragraphs: ["Contact MacVault as soon as possible with your order details and a clear explanation of the issue. Do not alter, repair, reset or further damage the item while a request is being reviewed."] },
  { title: "Eligibility", paragraphs: ["A return or refund is not automatic for change of mind, disclosed cosmetic condition, compatibility misunderstandings or a feature already described before purchase. Any applicable acceptance window and remedy are the terms confirmed in writing for that unit and are subject to applicable law."] },
]} />; }
