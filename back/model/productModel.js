const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
    _id: {type:Number,required:true},
    titre: String,
    description: String,
    prix: String,
    img1:String,
    img2:String,
    img3:String,
    idPoster:String
 
}, {
    timestamps: true
});


module.exports = mongoose.model('product',ProfileSchema);