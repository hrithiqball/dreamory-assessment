import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton
} from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { createEvent } from '../../../api/events'
import { FormDatePicker } from '../../../components/form/form-date-picker'
import { FormImageInput } from '../../../components/form/form-image-input'
import { FormInputText } from '../../../components/form/form-input-text'
import { CreateEventInput, CreateEventInputSchema } from '../../../schema/event'

type CreateEventProps = {
  open: boolean
  onClose: () => void
}

export function CreateEvent(props: CreateEventProps) {
  const { open, onClose } = props
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { control, handleSubmit, reset, setError } = useForm<CreateEventInput>({
    resolver: zodResolver(CreateEventInputSchema)
  })

  const createEventMutation = useMutation({
    mutationFn: async (data: CreateEventInput) => {
      if (!data.poster) {
        setError('poster', { message: 'Poster is required' })
        throw new Error('Poster is required')
      }

      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('startDate', data.startDate.toISOString())
      formData.append('endDate', data.endDate.toISOString())
      formData.append('location', data.location)
      formData.append('poster', data.poster)
      await createEvent(formData)
    },
    onSuccess: () => {
      toast.success('Event created successfully')
      queryClient.invalidateQueries({ queryKey: ['events'] })
      onClose()
      reset()
    },
    onError: error => {
      if (isAxiosError(error)) {
        if (error.response?.status === 401) {
          toast.error(error.response.data.message)
          localStorage.removeItem('access_token')
          navigate('/auth/login')
        } else toast.error(error.response?.data.message)
      } else toast.error(error.message)
    }
  })

  function onSubmit(data: CreateEventInput) {
    createEventMutation.mutate(data)
  }

  function handleClose() {
    reset()
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <span>Create Event</span>
        <IconButton onClick={handleClose} sx={{ color: 'primary.contrastText' }}>
          <X size={16} />
        </IconButton>
      </DialogTitle>
      <Box>
        <DialogContent>
          <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormInputText
              size="small"
              name="name"
              control={control}
              placeholder="Name"
              label="Name"
              type="text"
            />
            <FormDatePicker control={control} name="startDate" label="Start Date" />
            <FormDatePicker control={control} name="endDate" label="End Date" />
            <FormInputText
              size="small"
              name="location"
              control={control}
              placeholder="Location"
              label="Location"
              type="text"
            />
            <FormImageInput name="poster" control={control} />
          </FormControl>
        </DialogContent>
      </Box>
      <DialogActions>
        <Button size="small" variant="text" color="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button size="small" variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}
