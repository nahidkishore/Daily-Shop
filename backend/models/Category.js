const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema(
  {
    name: { required: true, type: String, unique: true },
  },
  { timestamps: true }
);
const CategoryModel = mongoose.model('categorie', CategorySchema);
module.exports = CategoryModel;
