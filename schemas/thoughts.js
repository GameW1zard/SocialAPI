const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        requierd: true,
        min: 1,
        max: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: formatdate
    },
    username: {
        type: String,
        required: true
    },
    reactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'reaction'
        }
    ]
});


function formatdate (date) {
    return date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
}

module.exports = mongoose.model('thoughts', thoughtSchema);