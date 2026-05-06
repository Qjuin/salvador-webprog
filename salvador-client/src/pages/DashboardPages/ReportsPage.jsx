import { useRef } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { BarChart } from '@mui/x-charts/BarChart'
import { Gauge } from '@mui/x-charts/Gauge'
import { PieChart } from '@mui/x-charts/PieChart'
import { DataGrid } from '@mui/x-data-grid'

const cardSx = {
  backgroundColor: 'var(--card)',
  border: '1px solid var(--line)',
  borderRadius: 'var(--radius-xl)',
  color: 'var(--ink)'
}

const chartSx = {
  '& text': { fill: 'var(--ink) !important' },
  '& .MuiChartsAxis-tickLabel': { fill: 'var(--ink) !important' },
  '& .MuiChartsAxis-label': { fill: 'var(--ink) !important' },
  '& .MuiChartsLegend-label': { color: 'var(--ink) !important' }
}

const dataGridSx = {
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
}

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

const ReportsPage = () => {
  const printRef = useRef(null)

  const handlePrint = () => {
    const printContent = printRef.current

    if (!printContent) {
      return
    }

    const printWindow = window.open('', '_blank', 'width=1200,height=900')
    if (!printWindow) {
      return
    }

    const headMarkup = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map((node) => {
        if (node.tagName === 'LINK') {
          const href = node.getAttribute('href')
          if (!href) {
            return ''
          }

          try {
            const absoluteHref = new URL(href, window.location.href).href
            return `<link rel="stylesheet" href="${absoluteHref}" />`
          } catch {
            return node.outerHTML
          }
        }

        return node.outerHTML
      })
      .join('')

    const exportedAt = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
      timeStyle: 'short'
    }).format(new Date())

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Print Report</title>
          ${headMarkup}
          <style>
            :root {
              --bg-0: #ffffff;
              --bg-1: #ffffff;
              --ink: #000000;
              --muted: #000000;
              --card: #ffffff;
              --line: #d1d5db;
              --accent-blue: #58a6ff;
              --accent-purple: #bc8cff;
              --radius-xl: 24px;
            }

            @page {
              size: A4;
              margin: 16mm;
            }

            * {
              box-sizing: border-box;
            }

            body {
              margin: 0;
              font-family: Arial, Helvetica, sans-serif;
              background: #fff;
              color: #000;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }

            .report-shell {
              padding: 28px;
            }

            .report-header {
              margin-bottom: 24px;
              padding-bottom: 14px;
              border-bottom: 1px solid #d1d5db;
            }

            .report-header h1 {
              margin: 0 0 6px;
              font-size: 28px;
              font-weight: 700;
            }

            .report-header p {
              margin: 0;
              font-size: 14px;
              color: #000;
              line-height: 1.5;
            }

            .report-content {
              color: #000;
            }

            .report-content .MuiTypography-root,
            .report-content .MuiDataGrid-root,
            .report-content .MuiDataGrid-root * {
              color: #000 !important;
            }

            .report-content .MuiDataGrid-root {
              --DataGrid-containerBackground: #fff;
              background: #fff !important;
            }

            .report-content svg text,
            .report-content .MuiChartsAxis-tickLabel,
            .report-content .MuiChartsAxis-label {
              fill: #000 !important;
            }

            .report-content .MuiCard-root {
              box-shadow: none !important;
              border: 1px solid #e5e7eb;
              background: #fff !important;
              color: #000 !important;
              overflow: hidden;
              break-inside: avoid;
              page-break-inside: avoid;
            }

            .report-content .MuiCardContent-root {
              padding: 20px;
            }

            .report-content svg {
              max-width: 100%;
            }

            .report-content .MuiGauge-root {
              display: flex;
              justify-content: center;
            }

            .report-content .MuiGauge-root svg {
              display: block;
              margin-left: auto;
              margin-right: auto;
            }
          </style>
        </head>
        <body>
          <main class="report-shell">
            <header class="report-header">
              <h1>Reports Summary</h1>
              <p>Analytics overview for generated reports, category breakdown, and completion performance.</p>
              <p>Prepared on ${exportedAt}</p>
            </header>
            <section class="report-content">
              ${printContent.outerHTML}
            </section>
          </main>
        </body>
      </html>
    `)

    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
  }

  return (
    <Box sx={{ color: 'var(--ink)' }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', md: 'center' }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 800 }}>
            Reports
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
          <Button variant="contained">Generate</Button>
          <Button variant="outlined" onClick={handlePrint}>
            Export
          </Button>
        </Stack>
      </Stack>

      <Stack ref={printRef} spacing={3}>
        <Card sx={cardSx}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Monthly Report Output
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: 'var(--muted)' }}>
              This chart compares how many reports were generated and how many were completed across the last four months.
            </Typography>
            <BarChart
              series={[
                { data: [18, 24, 20, 27], label: 'Generated', color: 'var(--accent-blue)' },
                { data: [12, 19, 17, 23], label: 'Completed', color: 'var(--accent-purple)' }
              ]}
              height={300}
              xAxis={[
                {
                  data: ['January', 'February', 'March', 'April'],
                  scaleType: 'band',
                  label: 'Months'
                }
              ]}
              sx={chartSx}
            />
          </CardContent>
        </Card>

        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
          <Card sx={{ ...cardSx, flex: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Report Category Share
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: 'var(--muted)' }}>
                This chart shows the distribution of report requests by category for the current reporting period.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 14, label: 'Sales', color: 'var(--accent-blue)' },
                        { id: 1, value: 10, label: 'Users', color: 'var(--accent-purple)' },
                        { id: 2, value: 8, label: 'Inventory', color: 'rgba(88, 166, 255, 0.45)' },
                        { id: 3, value: 6, label: 'Finance', color: 'rgba(188, 140, 255, 0.4)' }
                      ]
                    }
                  ]}
                  width={280}
                  height={220}
                  sx={chartSx}
                />
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ ...cardSx, flex: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Completion Rate
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: 'var(--muted)' }}>
                The gauge highlights the current percentage of reports completed on time based on the latest reporting cycle.
              </Typography>
              <Box
                sx={{
                  minHeight: 220,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Gauge width={180} height={180} value={78} sx={chartSx} />
              </Box>
            </CardContent>
          </Card>
        </Stack>

        <Card sx={cardSx}>
          <CardContent>
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
              sx={dataGridSx}
            />
          </CardContent>
        </Card>
      </Stack>
    </Box>
  )
}

export default ReportsPage
