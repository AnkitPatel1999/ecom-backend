const Product  = require("../models/Product");
const formidable = require("formidable");
const _ = require("lodash")
const fs = require("fs");


exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err) {
            return res.status(400).json({
                error: "Problem with image"
            });
        }

        //TODO: restriction on file size
        //destructure the fields
        const { name, description, price, category, stock } = fields

        if( !name || !description || !price || !category || !stock ) { 
            return res.status(400).json({
                error: "Please includes all fields"
            })
        }
        let product = new Product(fields);

        //handle file here
        if(file.photo) {
            if(file.photo.size > 3000000 ) {
                return res.status(400).json({
                    error: "File size too big!"
                })
            }

            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        //SAVE to the DB
        product.save((err, product) => {
            if(err) {
                return res.status(400).json({
                    error: "Saving tshirt in DB Failed"
                })
            }
            res.json(product);
        })
    });
}

exports.getProductById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if(err) {
            return res.status(400).json({
                error: "Product not found",
            })
        }
        res.product = product;
        next();
    })
}