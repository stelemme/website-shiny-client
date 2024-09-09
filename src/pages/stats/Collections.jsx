import { createElement } from "react";
import { useCookies } from "react-cookie";

// mui imports
import { Grid } from "@mui/material";

// Components imports
import PageComponent from "../../components/General/PageComponent";
import GeneralSelect from "../../components/Selects/GeneralSelect";
import Pokeballs from "../../components/Collections/Pokeballs";
import Natures from "../../components/Collections/Natures";
import Legends from "../../components/Collections/Legends";
import Mythicals from "../../components/Collections/Mythicals";
import UltraBeasts from "../../components/Collections/UltraBeasts";
import PastParadoxes from "../../components/Collections/PastParadoxes";
import FutureParadoxes from "../../components/Collections/FutureParadoxes";
import Megas from "../../components/Collections/Megas";
import Gigantamax from "../../components/Collections/Gigantamax";
import Alolans from "../../components/Collections/Alolans";
import Galarians from "../../components/Collections/Galarian";
import Hisuians from "../../components/Collections/Hisuians";
import Paldeans from "../../components/Collections/Paldeans";
import Eeveelutions from "../../components/Collections/Eeveelutions";
import Unowns from "../../components/Collections/Unowns";
import Flabebes from "../../components/Collections/Flabebes";
import Vivillons from "../../components/Collections/Vivillons";
import Marks from "../../components/Collections/Marks";
import RibbonsGen3 from "../../components/Collections/RibbonsGen3";
import RibbonsGen4 from "../../components/Collections/RibbonsGen4";
import RibbonsGen5 from "../../components/Collections/RibbonsGen5";
import RibbonsGen6 from "../../components/Collections/RibbonsGen6";
import RibbonsGen7 from "../../components/Collections/RibbonsGen7";
import RibbonsGen8 from "../../components/Collections/RibbonsGen8";
import RibbonsGen9 from "../../components/Collections/RibbonsGen9";

export default function Collections() {
  const [cookies, setCookie] = useCookies(["collectionSelect"]);
  const foreverDate = new Date("9999-12-31T23:59:59");

  const handleChange = (e) => {
    setCookie("collectionSelect", e.target.value, { expires: foreverDate });
  };

  const collectionComponents = {
    Pokéballs: Pokeballs,
    _Natures: Natures,
    Legends: Legends,
    Mythicals: Mythicals,
    "Ultra Beasts": UltraBeasts,
    "Past Paradox Pokémon": PastParadoxes,
    "_Future Paradox Pokémon": FutureParadoxes,
    "Mega Evolutions": Megas,
    "_Gigantamax Pokémon": Gigantamax,
    "Alolan Forms": Alolans,
    "Galarian Forms": Galarians,
    "Hisuian Forms": Hisuians,
    "_Paldean Forms": Paldeans,
    "Ribbons (Gen3)": RibbonsGen3,
    "Ribbons (Gen4)": RibbonsGen4,
    "Ribbons (Gen5)": RibbonsGen5,
    "Ribbons (Gen6)": RibbonsGen6,
    "Ribbons (Gen7)": RibbonsGen7,
    "Ribbons (Gen8)": RibbonsGen8,
    "Ribbons (Gen9)": RibbonsGen9,
    _Marks: Marks,
    Eeveelutions: Eeveelutions,
    Unowns: Unowns,
    Flabébés: Flabebes,
    Vivillons: Vivillons,
  };

  if (!collectionComponents[cookies.collectionSelect]) {
    setCookie("collectionSelect", "Pokéballs", { expires: foreverDate });
  }

  return (
    <PageComponent
      title={`COLLECTIONS PAGE`}
      subtitle={`Here you can view and change all collections.`}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <GeneralSelect
            label={"Collections"}
            handleChange={handleChange}
            list={Object.keys(collectionComponents)}
            value={cookies.collectionSelect}
            width={200}
            size={"normal"}
          />
        </Grid>
        <Grid item xs={12}>
          {/* COLLECTIONS */}
          {createElement(collectionComponents[cookies.collectionSelect])}
        </Grid>
      </Grid>
    </PageComponent>
  );
}
