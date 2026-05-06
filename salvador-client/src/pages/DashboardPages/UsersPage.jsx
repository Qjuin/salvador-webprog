import { useMemo, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { DataGrid } from '@mui/x-data-grid'
import usersSeed from '../../data/users.json?raw'

const roles = ['admin', 'editor', 'viewer']
const genders = ['male', 'female', 'other']

const blankForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  role: 'editor',
  username: '',
  password: '',
  address: '',
  isActive: true
}

const labelize = (value) => (value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '')

const loadUsers = () => {
  try {
    return {
      users: JSON.parse(usersSeed).map((user, index) => ({
        id: Number(user.id) || index + 1,
        firstName: String(user.firstName ?? '').trim(),
        lastName: String(user.lastName ?? '').trim(),
        age: String(user.age ?? '').trim(),
        gender: genders.includes(String(user.gender ?? '').trim().toLowerCase())
          ? String(user.gender ?? '').trim().toLowerCase()
          : '',
        contactNumber: String(user.contactNumber ?? '').trim(),
        email: String(user.email ?? '').trim().toLowerCase(),
        role: roles.includes(String(user.role ?? '').trim().toLowerCase())
          ? String(user.role ?? '').trim().toLowerCase()
          : 'editor',
        username: String(user.username ?? '').trim().toLowerCase(),
        password: String(user.password ?? ''),
        address: String(user.address ?? '').trim(),
        isActive: typeof user.isActive === 'boolean' ? user.isActive : true
      })),
      error: ''
    }
  } catch {
    return {
      users: [],
      error: 'Unable to read users from src/data/users.json.'
    }
  }
}

const seed = loadUsers()

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
  '& .MuiIconButton-root': {
    color: 'rgba(13, 17, 23, 0.72)'
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

const UsersPage = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [users, setUsers] = useState(seed.users)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [genderFilter, setGenderFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [modal, setModal] = useState({ open: false, id: null })
  const [form, setForm] = useState(blankForm)
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  const filteredUsers = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    const selectedRole = roleFilter.trim().toLowerCase()
    const selectedGender = genderFilter.trim().toLowerCase()
    const selectedStatus = statusFilter.trim().toLowerCase()

    return users.filter((user) => {
      const matchesSearch =
        !query ||
        user.firstName.toLowerCase().includes(query) ||
        user.lastName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query)

      const matchesRole = !selectedRole || user.role === selectedRole
      const matchesGender = !selectedGender || user.gender === selectedGender
      const matchesStatus =
        !selectedStatus ||
        (selectedStatus === 'active' && user.isActive) ||
        (selectedStatus === 'inactive' && !user.isActive)

      return matchesSearch && matchesRole && matchesGender && matchesStatus
    })
  }, [genderFilter, roleFilter, searchTerm, statusFilter, users])

  const resetForm = () => {
    setForm({ ...blankForm })
    setErrors({})
  }

  const openModal = (user) => {
    setModal({ open: true, id: user?.id ?? null })
    setForm(user ? { ...blankForm, ...user } : { ...blankForm })
    setErrors({})
  }

  const closeModal = () => {
    setModal({ open: false, id: null })
    setShowPassword(false)
    resetForm()
  }

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const nextErrors = {}
    const nextEmail = form.email.trim().toLowerCase()
    const nextUsername = form.username.trim().toLowerCase()
    const rawUsername = String(form.username ?? '')
    const rawPassword = String(form.password ?? '')
    const rawContactNumber = String(form.contactNumber ?? '').trim()
    const rawAge = String(form.age ?? '').trim()

    ;[
      ['firstName', 'First name'],
      ['lastName', 'Last name'],
      ['age', 'Age'],
      ['gender', 'Gender'],
      ['contactNumber', 'Contact number'],
      ['email', 'Email'],
      ['role', 'Role'],
      ['username', 'Username'],
      ['password', 'Password'],
      ['address', 'Address']
    ].forEach(([key, label]) => {
      if (!String(form[key]).trim()) {
        nextErrors[key] = `${label} is required.`
      }
    })

    if (nextEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextEmail)) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (rawPassword.trim() && rawPassword.trim().length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.'
    }

    if (rawContactNumber && !/^\d{11}$/.test(rawContactNumber)) {
      nextErrors.contactNumber = 'Contact number must be 11 digits.'
    }

    if (rawAge && !/^\d+$/.test(rawAge)) {
      nextErrors.age = 'Age must be a number only.'
    }

    if (rawUsername && /\s/.test(rawUsername)) {
      nextErrors.username = 'Username must not contain spaces.'
    }

    if (!nextErrors.email && users.some((user) => user.id !== modal.id && user.email === nextEmail)) {
      nextErrors.email = 'Email address already exists.'
    }

    if (
      !nextErrors.username &&
      users.some((user) => user.id !== modal.id && user.username === nextUsername)
    ) {
      nextErrors.username = 'Username already exists.'
    }

    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    const nextUser = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: form.age.trim(),
      gender: form.gender.trim().toLowerCase(),
      contactNumber: form.contactNumber.trim(),
      email: form.email.trim().toLowerCase(),
      role: form.role.trim().toLowerCase(),
      username: form.username.trim().toLowerCase(),
      password: form.password,
      address: form.address.trim(),
      isActive: form.isActive
    }

    setUsers((prev) =>
      modal.id
        ? prev.map((user) => (user.id === modal.id ? { ...user, ...nextUser } : user))
        : [
            ...prev,
            {
              id: prev.reduce((max, user) => Math.max(max, Number(user.id) || 0), 0) + 1,
              ...nextUser
            }
          ]
    )

    closeModal()
  }

  const toggleStatus = (id) => {
    setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, isActive: !user.isActive } : user)))
  }

  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name],
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    ...extra
  })

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'fullName',
      headerName: 'Full Name',
      flex: 1,
      minWidth: 170,
      valueGetter: (_, row) => `${row.firstName} ${row.lastName}`.trim()
    },
    { field: 'username', headerName: 'Username', flex: 1, minWidth: 150 },
    { field: 'age', headerName: 'Age', width: 90 },
    {
      field: 'gender',
      headerName: 'Gender',
      minWidth: 110,
      valueGetter: (_, row) => labelize(row.gender)
    },
    { field: 'contactNumber', headerName: 'Contact Number', minWidth: 160 },
    { field: 'email', headerName: 'Email', flex: 1.1, minWidth: 220 },
    {
      field: 'role',
      headerName: 'Role',
      minWidth: 120,
      valueGetter: (_, row) => labelize(row.role)
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 120,
      sortable: false,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.isActive ? 'Active' : 'Inactive'}
          color={row.isActive ? 'success' : 'default'}
          variant={row.isActive ? 'filled' : 'outlined'}
          sx={
            row.isActive
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
      minWidth: 220,
      sortable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} sx={{ py: 0.5 }}>
          <Button size="small" variant="outlined" onClick={() => openModal(row)}>
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={row.isActive ? 'warning' : 'success'}
            onClick={() => toggleStatus(row.id)}
          >
            {row.isActive ? 'Disable' : 'Activate'}
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
          Users
        </Typography>
        <Button variant="contained" onClick={() => openModal()} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          Add User
        </Button>
      </Box>

      <Paper sx={{ ...paperSx, p: { xs: 1.5, sm: 2 }, mb: 2 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField
            label="Search users"
            placeholder="Search by first name, last name, email, or username"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            fullWidth
            sx={textFieldSx}
          />

          <TextField
            label="Role"
            value={roleFilter}
            onChange={(event) => setRoleFilter(event.target.value)}
            select
            fullWidth
            sx={textFieldSx}
          >
            <MenuItem value="">All</MenuItem>
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {labelize(role)}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Gender"
            value={genderFilter}
            onChange={(event) => setGenderFilter(event.target.value)}
            select
            fullWidth
            sx={textFieldSx}
          >
            <MenuItem value="">All</MenuItem>
            {genders.map((gender) => (
              <MenuItem key={gender} value={gender}>
                {labelize(gender)}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Status"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            select
            fullWidth
            sx={textFieldSx}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>
        </Stack>
      </Paper>

      {seed.error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {seed.error}
        </Alert>
      ) : null}

      <Paper sx={{ ...paperSx, p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: 'hidden' }}>
        {filteredUsers.length ? (
          <Box sx={{ height: { xs: 460, sm: 520 }, width: '100%', minWidth: 0 }}>
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10]}
              initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
              sx={dataGridSx}
            />
          </Box>
        ) : (
          <Alert severity="info">
            {users.length
              ? 'No matches found. Try adjusting your search or filters.'
              : 'No users found. Use Add User to create your first record.'}
          </Alert>
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
          <DialogTitle>{modal.id ? 'Edit User' : 'Add User'}</DialogTitle>
          <DialogContent divider sx={{ pt: { xs: 2, sm: 3 } }}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('firstName', 'First Name')} sx={textFieldSx} />
                <TextField {...fieldProps('lastName', 'Last Name')} sx={textFieldSx} />
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('age', 'Age')} sx={textFieldSx} />
                <TextField {...fieldProps('gender', 'Gender', { select: true })} sx={textFieldSx}>
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {labelize(gender)}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('contactNumber', 'Contact Number')} sx={textFieldSx} />
                <TextField {...fieldProps('email', 'Email Address', { type: 'email' })} sx={textFieldSx} />
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('role', 'Role', { select: true })} sx={textFieldSx}>
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {labelize(role)}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField {...fieldProps('username', 'Username')} sx={textFieldSx} />
              </Stack>

              <TextField
                {...fieldProps('password', 'Password', {
                  type: showPassword ? 'text' : 'password',
                  slotProps: {
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => setShowPassword((prev) => !prev)}
                            onMouseDown={(event) => event.preventDefault()}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                  }
                })}
                sx={textFieldSx}
              />

              <TextField {...fieldProps('address', 'Address', { multiline: true, rows: 3 })} sx={textFieldSx} />

              <FormControlLabel
                control={<Switch name="isActive" checked={form.isActive} onChange={handleChange} />}
                label={form.isActive ? 'User status: Active' : 'User status: Inactive'}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeModal} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              {modal.id ? 'Update User' : 'Save User'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  )
}

export default UsersPage
