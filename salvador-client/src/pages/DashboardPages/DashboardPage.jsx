import { useLocation } from 'react-router-dom'
import { BarChart } from '@mui/x-charts/BarChart'
import { DataGrid } from '@mui/x-data-grid'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { Gauge } from '@mui/x-charts/Gauge'
import { Typography, Card, CardContent } from '@mui/material'
import { PieChart } from '@mui/x-charts/PieChart'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`
  }
]

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
]

function DashboardPage() {
  useLocation()

  const averageAge =
    rows.filter((row) => row.age !== null).reduce((sum, row) => sum + (row.age || 0), 0) /
    rows.filter((row) => row.age !== null).length

  return (
    <Box sx={{ color: 'var(--ink)' }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'var(--ink)', fontWeight: 800 }}>
        Dashboard
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 4 }} display="flex">
        <Card
          sx={{
            backgroundColor: 'var(--card)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-xl)',
            color: 'var(--ink)'
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ color: 'var(--ink)', fontWeight: 700 }}>
              Total Users
            </Typography>
            <Typography variant="h4" sx={{ color: 'var(--ink)', fontWeight: 800 }}>
              {rows.length}
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            backgroundColor: 'var(--card)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-xl)',
            color: 'var(--ink)'
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ color: 'var(--ink)', fontWeight: 700 }}>
              Average Age
            </Typography>
            <Typography variant="h4" sx={{ color: 'var(--ink)', fontWeight: 800 }}>
              {averageAge.toFixed(1)}
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            backgroundColor: 'var(--card)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-xl)',
            p: 2,
            color: 'var(--ink)'
          }}
        >
          <BarChart
            series={[
              { data: [35, 44, 24, 34], label: 'Series 1', color: 'var(--accent-blue)' },
              { data: [51, 6, 49, 30], label: 'Series 2', color: 'var(--accent-purple)' }
            ]}
            height={290}
            xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band', label: 'Quarters' }]}
            yAxis={[{ label: 'Quarterly Sales' }]}
            sx={{
              '& text': { fill: 'var(--ink) !important' },
              '& .MuiChartsAxis-tickLabel': { fill: 'var(--ink) !important' },
              '& .MuiChartsAxis-label': { fill: 'var(--ink) !important' },
              '& .MuiChartsLegend-label': { color: 'var(--ink) !important' }
            }}
          />
        </Box>

        <Box
          sx={{
            width: { xs: '100%', md: 340 },
            minWidth: 0,
            backgroundColor: 'var(--card)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-xl)',
            p: 2,
            display: 'flex',
            justifyContent: 'center',
            color: 'var(--ink)'
          }}
        >
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: 'series A', color: 'var(--accent-blue)' },
                  { id: 1, value: 15, label: 'series B', color: 'var(--accent-purple)' },
                  { id: 2, value: 20, label: 'series C', color: 'rgba(88, 166, 255, 0.45)' }
                ]
              }
            ]}
            width={250}
            height={240}
            sx={{
              '& text': { fill: 'var(--ink) !important' },
              '& .MuiChartsLegend-label': { color: 'var(--ink) !important' }
            }}
          />
        </Box>
      </Stack>

      <Typography variant="h5" gutterBottom sx={{ color: 'var(--ink)', fontWeight: 800 }}>
        Users Overview
      </Typography>
      <Box sx={{ height: 400, width: '100%', mb: 4 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          experimentalFeatures={{ newEditingApi: true }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5
              }
            }
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{
            '--DataGrid-containerBackground': 'var(--card)',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-xl)',
            color: 'var(--ink)',
            '& .MuiDataGrid-main, & .MuiDataGrid-virtualScroller': {
              backgroundColor: 'var(--card)'
            },
            '& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeadersInner, & .MuiDataGrid-columnHeader, & .MuiDataGrid-columnHeaderRow': {
              backgroundColor: 'var(--card) !important',
              borderBottom: '1px solid var(--line)'
            },
            '& .MuiDataGrid-columnHeader--filler, & .MuiDataGrid-columnHeader--empty, & .MuiDataGrid-columnHeaderFiller': {
              backgroundColor: 'var(--card) !important'
            },
            '& .MuiDataGrid-columnHeaderCheckbox': {
              backgroundColor: 'var(--card) !important'
            },
            '& .MuiDataGrid-filler, & .MuiDataGrid-scrollbarFiller, & .MuiDataGrid-scrollbarFiller--header, & .MuiDataGrid-scrollbarFiller--footer': {
              backgroundColor: 'var(--card) !important'
            },
            '& .MuiDataGrid-scrollbarFiller--pinnedRight, & .MuiDataGrid-scrollbarFiller--headerPinnedRight, & .MuiDataGrid-scrollbarFiller--pinnedLeft, & .MuiDataGrid-scrollbarFiller--headerPinnedLeft': {
              backgroundColor: 'var(--card) !important'
            },
            '& .MuiDataGrid-columnHeaderTitle, & .MuiDataGrid-columnHeaderTitleContainer': {
              color: 'var(--ink)',
              fontWeight: 700
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid rgba(88, 166, 255, 0.12)',
              color: 'var(--ink)'
            },
            '& .MuiDataGrid-cellContent': {
              color: 'var(--ink)'
            },
            '& .MuiDataGrid-overlay': {
              backgroundColor: 'var(--card)',
              color: 'var(--ink)'
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: 'rgba(88, 166, 255, 0.06)'
            },
            '& .MuiDataGrid-row.Mui-selected, & .MuiDataGrid-row.Mui-selected:hover': {
              backgroundColor: 'rgba(88, 166, 255, 0.12)'
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: '1px solid var(--line)'
            },
            '& .MuiCheckbox-root': {
              color: 'var(--muted)'
            },
            '& .MuiCheckbox-root.Mui-checked': {
              color: 'var(--accent-purple)'
            },
            '& .MuiDataGrid-toolbarContainer, & .MuiDataGrid-selectedRowCount': {
              color: 'var(--ink)'
            },
            '& .MuiTablePagination-root, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
              color: 'var(--ink)'
            }
          }}
        />
      </Box>

      <Typography variant="h5" gutterBottom sx={{ mt: 4, color: 'var(--ink)', fontWeight: 800 }}>
        Location Map
      </Typography>
      <Box
        sx={{
          height: 500,
          width: '100%',
          backgroundColor: 'var(--card)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          '& .leaflet-container': {
            color: 'var(--ink)'
          },
          '& .leaflet-popup-content-wrapper, & .leaflet-popup-tip': {
            background: 'var(--card)',
            color: 'var(--ink)'
          },
          '& .leaflet-popup-content': {
            color: 'var(--ink)'
          },
          '& .leaflet-control-attribution': {
            color: 'var(--ink)',
            background: 'rgba(13, 17, 23, 0.55)'
          },
          '& .leaflet-control-attribution a': {
            color: 'var(--ink)'
          },
          '& .leaflet-control-zoom a': {
            background: 'var(--card)',
            color: 'var(--ink)',
            borderColor: 'var(--line)'
          }
        }}
      >
        <MapContainer
          center={[14.604253, 120.994314]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[14.604253, 120.994314]}>
            <Popup>
              National University-Manila <br />
              <i>551 F Jhocson St, Sampaloc, Manila, 1008 Metro Manila</i>
            </Popup>
          </Marker>
        </MapContainer>
      </Box>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mt: 4 }}>
        <Box
          sx={{
            backgroundColor: 'var(--card)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-xl)',
            p: 2,
            display: 'inline-flex',
            '& text': { fill: 'var(--ink) !important' }
          }}
        >
          <Gauge width={100} height={100} value={50} />
        </Box>
        <Box
          sx={{
            backgroundColor: 'var(--card)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-xl)',
            p: 2,
            display: 'inline-flex',
            '& text': { fill: 'var(--ink) !important' }
          }}
        >
          <Gauge width={100} height={100} value={50} valueMin={10} valueMax={60} />
        </Box>
      </Stack>
    </Box>
  )
}

export default DashboardPage
