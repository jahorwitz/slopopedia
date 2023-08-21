const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    runtimeInMinutes: {
        type: Number,
        required: true,
        trim: true,
        min: 1
    },

    rottenTomatoesScore: {
        type: Number,
        required: true,
        trim: true,
        min: 1,
        max: 100
    },

    releaseYear: {
        type: Number,
        required: true,
        trim: true,
        min: 1900,
        max: 2023
    },

    image: {
        type: String,
        required: true,
    },

    howToWatch: {
        type: String,
        required: true,
        trim: true
    },

    keywords: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Movie', movieSchema);