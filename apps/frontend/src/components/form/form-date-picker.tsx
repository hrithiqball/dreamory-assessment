import { DatePicker, DatePickerProps } from '@mui/x-date-pickers'
import { FormProps } from './from-props'
import { Controller } from 'react-hook-form'

type FormInputCalendarProps = FormProps & Omit<DatePickerProps<Date, boolean>, 'error'>

export function FormDatePicker(props: FormInputCalendarProps) {
  const { name, control } = props

  return (
    <Controller
      {...props}
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <DatePicker
          value={value}
          onChange={onChange}
          slotProps={{ textField: { size: 'small' } }}
        />
      )}
    />
  )
}
