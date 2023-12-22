require('dotenv').config()
const express = require('express'),
    app = express(),
    db = require('./config/db'),
    user = require('./routes/user'),
    port = process.env.PORT || 5000

app.use(express.json())
app.use('/api/users', user)
app.listen(port, () => console.log(`Server started on port ${port}`))