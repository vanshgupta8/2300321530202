"use client";

import { NotificationType } from "@/api/types";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const options: NotificationType[] = ["All", "Placement", "Result", "Event"];

export default function TypeFilter({
  value,
  onChange,
}: {
  value: NotificationType;
  onChange: (value: NotificationType) => void;
}) {
  return (
    <FormControl fullWidth size="small">
      <InputLabel id="type-filter-label">Filter by type</InputLabel>
      <Select
        labelId="type-filter-label"
        label="Filter by type"
        value={value}
        onChange={(event) => onChange(event.target.value as NotificationType)}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
