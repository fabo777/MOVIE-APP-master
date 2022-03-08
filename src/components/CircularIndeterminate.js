import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CircularIndeterminate() {
  const width_proportion = "50%";
  return (
    <Box sx={{ position: "absolute", margin: "0 auto" }}>
      <CircularProgress style={{ position: "center" }} />
    </Box>
  );
}
