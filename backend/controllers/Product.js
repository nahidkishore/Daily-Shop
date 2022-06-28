const formidable = require('formidable');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const ProductModel = require('../models/ProductModel');

class Product {
  async create(req, res) {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (!err) {
        //console.log('fields', fields);
        // console.log('files', files);
        const parseData = JSON.parse(fields.data);
        const errors = [];
        if (parseData.title.trim().length === 0) {
          errors.push({ msg: 'Title must berequired' });
        }
        if (parseInt(parseData.price) < 1) {
          errors.push({ msg: 'Price should be above $1' });
        }
        if (parseInt(parseData.discount) < 0) {
          errors.push({ msg: 'Discount should not be negative' });
        }

        if (parseInt(parseData.stock) < 20) {
          errors.push({ msg: 'Stock should be above 20' });
        }
        if (fields.description.trim().length === 0) {
          errors.push({ msg: 'Description must be required' });
        }

        if (errors.length === 0) {
          if (!files['image1']) {
            errors.push({ msg: 'Image1 is required' });
          }
          if (!files['image2']) {
            errors.push({ msg: 'Image2 is required' });
          }
          if (!files['image3']) {
            errors.push({ msg: 'Image3 is required' });
          }
          if (errors.length === 0) {
            const images = {};
            for (let i = 0; i < Object.keys(files).length; i++) {
              const mimetype = files[`image${i + 1}`].mimetype;
              const extension = mimetype.split('/')[1].toLowerCase();
              if (
                extension === 'jpeg' ||
                extension === 'jpg' ||
                extension === 'png'
              ) {
                const imageName = uuidv4() + `.${extension}`;
                const __dirname = path.resolve();
                const newPath =
                  __dirname + `/../frontend/public/images/${imageName}`;
                images[`image${i + 1}`] = imageName;
                fs.copyFile(files[`image${i + 1}`].filepath, newPath, (err) => {
                  if (err) {
                    console.log(err);
                  }
                });
              } else {
                const error = {};
                error['msg'] = `image{i+1} has invalid ${extension} type`;
                errors.push(error);
              }
              console.log(mimetype);
              console.log(extension);
            }
            if (errors.length === 0) {
              try {
                const response = await ProductModel.create({
                  title: parseData.title,
                  price: parseInt(parseData.price),
                  discount: parseInt(parseData.discount),
                  stock: parseInt(parseData.stock),
                  category: parseData.category,
                  colors: parseData.colors,
                  sizes: JSON.parse(fields.sizes),
                  image1: images['image1'],
                  image2: images['image2'],
                  image3: images['image3'],
                  description: fields.description,
                });
                return res
                  .status(201)
                  .json({ msg: 'Product has created successfully', response });
              } catch (error) {
                console.log(error);
                return res.status(500).json(error);
              }
            } else {
              return res.status(400).json({ errors });
            }
          } else {
            return res.status(400).json({ errors });
          }
        } else {
          return res.status(400).json({ errors });
        }

        console.log('Errors:', errors);
      }
    });
  }

  async get(req, res) {
    const { page } = req.params;
    const perPage = 5;
    const skip = (page - 1) * perPage;
    try {
      const count = await ProductModel.find({}).countDocuments();
      const response = await ProductModel.find({})
        .skip(skip)
        .limit(perPage)
        .sort({ updatedAt: -1 });
      return res.status(200).json({ products: response, perPage, count });
    } catch (error) {
      console.log(error.message);
    }
  }
  async getProduct(req, res) {
    const { id } = req.params;
    try {
      const product = await ProductModel.findOne({ _id: id }).select(['-image1','-image2','-image3']);
      return res.status(200).json({ product });
    } catch (error) {
      return res.status(500).json({error:error.message})
      console.log(error.message);
    }
  }
}
module.exports = new Product();
