const mongoose = require('mongoose');

var User = mongoose.model('User', {
    name:{type: String},
    age:{type:Number},
    city:{type:String},
    email:{type:String}
});

module.exports = { User };
