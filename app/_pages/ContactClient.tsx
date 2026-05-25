"use client";

import React, { useState } from "react";
import { SERIF, SANS, T } from "../_components/tokens";
import { Sep, withSeps } from "../_components/Punc";
import { MatImage } from "../_components/MatImage";
import { MAT_IMAGES } from "../_components/data";

const FAQS: [string, string][] = [
  [
    "How early should we book?",
    "Six to ten months before the date is comfortable. We hold one slot per month — December and February usually go first.",
  ],
  [
    "Do you travel?",
    "Yes, anywhere in India and worldwide. Travel and stay are billed at cost, with no markup.",
  ],
  [
    "What is the turnaround?",
    "A teaser within seven days. The full edit and album within twelve weeks.",
  ],
  [
    "Will you photograph us in a documentary style?",
    "Yes. We don't pose unless asked. The whole point of our work is that you forget we are there.",
  ],
];

type FormState = {
  names: string;
  email: string;
  phone: string;
  date: string;
  venue: string;
  pkg: string;
  message: string;
};

const INITIAL: FormState = {
  names: "",
  email: "",
  phone: "",
  date: "",
  venue: "",
  pkg: "",
  message: "",
};

const PACKAGES = [
  "Photography only",
  "Photography + Film",
  "Photography + Film + Album",
  "Not sure yet",
] as const;

/* ─────────────────────────────────────────────────────────────
   FORM FIELD — uppercase label above, visible sage-light input
   below with sage focus border. Designed so a glance reads "here
   is where you write something."
   ───────────────────────────────────────────────────────────── */
function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  span = 1,
}: {
  label: string;
  name: keyof FormState;
  value: string;
  onChange: (k: keyof FormState, v: string) => void;
  type?: "text" | "email" | "tel" | "date";
  placeholder?: string;
  required?: boolean;
  span?: 1 | 2;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <label
      style={{
        display: "block",
        gridColumn: span === 2 ? "span 2" : "span 1",
      }}
    >
      <div
        style={{
          fontFamily: SANS,
          fontSize: 10,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: T.sage,
          marginBottom: 10,
        }}
      >
        {label}
        {required && <span style={{ opacity: 0.6 }}> *</span>}
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        required={required}
        style={{
          width: "100%",
          padding: "14px 0",
          border: "none",
          borderBottom: `1px solid ${focused ? T.sage : "rgba(26,26,26,0.25)"}`,
          background: "transparent",
          fontFamily: SERIF,
          fontSize: 18,
          color: T.ink,
          outline: "none",
          transition: "border-bottom-color 220ms ease",
        }}
      />
    </label>
  );
}

function TextAreaField({
  label,
  name,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  name: keyof FormState;
  value: string;
  onChange: (k: keyof FormState, v: string) => void;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <label style={{ display: "block", gridColumn: "span 2" }}>
      <div
        style={{
          fontFamily: SANS,
          fontSize: 10,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: T.sage,
          marginBottom: 10,
        }}
      >
        {label}
      </div>
      <textarea
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        rows={5}
        style={{
          width: "100%",
          padding: "14px 16px",
          border: `1px solid ${focused ? T.sage : "rgba(26,26,26,0.15)"}`,
          background: "transparent",
          fontFamily: SERIF,
          fontSize: 18,
          color: T.ink,
          outline: "none",
          resize: "vertical",
          minHeight: 140,
          transition: "border-color 220ms ease",
          fontStyle: "italic",
        }}
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: keyof FormState;
  value: string;
  onChange: (k: keyof FormState, v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <label style={{ display: "block", gridColumn: "span 2" }}>
      <div
        style={{
          fontFamily: SANS,
          fontSize: 10,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: T.sage,
          marginBottom: 10,
        }}
      >
        {label}
      </div>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          padding: "14px 24px 14px 0",
          border: "none",
          borderBottom: `1px solid ${focused ? T.sage : "rgba(26,26,26,0.25)"}`,
          backgroundColor: "transparent",
          fontFamily: SERIF,
          fontSize: 18,
          color: value ? T.ink : "rgba(26,26,26,0.5)",
          outline: "none",
          appearance: "none",
          WebkitAppearance: "none",
          MozAppearance: "none",
          backgroundImage: `linear-gradient(45deg, transparent 50%, ${T.sage} 50%), linear-gradient(135deg, ${T.sage} 50%, transparent 50%)`,
          backgroundPosition:
            "calc(100% - 12px) center, calc(100% - 6px) center",
          backgroundSize: "6px 6px, 6px 6px",
          backgroundRepeat: "no-repeat",
          transition: "border-bottom-color 220ms ease",
        }}
      >
        <option value="">Choose one…</option>
        {PACKAGES.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
    </label>
  );
}

function FAQRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderTop: `1px solid ${T.ink}15`,
        cursor: "pointer",
      }}
      onClick={() => setOpen((v) => !v)}
    >
      <div
        style={{
          padding: "28px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontFamily: SERIF,
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: 24,
          }}
        >
          {q}
        </h3>
        <span
          style={{
            color: T.sage,
            fontFamily: SERIF,
            fontSize: 28,
            transform: open ? "rotate(45deg)" : "rotate(0)",
            transition: "transform 320ms ease",
          }}
        >
          +
        </span>
      </div>
      <div
        style={{
          maxHeight: open ? 200 : 0,
          overflow: "hidden",
          transition: "max-height 480ms ease, padding 320ms ease",
          fontFamily: SANS,
          fontSize: 14,
          lineHeight: 1.7,
          opacity: 0.78,
          paddingBottom: open ? 28 : 0,
          maxWidth: 720,
        }}
      >
        {withSeps(a)}
      </div>
    </div>
  );
}

export function ContactClient() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  const update = (k: keyof FormState, v: string) =>
    setForm((s) => ({ ...s, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      {/* HERO — text on the left, editorial portrait on the right.
          Photo doubles as a visual cue that this is a real human studio. */}
      <section
        className="mat-contact-hero"
        style={{
          padding: "160px 40px 80px",
          background: T.paper,
          display: "grid",
          gridTemplateColumns: "6fr 6fr",
          gap: 64,
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              fontFamily: SANS,
              fontSize: 10,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: T.sage,
              marginBottom: 24,
            }}
          >
            Begin<Sep />Six Slots<Sep />Season 26 / 27
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 300,
              fontSize: "clamp(48px, 7vw, 88px)",
              lineHeight: 0.98,
              letterSpacing: "-0.02em",
              textWrap: "balance",
            }}
          >
            <span style={{ fontStyle: "italic" }}>Tell us</span> about your day
            <span style={{ color: T.sage }}>.</span>
          </h1>
          <p
            style={{
              marginTop: 24,
              maxWidth: 480,
              fontFamily: SERIF,
              fontStyle: "italic",
              fontSize: 18,
              lineHeight: 1.55,
              opacity: 0.82,
            }}
          >
            We answer every enquiry within thirty-six hours. Tell us a little, and
            we&apos;ll send a slow, handwritten reply.
          </p>
          <div
            style={{
              marginTop: 40,
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontFamily: SANS,
              fontSize: 11,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: T.sage,
            }}
          >
            <span
              aria-hidden
              style={{
                display: "inline-block",
                width: 36,
                height: 1,
                background: T.sage,
              }}
            />
            Scroll to the enquiry form
          </div>
        </div>
        <div
          style={{
            aspectRatio: "4/5",
            overflow: "hidden",
            background: "#0e0e0e",
            position: "relative",
          }}
        >
          <MatImage
            image={MAT_IMAGES.couple2}
            variant="Grid"
            alt="A couple, quietly photographed"
          />
        </div>
      </section>

      {/* AVAILABILITY STRIP */}
      <section
        style={{
          padding: "32px 40px",
          background: T.sage,
          color: T.paper,
          borderTop: "1px solid rgba(0,0,0,0.14)",
          borderBottom: "1px solid rgba(0,0,0,0.14)",
          textAlign: "center",
          fontFamily: SERIF,
          fontStyle: "italic",
          fontSize: 18,
          opacity: 0.85,
        }}
      >
        Four of six dates remain for winter twenty-twenty-six.
        <span style={{ marginLeft: 16, color: T.cream }}>
          December and February are taken.
        </span>
      </section>

      {/* FORM — photo column on the left + a clear, single-page form
          on the right. Every field is labelled and visibly inputtable. */}
      <section
        id="enquiry"
        className="mat-contact-form"
        style={{
          padding: "120px 40px",
          background: T.paper,
          display: "grid",
          gridTemplateColumns: "5fr 7fr",
          gap: 72,
          alignItems: "start",
        }}
      >
        <div style={{ position: "sticky", top: 120 }}>
          <div
            style={{
              aspectRatio: "3/4",
              overflow: "hidden",
              background: "#0e0e0e",
              marginBottom: 32,
            }}
          >
            <MatImage
              image={MAT_IMAGES.detail2}
              variant="Grid"
              alt="A quiet moment from a wedding day"
            />
          </div>
          <div
            style={{
              fontFamily: SANS,
              fontSize: 10,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: T.sage,
              marginBottom: 16,
            }}
          >
            01<Sep />The Enquiry Form
          </div>
          <h2
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "clamp(28px, 3.4vw, 40px)",
              lineHeight: 1.18,
            }}
          >
            Write to us
            <span style={{ color: T.sage }}>.</span> A few details is enough
            <span style={{ color: T.sage }}>.</span>
          </h2>
          <p
            style={{
              marginTop: 18,
              fontFamily: SANS,
              fontSize: 14,
              lineHeight: 1.75,
              opacity: 0.78,
              maxWidth: 360,
            }}
          >
            Submissions reach Aanya by email and WhatsApp at the same time. She
            answers personally<Sep />never an assistant.
          </p>
          <div
            style={{
              marginTop: 32,
              fontFamily: SANS,
              fontSize: 11,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: T.sage,
              opacity: 0.85,
            }}
          >
            Or write directly
          </div>
          <div
            style={{
              marginTop: 8,
              fontFamily: SERIF,
              fontStyle: "italic",
              fontSize: 17,
              lineHeight: 1.55,
            }}
          >
            hello@miamortales.com
            <br />
            +91 99 28 41 21 12
          </div>
        </div>

        <div>
          {submitted ? (
            <div
              style={{
                padding: "60px 40px",
                background: T.sageLighter,
                border: `1px solid ${T.sage}25`,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: SANS,
                  fontSize: 10,
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: T.sage,
                  marginBottom: 22,
                }}
              >
                Received
              </div>
              <h3
                style={{
                  margin: 0,
                  fontFamily: SERIF,
                  fontWeight: 300,
                  fontStyle: "italic",
                  fontSize: "clamp(28px, 3.4vw, 40px)",
                  lineHeight: 1.2,
                  textWrap: "balance",
                }}
              >
                Thank you{", "}
                <span style={{ color: T.sage }}>{form.names || "friends"}</span>
                <span style={{ color: T.sage }}>.</span>
              </h3>
              <p
                style={{
                  marginTop: 18,
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontSize: 18,
                  opacity: 0.82,
                  maxWidth: 480,
                  marginInline: "auto",
                }}
              >
                We&apos;ll reply within thirty-six hours. If urgent, WhatsApp Aanya
                directly at the number on the left.
              </p>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "28px 24px",
              }}
            >
              <Field
                label="Your names"
                name="names"
                value={form.names}
                onChange={update}
                placeholder="Riya & Mohit"
                required
                span={2}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={update}
                placeholder="you@example.com"
                required
              />
              <Field
                label="Phone / WhatsApp"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={update}
                placeholder="+91"
              />
              <Field
                label="Wedding date (or season)"
                name="date"
                value={form.date}
                onChange={update}
                placeholder="November 2026, or Winter 26-27"
              />
              <Field
                label="Venue or city"
                name="venue"
                value={form.venue}
                onChange={update}
                placeholder="Udaipur, Jaipur, Goa…"
              />
              <SelectField
                label="What you&apos;re imagining"
                name="pkg"
                value={form.pkg}
                onChange={update}
              />
              <TextAreaField
                label="Anything else?"
                name="message"
                value={form.message}
                onChange={update}
                placeholder="Tell us a little about how you two met, what the day will feel like, who&apos;s travelling in…"
              />
              <div
                style={{
                  gridColumn: "span 2",
                  marginTop: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 18,
                }}
              >
                <div
                  style={{
                    fontFamily: SANS,
                    fontSize: 11,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: T.sage,
                    opacity: 0.78,
                  }}
                >
                  We reply within 36 hours.
                </div>
                <button
                  type="submit"
                  data-cursor="Send"
                  style={{
                    padding: "18px 40px",
                    border: "none",
                    background: T.sage,
                    color: T.paper,
                    fontFamily: SANS,
                    fontSize: 11,
                    letterSpacing: "0.36em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "background 220ms ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = T.ink;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = T.sage;
                  }}
                >
                  Send enquiry →
                </button>
              </div>
            </form>
          )}
        </div>

        <style>{`
          @media (max-width: 880px) {
            .mat-contact-hero {
              grid-template-columns: 1fr !important;
              gap: 40px !important;
              padding: 120px 24px 60px !important;
            }
            .mat-contact-form {
              grid-template-columns: 1fr !important;
              gap: 48px !important;
              padding: 80px 24px !important;
            }
            .mat-contact-form > div:first-child {
              position: static !important;
            }
          }
          @media (max-width: 640px) {
            .mat-contact-form form {
              grid-template-columns: 1fr !important;
            }
            .mat-contact-form form > * {
              grid-column: span 1 !important;
            }
          }
        `}</style>
      </section>

      {/* FAQ */}
      <section
        style={{
          padding: "120px 40px",
          background: T.paper,
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 40,
            flexWrap: "wrap",
            gap: 16,
            maxWidth: 1100,
            marginInline: "auto",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 300,
              fontSize: "clamp(32px, 4vw, 48px)",
              lineHeight: 1.05,
            }}
          >
            <span style={{ fontStyle: "italic" }}>Questions</span> couples ask
            <span style={{ color: T.sage }}>.</span>
          </h2>
          <div
            style={{
              fontFamily: SANS,
              fontSize: 10,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: T.sage,
            }}
          >
            02<Sep />Frequently
          </div>
        </header>
        <div style={{ maxWidth: 1100, marginInline: "auto" }}>
          {FAQS.map(([q, a], i) => (
            <FAQRow key={i} q={q} a={a} />
          ))}
          <div style={{ borderTop: `1px solid ${T.ink}15` }} />
        </div>
      </section>
    </main>
  );
}
