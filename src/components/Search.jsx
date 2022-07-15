import { Input, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

export default function Search({ onSearchKeyUpdate }) {
  return (
    <Input
      onChange={({ target: { value } }) => {
        onSearchKeyUpdate(value);
      }}
      sx={{ width: "100%", mb: "2rem" }}
      placeholder="Search by name, type and color"
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon></SearchIcon>
        </InputAdornment>
      }
    />
  );
}
