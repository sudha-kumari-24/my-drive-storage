const express=require('express')
const app=express();

const cookieParser=require('cookie-parser')
app.use(cookieParser())

const dotenv=require('dotenv');
dotenv.config();

const dbConnection=require('./config/db');
dbConnection();
//call has come to this hence it is called




//userroutes
const userroutes=require('./routes/users.routes')
const indexroutes=require('./routes/index.routes')



//for post data to be seen //must be at top before route like user route
app.use(express.json())
app.use(express.urlencoded({extended:true}))


//import routers

app.use(express.static('public'));
app.use('/user',userroutes) ; //  /user/.... in the userroutes directory defined will be shown here
app.use('/home',indexroutes) ; //  /user/.... in the userroutes directory defined will be shown here



app.set("view engine", 'ejs')



//for home only
app.get('/', (req, res) => {

    res.send("Hello user")


})









app.listen(3000, (req,res)=>{
    console.log("Server is running on port 3000")
})