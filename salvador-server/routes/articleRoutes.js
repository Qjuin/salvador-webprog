const express = require('express')

const router = express.Router()

router.get('/', (_req, res) => {
  res.json({ articles: [] })
})

module.exports = router
