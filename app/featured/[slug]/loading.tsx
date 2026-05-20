/**
 * Streamed-route fallback for /featured/[slug]. Renders a quiet sage-tinted
 * hero block while the server component fetches and renders. The aspect
 * ratio matches `FeaturedHero` so the swap doesn't shift layout.
 */
export default function Loading() {
  return (
    <main>
      <section
        style={{
          padding: "180px 40px 80px",
          background: "#fafaf7",
          textAlign: "center",
        }}
      >
        <div
          style={{
            margin: "0 auto",
            height: 12,
            width: 200,
            background: "#e8efee",
            opacity: 0.6,
          }}
        />
        <div
          style={{
            margin: "60px auto 0",
            height: "clamp(56px, 9vw, 104px)",
            width: "min(80%, 880px)",
            background: "#e8efee",
            opacity: 0.5,
          }}
        />
      </section>
      <div
        style={{
          height: "90svh",
          minHeight: 560,
          background: "linear-gradient(180deg, #1a1a1a 0%, #2a2a2a 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, rgba(67,108,103,0.18) 0%, rgba(0,0,0,0) 70%)",
          }}
        />
      </div>
    </main>
  );
}
