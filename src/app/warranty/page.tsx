import { PolicyPage } from "@/components/policy-page";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({ title: "Warranty Information", description: "How warranty terms are communicated for MacVault products.", path: "/warranty" });
export default function WarrantyPage() { return <PolicyPage title="Warranty Information" intro="Warranty coverage varies by model, condition and supplier. The warranty that applies is confirmed for the exact unit before payment." sections={[
  { title: "What to confirm", paragraphs: ["Ask whether the unit has an active manufacturer warranty, a seller-provided checking warranty, or no warranty. Confirm the duration, start date, covered faults, and required proof of purchase in writing."] },
  { title: "What may not be covered", paragraphs: ["Unless specifically included in the confirmed terms, coverage commonly excludes accidental or liquid damage, misuse, unauthorized repair, cosmetic wear, normal battery degradation, and software or account issues."] },
  { title: "Making a claim", paragraphs: ["Contact MacVault with your order details, the device serial or IMEI where applicable and a clear description of the fault. We will explain the next diagnostic or service step under the warranty confirmed for your unit."] },
]} />; }
