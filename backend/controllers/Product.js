const formidable = require('formidable');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

class Product {
  async create(req, res) {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
      if (!err) {
        //console.log('fields', fields);
        // console.log('files', files);
        const parseData = JSON.parse(fields.data);
        const errors = [];
        if (parseData.title.trim().length === 0) {
          errors.push({ msg: 'Title is required' });
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
          errors.push({ msg: 'Description is required' });
        }

        if (errors.length === 0) {
          if (!files['image1']) {
            errors.push({ image1: 'Image1 is required' });
          }
          if (!files['image2']) {
            errors.push({ image2: 'Image2 is required' });
          }
          if (!files['image3']) {
            errors.push({ image3: 'Image3 is required' });
          }
          if (errors.length === 0) {
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
                fs.copyFile(files[`image${i + 1}`].filepath, newPath, (err) => {
                  if (!err) {
                    console.log('image uploaded successfully');
                  }
                });
              } else {
                const error = {};
                error[
                  `image${i + 1}`
                ] = `image{i+1} has invalid ${extension} type`;
                errors.push(error);
              }
              console.log(mimetype);
              console.log(extension);
            }
            if (errors.length !== 0) {
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
}
module.exports = new Product();
