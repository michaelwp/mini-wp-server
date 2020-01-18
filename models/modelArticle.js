const {Schema, model, models} = require('mongoose');

const articleSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'title is required'],
            unique: [true, 'title has been registered'],
            minlength: [10, 'title min length 10 character'],
            maxlength: [100, 'title max length 30 character'],
            validate: {
                validator: function (title) {
                    return models.Article.findOne({
                        title: title
                    }).then(result => {
                        return !result;
                    })
                },
                message: "title has been registered"
            }
        },
        tags: [{
            type: String,
            required: true,
            minlength: [3, 'tag min length 6 character'],
            maxlength: [15, 'tag max length 15 character']
        }],
        author: {
            type: Schema.Types.ObjectId, ref: 'Author',
            required: [true, 'Author is required']
        },
        updateBy: {type: Schema.Types.ObjectId, ref: 'Author'},
        content: {
            type: String,
            required: [true, 'content is required'],
            minlength: [100, 'title min length 100 character'],
            maxlength: [50000, 'title max length 500 character']
        },
        quillContent: {
            type: Object,
            required: [true, 'content is required'],
        },
        featured_image: String,
        created_at: {
            type: Date,
            required: [true, 'created_at date is required']
        },
        updated_at: Date
    }
);

const Article = model('Article', articleSchema);

module.exports = {
    Article
};