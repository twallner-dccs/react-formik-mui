import * as React from "react";
import { FormControlLabelProps } from "@material-ui/core/FormControlLabel";
import { FormHelperTextProps } from "@material-ui/core/FormHelperText";
import { FormControlProps } from "@material-ui/core/FormControl";
import { SliderProps } from "@material-ui/core/Slider";
import { FormikField } from "./FormikField";
import { FastFieldProps } from "formik";
import { FormControl, Slider } from "@material-ui/core";
import FormHelperTextWrapper from "./FormHelperTextWrapper";

interface IBaseProps {
  name: string;
  label?: string;
  helperText?: string;
  error?: boolean;
  useField?: boolean;
  formControlLabelProps?: Omit<FormControlLabelProps, "control" | "label">;
  formHelperTextProps?: FormHelperTextProps;
  formControlProps?: FormControlProps;
  fieldProps?: {};
  validate?: any;
}

export type FormikSliderProps = IBaseProps & SliderProps;

const defaultFormControlProps = {
  style: { minWidth: "240px" },
};

export function FormikSlider(props: FormikSliderProps) {
  const {
    name,
    label,
    helperText,
    useField,
    error,
    formHelperTextProps,
    formControlProps,
    fieldProps,
    validate,
    ...others
  } = props;

  return (
    <FormikField
      name={name}
      useField={useField}
      validate={validate}
      {...fieldProps}
    >
      {({ field, form }: FastFieldProps<any>) => (
        <FormControl
          margin="normal"
          {...defaultFormControlProps}
          {...formControlProps}
        >
          <Slider
            // in Blur threw a warning
            // Added name, value and onchange without {...field} like it is on the other components
            name={field.name}
            value={field.value}
            onChange={(event: any, value: any) => {
              form.setFieldValue(name, value);
            }}
            {...others}
          />

          <FormHelperTextWrapper
            name={name}
            form={form}
            error={error}
            formHelperTextProps={formHelperTextProps}
            helperText={helperText}
          />
        </FormControl>
      )}
    </FormikField>
  );
}
