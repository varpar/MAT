"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { BODY, DISPLAY, SANS, T, LAYOUT } from "../_components/tokens";
import { FEATURED, type Couple } from "../_components/data";
import { MatImage } from "../_components/MatImage";

const EASE = [0.2, 0.7, 0.2, 1] as const;

const bySlug = (slug: string) => FEATURED.find((couple) => couple.slug === slug);

const RIYA_MOHIT = bySlug("riya-sang-mohit");
const JOYEETA_HARSH = bySlug("harsh-sang-joyeeta");

const FIRST_PAIR = FEATURED.filter((couple) =>
  ["anvesha-sang-omkar", "shrenik-sang-ishika"].includes(couple.slug ?? ""),
);

const SECOND_PAIR = FEATURED.filter((couple) =>
  ["shubham-sang-aishwarya", "varun-sang-vanya"].includes(couple.slug ?? ""),
);

function FilmFeature({ couple }: { couple: Couple }) {
  const reduceMotion = useReducedMotion();
  const film = couple.heroVideo;

  if (!film) return null;

  return (
    <motion.section
      initial={false}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.9, ease: EASE }}
      className="mat-film-feature"
      aria-labelledby={`film-${couple.slug}`}
    >
      <div className="mat-film-frame">
        {reduceMotion ? (
          <Image
            src={film.poster}
            alt={`${couple.bride} and ${couple.groom}`}
            className="mat-film-media"
            fill
            sizes="100vw"
          />
        ) : (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={film.poster}
            tabIndex={-1}
            aria-label={`${couple.bride} and ${couple.groom}'s wedding film preview`}
            className="mat-film-media"
          >
            <source src={film.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      <div className="mat-film-caption">
        <div>
          <h2 id={`film-${couple.slug}`}>
            {couple.bride} <span>and</span> {couple.groom}
          </h2>
          <p>{couple.place}</p>
        </div>
        <Link href={`/featured/${couple.slug}`} className="mat-film-link">
          View the film
        </Link>
      </div>
    </motion.section>
  );
}

function ImageCard({ couple }: { couple: Couple }) {
  return (
    <motion.article
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.8, ease: EASE }}
      className="mat-feature-card"
    >
      <Link href={`/featured/${couple.slug}`} aria-label={`View ${couple.bride} and ${couple.groom}'s story`}>
        <div className="mat-feature-card-image">
          <MatImage
            image={couple.img}
            variant="Grid"
            alt={`${couple.bride} and ${couple.groom} — ${couple.place}`}
          />
        </div>
        <div className="mat-feature-card-caption">
          <h3>
            {couple.bride} <span>and</span> {couple.groom}
          </h3>
          <p>{couple.place}</p>
          <span className="mat-feature-card-link">View their story</span>
        </div>
      </Link>
    </motion.article>
  );
}

function CardPair({ couples }: { couples: Couple[] }) {
  return (
    <section className="mat-feature-pair" aria-label="Featured couple stories">
      {couples.map((couple) => (
        <ImageCard key={couple.slug} couple={couple} />
      ))}
    </section>
  );
}

export function FeaturedIndexClient() {
  return (
    <main className="mat-featured-index">
      <h1 className="mat-visually-hidden">Featured wedding films and stories</h1>
      {RIYA_MOHIT && <FilmFeature couple={RIYA_MOHIT} />}
      <CardPair couples={FIRST_PAIR} />
      {JOYEETA_HARSH && <FilmFeature couple={JOYEETA_HARSH} />}
      <CardPair couples={SECOND_PAIR} />

      <style>{`
        .mat-featured-index {
          background: ${T.paper};
          padding: ${LAYOUT.edge};
        }

        .mat-film-feature {
          margin: 0 0 ${LAYOUT.section};
        }

        .mat-film-frame {
          position: relative;
          width: 100%;
          height: calc(100svh - 112px);
          min-height: 600px;
          max-height: 920px;
          overflow: hidden;
          background: ${T.ink};
        }

        .mat-film-media {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
        }

        .mat-film-caption {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 32px;
          padding: 30px clamp(18px, 3vw, 44px) 0;
        }

        .mat-film-caption h2,
        .mat-feature-card-caption h3 {
          margin: 0;
          font-family: ${DISPLAY};
          font-weight: 400;
          letter-spacing: -0.025em;
          text-transform: uppercase;
        }

        .mat-film-caption h2 {
          font-size: clamp(42px, 6.4vw, 100px);
          line-height: 0.95;
        }

        .mat-film-caption h2 span,
        .mat-feature-card-caption h3 span {
          font: inherit;
          text-transform: lowercase;
        }

        .mat-film-caption p,
        .mat-feature-card-caption p {
          margin: 12px 0 0;
          font-family: ${BODY};
          font-size: 16px;
          font-style: italic;
          opacity: 0.68;
        }

        .mat-film-link,
        .mat-feature-card-link {
          color: inherit;
          font-family: ${SANS};
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          text-decoration: none;
          border-bottom: 1px solid currentColor;
          padding: 14px 0 8px;
          white-space: nowrap;
        }

        .mat-film-link:focus-visible,
        .mat-feature-card a:focus-visible {
          outline: 2px solid ${T.sage};
          outline-offset: 5px;
        }

        .mat-feature-pair {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: ${LAYOUT.gap};
          margin-bottom: ${LAYOUT.section};
        }

        .mat-feature-card a {
          display: block;
          color: inherit;
          text-decoration: none;
        }

        .mat-feature-card-image {
          position: relative;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          background: ${T.ink};
        }

        .mat-feature-card-image img {
          transition: transform 900ms cubic-bezier(.2,.7,.2,1);
        }

        .mat-feature-card a:hover .mat-feature-card-image img {
          transform: scale(1.025);
        }

        .mat-feature-card-caption {
          padding: 22px 12px 0;
        }

        .mat-feature-card-caption h3 {
          font-size: clamp(30px, 4vw, 58px);
          line-height: 1;
        }

        .mat-feature-card-link {
          display: inline-block;
          margin-top: 24px;
        }

        @media (max-width: 800px) {
          .mat-film-frame {
            height: 62svh;
            min-height: 420px;
          }

          .mat-film-caption {
            align-items: flex-start;
            flex-direction: column;
            gap: 14px;
            padding-inline: 10px;
          }

          .mat-feature-pair {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 520px) {
          .mat-film-frame {
            height: 54svh;
            min-height: 360px;
          }

          .mat-film-feature,
          .mat-feature-pair {
            margin-bottom: ${LAYOUT.sectionTight};
          }

          .mat-feature-card-caption {
            padding-inline: 6px;
          }
        }
      `}</style>
    </main>
  );
}
