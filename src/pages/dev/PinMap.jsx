import { useState } from "react";

// Images
import { mapImages } from "../../assets/imgExporter";

// Components
import PageComponent from "../../components/General/PageComponent";

export default function PinMap() {
  const [pins, setPins] = useState({});
  const [label, setLabel] = useState("");

  function handleClick(e) {
    const rect = e.target.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    if (!label) {
      alert("Enter a label first");
      return;
    }

    setPins((prev) => ({
      ...prev,
      [label]: { x: +x.toFixed(3), y: +y.toFixed(3) },
    }));
  }

  function deletePin(name) {
    setPins((prev) => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  }

  return (
    <PageComponent>
      {/* Controls */}
      <input
        placeholder="Pin name (e.g. right ear)"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        style={{
          color: "black", // ✅ text color
          backgroundColor: "white", // ✅ makes sure it’s visible
        }}
      />

      {/* Image */}
      <div style={{ position: "relative", marginTop: 10 }}>
        <img
          src={mapImages["platinum.png"]}
          alt="Map"
          onClick={handleClick}
          style={{
            width: "100%",
            height: "auto",
            maxWidth: "100vw",
            cursor: "crosshair",
            imageRendering: "pixelated", // ✅ keeps pixelated look
          }}
        />

        {/* Preview Pins */}
        {Object.entries(pins).map(([name, pos]) => (
          <div
            key={name}
            style={{
              position: "absolute",
              left: `${pos.x * 100}%`,
              top: `${pos.y * 100}%`,
              transform: "translate(-50%, -50%)",
              width: 12,
              height: 12,
              backgroundColor: "red",
              borderRadius: "50%",
              border: "2px solid white",
              pointerEvents: "none",
            }}
          />
        ))}
      </div>

      {/* Pin List + Delete */}
      <div style={{ marginTop: 16 }}>
        <h3>Pins</h3>
        {Object.keys(pins).length === 0 && <p>No pins yet</p>}

        {Object.entries(pins).map(([name, pos]) => (
          <div
            key={name}
            style={{ display: "flex", gap: 10, alignItems: "center" }}
          >
            <code>{name}</code>
            <span>
              ({pos.x}, {pos.y})
            </span>
            <button onClick={() => deletePin(name)}>❌ Delete</button>
          </div>
        ))}
      </div>

      {/* JSON Output */}
      <pre
        style={{
          background: "#111",
          color: "#0f0",
          padding: 10,
          marginTop: 16,
          maxHeight: 300,
          overflow: "auto",
        }}
      >
        {JSON.stringify(pins, null, 2)}
      </pre>
    </PageComponent>
  );
}
