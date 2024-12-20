import { isAxiosError } from 'axios'
import api from '../lib/api'

export async function createEvent(createEventInput: {
  name: string
  startDate: Date
  endDate: Date
  location: string
}) {
  try {
    return await api.post('/events', createEventInput)
  } catch (error) {
    throw error
  }
}

export async function updateEvent(updateEventInput: {
  id: number
  name: string
  startDate: Date
  endDate: Date
  location: string
  status: 'ONGOING' | 'COMPLETED'
}) {
  try {
    return await api.patch(`/events/${updateEventInput.id}`, updateEventInput)
  } catch (error) {
    if (isAxiosError(error)) throw Error(error.response?.data.message)
    throw Error('An error occurred')
  }
}

export async function getEvents() {
  try {
    return await api.get('/events')
  } catch (error) {
    if (isAxiosError(error)) throw Error(error.response?.data.message)
    throw Error('An error occurred')
  }
}

export async function deleteEvent(id: number) {
  try {
    return await api.delete(`/events/${id}`)
  } catch (error) {
    if (isAxiosError(error)) throw Error(error.response?.data.message)
    throw Error('An error occurred')
  }
}
