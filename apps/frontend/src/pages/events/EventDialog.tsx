import { Box, Chip, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import { format } from 'date-fns'
import { Calendar, CheckCircle, Clock, MapPin, User, X } from 'lucide-react'
import { Event } from '../../schema/event'
import { ImagePreview } from '../../components/image-preview'

type EventDialogProps = {
  event: Event | null
  open: boolean
  handleClose: () => void
}

export function EventDialog({ event, open, handleClose }: EventDialogProps) {
  if (!event) return null

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <span>{event.name}</span>
        <IconButton size="small" onClick={handleClose} sx={{ color: 'primary.contrastText' }}>
          <X />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ my: 2 }}>
          <ImagePreview
            path={event.posterUrl}
            styles={{ maxHeight: '400px', objectFit: 'contain' }}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Calendar size={16} style={{ marginRight: '4px' }} />
            <Box sx={{ typography: 'body2' }}>Start</Box>
          </Box>
          <Box sx={{ typography: 'body2' }}>
            {format(new Date(event.startDate), 'dd/MM/yyyy hh:mm a')}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Calendar size={16} style={{ marginRight: '4px' }} />
            <Box sx={{ typography: 'body2' }}>End</Box>
          </Box>
          <Box sx={{ typography: 'body2' }}>
            {format(new Date(event.endDate), 'dd/MM/yyyy hh:mm a')}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MapPin size={16} style={{ marginRight: '4px' }} />
            <Box sx={{ typography: 'body2' }}>Location</Box>
          </Box>
          <Box sx={{ typography: 'body2' }}>{event.location}</Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CheckCircle size={16} style={{ marginRight: '4px' }} />
            <Box sx={{ typography: 'body2' }}>Status</Box>
          </Box>
          {event.status === 'ONGOING' ? (
            <Chip label="ONGOING" color="warning" size="small" />
          ) : (
            <Chip label="COMPLETED" color="success" size="small" />
          )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <User size={16} style={{ marginRight: '4px' }} />
            <Box sx={{ typography: 'body2' }}>Created By</Box>
          </Box>
          <Box sx={{ typography: 'body2' }}>{event.createdBy.name}</Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Clock size={16} style={{ marginRight: '4px' }} />
            <Box sx={{ typography: 'body2' }}>Created At</Box>
          </Box>
          <Box sx={{ typography: 'body2' }}>
            {format(new Date(event.createdAt), 'dd/MM/yyyy hh:mm a')}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Clock size={16} style={{ marginRight: '4px' }} />
            <Box sx={{ typography: 'body2' }}>Updated At</Box>
          </Box>
          <Box sx={{ typography: 'body2' }}>
            {format(new Date(event.updatedAt), 'dd/MM/yyyy hh:mm a')}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
