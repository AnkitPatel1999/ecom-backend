const Product  = require("../models/productModel");
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

        console.log("file...",file)

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
        //console.log("get p ",product)
        req.product = product;
        next();
    })
}

exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}

//middleware
exports.photo = (req, res) => {
    if(req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}

exports.deleteProduct = (req, res) => {
  let product = res.product;
  console.log("dp: ",product)
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the product"
      });
    }
    res.json({
      message: "Deletion was a success",
      deletedProduct
    });
  });
};

exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err) {
            return res.status(400).json({
                error: "Problem with image"
            });
        }

       //updation code
        let product = req.product;
        product = _.extend(product, fields);

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
                    error: "Updation of product failed"
                })
            }
            res.json(product);
        })
    });
}

exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy: "_id"

    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy,"asc"]])
    .limit(limit)
    .exec((err, products) => {
        console.log("err..",err)
        if(err) {
            return res.status(400).json({
                error: "No product found"
            })
        }
        res.json(products);
    })
}

exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("category", {}, (err, category) => {
        if(err) {
            return res.status(400).json({
                error: "No category found"
            })
        }
        res.json(category)
    })
}

exports.updateStock = (req, res) => {
    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: { _id: prod._id }, 
                update: { $inc: { stock: -prod.count, sold: +prod.count }}
            }
        }
    });

    Product.bulkWrite( myOperations, {}, (err, products) => {
        if(err) {
            return res.status(400).json({
                error: "Bulk operation failded"
            })
        }
        next();
    })
}

