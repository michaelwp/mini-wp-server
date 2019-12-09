const {Schema, model, models} = require('mongoose');

const articleSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'title is required'],
        },
        category: {
            type: String,
            required: [true, 'category is required'],
        },
        author: [{type: Schema.Types.ObjectId, ref: 'Author'}],
        content: {
            type: String,
            required: [true, 'content is required'],
        },
        quillContent: {
            type: Object,
            required: [true, 'content is required'],
        },
        featured_image: String,
        created_at: Date
    }
);

const Article = model('Article', articleSchema);

module.exports = {
    Article
};