/**
 * Streamed-route fallback for /weddings. Renders 16 placeholder tiles
 * matching the archive grid's aspect-ratio pattern so the swap-in is
 * layout-stable.
 */
const RATIOS = [
  3 / 4, 3 / 4, 4 / 3, 4 / 3, 3 / 4, 4 / 3, 3 / 4, 1,
  4 / 3, 1, 4 / 3, 3 / 4, 4 / 3, 3 / 4, 4 / 3, 3 / 4,
];

export default function Loading() {
  return (
    <main>
      <section
        style={{
          padding: "180px 40px 60px",
          background: "#fafaf7",
          textAlign: "center",
        }}
      >
        <div
          style={{
            margin: "0 auto",
            height: 12,
            width: 320,
            background: "#e8efee",
            opacity: 0.6,
          }}
        />
        <div
          style={{
            margin: "60px auto 0",
            height: "clamp(56px, 9vw, 96px)",
            width: "min(80%, 1000px)",
            background: "#e8efee",
            opacity: 0.5,
          }}
        />
      </section>
      <section style={{ padding: "60px 40px 160px", background: "#fafaf7" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 32,
            alignItems: "start",
          }}
        >
          {RATIOS.map((r, i) => (
            <div
              key={i}
              style={{
                gridColumn: r >= 1.2 ? "span 2" : "span 1",
                aspectRatio: `${r}`,
                background: "#e8efee",
                opacity: 0.55,
              }}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
