import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

type FormState = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  contactTime: string;
};

const App: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    interest: "30 x 40",
    contactTime: "Anytime",
  });
  const [submitted, setSubmitted] = useState(false);

  const offerDeadline = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 10); // 10-day limited offer
    d.setHours(23, 59, 59, 999);
    return d;
  }, []);

  const [timeLeft, setTimeLeft] = useState<number>(Math.max(0, offerDeadline.getTime() - Date.now()));

  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft(Math.max(0, offerDeadline.getTime() - Date.now()));
    }, 1000);
    return () => clearInterval(t);
  }, [offerDeadline]);

  const format = (ms: number) => {
    const sec = Math.floor(ms / 1000);
    const days = Math.floor(sec / 86400);
    const hrs = Math.floor((sec % 86400) / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return { days, hrs, mins, s };
  };

  const ts = format(timeLeft);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(import.meta.env.VITE_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form)
      });
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className="site">
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand">Pre‑Launch Plots — Kalaburgi</div>
        </div>
      </header>

      <main>
        <section className="hero container">
          <div className="hero-copy">
            <div className="eyebrow">Pre‑launch opportunity</div>
            <h2 className="hero-title">Secure a plot near Kalaburgi's growing corridor</h2>
            <p className="muted">
              Limited pre‑launch registration for residential plots — prime location just 2 km from Ram Mandir Circle (Kalaburgi) and 3.5 km from Railway Station, Kalaburgi.
            </p>

            <div className="info-row">
              <div className="location">
                <strong>2 km <small>*</small> </strong>
                <span>Ram Mandir Circle</span>
              </div>
              <div className="location">
                <strong>3.5 km <small>*</small> </strong>
                <span>Railway Station</span>
              </div>
              <div className="countdown" aria-live="polite">
                <div className="count-pill">
                  <span className="num">{ts.days}</span>
                  <span className="lbl">days</span>
                </div>
                <div className="count-pill">
                  <span className="num">{String(ts.hrs).padStart(2, "0")}</span>
                  <span className="lbl">hrs</span>
                </div>
                <div className="count-pill">
                  <span className="num">{String(ts.mins).padStart(2, "0")}</span>
                  <span className="lbl">mins</span>
                </div>
                <div className="count-pill">
                  <span className="num">{String(ts.s).padStart(2, "0")}</span>
                  <span className="lbl">secs</span>
                </div>
              </div>
            </div>
          </div>

          <aside className="register-card" aria-labelledby="registerTitle">
            <h3 id="registerTitle">Register for priority access</h3>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="register-form">
                <label>
                  <span>Full name</span>
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" />
                </label>

                <label>
                  <span>Email</span>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" />
                </label>

                <label>
                  <span>Phone</span>
                  <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 9xxxxxxxxx" />
                </label>

                <label>
                  <span>Preferred plot size</span>
                  <select name="interest" value={form.interest} onChange={handleChange}>
                    <option>30 x 40</option>
                    <option>40 x 60</option>
                    <option>60 x 80</option>
                    <option>Custom</option>
                  </select>
                </label>

                <label>
                  <span>Best time to contact</span>
                  <select name="contactTime" value={form.contactTime} onChange={handleChange}>
                    <option>Anytime</option>
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                  </select>
                </label>

                <button type="submit" className="btn primary">Reserve my spot</button>
                <p className="privacy muted">No spam — only priority registration details. Offer valid for a limited time.</p>
              </form>
            ) : (
              <div className="success">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M20 6L9 17l-5-5" stroke="#0b61ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h4>You're on the list</h4>
                <p className="muted">We'll contact you with priority details and next steps.</p>
              </div>
            )}
          </aside>
        </section>

        <section className="values container" aria-hidden>
          <div className="value">
            <h4>Prime location</h4>
            <p className="muted">Minutes from key landmarks — planned development corridor with easy connectivity.</p>
          </div>
          <div className="value">
            <h4>Pre‑launch advantage</h4>
            <p className="muted">Early reservation gives first access to the best plots and layout choices.</p>
          </div>
          <div className="value">
            <h4>Transparent process</h4>
            <p className="muted">Clear timelines, verified titles, and guided handover.</p>
          </div>
        </section>
      </main>

      <footer className="site-footer container">
        <small className="muted">© {new Date().getFullYear()} All rights reserved | </small>
        <small>Made by  <a href="https://www.linkedin.com/in/mahadev-doshetty">Mahadev Doshetty</a> </small>
      </footer>
    </div>
  );
};

export default App;