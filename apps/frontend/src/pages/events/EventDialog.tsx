import { Box, Chip, Dialog, DialogContent, DialogTitle } from '@mui/material'
import { format } from 'date-fns'
import { Calendar, CheckCircle, Clock, MapPin, User } from 'lucide-react'
import { Event } from '../../schema/event'

interface EventDialogProps {
  event: Event | null
  open: boolean
  onClose: () => void
}

export function EventDialog({ event, open, onClose }: EventDialogProps) {
  if (!event) return null

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{event.name}</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <img
            src="https://fr.ethnasia.com/cdn/shop/articles/sean-o-KMn4VEeEPR8-unsplash_edited.jpg?v=1621585619&width=1100"
            alt=""
            style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'cover' }}
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
