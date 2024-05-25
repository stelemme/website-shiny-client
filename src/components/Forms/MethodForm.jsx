// Mui
import { TextField, Autocomplete } from "@mui/material";

export default function MethodForm({
  data,
  setData,
  methodsList,
  setMethodCatList,
  setGroupList,
  clearMethod,
  isForCounter = false,
  isAsCounter = false,
}) {
  if (!isForCounter) {
    return (
      <Autocomplete
        key={clearMethod}
        disabled={!methodsList}
        autoHighlight
        onChange={(e, value, reason) => {
          setMethodCatList(undefined);
          if (setGroupList) {
            setGroupList(undefined);
          }
          setData((prevState) => {
            const { method, ...updatedData } = prevState;
            const updatedMethod = { ...method };
            delete updatedMethod.name;
            delete updatedMethod.function;
            delete updatedMethod.odds;
            delete updatedMethod.rolls;
            delete updatedMethod.charmRolls;
            delete updatedMethod.category;
            delete updatedMethod.lure;
            delete updatedMethod.chainMatters;
            delete updatedMethod.letsGoChain;
            delete updatedMethod.sosChain;
            delete updatedMethod.radarChain;
            delete updatedMethod.researchLevel;
            delete updatedMethod.svOutbreak;
            delete updatedMethod.svSparklingPower;
            delete updatedMethod.group;
            delete updatedMethod.wormholeDistance;
            delete updatedMethod.wormholeType;

            return {
              ...updatedData,
              method: updatedMethod,
            };
          });
          if (reason === "selectOption") {
            setData((prevState) => {
              if (value.categories?.length > 0) {
                setMethodCatList(value.categories);
              }
              if (value?.function === "letsgospawn") {
                return {
                  ...prevState,
                  ...{
                    method: {
                      ...prevState.method,
                      ...value,
                      lure: true,
                      chainMatters: false,
                      letsGoChain: 0,
                    },
                  },
                };
              } else if (
                value?.function === "sos-chain" ||
                value?.function === "sos-chain-sm"
              ) {
                return {
                  ...prevState,
                  ...{
                    method: {
                      ...prevState.method,
                      ...value,
                      sosChain: 0,
                    },
                  },
                };
              } else if (value?.function === "ultra-wormhole") {
                return {
                  ...prevState,
                  ...{
                    method: {
                      ...prevState.method,
                      ...value,
                      wormholeDistance: null,
                      wormholeType: 0,
                    },
                  },
                };
              } else if (
                value?.function === "pokeradar-gen4" ||
                value?.function === "pokeradar-gen6" ||
                value?.function === "pokeradar-gen8"
              ) {
                return {
                  ...prevState,
                  ...{
                    method: {
                      ...prevState.method,
                      ...value,
                      radarChain: 0,
                      group: false,
                    },
                  },
                };
              } else if (
                value?.function === "arceus-spawn" ||
                value?.function === "arceus-mass-outbreak" ||
                value?.function === "arceus-massive-mass-outbreak"
              ) {
                return {
                  ...prevState,
                  ...{
                    method: {
                      ...prevState.method,
                      ...value,
                      researchLevel: "10",
                    },
                  },
                };
              } else if (value?.function === "sv-spawn") {
                return {
                  ...prevState,
                  ...{
                    method: {
                      ...prevState.method,
                      ...value,
                      svSparklingPower: "0",
                    },
                  },
                };
              } else if (value?.function === "sv-outbreak") {
                return {
                  ...prevState,
                  ...{
                    method: {
                      ...prevState.method,
                      ...value,
                      svOutbreak: "0",
                      svSparklingPower: "0",
                    },
                  },
                };
              }
              return {
                ...prevState,
                ...{
                  method: {
                    ...prevState.method,
                    ...value,
                  },
                },
              };
            });
          }
        }}
        sx={{ mb: "20px" }}
        options={
          methodsList
            ? isAsCounter
              ? methodsList.filter((option) => option.countable !== false)
              : methodsList
            : []
        }
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField required color="secondary" {...params} label="Method" />
        )}
      />
    );
  } else {
    return (
      <TextField
        sx={{ mb: "20px" }}
        color="secondary"
        fullWidth
        disabled
        value={data.method.category}
        key={data.method.category}
        label="Method Category"
      />
    );
  }
}
