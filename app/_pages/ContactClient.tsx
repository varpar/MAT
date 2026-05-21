"use client";

import React, { useState } from "react";
import { SERIF, SANS, T } from "../_components/tokens";
import { Sep, withSeps } from "../_components/Punc";

const STEPS = ["Names", "Date", "Venue", "Package", "Note"] as const;

const PROMPTS: Record<(typeof STEPS)[number], string> = {
  Names: "What should we call you, and your partner?",
  Date: "When are you thinking? Even a season helps.",
  Venue: "Where are you imagining? A city is enough.",
  Package: "Photography only, or film as well?",
  Note: "Anything else we should know about you both?",
};

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
  const [step, setStep] = useState(0);

  return (
    <main>
      <section
        style={{
          padding: "180px 40px 60px",
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
          Begin<Sep />Six Slots<Sep />Season 26 / 27
        </div>
        <h1
          style={{
            margin: 0,
            fontFamily: SERIF,
            fontWeight: 300,
            fontSize: "clamp(56px, 9vw, 96px)",
            lineHeight: 0.96,
            letterSpacing: "-0.02em",
            maxWidth: 1080,
            marginInline: "auto",
            position: "relative",
            zIndex: 1,
            textWrap: "balance",
          }}
        >
          <span style={{ fontStyle: "italic" }}>Tell us</span> about your day
          <span style={{ color: T.sage }}>.</span>
        </h1>
        <p
          style={{
            marginTop: 28,
            maxWidth: 580,
            marginInline: "auto",
            fontFamily: SERIF,
            fontStyle: "italic",
            fontSize: 19,
            lineHeight: 1.55,
            opacity: 0.78,
            position: "relative",
            zIndex: 1,
          }}
        >
          We answer every enquiry within thirty-six hours. Tell us a little, and we&apos;ll
          send a slow, handwritten reply.
        </p>
      </section>

      {/* Availability — single editorial line, no pill grid */}
      <section
        style={{
          padding: "32px 40px",
          background: T.sageLight,
          borderTop: `1px solid ${T.sage}25`,
          borderBottom: `1px solid ${T.sage}25`,
          textAlign: "center",
          fontFamily: SERIF,
          fontStyle: "italic",
          fontSize: 18,
          opacity: 0.85,
        }}
      >
        Four of six dates remain for winter twenty-twenty-six.
        <span style={{ marginLeft: 16, color: T.sage }}>
          December and February are taken.
        </span>
      </section>

      {/* Stepped form */}
      <section
        className="mat-form"
        style={{
          padding: "120px 40px",
          background: T.paper,
          display: "grid",
          gridTemplateColumns: "5fr 7fr",
          gap: 64,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: SANS,
              fontSize: 10,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: T.sage,
              marginBottom: 20,
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
              fontSize: "clamp(28px, 3.5vw, 40px)",
              lineHeight: 1.2,
              maxWidth: 460,
            }}
          >
            Five short questions, three minutes.
          </h2>
          <p
            style={{
              marginTop: 22,
              fontFamily: SANS,
              fontSize: 14,
              lineHeight: 1.75,
              opacity: 0.78,
              maxWidth: 380,
            }}
          >
            Submissions reach Aanya by email and WhatsApp at the same time. She answers
            personally<Sep />never an assistant.
          </p>
          <div
            style={{
              marginTop: 36,
              fontFamily: SANS,
              fontSize: 11,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              opacity: 0.6,
            }}
          >
            Or write directly
          </div>
          <div
            style={{
              marginTop: 8,
              fontFamily: SERIF,
              fontStyle: "italic",
              fontSize: 18,
            }}
          >
            hello@miamortales.com
            <br />
            +91 99 28 41 21 12
          </div>
        </div>
        <div>
          <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
            {STEPS.map((s, i) => (
              <button
                key={s}
                onClick={() => setStep(i)}
                aria-label={`Go to step ${i + 1}`}
                style={{
                  flex: 1,
                  height: 2,
                  background: i <= step ? T.sage : `${T.ink}15`,
                  cursor: "pointer",
                  border: "none",
                  padding: 0,
                  transition: "background 320ms ease",
                }}
              />
            ))}
          </div>
          <div
            style={{
              fontFamily: SANS,
              fontSize: 10,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: T.sage,
              marginBottom: 18,
            }}
          >
            Step 0{step + 1}<Sep />{STEPS[step]}
          </div>
          <div
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontSize: "clamp(22px, 2.6vw, 28px)",
              fontWeight: 300,
              lineHeight: 1.35,
              minHeight: 96,
              textWrap: "balance",
            }}
          >
            {PROMPTS[STEPS[step]]}
          </div>
          <input
            type="text"
            placeholder="Type here…"
            style={{
              marginTop: 32,
              width: "100%",
              padding: "14px 0",
              border: "none",
              borderBottom: `1px solid ${T.ink}40`,
              background: "transparent",
              fontFamily: SERIF,
              fontSize: 20,
              fontStyle: "italic",
              outline: "none",
            }}
          />
          <div
            style={{
              marginTop: 40,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
            }}
          >
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              style={{
                background: "transparent",
                border: "none",
                fontFamily: SANS,
                fontSize: 11,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                cursor: step > 0 ? "pointer" : "default",
                opacity: step > 0 ? 0.7 : 0.25,
                color: T.ink,
                padding: "10px 0",
              }}
            >
              ← Back
            </button>
            <button
              onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
              style={{
                padding: "16px 32px",
                border: `1px solid ${T.ink}`,
                background: "transparent",
                color: T.ink,
                fontFamily: SANS,
                fontSize: 11,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "background 320ms ease, color 320ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = T.ink;
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = T.ink;
              }}
            >
              {step === STEPS.length - 1 ? "Send →" : "Next →"}
            </button>
          </div>
        </div>
        <style>{`
          @media (max-width: 880px) {
            .mat-form { grid-template-columns: 1fr !important; gap: 48px !important; }
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
