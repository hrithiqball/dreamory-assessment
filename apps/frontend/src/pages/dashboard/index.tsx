import {
  Box,
  Button,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@mui/material'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
  PaginationState
} from '@tanstack/react-table'

import { ArrowUpDown, Plus, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CreateEvent } from './components/create-event'
import { useMutation } from '@tanstack/react-query'
import api from '../../lib/api'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

type Event = {
  id: number
  name: string
  startDate: Date
  endDate: Date
  location: string
  status: 'Ongoing' | 'Completed'
  poster: string
}
const eventData: Event[] = [
  {
    id: 1,
    name: 'Event 1',
    startDate: new Date(),
    endDate: new Date(),
    location: 'Location 1',
    status: 'Ongoing',
    poster: 'Poster 1'
  },
  {
    id: 2,
    name: 'Event 2',
    startDate: new Date(),
    endDate: new Date(),
    location: 'Location 2',
    status: 'Completed',
    poster: 'Poster 2'
  },
  {
    id: 3,
    name: 'Event 3',
    startDate: new Date(),
    endDate: new Date(),
    location: 'Location 3',
    status: 'Ongoing',
    poster: 'Poster 3'
  },
  {
    id: 4,
    name: 'Event 4',
    startDate: new Date(),
    endDate: new Date(),
    location: 'Location 4',
    status: 'Completed',
    poster: 'Poster 4'
  },
  {
    id: 5,
    name: 'Event 5',
    startDate: new Date(),
    endDate: new Date(),
    location: 'Location 5',
    status: 'Ongoing',
    poster: 'Poster 5'
  }
]

export function Dashboard() {
  const navigate = useNavigate()

  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 })
  const [data, setData] = useState<Event[]>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [openCreateEventDialog, setOpenCreateEventDialog] = useState(false)

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

  useEffect(() => {
    setData(eventData)

    return () => {
      setData([])
    }
  }, [])

  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: info => info.getValue()
    }),
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
        <Box sx={{ display: 'flex', gap: 1 }}>{info.getValue().toLocaleDateString()}</Box>
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
        <Box sx={{ display: 'flex', gap: 1 }}>{info.getValue().toLocaleDateString()}</Box>
      )
    }),
    columnHelper.accessor('location', {
      header: 'Location',
      cell: info => info.getValue()
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => info.getValue()
    })
  ]
  const table = useReactTable({
    data,
    columns,
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
    onPaginationChange: setPagination
  })

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Admin</span>
        <Button
          size="small"
          variant="outlined"
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
    </Box>
  )
}
