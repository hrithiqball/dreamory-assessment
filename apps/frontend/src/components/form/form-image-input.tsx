import { Box, Button, FormControl, FormHelperText } from '@mui/material'
import { ChangeEvent, DOMAttributes, useState } from 'react'
import { Controller } from 'react-hook-form'
import { FormProps } from './from-props'

type FormImageInputProps = FormProps &
  Omit<DOMAttributes<HTMLInputElement>, 'onChange'> & {
    defaultPreview?: string
  }

export function FormImageInput({ name, control, defaultPreview }: FormImageInputProps) {
  const [preview, setPreview] = useState<string>(defaultPreview ?? '')

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>, onChange: (file: File) => void) => {
    const file = e.target.files?.[0]
    if (file) {
      onChange(file)
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <FormControl error={!!error} fullWidth>
          <Button variant="outlined" component="label" sx={{ mb: 2 }}>
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={e => handleImageChange(e, onChange)}
              hidden
            />
          </Button>
          {preview && (
            <Box
              component="img"
              src={preview}
              alt="Preview"
              sx={{
                width: '100%',
                height: 200,
                objectFit: 'contain',
                borderRadius: 1,
                mt: 2
              }}
            />
          )}
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  )
}
