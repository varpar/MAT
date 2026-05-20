/**
 * Streamed-route fallback for /featured. Renders six placeholder cards that
 * match `FeaturedIndexClient`'s grid + alternating aspect ratios so when the
 * real content arrives it doesn't shift layout.
 */
export default function Loading() {
  const aspects = ["3/4.4", "3/2", "3/2", "3/4.4", "3/2", "3/2"];
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
            width: 240,
            background: "#e8efee",
            opacity: 0.6,
          }}
        />
        <div
          style={{
            margin: "60px auto 0",
            height: "clamp(56px, 9vw, 96px)",
            width: "min(80%, 960px)",
            background: "#e8efee",
            opacity: 0.5,
          }}
        />
      </section>
      <section style={{ padding: "40px 40px 160px", background: "#fafaf7" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 32,
          }}
        >
          {aspects.map((a, i) => (
            <div key={i} style={{ aspectRatio: a, background: "#e8efee", opacity: 0.55 }} />
          ))}
        </div>
      </section>
    </main>
  );
}
