const Category = require('../models/categoryModel');

exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, cate) => {
        if(err) {
            return res.status(400).json({
                error: "Category not found in DB"
            })
        }
        req.category = cate;
        next();
    });
}

exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    console.log("category "+category)
    category.save((err, category) => {
        if(err) {
            return res.status(400).json({
                error: "Not able to save category in DB"
            })
        } 
        res.json({ category })
    })
}

exports.getCategory = (req, res) => {
    return res.json(req.category);
}

exports.getAllCategory = (req, res) => {
    Category.find().exec((err, category) => {
        if(err) {
            return res.status(400).json({
                error: "Not category found in DB"
            })
        } 
        res.json(category);
    })
}

exports.updateCategory = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
console.log("cat name ",category)
    category.save((err, updatedcategory) => {
        console.log("uc ",updatedcategory);
        if(err) {
            return res.status(400).json({
                error: "Failed to update category"
            })
        } 

        res.json(updatedcategory);
    })
}

exports.removeCategory = (req, res) => {
    const category = req.category;
    category.remove((err, category) => {
        if(err) {
            return res.status(400).json({
                error: "Failed to delete this category"
            })
        } 
        res.json({ message: "Successfully deleted"})
    })
}