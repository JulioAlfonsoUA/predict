'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrediccionSchema = new Schema({
    features: { type: [Number], required: true },
    prediction: { type: Number, required: true },
    meta: {
        featureCount: Number,
        dataId: String,
        source: String
    },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prediccion', PrediccionSchema);

