import React, { useState, useMemo } from "react";
import { Marker } from "react-leaflet";
import ReactDOM from "react-dom/client";
import L from "leaflet";

export const JSXMarker = React.forwardRef(
  ({ children, iconOptions, ...rest }, refInParent) => {
    const [ref, setRef] = useState();

    const node = useMemo(
      () => (ref ? ReactDOM.createRoot(ref.getElement()) : null),
      [ref]
    );

    return (
      <>
        {useMemo(
          () => (
            <Marker
              {...rest}
              ref={(r) => {
                setRef(r);
                if (refInParent) {
                  refInParent.current = r;
                }
              }}
              icon={L.divIcon(iconOptions)}
            />
          ),
          []
        )}
        {ref && node.render(children)}
      </>
    );
  }
);
