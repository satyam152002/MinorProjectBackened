if(process.env.NODE_ENV!='production')
{
    require('dotenv').config()
}
//Importing Dependecies
const express=require('express')
const app=express()
const mongoose=require('mongoose')
const session=require('express-session')
const cors=require('cors')
const MongoStore = require('connect-mongo');

//importing middlewares
const authenticateMiddleware=require('./middlewares/auth.middleware')

//setting configuration
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(session({ 
    secret: `${process.env.SECRET_KEY}`,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: `${process.env.DATABASE_URL}` })
}))
app.use(cors({
    origin:`${process.env.CLIENT_URL}`,
    methods:['GET','POST','PATCH','DELETE'],
    credentials:true
}))

//Configuring Database
mongoose.set('strictQuery',false)
mongoose.connect(`${process.env.DATABASE_URL}`,(e)=>{
    console.log("DB connected",e)
})

//importing routes
const authRouter=require('./routes/auth.route')
const tiffinRouter=require('./routes/tiffin.route')

//setting routes
app.use('/auth',authRouter);
app.use('/tiffin',tiffinRouter)


//listening
const PORT=process.env.PORT || 5000
app.listen(PORT,'0.0.0.0',(err)=>{
    if(!err)
        console.log(`server started at port ${PORT}`)
    else 
        console.log(err)
})