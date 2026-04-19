export default function Avatar({ src, alt = "User avatar", name = "", size = 40 }) {
  const fallback = name ? name.slice(0, 1).toUpperCase() : "?";

  return src ? (
    <img
      src={src}
      alt={alt}
      style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover" }}
    />
  ) : (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#333",
        color: "#fff",
        fontWeight: "bold"
      }}
    >
      {fallback}
    </div>
  );
}
