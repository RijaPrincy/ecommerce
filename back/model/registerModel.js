const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
    _id: {type:Number,required:true},
    nom: String,
    email: String,
    passWord: String,

    
}, {
    timestamps: true
});


module.exports = mongoose.model('admin',ProfileSchema);