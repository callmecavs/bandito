'use strict'

const express = require('express')
const path = require('path')

// init app
const app = express()

// cache path to dist files
const toDist = path.resolve(__dirname, 'dist')

// serve static files
app.use(express.static(toDist))

// always serve homepage
app.use((req, res) => res.sendFile(`${ toDist }/index.html`))

// start up server
app.listen(process.env.PORT || 8000)
