const express=require('express')
const app=express();
const http=require('http');
const path =require('path');
const server=http.createServer(app);
const socketio=require('socket.io');

const io=socketio(server);
app.use('/',express.static(path.join(__dirname,'/public')))


io.on('connection',(socket)=>{
    console.log("connection established");
    console.log(socket.id);
    socket.on("send-msg",(data)=>{
        console.log(`${data.msg} sent by ${socket.id}`);
        io.emit("received-msg",{
            id:socket.id,
            msg:data.msg

        })
    })
})





server.listen(3003,()=>{
    console.log("server started at 3003");
})