import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem
} from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { updateEvent } from '../../../api/events'
import { FormDatePicker } from '../../../components/form/form-date-picker'
import { FormInputText } from '../../../components/form/form-input-text'
import { Event, UpdateEventInput, UpdateEventInputSchema } from '../../../schema/event'
import { FormSelect } from '../../../components/form/form-select'
import { ImagePreview } from '../../../components/image-preview'
import { FormImageInput } from '../../../components/form/form-image-input'
import { X } from 'lucide-react'

type EditEventProps = {
  event: Event | null
  open: boolean
  handleClose: () => void
}

export function EditEvent({ event, open, handleClose }: EditEventProps) {
  const queryClient = useQueryClient()
  const { control, handleSubmit, reset } = useForm<UpdateEventInput>({
    resolver: zodResolver(UpdateEventInputSchema),
    defaultValues: {
      name: '',
      location: '',
      startDate: new Date(),
      endDate: new Date(),
      status: 'ONGOING'
    }
  })

  useEffect(() => {
    if (event) {
      reset({
        name: event.name,
        location: event.location,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate),
        status: event.status
      })
    }
  }, [event, reset])

  const editEventMutation = useMutation({
    mutationFn: async (data: UpdateEventInput) => {
      const formData = new FormData()
      if (data.name) formData.append('name', data.name)
      if (data.location) formData.append('location', data.location)
      if (data.startDate) formData.append('startDate', data.startDate.toISOString())
      if (data.endDate) formData.append('endDate', data.endDate.toISOString())
      if (data.status) formData.append('status', data.status)
      if (data.poster) formData.append('poster', data.poster)

      await updateEvent(event?.id as number, formData)
    },
    onSuccess: () => {
      toast.success('Event updated successfully')
      queryClient.invalidateQueries({ queryKey: ['events'] })
      handleClose()
    },
    onError: error => {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  })

  function onSubmit(data: UpdateEventInput) {
    if (!event) return

    editEventMutation.mutate({ ...data })
  }

  if (!event) return null

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          bgcolor: 'primary.main',
          color: 'primary.contrastText'
        }}
      >
        <span>Edit Event</span>
        <IconButton size="small" onClick={handleClose} sx={{ color: 'primary.contrastText' }}>
          <X size={16} />
        </IconButton>
      </DialogTitle>
      <Box>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormInputText name="name" control={control} label="Name" size="small" />
          <FormInputText name="location" control={control} label="Location" size="small" />
          <FormSelect control={control} name="status" label="Status">
            <MenuItem value="ONGOING">Ongoing</MenuItem>
            <MenuItem value="COMPLETED">Completed</MenuItem>
          </FormSelect>
          <FormDatePicker name="startDate" control={control} label="Start Date" />
          <FormDatePicker name="endDate" control={control} label="End Date" />
          <ImagePreview path={event.posterUrl} />
          <FormImageInput name="poster" control={control} />
        </DialogContent>
      </Box>
      <DialogActions>
        <Button size="small" variant="text" color="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button size="small" variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  )
}
