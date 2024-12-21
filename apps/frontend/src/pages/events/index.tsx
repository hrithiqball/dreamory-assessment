import { Box, Card, CardContent, Grid2 as Grid } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getEvents } from '../../api/events'
import { Event } from '../../schema/event'
import { EventDialog } from './EventDialog'
import { ImagePreview } from '../../components/image-preview'
import { Link } from 'react-router'

export function Events() {
  const {
    data: events,
    isLoading,
    error
  } = useQuery({ queryKey: ['events'], queryFn: () => getEvents({}) })
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Link to="/">Go Home</Link>
      <Grid container spacing={2}>
        {events?.events.map(event => (
          <Grid
            size={3}
            key={event.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Card sx={{ cursor: 'pointer' }} onClick={() => setSelectedEvent(event)}>
              <CardContent>
                <ImagePreview
                  path={event.posterUrl}
                  styles={{ height: '250px', objectFit: 'contain' }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ typography: 'h6', mb: 1 }}>{event.name}</Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {events?.events.length === 0 && <div>No events found</div>}
      </Grid>

      <EventDialog
        event={selectedEvent}
        open={Boolean(selectedEvent)}
        handleClose={() => setSelectedEvent(null)}
      />
    </Box>
  )
}
