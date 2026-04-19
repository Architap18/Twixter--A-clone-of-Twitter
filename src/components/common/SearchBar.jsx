export default function SearchBar({ value, onChange, placeholder = "Search" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span>🔍</span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: "999px",
          border: "1px solid #444",
          background: "#111",
          color: "#fff"
        }}
      />
    </div>
  );
}
