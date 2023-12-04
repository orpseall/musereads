import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({ children, selectTitle, action }) {
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    action(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{selectTitle}</InputLabel>
        <Select
          size="small"
          className="p-2"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedValue}
          label={selectTitle}
          onChange={handleChange}
        >
          {children}
        </Select>
      </FormControl>
    </Box>
  );
}
