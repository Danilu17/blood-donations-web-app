import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";

const FormTextField = ({
  name,
  label,
  defaultValue,
  rules = {},
  inputProps,
  helperLines = 2,
  ...props
}) => {
  const { control } = useFormContext();

  const helperLineHeightEm = 1.66;
  const minHelperHeightEm = helperLines * helperLineHeightEm;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...props}
          label={label}
          fullWidth
          margin="normal"
          error={!!error}
          helperText={error ? error.message : " "}
          slotProps={{
            formHelperText: {
              sx: {
                minHeight: `${minHelperHeightEm}em`,
                whiteSpace: "normal",
                overflowWrap: "anywhere",
                lineHeight: helperLineHeightEm,
              },
            },
            inputLabel:
              props.type === "date" || props.type === "time"
                ? { shrink: true }
                : undefined,
          }}
        />
      )}
    />
  );
};

export default FormTextField;
