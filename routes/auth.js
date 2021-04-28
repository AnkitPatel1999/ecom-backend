var express = require('express');
var router  = express.Router();
const { check } = require('express-validator');

const { signup, signin, signout, isSignedIn  } = require('../controllers/auth');

router.post('/signup',[
    check("name", "Name should be at least 3 char").isLength({ min:3 }),
    check("email", "Email should required").isEmail(),
    check("password", "password should be at least 3 char").isLength({ min: 3})
], signup)

router.get("/hello",(req,res)=>{
	res.send("hello world");
})
router.post('/signin',[
    check("email", "Email should required").isEmail(),
    check("password", "password field is required").isLength({ min: 1})
], signin)

router.get('/signout', signout);

router.get('/testroute',isSignedIn, (req, res) => {
   // res.send("A protected route")
    res.json(req.auth)
});


module.exports = router;