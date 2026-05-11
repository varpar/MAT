import { ImageResponse } from "next/og";
import { MAT_IMAGES } from "./_components/data";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Mi Amor Tales — where love meets legacy";

export default function OG() {
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={MAT_IMAGES.hero}
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
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.75) 100%)",
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
              fontSize: 20,
              letterSpacing: 10,
              textTransform: "uppercase",
              color: "#cde0dd",
              display: "flex",
            }}
          >
            Studio, Jaipur — est. 2018
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontFamily: "serif",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: 128,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                display: "flex",
                alignItems: "baseline",
                gap: 18,
              }}
            >
              <span>Mi Amor</span>
              <span style={{ color: "#a8c4c0" }}>.</span>
              <span>Tales</span>
            </div>
            <div
              style={{
                marginTop: 28,
                fontSize: 32,
                fontFamily: "serif",
                fontStyle: "italic",
                color: "#cde0dd",
                opacity: 0.95,
                display: "flex",
              }}
            >
              Where love meets legacy.
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
