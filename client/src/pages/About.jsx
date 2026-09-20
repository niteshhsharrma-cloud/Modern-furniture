import ContactButtons from "../components/ContactButtons";

export default function About() {
  const number = import.meta.env.VITE_BUSINESS_DISPLAY_PHONE
  return (
    <section className="section page-section">
      <div className="container narrow">
        <p className="eyebrow">Business information</p>
        <h1>Modern Furniture Hetauda</h1>
        <p className="lead">
          A local furniture business in Hetauda offering modern and practical
          furniture for homes.
        </p>

        <div className="business-details">
          <div><span>Location</span><strong>Hetauda, Nepal</strong></div>
          <div><span>Phone</span><strong>{number}</strong></div>
          <div><span>Opening hours</span><strong>Sun–Fri, 9:00 AM–6:00 PM</strong></div>
        </div>

        <ContactButtons />
      </div>
    </section>
  );
}
