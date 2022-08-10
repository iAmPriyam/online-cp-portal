const express = require('express')
const socketIo = require('socket.io')
const http = require('http')
const path = require('path')
const exec = require('child_process').exec
const bodyParser = require('body-parser')
const fs = require('fs')
const templates = require('./util/template')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

const PORT = process.env.PORT || 3300

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile('index.html')
})

io.on('connection', (socket) => {
  // console.log("New Connection:" + socket.id);
  socket.emit('startup', templates)
  socket.on('codeSumbission', (compile) => {
    console.table(compile)
    const code = compile.code
    const input = compile.input
    fs.writeFileSync('./solution.cpp', code)
    fs.writeFileSync('./input.in', input)
    exec(
      `g++ solution.cpp -o solution && ./solution < input.in`,
      function (err, stdout, stderr) {
        if (err) {
          console.log(err)
        }
        const result = { stdout, stderr }
        // console.table(result);

        socket.emit('verdict', result)
      }
    )
  })
})

server.listen(PORT, () => console.log(`listening on ${PORT}`))
