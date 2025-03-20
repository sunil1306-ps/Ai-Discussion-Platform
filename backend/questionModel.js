const { text } = require('body-parser');
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            default: "Default Title",
            required: true
        },
        question: {
            type: String,
            required: true
        },
        mistralResponse: {
            type: String,
            default: ""
        },
        googleResponse: {
            type: String,
            default: ""
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model('questionsechema', questionSchema);