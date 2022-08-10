const express = require('express')
const socketIo = require('socket.io')
const http = require('http')
const path = require('path')
const exec = require('child_process').exec
const bodyParser = require('body-parser')
const fs = require('fs')
const templates = require('./util/template')
var cors = require('cors')
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
const app = express()
app.use(cors(corsOptions))
const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

const PORT = process.env.PORT || 3300

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => {
  res.sendFile('index.html')
})

io.on('connection', (socket) => {
  console.log('New Connection:' + socket.id)
  socket.emit('startup', templates)
  socket.on('codeSumbission', (compile) => {
    console.log('INPUT')

    console.table(compile)
    const code = compile.code
    const input = compile.input
    fs.writeFileSync(`./${socket.id}.cpp`, code)
    fs.writeFileSync(`./${socket.id}.in`, input)
    exec(
      `g++ ${socket.id}.cpp -o ${socket.id} && ./${socket.id} < ${socket.id}.in`,
      function (err, stdout, stderr) {
        if (err) {
          console.log(err)
        }
        const result = { stdout, stderr }
        console.log('OUTPUT')
        console.table(result)

        socket.emit('verdict', result)
        exec(
          `rm ${socket.id}.cpp ${socket.id}.in ${socket.id}`,
          (err, stdout, stderr) => {
            if (!err && stderr != '')
              console.table('Deleted successfully for ' + socket.id)
          }
        )
      }
    )
  })
})

server.listen(PORT, () => console.log(`listening on ${PORT}`))
