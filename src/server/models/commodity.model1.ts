/**
 * Created by ihab on 11/13/16.
 */
import mongoose = require("mongoose");
import {Commodity } from "../../models/dataModels/Commodity"
interface CommodityModel extends Commodity, mongoose.Document
{}
var commoditySchema = new mongoose.Schema({
  no : String,
  price: Number,
  name: String
});
var commodity=  mongoose.model<CommodityModel>("Commodity", commoditySchema);
export =commodity;
