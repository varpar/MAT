import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 248,
          fontWeight: 400,
          letterSpacing: "-0.12em",
          paddingRight: 24,
        }}
      >
        M<span style={{ color: "#d6c4b2", fontSize: 102, margin: "118px 0 0 12px" }}>.</span>
      </div>
    ),
    size,
  );
}
