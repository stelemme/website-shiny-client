import { createElement } from "react";
import { useCookies } from "react-cookie";

// Components imports
import PageComponent from "../../components/General/PageComponent";
import GeneralSelect from "../../components/Selects/GeneralSelect";
import { Games, GamesStats } from "../../components/Collections/Games";
import {
  Pokeballs,
  PokeballsStats,
} from "../../components/Collections/Pokeballs";
import { Natures, NaturesStats } from "../../components/Collections/Natures";
import { Types, TypesStats } from "../../components/Collections/Types";
import { Legends, LegendsStats } from "../../components/Collections/Legends";
import {
  Mythicals,
  MythicalsStats,
} from "../../components/Collections/Mythicals";
import {
  UltraBeasts,
  UltraBeastsStats,
} from "../../components/Collections/UltraBeasts";
import {
  Starters,
  StarterStats,
} from "../../components/Collections/Starters";
import {
  Fossils,
  FossilStats,
} from "../../components/Collections/Fossils";
import {
  PastParadoxes,
  PastParadoxesStats,
} from "../../components/Collections/PastParadoxes";
import {
  FutureParadoxes,
  FutureParadoxesStats,
} from "../../components/Collections/FutureParadoxes";
import { Megas, MegasStats } from "../../components/Collections/Megas";
import {
  Gigantamax,
  GigantamaxStats,
} from "../../components/Collections/Gigantamax";
import { Alolans, AlolansStats } from "../../components/Collections/Alolans";
import {
  Galarians,
  GalariansStats,
} from "../../components/Collections/Galarian";
import { Hisuians, HisuiansStats } from "../../components/Collections/Hisuians";
import { Paldeans, PaldeansStats } from "../../components/Collections/Paldeans";
import {
  Eeveelutions,
  EeveelutionsStats,
} from "../../components/Collections/Eeveelutions";
import { Unowns, UnownsStats } from "../../components/Collections/Unowns";
import { Flabebes, FlabebesStats } from "../../components/Collections/Flabebes";
import {
  Vivillons,
  VivillonsStats,
} from "../../components/Collections/Vivillons";
import { Marks, MarksStats } from "../../components/Collections/Marks";
import {
  RibbonsGen3,
  RibbonsGen3Stats,
} from "../../components/Collections/RibbonsGen3";
import {
  RibbonsGen4,
  RibbonsGen4Stats,
} from "../../components/Collections/RibbonsGen4";
import {
  RibbonsGen5,
  RibbonsGen5Stats,
} from "../../components/Collections/RibbonsGen5";
import {
  RibbonsGen6,
  RibbonsGen6Stats,
} from "../../components/Collections/RibbonsGen6";
import {
  RibbonsGen7,
  RibbonsGen7Stats,
} from "../../components/Collections/RibbonsGen7";
import {
  RibbonsGen8,
  RibbonsGen8Stats,
} from "../../components/Collections/RibbonsGen8";
import {
  RibbonsGen9,
  RibbonsGen9Stats,
} from "../../components/Collections/RibbonsGen9";

export default function Collections() {
  const [cookies, setCookie] = useCookies(["collectionSelect"]);
  const foreverDate = new Date("9999-12-31T23:59:59");

  const handleChange = (e) => {
    setCookie("collectionSelect", e.target.value, { expires: foreverDate });
  };

  const collectionComponents = {
    Games: [Games, GamesStats],
    Pokéballs: [Pokeballs, PokeballsStats],
    Natures: [Natures, NaturesStats],
    _Types: [Types, TypesStats],
    Legends: [Legends, LegendsStats],
    Mythicals: [Mythicals, MythicalsStats],
    "_Ultra Beasts": [UltraBeasts, UltraBeastsStats],
    Starters: [Starters, StarterStats],
    Fossils: [Fossils, FossilStats],
    "Past Paradox Pokémon": [PastParadoxes, PastParadoxesStats],
    "_Future Paradox Pokémon": [FutureParadoxes, FutureParadoxesStats],
    "Mega Evolutions": [Megas, MegasStats],
    "_Gigantamax Pokémon": [Gigantamax, GigantamaxStats],
    "Alolan Forms": [Alolans, AlolansStats],
    "Galarian Forms": [Galarians, GalariansStats],
    "Hisuian Forms": [Hisuians, HisuiansStats],
    "_Paldean Forms": [Paldeans, PaldeansStats],
    "Ribbons (Gen3)": [RibbonsGen3, RibbonsGen3Stats],
    "Ribbons (Gen4)": [RibbonsGen4, RibbonsGen4Stats],
    "Ribbons (Gen5)": [RibbonsGen5, RibbonsGen5Stats],
    "Ribbons (Gen6)": [RibbonsGen6, RibbonsGen6Stats],
    "Ribbons (Gen7)": [RibbonsGen7, RibbonsGen7Stats],
    "Ribbons (Gen8)": [RibbonsGen8, RibbonsGen8Stats],
    "Ribbons (Gen9)": [RibbonsGen9, RibbonsGen9Stats],
    _Marks: [Marks, MarksStats],
    Eeveelutions: [Eeveelutions, EeveelutionsStats],
    Unowns: [Unowns, UnownsStats],
    Flabébés: [Flabebes, FlabebesStats],
    Vivillons: [Vivillons, VivillonsStats],
  };

  if (!collectionComponents[cookies.collectionSelect]) {
    setCookie("collectionSelect", "Pokéballs", { expires: foreverDate });
  }

  return (
    <PageComponent
      title={`COLLECTIONS PAGE`}
      subtitle={`Here you can view and change all collections.`}
      select={
        <GeneralSelect
          label={"Collections"}
          handleChange={handleChange}
          list={Object.keys(collectionComponents)}
          value={cookies.collectionSelect}
          width={200}
          size={"small"}
          fullWidth
        />
      }
      tabs
      childrenTab1={createElement(
        collectionComponents[cookies.collectionSelect][0]
      )}
      childrenTab2={createElement(
        collectionComponents[cookies.collectionSelect][1]
      )}
    />
  );
}
