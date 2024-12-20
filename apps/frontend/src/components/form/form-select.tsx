import { FormControl, InputLabel, Select, SelectProps } from '@mui/material'
import { Controller } from 'react-hook-form'
import { FormProps } from './from-props'

type FormSelectProps = FormProps & Omit<SelectProps, 'error'>

export function FormSelect(props: FormSelectProps) {
  const { name, control, label } = props

  return (
    <FormControl size="small">
      <InputLabel>{label}</InputLabel>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Select onChange={onChange} value={value}>
            {props.children}
          </Select>
        )}
      />
    </FormControl>
  )
}
