import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { deleteEvent } from '../../../api/events'
import { FormInputText } from '../../../components/form/form-input-text'
import { DeleteEventInput, DeleteEventSchema, Event } from '../../../schema/event'

type DeleteEventProps = {
  event: Event | null
  open: boolean
  onClose: () => void
}

export function DeleteEvent({ event, open, onClose }: DeleteEventProps) {
  const queryClient = useQueryClient()
  const { control, handleSubmit, reset } = useForm<DeleteEventInput>({
    resolver: zodResolver(DeleteEventSchema)
  })

  const deleteEventMutation = useMutation({
    mutationFn: async (data: DeleteEventInput) => {
      if (!event) throw new Error('No event selected')
      return await deleteEvent(event.id, data.password)
    },
    onSuccess: () => {
      toast.success('Event deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['events'] })
      reset()
      onClose()
    },
    onError: error => {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  })

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ bgcolor: 'error.main', color: 'error.contrastText' }}>
        Delete Event
      </DialogTitle>
      <form onSubmit={handleSubmit(data => deleteEventMutation.mutate(data))}>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Are you sure you want to delete "{event?.name}"? This action cannot be undone.
          </DialogContentText>
          <FormInputText
            fullWidth
            name="password"
            control={control}
            label="Enter your password to confirm"
            type="password"
            size="small"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} size="small">
            Cancel
          </Button>
          <Button type="submit" color="error" variant="contained" size="small">
            Delete
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
