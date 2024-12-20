import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl
} from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { createEvent } from '../../../api/events'
import { FormDatePicker } from '../../../components/form/form-date-picker'
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

  const { control, handleSubmit, reset } = useForm<CreateEventInput>({
    resolver: zodResolver(CreateEventInputSchema)
  })

  const createEventMutation = useMutation({
    mutationFn: async (data: CreateEventInput) => await createEvent(data),
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
      <DialogTitle fontSize={18}>Create Event</DialogTitle>
      <DialogContent>
        <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormInputText
            size="small"
            name="name"
            control={control}
            placeholder="Name"
            type="text"
          />
          <FormDatePicker control={control} name="startDate" label="Start Date" />
          <FormDatePicker control={control} name="endDate" label="End Date" />
          <FormInputText
            size="small"
            name="location"
            control={control}
            placeholder="Location"
            type="text"
          />
          <FormInputText
            size="small"
            name="posterUrl"
            control={control}
            placeholder="Poster URL"
            type="text"
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button size="small" variant="outlined" color="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button size="small" variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}
