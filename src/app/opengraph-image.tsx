import { ImageResponse } from "next/og";

export const alt = "Murel: seu pátio sob controle";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0E1729",
          color: "#F4F1E8",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <svg width="180" height="120" viewBox="0 0 240 160">
            <path
              d="M20 140V24H220V140M82 24V140M158 24V140"
              fill="none"
              stroke="#FFC20E"
              strokeWidth="18"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect x="102" y="62" width="36" height="66" rx="12" fill="#FFC20E" />
          </svg>
          <div style={{ fontSize: 110, fontWeight: 800, letterSpacing: -6 }}>murel</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 84, fontWeight: 800, letterSpacing: -3, display: "flex" }}>
            Seu pátio&nbsp;<span style={{ color: "#FFC20E" }}>sob controle.</span>
          </div>
          <div style={{ fontSize: 32, color: "#9AA3B5" }}>
            Estacionamentos, valets e lava-rápidos. Ticket 100% digital.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
