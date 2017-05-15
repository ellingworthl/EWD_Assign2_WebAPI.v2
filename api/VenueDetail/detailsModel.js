const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const DetailsSchema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true}, 
    description: {type: String, required: true}, 
    type: {type: String, required: true},
    link: {type: String, required: false},
    association: {type: String, required: true},
    parking: {type: String, required: true},
    toilet: {type: String, required: true}, 
    refreshments: {type: String, required: false},
    other: {type: String, required: false}, 
    directions: {type: String, required: true}, 
    images: {type: String, required: true}, 
    images1: {type: String, required: false}
});

export default mongoose.model('details', DetailsSchema);