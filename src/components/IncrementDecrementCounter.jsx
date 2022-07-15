import React from "react";
import { Box, IconButton, Stack } from "@mui/material";
import { AddOutlined, RemoveOutlined } from "@mui/icons-material";

export default function IncrementDecrementCounter({
  value,
  onIncrement,
  onDecrement,
}) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      border="1px solid rgba(0, 0, 0, 0.1)"
      borderRadius="0.5rem"
    >
      <IconButton onClick={onDecrement} size="small" color="primary">
        <RemoveOutlined />
      </IconButton>
      <Box padding="0.5rem">{value}</Box>
      <IconButton onClick={onIncrement} size="small" color="primary">
        <AddOutlined />
      </IconButton>
    </Stack>
  );
}
