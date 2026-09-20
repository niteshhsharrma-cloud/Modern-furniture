const devNumber = "9707130860";

const PHONE = import.meta.env.VITE_BUSINESS_PHONE || `977${devNumber}`;
const DISPLAY_PHONE = import.meta.env.VITE_BUSINESS_DISPLAY_PHONE || `+977 ${devNumber}`;
const WHATSAPP = import.meta.env.VITE_WHATSAPP_NUMBER || PHONE;

export default function ContactButtons({ productName }) {
  const message = productName
    ? `Hello, I'm interested in the ${productName}.`
    : "Hello, I'm interested in your furniture.";

  const whatsappUrl = `https://wa.me/${WHATSAPP.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

  return (
    <div className="contact-buttons">
      <a className="button button-primary" href={`tel:+${PHONE.replace(/\D/g, "")}`}>
        Call
      </a>
      <a className="button button-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">
        WhatsApp
      </a>
      <span className="phone-note">{DISPLAY_PHONE}</span>
    </div>
  );
}
