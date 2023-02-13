const express = require('express')
const router = express.Router()
const Post = require('../MODELS/Post')
const path = require('path')
const User = require('../MODELS/user')
const Category = require('../MODELS/category')

router.get('/uret', (req,res) => {
  if (!req.session.userId) {
    return res.redirect('/users/login')
  } else {
    Category.find({}).lean().then(categories => {
      res.render('site/addpost', { categories: categories })
    })
  }
})


router.get('/category/:categoryId', (req, res) => {
  Post.find({ category: req.params.categoryId }).populate({ path: 'category', model: Category }).lean().then(posts => {
    Category.aggregate([{

      $lookup: {
        from: 'posts',
        localField: '_id',
        foreignField: 'category',
        as: 'posts'
      }
    },
    {
      $project: {
        _id: 1,
        name: 1,
        num_of_posts: { $size: '$posts' }
      }
    }
    ]).then(categories => {
      res.render('site/index', { posts: posts, categories: categories })
    })
  })
})

  router.get("/:id", (req, res) => {
    Post.findById(req.params.id).populate({path:'author', model: User}).lean().then((post) => {
      res.render("site/post", {post:post, layout: 'post-main', });
  });
});

router.post('/test', (req, res) => {

    let postImg = req.files.post_image
  
    postImg.mv(path.resolve(__dirname, '../a/img/postimages', postImg.name))

    Post.create({
      ...req.body,
      postImg: `/img/postimages/${postImg.name}`,
      author: req.session.userId
    })
    req.session.sessionFlash = {
      type: 'alert alert-success',
      message: 'Postunuz başarılı bir şekilde oluşturuldu'
    }
    res.redirect('/')
  })

module.exports = router