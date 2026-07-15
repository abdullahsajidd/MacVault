import { PolicyPage } from "@/components/policy-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Returns and Refunds",
  description: "Read the MacVault return request process and what to check before buying an Apple or PlayStation product in Lahore.",
  path: "/returns",
});

export default function ReturnsPage() {
  return (
    <PolicyPage
      title="Returns and Refunds"
      intro="Return terms depend on the product, condition, and written agreement for the exact unit. Ask for any return window and available remedy before payment."
      sections={[
        {
          title: "Check before payment",
          paragraphs: [
            "Review the exact condition, PTA status, battery or cycle information, specifications, included items, and warranty. If inspection is available, test the product and ask questions before paying.",
          ],
        },
        {
          title: "How to request a return",
          paragraphs: [
            "Contact MacVault as soon as you find a problem. Share the purchase details, a clear explanation, and photos or video. Do not repair, alter, reset, or further damage the product while the request is being reviewed.",
          ],
        },
        {
          title: "When a return may not apply",
          paragraphs: [
            "A return or refund may not apply to a change of mind, disclosed marks or wear, a compatibility issue you could check before purchase, or a feature already explained in writing. Your agreed terms and applicable law still apply.",
          ],
        },
      ]}
    />
  );
}
