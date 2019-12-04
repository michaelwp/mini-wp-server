const {Schema, models, model} = require('mongoose');

const authorSchema = new Schema(
    {
        name: String,
        title: String,
        email: {
            type: String,
            validate: [{
                validator: function (email) {
                    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                    return emailRegex.test(email);
                },
                message: "is not a valid email!!!"
            }, {
                validator: function (email) {
                    return models.Author.findOne({
                        email: email
                    }).then(result => {
                        return !result;
                    })
                },
                message: "email has been registered !!!"
            }]
        },
        password: String,
        profile_pic: String
    }
);

const Author = model('Author', authorSchema);

module.exports = {
    Author
};