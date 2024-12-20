import { Box, Card, CardContent, Grid2 as Grid } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getEvents } from '../../api/events'
import { Event } from '../../schema/event'
import { EventDialog } from './EventDialog'

export function Events() {
  const { data: events, isLoading, error } = useQuery({ queryKey: ['events'], queryFn: getEvents })
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <Box sx={{ width: '100%', padding: '16px' }}>
      <Grid container spacing={2}>
        {events?.data.map((event: Event) => (
          <Grid
            size={4}
            key={event.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Card sx={{ cursor: 'pointer' }} onClick={() => setSelectedEvent(event)}>
              <CardContent>
                <img
                  src="https://fr.ethnasia.com/cdn/shop/articles/sean-o-KMn4VEeEPR8-unsplash_edited.jpg?v=1621585619&width=1100"
                  alt=""
                  style={{ width: 'auto', height: '250px' }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ typography: 'h6', mb: 1 }}>{event.name}</Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {events?.data.length === 0 && <div>No events found</div>}
      </Grid>

      <EventDialog
        event={selectedEvent}
        open={Boolean(selectedEvent)}
        onClose={() => setSelectedEvent(null)}
      />
    </Box>
  )
}
