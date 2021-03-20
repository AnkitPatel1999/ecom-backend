var express = require('express');
var router  = express.Router();
const { check } = require('express-validator');

const { signin, signup } = require('../controllers/auth');

router.post('/signup',[
    check("name", "Name should be at least 3 char").isLength({ min:3 }),
    check("email", "Email should required").isEmail(),
    check("password", "password should be at least 3 char").isLength({ min: 3})


], signup)
router.get('/signin', signin)

module.exports = router;