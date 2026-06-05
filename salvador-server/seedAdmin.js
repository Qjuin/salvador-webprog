require('dotenv').config()
const bcrypt = require('bcryptjs')
const connectDB = require('./config/db')
const User = require('./models/User')

const ADMIN = {
  firstName: 'Admin',
  lastName: 'Admin',
  age: '30',
  gender: 'Male',
  contactNumber: '09171234567',
  email: 'admin@gmail.com',
  username: 'admin',
  password: 'Admin123!',
  address: 'Sampaloc, Manila, Metro Manila',
  isActive: true
}

const seedAdmin = async () => {
  try {
    await connectDB()

    // check by email or username
    const existing = await User.findOne({ $or: [{ email: ADMIN.email }, { username: ADMIN.username }] })
    if (existing) {
      console.log('Admin user already exists:', existing.email || existing.username)
      process.exit(0)
    }

    // Hash password using same approach as controllers
    const hashed = await bcrypt.hash(ADMIN.password, 10)

    const user = await User.create({
      firstName: ADMIN.firstName,
      lastName: ADMIN.lastName,
      age: ADMIN.age,
      gender: ADMIN.gender,
      contactNumber: ADMIN.contactNumber,
      email: ADMIN.email,
      type: 'admin', // model uses `type` field
      username: ADMIN.username,
      password: hashed,
      address: ADMIN.address,
      isActive: ADMIN.isActive
    })

    console.log('Seeded admin user:', user.email)
    process.exit(0)
  } catch (err) {
    console.error('Error seeding admin:', err)
    process.exit(1)
  }
}

seedAdmin()
