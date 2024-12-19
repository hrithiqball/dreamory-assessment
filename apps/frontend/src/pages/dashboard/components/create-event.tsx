import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'

type CreateEventProps = {
  open: boolean
  onClose: () => void
}

export function CreateEvent(props: CreateEventProps) {
  const { open, onClose } = props

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle fontSize={18}>Create Event</DialogTitle>
      <DialogContent>
        <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField size="small" placeholder="Name" />
          <DatePicker label="Start Date" slotProps={{ textField: { size: 'small' } }} />
          <DatePicker label="End Date" slotProps={{ textField: { size: 'small' } }} />
          <TextField size="small" placeholder="Location" />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button size="small" variant="outlined" color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button size="small" variant="contained" color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}
