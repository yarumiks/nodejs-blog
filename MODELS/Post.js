const  mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new mongoose.Schema({
    title: { type: String, required:true, unique:true},
    author: {type: Schema.Types.ObjectId, ref:'users'}, 
    content: { type: String, required:true, unique:true},
    date: { type:Date, default: Date.now },
    category: {type: Schema.Types.ObjectId, ref:'categories'},
    postImg: { type: String, required:true}
})

module.exports  = mongoose.model('Post', postSchema)