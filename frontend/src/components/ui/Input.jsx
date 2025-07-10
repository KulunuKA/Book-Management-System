import { TextField } from "@mui/material";
import React from "react";

function Input({
  error,
  label,
  defaultValue,
  helperText,
  type = "text",
  ...props
}) {
  return (
    <TextField
      error={error}
      label={label}
      defaultValue={defaultValue}
      helperText={helperText}
      placeholder={`Enter here ${label}`}
      type={type}
      {...props}
    />
  );
}

export default Input;
