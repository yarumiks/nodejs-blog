const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Post = require('./MODELS/Post')
const fileUpload = require('express-fileupload')
const session = require('express-session')
const moment = require('moment')
const generateDate = require('./helpers/generateDate').generateDate
const mongoStore = require('connect-mongo')

const port = 3000
const hostname = '127.0.0.2'



//css dosyaları kullanma
app.use(express.static('a'))

//dosyaları yüklemek
app.use(fileUpload())

//session kullanma 
app.use(session({
        secret: 'testyasar',
        resave: false,
        saveUninitialized: true,
        store: mongoStore.create({ mongoUrl: 'mongodb://localhost:27017/wepsite_DB' })
}))

//body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 


// Flash - Message Middleware
app.use((req,res,next)=>{
        res.locals.sessionFlash = req.session.sessionFlash
        delete req.session.sessionFlash
        next()
    })
    

// handlebars helpers
const hbs = exphbs.create({
        helpers: {
          generateDate: generateDate,
        }
      });

// mongodb bağlantısı
mongoose.set('strictQuery', false)

mongoose.connect('mongodb://localhost:27017/wepsite_DB', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
}).catch((err) => {console.log(err)})


app.engine("handlebars",hbs.engine)
app.set('view engine', 'handlebars')

const main = require('./ROUTER/main')
const posts = require('./ROUTER/posts')
const users = require('./ROUTER/users')


app.use('/',main)
app.use('/posts',posts)
app.use('/users',users)
 



 //veri tabanına post yazdırma deneme
//  Post.create({
//     title:'post denemeleri',
//     content: 'post detayları aaa'
//  },(err,post) => {
//         console.log(err,post)
//  })

 

//server çalıştırma
app.listen(port,hostname, () => {
        console.log(`server hazır, http://${hostname}:${port}/`)
     })
    