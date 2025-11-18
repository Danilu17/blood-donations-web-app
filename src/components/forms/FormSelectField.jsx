import { Controller, useFormContext } from "react-hook-form";
import { TextField, MenuItem } from "@mui/material";

const FormSelectField = ({
  name,
  label,
  options,
  rules = {},
  defaultValue = "",
  ...props
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...props}
          select
          fullWidth
          label={label}
          variant="outlined"
          error={!!error}
          helperText={error ? error.message : ""}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default FormSelectField;
