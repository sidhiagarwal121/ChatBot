require('dotenv').config();
var mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/chat-app');
const app=require('express')();
const http=require('http').Server(app);
const userRoute=require('./routes/userRoute')
app.use('/',userRoute)
const port=3000;
http.listen(port,function()
{
    console.log(`Server is running on port ${port}`)
})