import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#4b756e",
          color: "#f6f3ee",
          fontFamily: "serif",
          fontSize: 88,
          fontWeight: 400,
          letterSpacing: "-0.12em",
          paddingRight: 8,
        }}
      >
        M<span style={{ color: "#d6c4b2", fontSize: 36, margin: "42px 0 0 4px" }}>.</span>
      </div>
    ),
    size,
  );
}
