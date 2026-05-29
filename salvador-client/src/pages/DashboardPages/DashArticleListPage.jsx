import { useEffect, useMemo, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { DataGrid } from '@mui/x-data-grid'
import articlesSeed from '../../data/article-content'

const statusOptions = ['active', 'inactive']

const STORAGE_KEY = 'salvador.articles'

const blankForm = {
  name: '',
  title: '',
  image: '',
  moreInfoLink: '',
  content: '',
  status: 'active'
}

const paperSx = {
  backgroundColor: 'var(--card)',
  border: '1px solid var(--line)',
  borderRadius: 'var(--radius-xl)',
  color: 'var(--ink)'
}

const textFieldSx = {
  '& .MuiInputLabel-root': {
    color: 'rgba(13, 17, 23, 0.72)'
  },
  '& .MuiSelect-icon': {
    color: 'rgba(13, 17, 23, 0.72)'
  },
  '& .MuiOutlinedInput-root': {
    color: 'var(--bg-0)',
    backgroundColor: 'var(--ink)',
    '& fieldset': {
      borderColor: 'rgba(13, 17, 23, 0.18)'
    },
    '&:hover fieldset': {
      borderColor: 'rgba(13, 17, 23, 0.32)'
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--accent-blue)'
    }
  },
  '& .MuiFormHelperText-root': {
    color: 'rgba(13, 17, 23, 0.65)'
  }
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
  '& .MuiDataGrid-columnHeaderTitle, & .MuiDataGrid-columnHeaderTitleContainer': {
    color: 'var(--ink)',
    fontWeight: 700
  },
  '& .MuiDataGrid-cell': {
    borderBottom: '1px solid rgba(88, 166, 255, 0.12)',
    color: 'var(--ink)'
  },
  '& .MuiDataGrid-row:hover': {
    backgroundColor: 'rgba(88, 166, 255, 0.06)'
  },
  '& .MuiTablePagination-root, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
    color: 'var(--ink)'
  }
}

const normalizeArticles = (items) =>
  items.map((item, index) => ({
    id: item.id ?? index + 1,
    name: item.name,
    title: item.title,
    image: item.image,
    moreInfoLink: item.moreInfoLink,
    content: item.content,
    status: item.status ?? 'active'
  }))

const loadStoredArticles = () => {
  if (typeof window === 'undefined') {
    return normalizeArticles(articlesSeed)
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return normalizeArticles(articlesSeed)
    }

    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) && parsed.length
      ? normalizeArticles(parsed)
      : normalizeArticles(articlesSeed)
  } catch (error) {
    console.warn('Failed to read stored articles:', error)
    return normalizeArticles(articlesSeed)
  }
}

const DashArticleListPage = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [articles, setArticles] = useState(loadStoredArticles)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [modal, setModal] = useState({ open: false, id: null })
  const [form, setForm] = useState(blankForm)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(articles))
    } catch (error) {
      console.warn('Failed to store articles:', error)
    }
  }, [articles])

  const filteredArticles = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    const selectedStatus = statusFilter.trim().toLowerCase()

    return articles.filter((article) => {
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.name.toLowerCase().includes(query)

      const matchesStatus = !selectedStatus || article.status === selectedStatus

      return matchesSearch && matchesStatus
    })
  }, [articles, searchTerm, statusFilter])

  const openModal = (article) => {
    setModal({ open: true, id: article?.id ?? null })
    setForm(
      article
        ? {
            ...blankForm,
            ...article,
            content: Array.isArray(article.content) ? article.content.join('\n') : article.content
          }
        : { ...blankForm }
    )
  }

  const closeModal = () => {
    setModal({ open: false, id: null })
    setForm({ ...blankForm })
  }

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const payload = {
      ...form,
      content: String(form.content)
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
    }

    setArticles((prev) =>
      modal.id
        ? prev.map((item) => (item.id === modal.id ? { ...item, ...payload } : item))
        : [
            ...prev,
            {
              id: prev.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1,
              ...payload
            }
          ]
    )

    closeModal()
  }

  const toggleStatus = (id, status) => {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === id ? { ...article, status: status === 'active' ? 'inactive' : 'active' } : article
      )
    )
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Slug', flex: 1, minWidth: 160 },
    { field: 'title', headerName: 'Title', flex: 1.2, minWidth: 200 },
    {
      field: 'paragraphs',
      headerName: 'Paragraphs',
      width: 130,
      valueGetter: (_, row) => (Array.isArray(row.content) ? row.content.length : 0)
    },
    {
      field: 'preview',
      headerName: 'Preview',
      flex: 1.5,
      minWidth: 240,
      valueGetter: (_, row) =>
        Array.isArray(row.content) ? `${row.content.join(' ').slice(0, 110)}...` : ''
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 120,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.status === 'active' ? 'Active' : 'Inactive'}
          color={row.status === 'active' ? 'success' : 'default'}
          variant={row.status === 'active' ? 'filled' : 'outlined'}
          sx={
            row.status === 'active'
              ? undefined
              : {
                  color: 'var(--ink)',
                  borderColor: 'var(--line)'
                }
          }
        />
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 200,
      sortable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} sx={{ py: 0.5 }}>
          <Button size="small" variant="outlined" onClick={() => openModal(row)}>
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={row.status === 'active' ? 'warning' : 'success'}
            onClick={() => toggleStatus(row.id, row.status)}
          >
            {row.status === 'active' ? 'Disable' : 'Activate'}
          </Button>
        </Stack>
      )
    }
  ]

  return (
    <Box sx={{ width: '100%', minWidth: 0, color: 'var(--ink)' }}>
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap'
        }}
      >
        <Typography variant="h4" sx={{ color: 'var(--ink)', fontWeight: 800 }}>
          Articles
        </Typography>
        <Button variant="contained" onClick={() => openModal()} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          Add Article
        </Button>
      </Box>

      <Paper sx={{ ...paperSx, p: { xs: 1.5, sm: 2 }, mb: 2 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField
            label="Search Articles"
            placeholder="Search Articles"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            fullWidth
            sx={textFieldSx}
          />

          <TextField
            label="Status Filter"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            select
            fullWidth
            sx={textFieldSx}
          >
            <MenuItem value="">All Statuses</MenuItem>
            {statusOptions.map((status) => (
              <MenuItem key={status} value={status}>
                {status === 'active' ? 'Active' : 'Inactive'}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Paper>

      <Paper sx={{ ...paperSx, p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: 'hidden' }}>
        {filteredArticles.length ? (
          <Box sx={{ height: { xs: 460, sm: 520 }, width: '100%', minWidth: 0 }}>
            <DataGrid
              rows={filteredArticles}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10]}
              initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
              sx={dataGridSx}
            />
          </Box>
        ) : (
          <Alert severity="info">No articles found. Use Add Article to create your first record.</Alert>
        )}
      </Paper>

      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
        PaperProps={{
          sx: {
            ...paperSx
          }
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{modal.id ? 'Edit Article' : 'Add Article'}</DialogTitle>
          <DialogContent divider sx={{ pt: { xs: 2, sm: 3 } }}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  label="Slug"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  fullWidth
                  sx={textFieldSx}
                />
                <TextField
                  label="Title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  fullWidth
                  sx={textFieldSx}
                />
              </Stack>

              <TextField
                label="Image URL"
                name="image"
                value={form.image}
                onChange={handleChange}
                fullWidth
                sx={textFieldSx}
              />

              <TextField
                label="More Info Link"
                name="moreInfoLink"
                value={form.moreInfoLink}
                onChange={handleChange}
                fullWidth
                sx={textFieldSx}
              />

              <TextField
                label="Content (one paragraph per line)"
                name="content"
                value={form.content}
                onChange={handleChange}
                multiline
                minRows={4}
                fullWidth
                sx={textFieldSx}
              />

              <TextField
                label="Status"
                name="status"
                value={form.status}
                onChange={handleChange}
                select
                fullWidth
                sx={textFieldSx}
              >
                {statusOptions.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status === 'active' ? 'Active' : 'Inactive'}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeModal} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              {modal.id ? 'Update Article' : 'Save Article'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  )
}

export default DashArticleListPage
