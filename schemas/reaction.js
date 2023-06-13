const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    // reactionId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     default: () => new Types.ObjectId()
    // },
    reactionBody: {
        type: String,
        required: true,
        min: 1,
        max: 280,
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: formatdate
    }
})


function formatdate (date) {
    return date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
}

module.exports = mongoose.model('reaction', reactionSchema);