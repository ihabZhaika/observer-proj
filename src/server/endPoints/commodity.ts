/**
 * Created by ihab on 11/13/16.
 */
import Commodity = require("../models/commodity.model1");

var commodity = new Commodity({email: "user@appsilon.pl"});
commodity.save();
