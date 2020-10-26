const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;
const promoSchema = new Schema({
    name:{
      type:String,
      required:true,
      unique:true
    },
    image:{
        type:String,
        required:true
    },
    label:{
        type:String,
        default:''
    },
    description:{
        type:String,
        required:true
    },
    featured:{
        type:Boolean,
        default:false
    },
    price:{
        type:Currency,
        required:true,
        min:0
    }  
},{
    timestamps:true
});
var Promotions = mongoose.model('Promo',promoSchema);
module.exports = Promotions;