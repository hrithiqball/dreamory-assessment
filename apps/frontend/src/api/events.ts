import { isAxiosError } from 'axios'
import api from '../lib/api'
import { EventsResponse } from '../schema/event'

export async function createEvent(createEventInput: FormData) {
  try {
    return await api.post('/events', createEventInput)
  } catch (error) {
    throw error
  }
}

export async function updateEvent(id: number, updateEventInput: FormData) {
  try {
    return await api.patch(`/events/${id}`, updateEventInput)
  } catch (error) {
    if (isAxiosError(error)) throw Error(error.response?.data.message)
    throw Error('An error occurred')
  }
}

interface GetEventsParams {
  skip?: number
  take?: number
}

export const getEvents = async ({
  skip = 0,
  take = 10
}: GetEventsParams): Promise<EventsResponse> => {
  const response = await api.get<EventsResponse>('/events', {
    params: { skip, take }
  })
  return response.data
}

export async function deleteEvent(id: number, password: string) {
  const res = await api.delete(`/events/${id}`, { data: { password } })
  return res.data
}
