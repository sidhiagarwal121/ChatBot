require('dotenv').config();
var mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/chat-app');
const Chat=require('./models/chatModel')
const app=require('express')();
const http=require('http').Server(app);
const userRoute=require('./routes/userRoute');
const io=require('socket.io')(http)
var usp=io.of('/user-namespace')
usp.on('connection',function(socket)
{
    console.log('user Connected')
    socket.on('disconnect',function()
    {
        console.log('user Disconnected')
    })
    socket.on('newChat',function(data)
    {
    socket.broadcast.emit('loadNewChat',data)
    })
    socket.on('existsChat', async function(data)
    {
        var chats=await Chat.find({$or:[
            { sender_id:data.sender_id,receiver_id:data.receiver_id},
            { sender_id:data.receiver_id,receiver_id:data.sender_id}
        ]})
        socket.emit('loadChats',{chats:chats});

    })
})


app.use('/',userRoute)
const port=3000;
http.listen(port,function()
{
    console.log(`Server is running on port ${port}`)
})