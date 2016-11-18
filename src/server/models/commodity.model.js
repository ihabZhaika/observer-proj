/**
 * Created by ihab on 11/13/16.
 */
var mongoose = require('mongoose');

var commoditySchema = mongoose.Schema({
                                  no : String,
                                  price: Number,
                                  name: String
                                });

var Commodity = mongoose.model('Commodity', commoditySchema);

module.exports = Commodity;
