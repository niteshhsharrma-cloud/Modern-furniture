import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="section page-section">
      <div className="container narrow">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <Link className="button button-primary" to="/">Back home</Link>
      </div>
    </section>
  );
}
