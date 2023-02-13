const express = require('express')
const router = express.Router()
const Post = require('../MODELS/Post')
const User = require('../MODELS/user')
const Category = require('../MODELS/category')

// Router işlemleri
router.get('/', (req,res) => {
    console.log(req.session)
    Post.find({}).populate({path:'author', model: User}).sort({ $natural: -1 }).lean().then(posts => {
        Category.find({}).lean().then(categories => {
            res.render('site/index', {posts:posts, categories:categories})
        })
       
    })
})


router.get('/join', (req,res) => {
     res.render('site/join')
})

router.get('/post/uret', (req,res) => {
   if(req.session.userId){
     return  res.render('site/addpost')
   }
   res.redirect('/users/login')
})

router.post('/post/test', (req,res) => {
    res.redirect('/')
})

router.get('/views/site/register.handlebars', (req,res) => {
    res.render('site/register')
})

module.exports = router