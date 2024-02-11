import React, { useState, useMemo, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import ReactDOM from "react-dom/client";
import L from "leaflet";

export const JSXMarker = ({ children, position, iconOptions, name }) => {
  const [containerRef, setContainerRef] = useState(null);

  const node = useMemo(
    () => (containerRef ? ReactDOM.createRoot(containerRef) : null),
    [containerRef]
  );

  useEffect(() => {
    if (node) {
      node.render(children);
    }
  }, [containerRef, node, children]);

  return (
    <Marker
      position={position}
      ref={(r) => {
        if (r) {
          setContainerRef(r.getElement());
        }
      }}
      icon={L.divIcon(iconOptions)}
    >
      <Popup>{name}</Popup>
    </Marker>
  );
};
