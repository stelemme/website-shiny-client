import React, { useState, useMemo, useEffect } from "react";
import { Marker, useMap } from "react-leaflet";
import ReactDOM from "react-dom/client";
import L from "leaflet";

export const JSXMarker = React.forwardRef(
  ({ children, position, iconOptions, ...rest }, refInParent) => {
    const [containerRef, setContainerRef] = useState(null);
    const map = useMap();

    const node = useMemo(
      () => (containerRef ? ReactDOM.createRoot(containerRef) : null),
      [containerRef]
    );

    useEffect(() => {
      if (containerRef && node) {
        node.render(children);
      }
    }, [containerRef, node, children]);

    useEffect(() => {
      if (refInParent) {
        refInParent.current = containerRef;
      }
    }, [containerRef, refInParent]);

    useEffect(() => {
      const onZoomEnd = () => {
        // Force rerender when zooming ends
        setContainerRef(null);
      };

      const onMoveEnd = () => {
        // Force rerender when panning ends
        setContainerRef(null);
      };

      if (map) {
        map.on('zoomend', onZoomEnd);
        map.on('moveend', onMoveEnd);

        return () => {
          map.off('zoomend', onZoomEnd);
          map.off('moveend', onMoveEnd);
        };
      }
    }, [map]);

    return (
      <Marker
        position={position}
        {...rest}
        ref={(r) => {
          if (r) {
            setContainerRef(r.getElement());
          }
        }}
        icon={L.divIcon(iconOptions)}
      />
    );
  }
);