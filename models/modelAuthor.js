const {Schema, models, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const authorSchema = new Schema(
    {
        name: {
            required: [true, 'name is required'],
            type: String
        },
        title: String,
        email: {
            required: [true, 'email is required'],
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
        password: {
            required: [true, 'password is required'],
            type: String
        },
        profile_pic: String
    }
);

authorSchema.pre("save", function (next) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(this.password, salt);

    this.password = hash;
    next();
});

const Author = model('Author', authorSchema);

module.exports = {
    Author
};