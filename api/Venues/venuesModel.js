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

 const VenuesSchema = new Schema({ 
      id: {type: String, required: true}, 
      name: {type: String, required: true},
      town: {type: String, required: true},
      county: {type: String, required: true},
      phoneno: {type: String, required: true},
      imageUrl: {type: String, required: true} 
    });

    export default mongoose.model('venues', VenuesSchema);
