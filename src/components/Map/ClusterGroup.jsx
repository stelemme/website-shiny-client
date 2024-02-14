import { MapLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.markercluster';

class ClusterGroup extends MapLayer {
  createLeafletElement({ children, leaflet: { map }, ...props }) {
    const clusterProps = {};
    const clusterEvents = {};

    // Splitting props and events to different objects
    Object.entries(props).forEach(([propName, prop]) => {
      if (propName.startsWith('on')) {
        clusterEvents[propName] = prop;
      } else {
        clusterProps[propName] = prop;
      }
    });

    // Creating markerClusterGroup Leaflet element
    const markerClusterGroup = new L.markerClusterGroup(clusterProps);
    this.contextValue = { layerContainer: markerClusterGroup, map };

    // Initializing event listeners
    Object.entries(clusterEvents).forEach(([eventAsProp, callback]) => {
      const clusterEvent = `cluster${eventAsProp.substring(2).toLowerCase()}`;
      markerClusterGroup.on(clusterEvent, callback);
    });

    return markerClusterGroup;
  }

  updateLeafletElement(fromProps, toProps) {
    // update properties or handle changes when component updates
  }

  render() {
    return null; // Since ClusterGroup is not a visual element, it doesn't render anything
  }
}

export default ClusterGroup;
