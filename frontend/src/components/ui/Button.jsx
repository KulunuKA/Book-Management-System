import React from "react";
import { Button } from "@mui/material";

function CustomButton({ name = "Submit", ...props }) {
  return (
    <Button variant="contained" {...props}>
      {name}
    </Button>
  );
}

export default CustomButton;
