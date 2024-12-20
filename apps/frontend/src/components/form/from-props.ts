/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, FieldError, FieldValues } from 'react-hook-form'

export type FormProps = {
  name: string
  control: Control<FieldValues | any>
  error?: FieldError | undefined
}
