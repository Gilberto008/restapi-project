require('dotenv').config()
const express = require('express')
const app = express()
const { logText } = require('./middlewares/logEvent')
const errLogText = require('./middlewares/errLogEvent')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const credentials = require('./middlewares/credentials')
const corsOption = require('./config/corsOption')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
const path = require('path')

// Database Connection
connectDB()

const PORT = 3500
// Custom Middleware
app.use(logText)

app.use(credentials)
// Third-party Middleware for CORS Handling
app.use(cors(corsOption))

// Built-in Middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())
const verifyJWT = require('./middlewares/verifyJWT')
app.use(express.static(path.join(__dirname, '/public')))
app.use('/subdir', express.static(path.join(__dirname, '/public')))

// Views 
app.use('/', require('./routes/root'))
app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))
app.use('/refresh', require('./routes/refresh'))
app.use('/logout', require('./routes/logout'))

app.use(verifyJWT)
app.use('/employees', require('./routes/api/employees'))

app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({error: "404 Page not found"})
  } else {
    res.type('txt').send('404 Page not found')
  } 
})
// Custom Middleware
app.use(errLogText)

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')

  app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
  })
})


