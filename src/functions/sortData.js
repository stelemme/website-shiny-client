function sortByKeys(array, sortKeys) {
  return array.sort(function (a, b) {
    for (let i = 0; i < sortKeys.length; i++) {
      const key = sortKeys[i].key;
      const desc = sortKeys[i].desc;

      var x = a[key];
      var y = b[key];

      if (typeof x == "string") {
        x = ("" + x).toLowerCase();
      }
      if (typeof y == "string") {
        y = ("" + y).toLowerCase();
      }

      if (x < y) return -desc;
      if (x > y) return desc;
    }

    return 0;
  });
}

export default function sortData(data, sortString) {
    if (!data) {
      return null
    }
    let sortedData = [];
    switch (sortString) {
      case "gameAsc":
        sortedData = sortByKeys(data, [
          { key: "gameSort", desc: 1 },
          { key: "pokedexNo", desc: 1 },
        ]);
        break;
      case "gameDesc":
        sortedData = sortByKeys(data, [
          { key: "gameSort", desc: -1 },
          { key: "pokedexNo", desc: 1 },
        ]);
        break;
      case "pokedexNoAsc":
        sortedData = sortByKeys(data, [{ key: "pokedexNo", desc: 1 }]);
        break;
      case "pokedexNoDesc":
        sortedData = sortByKeys(data, [{ key: "pokedexNo", desc: -1 }]);
        break;
      case "newest":
        sortedData = sortByKeys(data, [{ key: "endDate", desc: -1 }]);
        break;
      case "oldest":
        sortedData = sortByKeys(data, [{ key: "endDate", desc: 1 }]);
        break;
      case "encAsc":
        sortedData = sortByKeys(data, [{ key: "totalEncounters", desc: -1 }]);
        break;
      case "encDesc":
        sortedData = sortByKeys(data, [{ key: "totalEncounters", desc: 1 }]);
        break;
      default:
        console.log("failed");
    }
    return sortedData
}