const express = require('express')
const app = express()
const session = require('express-session')
const connectDB = require('./connectDB/connect')
const mainRouter = require('./routes/main')
const auth = require('./routes/auth')
const cors = require('cors')
const cookieParser = require('cookie-parser'); // Import cookie-parser
require('./passport')
const passport = require('passport')


// Use cookie-parser middleware
app.use(cookieParser());

const port = process.env.PORT||3000;
app.use(session({
  secret: 'Secret',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.static('public'));
const corsOptions = {
  origin:["http://localhost:5173"],
  methods:'GET,HEAD,PUT,PATCH,POST,DELETE'
}
app.use(cors(corsOptions))




app.use('/auth',auth)
app.use('/',mainRouter)




async function start() {
  try{
    await connectDB()
    app.listen(port,()=>{
      console.log('server running');
  })
    
  } catch(err){
    console.log(err);
  }
}

start()