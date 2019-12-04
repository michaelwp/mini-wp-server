const {Schema, model, models} = require('mongoose');

const articleSchema = new Schema(
    {
        title: String,
        category: String,
        author: [{type: Schema.Types.ObjectId, ref: 'Author'}],
        content: String,
        quillContent: Object,
        created_at: Date
    }
);

const Article = model('Article', articleSchema);

module.exports = {
    Article
};