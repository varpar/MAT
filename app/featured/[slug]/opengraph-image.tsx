import { ImageResponse } from "next/og";
import { FEATURED } from "../../_components/data";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Mi Amor Tales — featured wedding";

export default async function OG({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const couple = FEATURED.find((c) => c.slug === slug);
  const bride = couple?.bride ?? "Riya";
  const groom = couple?.groom ?? "Mohit";
  const place = couple?.place ?? "Udaipur";
  const img = couple?.img ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#0e0e0e",
          color: "#fff",
        }}
      >
        {img && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img}
            alt=""
            width={1200}
            height={630}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.55)",
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.7) 100%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "relative",
            margin: 64,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: 18,
              letterSpacing: 10,
              textTransform: "uppercase",
              color: "#cde0dd",
              display: "flex",
            }}
          >
            Mi Amor · Tales — Featured
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontFamily: "serif",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: 132,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                display: "flex",
                gap: 26,
                alignItems: "baseline",
                flexWrap: "wrap",
              }}
            >
              <span>{bride}</span>
              <span style={{ fontSize: 56, color: "#a8c4c0" }}>sang</span>
              <span>{groom}</span>
              <span style={{ color: "#a8c4c0" }}>.</span>
            </div>
            <div
              style={{
                marginTop: 30,
                fontSize: 22,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#cde0dd",
                display: "flex",
                gap: 18,
                alignItems: "center",
              }}
            >
              <span>{place}</span>
              <span style={{ width: 32, height: 1, background: "#a8c4c0" }} />
              <span>Three days</span>
              <span style={{ width: 32, height: 1, background: "#a8c4c0" }} />
              <span>1,840 frames</span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
