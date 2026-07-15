import { PolicyPage } from "@/components/policy-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Product Warranty Information",
  description: "Understand Apple warranty, checking warranty, coverage limits, and claim steps for products bought from MacVault Lahore.",
  path: "/warranty",
});

export default function WarrantyPage() {
  return (
    <PolicyPage
      title="Warranty Information"
      intro="Warranty is not the same for every product. Before payment, get the warranty type, duration, start date, covered faults, and proof required for the exact unit in writing."
      sections={[
        {
          title: "Three warranty possibilities",
          paragraphs: [
            "A product may have active Apple or manufacturer warranty, a MacVault or supplier checking warranty, or no warranty. Do not assume coverage from the model name or condition. Ask which one applies to the exact unit.",
          ],
        },
        {
          title: "What is usually not covered",
          paragraphs: [
            "Unless your written terms say otherwise, warranty commonly excludes accidental damage, liquid damage, misuse, unauthorised repair, cosmetic wear, normal battery ageing, and software or account problems.",
          ],
        },
        {
          title: "How to request help",
          paragraphs: [
            "Contact MacVault with your purchase details, the device serial number or IMEI where relevant, photos or video of the problem, and a simple description of what happened. Keep the invoice and written warranty terms.",
          ],
        },
      ]}
    />
  );
}
