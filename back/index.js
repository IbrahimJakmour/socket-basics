const http = require('http')

const server = http.createServer()


const handleRequest = (req, res) => {
  res.end('ok!')
}

server.on('request', handleRequest)
server.listen(8888, ()=> console.log(`server is ready`))


let globalNumber = 0

const io = require('socket.io')(server);
const catNames = require('cat-names');

io.on('connection', (socket) => {

  const username = catNames.random()
  console.log(username +' is connected')
  io.emit('user:new',username)
  socket.emit('user:me',username) 
  
  socket.emit('new car arrived in parking', { color:'red', brand:'toyota'})
  socket.emit('message')
  
  socket.on('disconnect', () => {
    console.log(username +' user disconnected');
  });
	
  socket.on('increment', () => {
    globalNumber++
    io.emit('number:change',globalNumber)
    console.log('number has changed:',globalNumber)
  });

  socket.on('decrement', () => {
    globalNumber--
    io.emit('number:change',globalNumber)
    console.log('number has changed:',globalNumber)
  });

  socket.emit('number:change',globalNumber)

});
