import {
  Box,
  Button,
  Chip,
  IconButton,
  InputAdornment,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@mui/material'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable
} from '@tanstack/react-table'
import { ArrowUpDown, Edit, Eye, Plus, Search, Trash } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { getEvents } from '../../api/events'
import api from '../../lib/api'
import { Event } from '../../schema/event'
import { CreateEvent } from './components/create-event'
import { EventDialog } from '../../pages/events/EventDialog'
import { EditEvent } from './components/edit-event'
import { DeleteEvent } from './components/delete-event'

export function Dashboard() {
  const navigate = useNavigate()

  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 })
  const [globalFilter, setGlobalFilter] = useState('')
  const [openCreateEventDialog, setOpenCreateEventDialog] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [openViewDialog, setOpenViewDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  const {
    data: eventData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['events', pagination.pageIndex, pagination.pageSize],
    queryFn: () =>
      getEvents({
        skip: pagination.pageIndex * pagination.pageSize,
        take: pagination.pageSize
      }),
    placeholderData: keepPreviousData
  })

  const logOutMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post('/auth/logout')
      return { message: res.data.message }
    },
    onSuccess: res => {
      toast.success(res.message)
      localStorage.removeItem('access_token')
      navigate('/auth/login')
    }
  })

  const columnHelper = createColumnHelper<Event>()

  const columns = [
    columnHelper.accessor('name', {
      header: ({ column }) => {
        return (
          <Button
            size="small"
            variant="text"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            sx={{ gap: 1 }}
          >
            Name
            <ArrowUpDown size={16} />
          </Button>
        )
      },
      cell: info => info.getValue(),
      enableSorting: true
    }),
    columnHelper.accessor('startDate', {
      header: ({ column }) => {
        return (
          <Button
            size="small"
            variant="text"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            sx={{ gap: 1 }}
          >
            Start Date
            <ArrowUpDown size={16} />
          </Button>
        )
      },
      cell: info => (
        <Box sx={{ display: 'flex', gap: 1 }}>{new Date(info.getValue()).toLocaleDateString()}</Box>
      )
    }),
    columnHelper.accessor('endDate', {
      header: ({ column }) => {
        return (
          <Button
            size="small"
            variant="text"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            sx={{ gap: 1 }}
          >
            End Date
            <ArrowUpDown size={16} />
          </Button>
        )
      },
      cell: info => (
        <Box sx={{ display: 'flex', gap: 1 }}>{new Date(info.getValue()).toLocaleDateString()}</Box>
      )
    }),
    columnHelper.accessor('location', {
      header: 'Location',
      cell: info => info.getValue()
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => {
        return info.getValue() === 'ONGOING' ? (
          <Chip label="Ongoing" color="warning" size="small" />
        ) : (
          <Chip label="Completed" color="success" size="small" />
        )
      }
    }),
    columnHelper.display({
      id: 'actions',
      cell: info => (
        <Box sx={{ textAlign: 'right' }}>
          <IconButton
            onClick={() => {
              setSelectedEvent(info.row.original)
              setOpenViewDialog(true)
            }}
          >
            <Eye size={16} />
          </IconButton>
          <IconButton
            onClick={() => {
              setSelectedEvent(info.row.original)
              setOpenEditDialog(true)
            }}
          >
            <Edit size={16} />
          </IconButton>
          <IconButton
            onClick={() => {
              setSelectedEvent(info.row.original)
              setOpenDeleteDialog(true)
            }}
          >
            <Trash size={16} />
          </IconButton>
        </Box>
      )
    })
  ]

  const table = useReactTable({
    data: eventData?.events ?? [],
    columns,
    pageCount: Math.ceil((eventData?.total ?? 0) / pagination.pageSize),
    state: {
      sorting,
      globalFilter,
      pagination
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId)
      return String(value).toLowerCase().includes(String(filterValue).toLowerCase())
    },
    getCoreRowModel: getCoreRowModel<Event>(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    manualPagination: true
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Admin Portal</span>
        <Button
          size="small"
          variant="text"
          color="secondary"
          onClick={() => logOutMutation.mutate()}
        >
          Logout
        </Button>
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          sx={{ flex: 1 }}
          placeholder="Search"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={16} />
                </InputAdornment>
              )
            }
          }}
          size="small"
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
        />
        <Button
          size="small"
          variant="outlined"
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          onClick={() => setOpenCreateEventDialog(true)}
        >
          <Plus size={16} />
          Create Event
        </Button>
        <CreateEvent open={openCreateEventDialog} onClose={() => setOpenCreateEventDialog(false)} />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableCell key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {table.getRowModel().rows.length === 0 && <div style={{ padding: 16 }}>No data found</div>}
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          count={table.getPageCount()}
          page={pagination.pageIndex + 1}
          onChange={(_, page) => {
            setPagination(prev => ({
              ...prev,
              pageIndex: page - 1
            }))
          }}
        />
      </Box>
      <EventDialog
        event={selectedEvent}
        open={openViewDialog}
        handleClose={() => {
          setOpenViewDialog(false)
          setSelectedEvent(null)
        }}
      />
      <EditEvent
        event={selectedEvent}
        open={openEditDialog}
        handleClose={() => {
          setOpenEditDialog(false)
          setSelectedEvent(null)
        }}
      />
      <DeleteEvent
        event={selectedEvent}
        open={openDeleteDialog}
        onClose={() => {
          setOpenDeleteDialog(false)
          setSelectedEvent(null)
        }}
      />
    </Box>
  )
}
