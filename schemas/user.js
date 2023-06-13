const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email : {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function (v) {
                return /^([a-z0-9.-]+)@([\da-z.-]+).([a-z.]{2,6})$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        },
    },
    thoughts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'thoughts'
        }
    ],
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ]
});

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

module.exports = mongoose.model('user', userSchema);