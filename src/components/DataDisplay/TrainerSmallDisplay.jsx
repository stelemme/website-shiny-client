// mui imports
import {
  Grid,
} from "@mui/material";

// Components imports
import BoxComponent from "../../components/General/BoxComponent";

// Images
import { trainerImages } from "../../assets/imgExporter";

export default function TrainerSmallDisplay({trainerChoice}) {
  const imageCheck = {
    Joaquin: "kwakquin",
    Korneel: "chorneef",
    Simon: "siwob",
    Stef: "t-loc",
  };

  return (
    <BoxComponent title={"TRAINER SPRITES"}>
      <BoxComponent p="10px" noContrastColor height={null}>
        <Grid container>
          {Object.keys(trainerImages).map((item) => {
            if (item.includes(imageCheck[trainerChoice]) && !item.includes("Avatar")) {
              return (
                <Grid item sm={2.4} xs={4} key={item}>
                  <img
                    height={"100px"}
                    alt=""
                    src={trainerImages[item]}
                    title={item.slice(0, -4)}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      imageRendering: "pixelated",
                    }}
                  />
                </Grid>
              );
            } else {
              return null;
            }
          })}
        </Grid>
      </BoxComponent>
    </BoxComponent>
  );
}
