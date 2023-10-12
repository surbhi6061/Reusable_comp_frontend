import React from "react";
import { TextField } from "@mui/material";

const InputText = ({ id, helperText, label, value, type, style, placeholder, disabled, inputRef, ...rest }) => {
  
  return (
    <TextField
      id={id}
      placeholder={placeholder}
      value={value}
      variant="outlined"
      label={label}
      helperText={helperText}
      type={type}
      size="small"
      style={style}
      disabled={disabled}
      inputRef={inputRef}
      {...rest}
    />
  );
};

export default InputText;
