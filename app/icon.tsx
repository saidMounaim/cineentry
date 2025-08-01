import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#faaf2d",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#faaf2d"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="2" y="7" width="20" height="12" rx="2" fill="#faaf2d" />
          <rect x="4" y="9" width="16" height="8" rx="1" fill="white" />
          <circle cx="7" cy="13" r="1.5" fill="#faaf2d" />
          <circle cx="12" cy="13" r="1.5" fill="#faaf2d" />
          <circle cx="17" cy="13" r="1.5" fill="#faaf2d" />
          <rect x="6" y="3" width="12" height="4" rx="1" fill="#faaf2d" />
          <rect x="8" y="4" width="8" height="2" rx="0.5" fill="white" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
