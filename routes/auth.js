var express = require('express');
var router  = express.Router();

const { signin, signup } = require('../controllers/auth');

router.get('/signup', signup)
router.get('/signin', signin)

module.exports = router;