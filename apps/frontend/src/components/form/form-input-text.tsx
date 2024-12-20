import { TextField, TextFieldProps } from '@mui/material'
import { Controller } from 'react-hook-form'
import { FormProps } from './from-props'

type FormInputTextProps = FormProps & Omit<TextFieldProps, 'error'>

export function FormInputText(props: FormInputTextProps) {
  const { name, control } = props

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          {...props}
          helperText={error ? error.message : null}
          error={Boolean(error)}
          onChange={onChange}
          value={value}
        />
      )}
    />
  )
}
