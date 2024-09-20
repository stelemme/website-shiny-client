import { useCookies } from "react-cookie";

// mui imports
import NoTransferIcon from "@mui/icons-material/NoTransfer";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

// Components imports
import PageComponent from "../../components/General/PageComponent";
import MainMap from "../../components/Map/MainMap";
import MapStats from "../../components/Map/MapStats";

export default function Map() {
  const [cookies, setCookies] = useCookies(["travelFilter", "mapOnGent"]);
  const foreverDate = new Date("9999-12-31T23:59:59");

  const handleTransportClick = () => {
    if (cookies.travelFilter === "transport") {
      setCookies("travelFilter", "no transport", {
        expires: foreverDate,
      });
    } else {
      setCookies("travelFilter", "transport", {
        expires: foreverDate,
      });
    }
  };

  return (
    <PageComponent
      title="GEO LOCATION MAP"
      subtitle="On the map you can find all the location where shinies have been caught."
      icon1={
        cookies.travelFilter === "transport" ? (
          <NoTransferIcon />
        ) : (
          <DirectionsBusIcon />
        )
      }
      onClickIcon1={handleTransportClick}
      tabs
      childrenTab1={<MainMap />}
      childrenTab2={<MapStats />}
    ></PageComponent>
  );
}
