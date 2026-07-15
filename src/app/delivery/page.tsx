import { PolicyPage } from "@/components/policy-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pickup and Delivery in Lahore",
  description: "Read how MacVault arranges Lahore pickup and discusses delivery for Apple and PlayStation products before payment.",
  path: "/delivery",
});

export default function DeliveryPage() {
  return (
    <PolicyPage
      title="Pickup and Delivery"
      intro="Pickup and delivery depend on the exact product and your location. Get the location, time, charge, payment method, and inspection limits in writing before you travel or send payment."
      sections={[
        {
          title: "Lahore pickup",
          paragraphs: [
            "Ask whether pickup and inspection are available for the product. Wait until MacVault confirms that the exact unit is ready, then agree on the location and time before travelling.",
          ],
        },
        {
          title: "Delivery to your city",
          paragraphs: [
            "Send your city and the full product name on WhatsApp. Before dispatch, get the delivery time, charge, payment method, courier details, and any limits on opening or inspecting the package.",
          ],
        },
        {
          title: "When the product arrives",
          paragraphs: [
            "Check the outer package before accepting it. If the package is damaged or the product does not match the written order details, contact MacVault immediately and keep the box, photos, video, and courier evidence.",
          ],
        },
      ]}
    />
  );
}
