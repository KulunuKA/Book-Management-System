import { TextField } from "@mui/material";
import React from "react";

function Input({ error, label, defaultValue, helperText }) {
  return (
    <TextField
      error={error}
      label={label}
      defaultValue={defaultValue}
      helperText={helperText}
    />
  );
}

export default Input;
