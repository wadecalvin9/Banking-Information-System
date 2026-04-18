const colorMap = {
  blue:   { bg: "#eff4ff", icon: "#1447e6", border: "#c7d7fe" },
  green:  { bg: "#ecfdf3", icon: "#12b76a", border: "#a9efc5" },
  amber:  { bg: "#fffbeb", icon: "#f59e0b", border: "#fde68a" },
  red:    { bg: "#fef2f2", icon: "#ef4444", border: "#fecaca" },
  purple: { bg: "#EFF6FF", icon: "#2563EB", border: "#DBEAFE" },
};

export default function StatCard({ title, value, sub, icon, color = "blue", trend }) {
  const c = colorMap[color] || colorMap.blue;
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e5e9f2",
      borderRadius: 16,
      padding: "20px 22px",
      display: "flex",
      alignItems: "center",
      gap: 16,
      boxShadow: "0 1px 4px rgba(15,23,42,0.05)",
      transition: "box-shadow 0.2s",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle background accent */}
      <div style={{
        position: "absolute",
        top: -20, right: -20,
        width: 80, height: 80,
        borderRadius: "50%",
        background: c.bg,
        opacity: 0.5,
      }} />

      {/* Icon */}
      <div style={{
        width: 46, height: 46,
        borderRadius: 13,
        background: c.bg,
        border: `1px solid ${c.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        position: "relative",
        color: c.icon,
      }}>
        {icon}
      </div>

      {/* Text */}
      <div style={{ minWidth: 0, flex: 1, position: "relative" }}>
        <p style={{
          fontSize: 11,
          fontWeight: 600,
          color: "#9aa3b5",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginBottom: 4,
        }}>
          {title}
        </p>
        <p style={{
          fontSize: 24,
          fontWeight: 700,
          color: "#0f1729",
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}>
          {value}
        </p>
        {sub && (
          <p style={{
            fontSize: 12,
            color: trend === "up" ? "#12b76a" : trend === "down" ? "#ef4444" : "#9aa3b5",
            marginTop: 5,
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}>
            {trend === "up" && (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            )}
            {trend === "down" && (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            )}
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}
