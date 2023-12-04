import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectCheckmarks({
  children,
  selectLabel,
  getData,
}) {
  const [selectItem, setselectItem] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setselectItem(typeof value === "string" ? value.split(",") : value);
    getData(typeof value === "string" ? value.split(",") : value);
    // On autofill we get a stringified value.
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">{selectLabel}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectItem}
          onChange={handleChange}
          input={<OutlinedInput label={selectLabel} />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {children}
        </Select>
      </FormControl>
    </div>
  );
}
