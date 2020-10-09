const mongoose = require('mongoose')
const newsSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    created_at: Date,
    title: String,
    url: String,
    author: String,
    points: Number,
    story_text: String,
    comment_text: String,
    num_comments: Number,
    story_id: Number,
    story_title: String,
    story_url: String,
    parent_id: Number,
    created_at_i: Number
})

module.exports = {
   News: mongoose.model('News', newsSchema)
}