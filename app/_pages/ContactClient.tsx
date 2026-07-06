"use client";

import React, { useEffect, useRef, useState } from "react";
import { SERIF, SANS, DISPLAY, T, LAYOUT } from "../_components/tokens";
import { Sep, withSeps } from "../_components/Punc";
import { MatImage } from "../_components/MatImage";
import { MAT_IMAGES } from "../_components/data";

const FAQS: [string, string][] = [
  [
    "How early should we book?",
    "Six to ten months ahead is comfortable. We take one wedding a month — December and February go first.",
  ],
  [
    "Do you travel?",
    "Anywhere in India and worldwide. Travel and stay are billed at cost, never marked up.",
  ],
  [
    "What is the turnaround?",
    "A teaser within seven days. Your full gallery and album within twelve weeks.",
  ],
  [
    "Is your work documentary?",
    "Yes. We pose only when asked — the rest of the day, you forget we're there.",
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
      className="mat-field"
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
        className="mat-field-input"
        style={{
          width: "100%",
          padding: "14px 0",
          minHeight: 48,
          border: "none",
          borderBottom: `1px solid ${focused ? T.sage : "rgba(26,26,26,0.25)"}`,
          background: "transparent",
          fontFamily: SERIF,
          fontSize: 18,
          color: T.ink,
          outline: "none",
          transition: "border-bottom-color 220ms ease",
          appearance: "none",
          WebkitAppearance: "none",
          borderRadius: 0,
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
        className="mat-field-textarea"
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
          appearance: "none",
          WebkitAppearance: "none",
          borderRadius: 0,
        }}
      />
    </label>
  );
}

/* Custom dropdown — uses a popup panel instead of the native <select>
   so the field matches the rest of the brand: serif type, sage line,
   sage hover highlight, paper menu surface. Closes on outside click
   and Escape. */
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
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleMouseDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        gridColumn: "span 2",
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
      </div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="mat-select-trigger"
        style={{
          width: "100%",
          padding: "14px 28px 14px 0",
          minHeight: 48,
          border: "none",
          borderBottom: `1px solid ${focused || open ? T.sage : "rgba(26,26,26,0.25)"}`,
          backgroundColor: "transparent",
          fontFamily: SERIF,
          fontSize: 18,
          color: value ? T.ink : "rgba(26,26,26,0.5)",
          outline: "none",
          textAlign: "left",
          cursor: "pointer",
          transition: "border-bottom-color 220ms ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>{value || "Choose one…"}</span>
        <span
          aria-hidden
          style={{
            display: "inline-block",
            width: 8,
            height: 8,
            borderRight: `1.5px solid ${T.sage}`,
            borderBottom: `1.5px solid ${T.sage}`,
            transform: open ? "rotate(-135deg)" : "rotate(45deg)",
            transition: "transform 220ms ease",
            marginBottom: open ? 0 : 4,
          }}
        />
      </button>
      {open && (
        <div
          role="listbox"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "calc(100% + 6px)",
            background: T.paper,
            border: "1px solid rgba(26,26,26,0.15)",
            boxShadow: "0 14px 38px rgba(26,26,26,0.10)",
            zIndex: 100,
            overflow: "hidden",
          }}
        >
          {PACKAGES.map((p) => {
            const selected = value === p;
            return (
              <button
                key={p}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => {
                  onChange(name, p);
                  setOpen(false);
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = T.sageLighter;
                  e.currentTarget.style.color = T.sage;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = selected
                    ? T.sageLight
                    : "transparent";
                  e.currentTarget.style.color = T.ink;
                }}
                className="mat-select-option"
                style={{
                  width: "100%",
                  padding: "14px 18px",
                  minHeight: 48,
                  border: "none",
                  borderBottom: "1px solid rgba(26,26,26,0.06)",
                  background: selected ? T.sageLight : "transparent",
                  fontFamily: SERIF,
                  fontSize: 17,
                  color: T.ink,
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "background 180ms ease, color 180ms ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>{p}</span>
                {selected && (
                  <span
                    aria-hidden
                    style={{
                      fontFamily: SANS,
                      fontSize: 10,
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: T.sage,
                    }}
                  >
                    Selected
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function FAQRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="mat-faq-row"
      style={{
        borderTop: `1px solid ${T.ink}15`,
        cursor: "pointer",
      }}
      onClick={() => setOpen((v) => !v)}
    >
      <div
        className="mat-faq-head"
        style={{
          padding: "28px 0",
          minHeight: 76,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
        }}
      >
        <h3
          className="mat-faq-q"
          style={{
            margin: 0,
            fontFamily: SERIF,
            fontWeight: 500,
            fontStyle: "italic",
            fontSize: "clamp(18px, 2.4vw, 24px)",
            lineHeight: 1.25,
          }}
        >
          {q}
        </h3>
        <span
          aria-hidden
          style={{
            color: T.sage,
            fontFamily: SERIF,
            fontSize: 28,
            flexShrink: 0,
            width: 32,
            textAlign: "center",
            transform: open ? "rotate(45deg)" : "rotate(0)",
            transition: "transform 320ms ease",
          }}
        >
          +
        </span>
      </div>
      <div
        className="mat-faq-body"
        style={{
          maxHeight: open ? 400 : 0,
          overflow: "hidden",
          transition: "max-height 480ms ease, padding 320ms ease",
          fontFamily: SANS,
          fontSize: 15,
          lineHeight: 1.7,
          opacity: 0.78,
          paddingBottom: open ? 28 : 0,
          maxWidth: LAYOUT.maxText,
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
      {/* HERO — centered editorial text. The form section below has its
          own photo, so the hero stays clean and unbreakable. */}
      <section
        className="mat-contact-hero"
        style={{
          padding: `180px ${LAYOUT.gutter} ${LAYOUT.sectionTight}`,
          background: T.paper,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontFamily: SANS,
            fontSize: 10,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: T.sage,
            marginBottom: 32,
            position: "relative",
            zIndex: 1,
          }}
        >
          Enquire<Sep />Six Dates<Sep />Season 26 / 27
        </div>
        <h1
          className="mat-contact-hero-title"
          style={{
            margin: 0,
            fontFamily: DISPLAY,
            fontWeight: 300,
            fontSize: "clamp(36px, 7.6vw, 96px)",
            lineHeight: 0.98,
            letterSpacing: "-0.02em",
            maxWidth: 1080,
            marginInline: "auto",
            position: "relative",
            zIndex: 1,
            textWrap: "balance",
          }}
        >
          <span>Let&apos;s begin</span> your story
          <span style={{ color: T.sage }}>.</span>
        </h1>
        <p
          className="mat-contact-hero-lede"
          style={{
            margin: "28px auto 0",
            maxWidth: 580,
            fontFamily: SERIF,
            fontStyle: "italic",
            fontSize: "clamp(16px, 1.9vw, 19px)",
            lineHeight: 1.55,
            opacity: 0.82,
            position: "relative",
            zIndex: 1,
            textWrap: "balance",
          }}
        >
          Tell us a little about your day. We read every enquiry ourselves and
          reply within thirty-six hours.
        </p>
      </section>

      {/* AVAILABILITY STRIP */}
      <section
        className="mat-contact-availability"
        style={{
          padding: `${LAYOUT.gutterTight} ${LAYOUT.gutter}`,
          background: T.sage,
          color: T.paper,
          borderTop: "1px solid rgba(0,0,0,0.14)",
          borderBottom: "1px solid rgba(0,0,0,0.14)",
          textAlign: "center",
          fontFamily: SERIF,
          fontStyle: "italic",
          fontSize: "clamp(15px, 1.7vw, 18px)",
          lineHeight: 1.5,
          opacity: 0.85,
        }}
      >
        Four dates open for winter twenty-twenty-six.
        <span className="mat-availability-tail" style={{ marginLeft: 16, color: T.cream }}>
          December and February are taken.
        </span>
      </section>

      {/* FORM — photo column on the left + a clear, single-page form
          on the right. Every field is labelled and visibly inputtable. */}
      <section
        id="enquiry"
        className="mat-contact-form"
        style={{
          padding: `${LAYOUT.section} ${LAYOUT.gutter}`,
          background: T.paper,
          display: "grid",
          gridTemplateColumns: "5fr 7fr",
          gap: "clamp(40px, 5vw, 72px)",
          alignItems: "start",
          maxWidth: 1120,
          marginInline: "auto",
        }}
      >
        <div className="mat-contact-info">
          <div
            className="mat-contact-info-image"
            style={{
              position: "relative",
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
            01<Sep />Enquiry
          </div>
          <h2
            style={{
              margin: 0,
              fontFamily: DISPLAY,
              fontWeight: 300,
              fontSize: "clamp(28px, 3.4vw, 40px)",
              lineHeight: 1.18,
            }}
          >
            Tell us about your day
            <span style={{ color: T.sage }}>.</span> A few details is plenty
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
            Your enquiry reaches Aanya by email and WhatsApp at once. She replies
            herself<Sep />never an assistant.
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
            Or reach us directly
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
              className="mat-contact-success"
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
                Enquiry received
              </div>
              <h3
                style={{
                  margin: 0,
                  fontFamily: DISPLAY,
                  fontWeight: 300,
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
                Aanya will write back within thirty-six hours. In a hurry? WhatsApp
                her on the number to the left.
              </p>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px 24px",
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
                placeholder="+91 …"
              />
              <Field
                label="Wedding date or season"
                name="date"
                value={form.date}
                onChange={update}
                placeholder="Nov 2026, or Winter 26–27"
              />
              <Field
                label="Venue or city"
                name="venue"
                value={form.venue}
                onChange={update}
                placeholder="Udaipur, Jaipur, Goa…"
              />
              <SelectField
                label="What you’re imagining"
                name="pkg"
                value={form.pkg}
                onChange={update}
              />
              <TextAreaField
                label="Anything else?"
                name="message"
                value={form.message}
                onChange={update}
                placeholder="How you two met, what the day will feel like, who’s travelling in…"
              />
              <div
                className="mat-contact-send"
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
                  A reply within 36 hours.
                </div>
                <button
                  type="submit"
                  data-cursor="Check"
                  className="mat-contact-submit"
                  style={{
                    padding: "18px 40px",
                    minHeight: 52,
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
                  Check availability →
                </button>
              </div>
            </form>
          )}
        </div>

        <style>{`
          /* Section paddings/gaps now come from the LAYOUT clamps, so the
             only responsive work left is the hero's nav clearance, layout
             reflow + touch ergonomics. The hero keeps a fixed top inset
             (matching the other pages) so the fixed nav never clips it. */
          @media (max-width: 880px) {
            .mat-contact-hero { padding-top: 140px !important; }
          }
          @media (max-width: 414px) {
            .mat-contact-hero { padding-top: 120px !important; }
          }

          /* Collapse the photo + form into one column, and keep the 3:4 info
             photo editorial-sized (not full-bleed-wide) on phones. */
          @media (max-width: 880px) {
            .mat-contact-form {
              grid-template-columns: 1fr !important;
            }
            .mat-contact-info-image {
              max-width: 460px !important;
              margin-inline: auto !important;
            }
          }
          /* Stack the availability sentence's tail on narrow screens. */
          @media (max-width: 720px) {
            .mat-availability-tail {
              display: block !important;
              margin-left: 0 !important;
              margin-top: 4px !important;
            }
          }
          @media (max-width: 640px) {
            .mat-contact-form form {
              grid-template-columns: 1fr !important;
            }
            .mat-contact-form form > * {
              grid-column: span 1 !important;
            }
            /* iOS zoom-on-focus avoidance — keep rendered input text ≥16px. */
            .mat-contact-form input,
            .mat-contact-form textarea,
            .mat-contact-form .mat-select-trigger,
            .mat-contact-form .mat-select-option {
              font-size: 16px !important;
            }
            /* Full-width send button + stacked helper on phones. */
            .mat-contact-send {
              flex-direction: column !important;
              align-items: stretch !important;
              gap: 16px !important;
            }
            .mat-contact-submit {
              width: 100% !important;
              padding: 18px 24px !important;
            }
          }
        `}</style>
      </section>

      {/* FAQ */}
      <section
        className="mat-contact-faq"
        style={{
          padding: `${LAYOUT.section} ${LAYOUT.gutter}`,
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
              fontFamily: DISPLAY,
              fontWeight: 300,
              fontSize: "clamp(28px, 4vw, 48px)",
              lineHeight: 1.05,
            }}
          >
            <span>Questions</span> couples ask
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
            02<Sep />Good to Know
          </div>
        </header>
        <div style={{ maxWidth: 1100, marginInline: "auto" }}>
          {FAQS.map(([q, a], i) => (
            <FAQRow key={i} q={q} a={a} />
          ))}
          <div style={{ borderTop: `1px solid ${T.ink}15` }} />
        </div>
        <style>{`
          /* Padding comes from the LAYOUT clamps; only tighten the accordion
             rows on small screens. */
          @media (max-width: 720px) {
            .mat-contact-faq .mat-faq-head {
              padding: 22px 0 !important;
              min-height: 64px !important;
            }
            .mat-contact-faq .mat-faq-body {
              font-size: 14px !important;
            }
          }
        `}</style>
      </section>
    </main>
  );
}
